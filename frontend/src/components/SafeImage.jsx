import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

/**
 * Drop-in replacement for <img>: on load failure (dead link, blocked domain,
 * flaky connection) it shows a styled placeholder instead of a broken-image
 * icon floating on a void, so a missing photo never reads as "the page is empty".
 */
export default function SafeImage({ src, alt = "", className = "", ...rest }) {
    const [failed, setFailed] = useState(false);

    useEffect(() => { setFailed(false); }, [src]);

    if (!src || failed) {
        return (
            <div className={`flex items-center justify-center bg-white/[0.04] border border-white/10 ${className}`} role="img" aria-label={alt}>
                <ImageOff className="w-8 h-8 text-white/25" strokeWidth={1.5} />
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}
