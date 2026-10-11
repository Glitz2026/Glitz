// Concatena i sorgenti della scena in dist/scena.js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const parts = ['01-base.js', '02-sito.js', '03-palco.js', '03b-pubblico.js', '04-render.js'];
const js = parts.map((f) => readFileSync(join(root, 'src', f), 'utf8')).join('\n');
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'scena.js'), js);
console.log('dist/scena.js', (js.length / 1024).toFixed(1), 'KB');
