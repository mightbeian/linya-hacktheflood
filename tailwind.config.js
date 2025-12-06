/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 600: '#1B4D3E' },
        secondary: { 400: '#D4A574' },
        accent: { 400: '#E8B931' },
        danger: { 500: '#C54B3C' }
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}