// Jarvis — interfaccia web: chat, voce, «Ehi Jarvis», promemoria.

const $ = (selector) => document.querySelector(selector);
const els = {
  app: $('#app'), stage: $('#stage'), log: $('#log'), banner: $('#banner'),
  core: $('#core'), coreStatus: $('#coreStatus'), greeting: $('#greeting'), suggestions: $('#suggestions'),
  composer: $('#composer'), input: $('#input'), micBtn: $('#micBtn'),
  wakeBtn: $('#wakeBtn'), newChatBtn: $('#newChatBtn'), menuBtn: $('#menuBtn'),
  drawer: $('#drawer'), scrim: $('#scrim'), closeDrawer: $('#closeDrawer'),
  chatList: $('#chatList'), memoryList: $('#memoryList'), reminderList: $('#reminderList'), noteList: $('#noteList'),
  notifyBtn: $('#notifyBtn'), ttsMode: $('#ttsMode'), voiceSelect: $('#voiceSelect'), rate: $('#rate'), rateOut: $('#rateOut'),
  testVoice: $('#testVoice'), logoutBtn: $('#logoutBtn'), supportHint: $('#supportHint'),
  loginDialog: $('#loginDialog'), loginForm: $('#loginForm'), passwordInput: $('#passwordInput'), loginError: $('#loginError'),
  toasts: $('#toasts'),
};

// Preferenze salvate nel browser (se il browser lo permette).
const prefs = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem('jarvis.' + key);
      return value === null ? fallback : JSON.parse(value);
    } catch { return fallback; }
  },
  set(key, value) { try { localStorage.setItem('jarvis.' + key, JSON.stringify(value)); } catch { /* niente */ } },
  remove(key) { try { localStorage.removeItem('jarvis.' + key); } catch { /* niente */ } },
};

const state = {
  status: null,
  authorized: false,
  conversationId: prefs.get('conversation', null),
  sending: false,
  abort: null,
  ttsMode: prefs.get('ttsMode', 'auto'),
  voiceName: prefs.get('voice', ''),
  rate: prefs.get('rate', 1.05),
  tab: 'chats',
};

// ---------- Server ----------

class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

async function api(path, options = {}) {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers };
  const password = prefs.get('password', '');
  if (password) headers.Authorization = 'Bearer ' + password;
  const response = await fetch(path, { ...options, headers });
  if (response.status === 401) {
    state.authorized = false;
    askPassword(Boolean(password));
    throw new ApiError('Serve la password.', 401);
  }
  return response;
}

async function errorMessage(response) {
  try {
    const data = await response.json();
    return typeof data.detail === 'string' ? data.detail : 'Richiesta non valida.';
  } catch { return `Errore ${response.status}.`; }
}

async function apiJSON(path, options) {
  const response = await api(path, options);
  if (!response.ok) throw new ApiError(await errorMessage(response), response.status);
  return response.json();
}

async function* readEvents(body) {
  const reader = body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';
  for (;;) {
    const { value, done } = await reader.read();
    if (done) return;
    buffer += value;
    let cut;
    while ((cut = buffer.indexOf('\n\n')) >= 0) {
      const chunk = buffer.slice(0, cut);
      buffer = buffer.slice(cut + 2);
      const data = chunk.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trimStart()).join('\n');
      if (data) yield JSON.parse(data);
    }
  }
}

// ---------- Testo ----------

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function inline(escaped) {
  return escaped.split(/(`[^`]+`)/).map((part) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) return `<code>${part.slice(1, -1)}</code>`;
    return part
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
  }).join('');
}

function renderMarkdown(source) {
  const out = [];
  const lines = source.replace(/\r/g, '').split('\n');
  let paragraph = [];
  let list = null;
  const flushParagraph = () => {
    if (paragraph.length) out.push('<p>' + paragraph.map((l) => inline(escapeHtml(l))).join('<br>') + '</p>');
    paragraph = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.type}>` + list.items.map((i) => `<li>${inline(escapeHtml(i))}</li>`).join('') + `</${list.type}>`);
    list = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('```')) {
      flushParagraph(); flushList();
      const code = [];
      while (++i < lines.length && !lines[i].trimStart().startsWith('```')) code.push(lines[i]);
      out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }
    const item = line.match(/^\s*(?:([-*•])|(\d+)[.)])\s+(.*)$/);
    if (item) {
      flushParagraph();
      const type = item[1] ? 'ul' : 'ol';
      if (!list || list.type !== type) { flushList(); list = { type, items: [] }; }
      list.items.push(item[3]);
      continue;
    }
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) { flushParagraph(); flushList(); out.push(`<p><strong>${inline(escapeHtml(heading[1]))}</strong></p>`); continue; }
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    flushList();
    paragraph.push(line);
  }
  flushParagraph(); flushList();
  return out.join('');
}

// Testo adatto alla lettura ad alta voce.
function speakable(text) {
  return text
    .replace(/```[\s\S]*?(```|$)/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/^\s*(?:[-*•]|\d+[.)])\s+/gm, '')
    .replace(/[*_#>|~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- Stato dell'interfaccia ----------

const STATUS_TEXT = { idle: 'Pronto', listening: 'Ti ascolto', thinking: 'Elaboro', speaking: 'Parlo' };

function setState(next, label) {
  document.body.dataset.state = next;
  let text = label || STATUS_TEXT[next];
  if (next === 'idle' && wake.rec) text = 'In ascolto di «Jarvis»';
  els.coreStatus.textContent = text;
}

function refreshState() {
  if (listener.active) setState('listening');
  else if (speech.busy) setState('speaking');
  else if (state.sending) setState('thinking');
  else setState('idle');
}

function showBanner(text) {
  els.banner.textContent = text;
  els.banner.hidden = !text;
}

function toast(text, { title = '', className = '', timeout = 5000 } = {}) {
  const el = document.createElement('div');
  el.className = 'toast ' + className;
  if (title) {
    const strong = document.createElement('strong');
    strong.textContent = title + ' ';
    el.append(strong);
  }
  el.append(text);
  el.addEventListener('click', () => el.remove());
  els.toasts.append(el);
  if (timeout) setTimeout(() => el.remove(), timeout);
}

let audioContext;
function chime() {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const t = audioContext.currentTime;
    [[0, 880], [0.09, 1320]].forEach(([delay, frequency]) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.12, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.25);
      osc.connect(gain).connect(audioContext.destination);
      osc.start(t + delay);
      osc.stop(t + delay + 0.3);
    });
  } catch { /* audio non disponibile */ }
}

function greetingText() {
  const hour = new Date().getHours();
  const hello = hour < 5 ? 'Buonanotte' : hour < 13 ? 'Buongiorno' : hour < 18 ? 'Buon pomeriggio' : 'Buonasera';
  const name = state.status?.user_name;
  return `${hello}${name ? ', ' + name : ''}. Come posso aiutarti?`;
}

// ---------- Messaggi ----------

function addMessage(role, text = '') {
  els.app.classList.add('has-messages');
  const el = document.createElement('article');
  el.className = 'msg ' + role;
  if (role === 'assistant') {
    const who = document.createElement('div');
    who.className = 'who';
    who.textContent = 'JARVIS';
    el.append(who);
  }
  const body = document.createElement('div');
  body.className = 'body';
  el.append(body);
  setMessageText(el, text);
  els.log.append(el);
  return el;
}

function setMessageText(el, text) {
  const body = el.querySelector('.body');
  if (el.classList.contains('assistant')) body.innerHTML = renderMarkdown(text);
  else body.textContent = text;
}

function addNote(el, text) {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = text;
  el.append(note);
}

function scrollToBottom(force = false) {
  const stage = els.stage;
  if (force || stage.scrollHeight - stage.scrollTop - stage.clientHeight < 200) stage.scrollTop = stage.scrollHeight;
}

function autosize() {
  els.input.style.height = 'auto';
  els.input.style.height = Math.min(els.input.scrollHeight, 160) + 'px';
}

// ---------- Voce in uscita ----------

const MALE_VOICES = /giuseppe|diego|luca|cosimo|benigno|rinaldo|gianni|calimero/i;

const speech = {
  supported: 'speechSynthesis' in window,
  pending: 0,
  generation: 0,
  get busy() { return this.pending > 0; },
  italianVoices() {
    const voices = this.supported ? speechSynthesis.getVoices() : [];
    const italian = voices.filter((v) => v.lang.toLowerCase().startsWith('it'));
    return italian.length ? italian : voices;
  },
  voice() {
    const voices = this.italianVoices();
    return voices.find((v) => v.name === state.voiceName)
      || voices.find((v) => MALE_VOICES.test(v.name))
      || voices.find((v) => /google|natural|online/i.test(v.name))
      || voices[0];
  },
  say(text) {
    const clean = speakable(text);
    if (!this.supported || !clean) return;
    const utterance = new SpeechSynthesisUtterance(clean);
    const voice = this.voice();
    utterance.lang = voice ? voice.lang : 'it-IT';
    if (voice) utterance.voice = voice;
    utterance.rate = state.rate;
    const generation = this.generation;
    const finished = () => {
      if (generation !== this.generation) return;
      this.pending = Math.max(0, this.pending - 1);
      if (!this.pending) { refreshState(); resumeWake(); }
    };
    utterance.onend = finished;
    utterance.onerror = finished;
    this.pending++;
    stopWake();
    setState('speaking');
    speechSynthesis.speak(utterance);
  },
  stop() {
    if (!this.supported) return;
    this.generation++;
    this.pending = 0;
    speechSynthesis.cancel();
    refreshState();
  },
};

// Legge la risposta frase per frase mentre arriva, senza aspettare la fine.
class SentenceSpeaker {
  constructor() { this.buffer = ''; }
  push(delta) {
    this.buffer += delta;
    for (;;) {
      if ((this.buffer.match(/```/g) || []).length % 2) return; // dentro un blocco di codice
      const match = /[.!?…]["»”')]*\s|\n/.exec(this.buffer);
      if (!match) return;
      const end = match.index + match[0].length;
      this.say(this.buffer.slice(0, end));
      this.buffer = this.buffer.slice(end);
    }
  }
  flush() {
    this.say(this.buffer);
    this.buffer = '';
  }
  say(text) {
    // Frasi molto lunghe vengono spezzate: alcuni browser interrompono le letture lunghe.
    const parts = text.length > 220 ? text.replace(/([,;:])\s+/g, '$1\n').split('\n') : [text];
    for (const part of parts) speech.say(part);
  }
}

// ---------- Voce in entrata ----------

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function newRecognition(continuous) {
  const rec = new Recognition();
  rec.lang = 'it-IT';
  rec.continuous = continuous;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  return rec;
}

function micError(code) {
  const messages = {
    'not-allowed': 'Il microfono è bloccato. Consenti l\'accesso nelle impostazioni del browser.',
    'service-not-allowed': 'Il riconoscimento vocale non è consentito in questo browser.',
    'audio-capture': 'Nessun microfono trovato.',
    network: 'Il riconoscimento vocale del browser richiede la connessione a internet.',
  };
  if (messages[code]) toast(messages[code]);
}

const listener = {
  rec: null,
  get active() { return Boolean(this.rec); },
  start() {
    if (!Recognition) {
      toast('Questo browser non riconosce la voce: usa Chrome o Edge, oppure Safari su iPhone.');
      return;
    }
    if (this.rec || state.sending) return;
    speech.stop();
    stopWake(() => this.begin());
  },
  begin() {
    const rec = newRecognition(false);
    let finalText = '';
    let interimText = '';
    rec.onresult = (event) => {
      interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) finalText += result[0].transcript;
        else interimText += result[0].transcript;
      }
      els.input.value = (finalText + interimText).trimStart();
      autosize();
    };
    rec.onerror = (event) => micError(event.error);
    rec.onend = () => {
      this.rec = null;
      const text = (finalText || interimText).trim();
      refreshState();
      if (text) send(text, { voice: true });
      else resumeWake();
    };
    try {
      rec.start();
    } catch {
      toast('Non riesco ad avviare il microfono.');
      return;
    }
    this.rec = rec;
    setState('listening');
  },
  stop() { this.rec?.stop(); },
};

// «Ehi Jarvis»: ascolto continuo che si attiva quando sente il nome.
const WAKE_WORD = /\b(?:ehi |hey |ok )?(?:jarvis|giarvis|jarvi|jervis|gervis|giarvi|jarviss)\b[\s,.:;!?]*/i;

const wake = { enabled: false, rec: null, then: null, timer: 0 };

function startWake() {
  if (!wake.enabled || wake.rec || !Recognition || !state.authorized) return;
  if (state.sending || speech.busy || listener.active || document.hidden) return;
  const rec = newRecognition(true);
  let triggered = false;
  rec.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length && !triggered; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      const match = transcript.match(WAKE_WORD);
      if (!match || !result.isFinal) continue;
      triggered = true;
      const command = transcript.slice(match.index + match[0].length).trim();
      chime();
      stopWake(() => (command.length > 2 ? send(command, { voice: true }) : listener.begin()));
    }
  };
  rec.onerror = (event) => {
    if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(event.error)) {
      setWake(false);
      micError(event.error);
    }
  };
  rec.onend = () => {
    wake.rec = null;
    const then = wake.then;
    wake.then = null;
    if (then) then();
    else resumeWake();
    refreshState();
  };
  try {
    rec.start();
    wake.rec = rec;
    refreshState();
  } catch {
    resumeWake();
  }
}

function stopWake(then) {
  clearTimeout(wake.timer);
  if (wake.rec) {
    wake.then = then || null;
    wake.rec.abort();
  } else if (then) {
    then();
  }
}

function resumeWake() {
  clearTimeout(wake.timer);
  if (wake.enabled) wake.timer = setTimeout(startWake, 500);
}

function setWake(on) {
  if (on && !Recognition) {
    toast('Questo browser non riconosce la voce: usa Chrome o Edge su computer.');
    return;
  }
  wake.enabled = on;
  els.wakeBtn.setAttribute('aria-pressed', String(on));
  prefs.set('wake', on);
  if (on) startWake();
  else stopWake();
  refreshState();
}

// ---------- Conversazione ----------

async function send(text, { voice = false } = {}) {
  text = text.trim();
  if (!text || state.sending) return;
  if (!state.status?.ready) {
    toast('Jarvis non ha ancora una chiave API: vedi il messaggio in alto.');
    return;
  }
  speech.stop();
  els.input.value = '';
  autosize();
  addMessage('user', text);
  const reply = addMessage('assistant');
  reply.classList.add('pending');
  scrollToBottom(true);

  const speakReply = speech.supported && (state.ttsMode === 'always' || (state.ttsMode === 'auto' && voice));
  const speaker = speakReply ? new SentenceSpeaker() : null;
  let full = '';
  let frame = 0;
  const paint = () => {
    frame = 0;
    setMessageText(reply, full);
    scrollToBottom();
  };

  state.sending = true;
  state.abort = new AbortController();
  els.composer.classList.add('busy');
  stopWake();
  setState('thinking');
  try {
    const response = await api('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: text, conversation_id: state.conversationId, voice }),
      signal: state.abort.signal,
    });
    if (!response.ok) throw new ApiError(await errorMessage(response), response.status);
    for await (const event of readEvents(response.body)) {
      if (event.type === 'conversation') {
        setConversation(event.id);
      } else if (event.type === 'text') {
        full += event.text;
        frame ||= requestAnimationFrame(paint);
        speaker?.push(event.text);
      } else if (event.type === 'status') {
        if (!speech.busy) setState('thinking', event.text);
      } else if (event.type === 'changed') {
        loadPanel(event.what);
      } else if (event.type === 'refusal' || event.type === 'error') {
        reply.classList.toggle('error', event.type === 'error');
        addNote(reply, event.text);
        speaker?.push(' ' + event.text + '\n');
      }
    }
    speaker?.flush();
  } catch (error) {
    if (error.name === 'AbortError') {
      addNote(reply, 'Interrotto.');
    } else {
      reply.classList.add('error');
      addNote(reply, error.message || 'Connessione persa.');
    }
  } finally {
    cancelAnimationFrame(frame);
    paint();
    reply.classList.remove('pending');
    state.sending = false;
    state.abort = null;
    els.composer.classList.remove('busy');
    refreshState();
    if (!speech.busy) resumeWake();
    loadPanel('chats');
  }
}

function setConversation(id) {
  state.conversationId = id;
  if (id) prefs.set('conversation', id);
  else prefs.remove('conversation');
  for (const li of els.chatList.children) li.classList.toggle('active', li.dataset.id === id);
}

function newChat() {
  state.abort?.abort();
  speech.stop();
  setConversation(null);
  els.log.replaceChildren();
  els.app.classList.remove('has-messages');
  closeDrawer();
  els.input.focus();
}

async function openChat(id) {
  const data = await apiJSON('/api/conversations/' + encodeURIComponent(id));
  setConversation(id);
  els.log.replaceChildren();
  for (const message of data.messages) addMessage(message.role, message.text);
  els.app.classList.toggle('has-messages', data.messages.length > 0);
  scrollToBottom(true);
}

// ---------- Pannello laterale ----------

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('.panel')];

function openDrawer() {
  els.drawer.hidden = false;
  els.scrim.hidden = false;
  els.menuBtn.setAttribute('aria-expanded', 'true');
  selectTab(state.tab);
}

function closeDrawer() {
  els.drawer.hidden = true;
  els.scrim.hidden = true;
  els.menuBtn.setAttribute('aria-expanded', 'false');
}

function selectTab(tab) {
  state.tab = tab;
  for (const button of tabs) button.setAttribute('aria-selected', String(button.dataset.tab === tab));
  for (const panel of panels) panel.hidden = panel.dataset.panel !== tab;
  loadPanel(tab);
}

const SHORT_DATE = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' });
const TIME = new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit' });

function when(iso) {
  const date = new Date(iso);
  const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(iso).setHours(0, 0, 0, 0)) / 86400000);
  if (days === 0) return 'oggi, ' + TIME.format(date);
  if (days === 1) return 'ieri, ' + TIME.format(date);
  return SHORT_DATE.format(date);
}

const CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function renderList(list, items, { empty, describe, open, remove }) {
  list.replaceChildren();
  if (!items.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = empty;
    list.append(li);
    return;
  }
  for (const item of items) {
    const { title, meta, text, className } = describe(item);
    const li = document.createElement('li');
    li.dataset.id = item.id;
    if (className) li.className = className;
    const main = document.createElement(open ? 'button' : 'div');
    main.className = 'item-main';
    if (open) {
      main.type = 'button';
      main.addEventListener('click', () => open(item));
    }
    for (const [cls, value] of [['item-title', title], ['item-meta', meta], ['item-text', text]]) {
      if (!value) continue;
      const span = document.createElement('span');
      span.className = cls;
      span.textContent = value;
      main.append(span);
    }
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete';
    del.setAttribute('aria-label', 'Elimina');
    del.innerHTML = CLOSE_ICON;
    del.addEventListener('click', () => remove(item));
    li.append(main, del);
    list.append(li);
  }
}

async function deleteItem(path, panel, question) {
  if (question && !confirm(question)) return false;
  try {
    await apiJSON(path, { method: 'DELETE' });
    return true;
  } catch (error) {
    toast(error.message);
    return false;
  } finally {
    loadPanel(panel);
  }
}

const loaders = {
  async chats() {
    const chats = await apiJSON('/api/conversations');
    renderList(els.chatList, chats, {
      empty: 'Nessuna conversazione.',
      describe: (c) => ({ title: c.title || 'Conversazione', meta: when(c.updated_at), className: c.id === state.conversationId ? 'active' : '' }),
      open: async (c) => { closeDrawer(); await openChat(c.id).catch((e) => toast(e.message)); },
      remove: async (c) => {
        const deleted = await deleteItem('/api/conversations/' + c.id, 'chats', 'Eliminare questa conversazione?');
        if (deleted && c.id === state.conversationId) newChat();
      },
    });
  },
  async memories() {
    const memories = await apiJSON('/api/memories');
    renderList(els.memoryList, memories, {
      empty: 'Jarvis non ricorda ancora niente di te.',
      describe: (m) => ({ title: m.text, meta: 'salvato ' + when(m.created_at) }),
      remove: (m) => deleteItem('/api/memories/' + m.id, 'memories'),
    });
  },
  async reminders() {
    const reminders = await apiJSON('/api/reminders');
    renderList(els.reminderList, reminders, {
      empty: 'Nessun promemoria.',
      describe: (r) => ({ title: r.text, meta: (r.notified ? 'Scaduto · ' : '') + r.due_label, className: r.notified ? 'done' : '' }),
      remove: (r) => deleteItem('/api/reminders/' + r.id, 'reminders'),
    });
  },
  async notes() {
    const notes = await apiJSON('/api/notes');
    renderList(els.noteList, notes, {
      empty: 'Nessuna nota. Prova: «salva una nota con…».',
      describe: (n) => ({ title: n.title, meta: 'aggiornata ' + when(n.updated_at), text: n.content }),
      remove: (n) => deleteItem('/api/notes/' + n.id, 'notes', `Eliminare la nota «${n.title}»?`),
    });
  },
  settings() {},
};

function loadPanel(name) {
  if (!state.authorized || !loaders[name]) return;
  Promise.resolve(loaders[name]()).catch(() => { /* errore già segnalato */ });
}

// ---------- Promemoria ----------

async function checkReminders() {
  if (!state.authorized) return;
  let due;
  try {
    due = await apiJSON('/api/reminders/due');
  } catch {
    return;
  }
  for (const reminder of due) {
    chime();
    toast(`${reminder.text} (${reminder.due_label})`, { title: 'Promemoria', className: 'reminder', timeout: 0 });
    if ('Notification' in window && Notification.permission === 'granted' && document.hidden) {
      new Notification('Jarvis · Promemoria', { body: reminder.text, icon: '/static/icon-192.png' });
    }
    if (state.ttsMode !== 'never') speech.say('Promemoria: ' + reminder.text);
  }
  if (due.length) loadPanel('reminders');
}

function updateNotifyButton() {
  if (!('Notification' in window)) {
    els.notifyBtn.hidden = true;
    return;
  }
  const granted = Notification.permission === 'granted';
  els.notifyBtn.textContent = granted ? 'Notifiche attive' : 'Attiva le notifiche';
  els.notifyBtn.disabled = granted;
}

// ---------- Impostazioni ----------

function fillVoices() {
  const voices = speech.italianVoices();
  const current = speech.voice();
  const options = voices.map((v) => new Option(`${v.name} (${v.lang})`, v.name, false, v.name === current?.name));
  els.voiceSelect.replaceChildren(...(options.length ? options : [new Option('Voce predefinita del sistema', '')]));
  els.voiceSelect.disabled = !voices.length;
}

function supportNotes() {
  const notes = [];
  if (!window.isSecureContext) notes.push('Il microfono funziona solo su https:// o su localhost.');
  if (!Recognition) notes.push('Questo browser non riconosce la voce: usa Chrome o Edge su computer, Chrome su Android o Safari su iPhone.');
  if (!speech.supported) notes.push('Questo browser non sa leggere ad alta voce.');
  return notes.join(' ');
}

// ---------- Accesso ----------

function askPassword(failed = false) {
  els.loginError.hidden = !failed;
  if (!els.loginDialog.open) els.loginDialog.showModal();
  els.passwordInput.focus();
}

els.loginDialog.addEventListener('cancel', (event) => event.preventDefault());
els.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const password = els.passwordInput.value;
  const response = await fetch('/api/check', { headers: { Authorization: 'Bearer ' + password } });
  if (!response.ok) {
    askPassword(true);
    return;
  }
  prefs.set('password', password);
  els.passwordInput.value = '';
  els.loginDialog.close();
  start();
});

// ---------- Eventi ----------

els.composer.addEventListener('submit', (event) => {
  event.preventDefault();
  if (state.sending) state.abort?.abort();
  else send(els.input.value);
});

els.input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    els.composer.requestSubmit();
  }
});
els.input.addEventListener('input', autosize);

els.micBtn.addEventListener('click', () => (listener.active ? listener.stop() : listener.start()));
els.core.addEventListener('click', () => {
  if (speech.busy) speech.stop();
  else if (listener.active) listener.stop();
  else listener.start();
});
els.suggestions.addEventListener('click', (event) => {
  if (event.target.matches('.suggestion')) send(event.target.textContent);
});
els.wakeBtn.addEventListener('click', () => setWake(!wake.enabled));
els.newChatBtn.addEventListener('click', newChat);
els.menuBtn.addEventListener('click', openDrawer);
els.closeDrawer.addEventListener('click', closeDrawer);
els.scrim.addEventListener('click', closeDrawer);
for (const button of tabs) button.addEventListener('click', () => selectTab(button.dataset.tab));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (!els.drawer.hidden) closeDrawer();
  speech.stop();
  listener.stop();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopWake();
  else {
    resumeWake();
    checkReminders();
  }
});

els.notifyBtn.addEventListener('click', async () => {
  await Notification.requestPermission();
  updateNotifyButton();
});

els.ttsMode.value = state.ttsMode;
els.ttsMode.addEventListener('change', () => {
  state.ttsMode = els.ttsMode.value;
  prefs.set('ttsMode', state.ttsMode);
  if (state.ttsMode === 'never') speech.stop();
});

els.voiceSelect.addEventListener('change', () => {
  state.voiceName = els.voiceSelect.value;
  prefs.set('voice', state.voiceName);
});

els.rate.value = state.rate;
els.rateOut.textContent = Number(state.rate).toFixed(2);
els.rate.addEventListener('input', () => {
  state.rate = Number(els.rate.value);
  els.rateOut.textContent = state.rate.toFixed(2);
  prefs.set('rate', state.rate);
});

els.testVoice.addEventListener('click', () => {
  speech.stop();
  speech.say('Buongiorno. Sono Jarvis, a tua disposizione.');
});

els.logoutBtn.addEventListener('click', () => {
  prefs.remove('password');
  location.reload();
});

if (speech.supported) {
  fillVoices();
  speechSynthesis.addEventListener?.('voiceschanged', fillVoices);
}

// ---------- Avvio ----------

async function start() {
  try {
    state.status = await (await fetch('/api/status')).json();
  } catch {
    showBanner('Non riesco a raggiungere il server di Jarvis.');
    return;
  }
  els.greeting.textContent = greetingText();
  els.logoutBtn.hidden = !state.status.password_required;
  els.supportHint.textContent = supportNotes();
  updateNotifyButton();
  showBanner(state.status.ready ? '' : 'Jarvis non ha ancora una chiave API: aggiungi ANTHROPIC_API_KEY nel file jarvis/.env e riavvia il server.');

  if (state.status.password_required && !prefs.get('password', '')) {
    askPassword();
    return;
  }
  try {
    const account = await apiJSON('/api/check');
    state.status.user_name = account.user_name;
  } catch {
    return;
  }
  state.authorized = true;
  els.greeting.textContent = greetingText();

  if (state.conversationId) {
    await openChat(state.conversationId).catch(() => setConversation(null));
  }
  loadPanel('chats');
  checkReminders();
  if (prefs.get('wake', false) && Recognition) setWake(true);
  refreshState();
}

setInterval(checkReminders, 30000);
autosize();
start();
