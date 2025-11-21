/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#f9fafb', // Light gray instead of pure white
                surface: '#ffffff', // White
                surfaceHighlight: '#f3f4f6', // Light gray
                primary: '#8b5cf6', // Violet 500
                primaryHover: '#7c3aed', // Violet 600
                secondary: '#06b6d4', // Cyan 500
                textMain: '#111827', // Gray 900
                textMuted: '#6b7280', // Gray 500
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
