/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        colors: {
            hacker: {
                DEFAULT: '#00FF41',
                dark: '#003B00',
                dim: '#008F11',
            }
        },
        animation: {
            'glitch': 'glitch 1s linear infinite',
            'scanline': 'scanline 8s linear infinite',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            glitch: {
                '0%, 100%': { transform: 'translate(0)' },
                '33%': { transform: 'translate(-2px, 2px)' },
                '66%': { transform: 'translate(2px, -2px)' },
            },
            scanline: {
                '0%': { transform: 'translateY(-100%)' },
                '100%': { transform: 'translateY(100%)' },
            }
        }
    },
  },
  plugins: [],
}
