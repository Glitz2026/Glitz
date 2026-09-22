import { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import { MODEL_ZONES, isTableAvailable, makeInventory } from "./floorplanBridge";

const SLOW_LOAD_MS = 6000;

export default function Floorplan3D({ eventId, tables, reservedTables, getTableInfo, activeZone, ready, onSelect, onFallback, onSlowLoad, onReady }) {
    const frame = useRef(null);
    const latest = useRef(null);
    const request = useRef(0);
    const [map, setMap] = useState(null);
    const [failed, setFailed] = useState(false);
    const [checking, setChecking] = useState(false);
    const [message, setMessage] = useState("");
    const [live, setLive] = useState(null);
    latest.current = { tables, getTableInfo, ready, onSelect };
    const inventoryKey = JSON.stringify(tables.map(t => [t, getTableInfo(t)]));
    const reservedKey = JSON.stringify(reservedTables);

    useEffect(() => {
        let cancelled = false;
        let sequence = 0;
        setLive(null);
        const refresh = async () => {
            const current = ++sequence;
            try {
                const { data } = await api.get(`/events/${eventId}`);
                if (!cancelled && current === sequence) setLive({ eventId, reserved: data.reserved_tables || {}, enabled: data.floorplan_enabled });
            } catch {
                if (!cancelled && current === sequence) setLive(null);
            }
        };
        refresh();
        const timer = setInterval(refresh, 30000);
        window.addEventListener("focus", refresh);
        return () => { cancelled = true; clearInterval(timer); window.removeEventListener("focus", refresh); request.current++; };
    }, [eventId, reservedKey]);

    useEffect(() => {
        if (map || failed) return;
        const timer = setTimeout(() => setFailed(true), 20000);
        return () => clearTimeout(timer);
    }, [map, failed]);

    // Connessione lenta: il 3D è ancora in caricamento dopo qualche secondo.
    // Non forziamo il cambio vista, segnaliamo solo l'alternativa 2D.
    useEffect(() => {
        if (map || failed) return;
        const timer = setTimeout(() => { if (!map) onSlowLoad?.(); }, SLOW_LOAD_MS);
        return () => clearTimeout(timer);
    }, [map, failed, onSlowLoad]);

    useEffect(() => {
        if (!map) return;
        const current = latest.current;
        const verified = live?.eventId === eventId && live.enabled;
        map.setInventory(makeInventory(map.getTables(), current.tables, live?.reserved || {}, current.getTableInfo, current.ready && verified));
    }, [map, live, eventId, ready, inventoryKey]);

    useEffect(() => {
        if (!map) return;
        if (MODEL_ZONES[activeZone]) map.selectZone(MODEL_ZONES[activeZone]);
        else map.reset();
    }, [map, activeZone]);

    useEffect(() => {
        if (!map) return;
        map.setBookingHandler(async (selection) => {
            const currentRequest = ++request.current;
            const t = latest.current.tables.find(t => t.id === selection?.tableId && MODEL_ZONES[t.zone] === selection.zoneId);
            if (!t || !latest.current.ready) return;
            setChecking(true);
            setMessage("");
            try {
                const { data } = await api.get(`/events/${eventId}`);
                if (currentRequest !== request.current) return;
                const reserved = data.reserved_tables || {};
                setLive({ eventId, reserved, enabled: data.floorplan_enabled });
                if (!data.floorplan_enabled || !isTableAvailable(reserved[t.id])) {
                    setMessage("Questo tavolo non è più disponibile. Scegline un altro.");
                    return;
                }
                latest.current.onSelect(t);
            } catch {
                if (currentRequest === request.current) {
                    setLive(null);
                    setMessage("Non riesco a verificare la disponibilità. Riprova tra poco.");
                }
            } finally {
                if (currentRequest === request.current) setChecking(false);
            }
        });
        return () => { request.current++; map.setBookingHandler(null); };
    }, [map, eventId]);

    function loaded() {
        try {
            const instance = frame.current?.contentWindow?.GlitzMap;
            if (!instance?.setBookingHandler) { setFailed(true); return; }
            setMap(instance);
            setFailed(false);
            onReady?.();
        } catch { setFailed(true); }
    }

    return <div className="mb-6">
        <p className="text-sm text-white/60 mb-3">Ruota e ingrandisci il club, scegli un tavolo e apri il modulo di richiesta. La conferma arriva dallo staff.</p>
        {failed ? <div role="status" className="glass-card rounded-xl p-6">
            <p>La vista 3D non è disponibile su questo dispositivo.</p>
            <button type="button" className="btn-ghost mt-3" onClick={onFallback}>Usa la piantina 2D</button>
        </div> : <>
            {!map && <p role="status">Caricamento del club in 3D…</p>}
            <iframe ref={frame} src="/glitz-interattivo.html?embedded=1&v=19" title="Mappa 3D interattiva del Glitz Club"
                onLoad={loaded} onError={() => setFailed(true)}
                className="w-full rounded-2xl border border-white/10" style={{ height: "min(900px, 85vh)", minHeight: 650 }} />
        </>}
        {map && (!ready || !live) && <p role="status" className="mt-3 text-sm">Disponibilità e condizioni in attesa di verifica. I tavoli restano temporaneamente disabilitati.</p>}
        {checking && <p role="status" className="mt-3">Verifico la disponibilità del tavolo…</p>}
        {message && <p role="alert" className="mt-3">{message}</p>}
    </div>;
}
