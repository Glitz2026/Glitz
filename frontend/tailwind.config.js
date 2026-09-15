/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Outfit', 'system-ui', 'sans-serif'],
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                obsidian: '#070609',
                surface: '#0F0D15',
                'surface-hover': '#171420',
                lava: {
                    DEFAULT: '#FF3300',
                    hover: '#FF5522',
                },
                sunset: {
                    purple: '#8A2BE2',
                    pink: '#E0115F',
                    magenta: '#C71585',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                'laser-sweep': {
                    '0%,100%': { transform: 'translateX(-100%) rotate(15deg)', opacity: '0' },
                    '50%': { transform: 'translateX(100%) rotate(15deg)', opacity: '0.4' },
                },
                'pulse-glow': {
                    '0%,100%': { boxShadow: '0 0 20px rgba(255,51,0,0.4), 0 0 40px rgba(255,51,0,0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(255,51,0,0.7), 0 0 60px rgba(255,51,0,0.4)' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'laser-sweep': 'laser-sweep 8s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
                'fade-up': 'fade-up 0.6s ease-out forwards',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
