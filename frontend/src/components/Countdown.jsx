import { useCountdown } from "../lib/useCountdown";

export default function Countdown({ targetIso, testIdPrefix = "countdown" }) {
    const { days, hours, minutes, seconds, done } = useCountdown(targetIso);

    if (done) {
        return (
            <div data-testid={`${testIdPrefix}-live`} className="text-lava text-xl font-black uppercase tracking-widest animate-pulse">
                Live Now
            </div>
        );
    }

    const cells = [
        { label: "Giorni", value: days },
        { label: "Ore", value: hours },
        { label: "Min", value: minutes },
        { label: "Sec", value: seconds },
    ];

    return (
        <div data-testid={`${testIdPrefix}-container`} className="flex gap-3 sm:gap-5">
            {cells.map((c) => (
                <div
                    key={c.label}
                    data-testid={`${testIdPrefix}-${c.label.toLowerCase()}`}
                    className="glass-card rounded-xl px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[80px] text-center"
                >
                    <div className="font-mono text-2xl sm:text-4xl font-black text-white tabular-nums">
                        {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-lava mt-1 font-semibold">
                        {c.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
