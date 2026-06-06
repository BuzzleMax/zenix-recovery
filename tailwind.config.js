/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        panel: '#161B26',
        border: '#2A3242',
        text: '#F8FAFC',
        emerald: '#00FF9D',
        cyan: '#00D9FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 157, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}
