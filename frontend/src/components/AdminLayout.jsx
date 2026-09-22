import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-obsidian text-white">
            <header className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="text-sm font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-lava to-sunset-pink bg-clip-text text-transparent">
                        GLITZ <span className="text-white/40 font-semibold tracking-widest ml-1">ADMIN</span>
                    </Link>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}
