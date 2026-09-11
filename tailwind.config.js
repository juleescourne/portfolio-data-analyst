/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Neutres légèrement biaisés vers l'accent : un gris parfaitement
                // neutre donne une impression de palette non choisie.
                paper: '#f6f8f6',
                surface: '#ffffff',
                raised: '#eef2ef',
                ink: '#141a19',
                'ink-2': '#3b4644',
                muted: '#626d6a',
                line: '#dde3dd',
                'line-soft': '#e9eee9',
                accent: '#0d5e63',
                'accent-dark': '#0a4a4e',
                'accent-soft': '#e2eeed',
                signal: '#9c3327',
                'signal-soft': '#f4e2de',
                ok: '#3d6a38',
                'ok-soft': '#e2ece0',
            },
            fontFamily: {
                sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
                display: ['Newsreader', 'Georgia', 'Times New Roman', 'serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            maxWidth: {
                prose: '68ch',
            },
        },
    },
    plugins: [],
}
