import { useEffect, useState } from "react";

export function useCountdown(targetIso) {
    const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });

    useEffect(() => {
        if (!targetIso) return;
        const target = new Date(targetIso).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = target - now;
            if (diff <= 0) {
                setState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
                return;
            }
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setState({ days, hours, minutes, seconds, done: false });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [targetIso]);

    return state;
}
