/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        foreground: '#fafafa', // zinc-50
        primary: {
          DEFAULT: '#3b82f6', // blue-500 for sleek accent
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: '#18181b', // zinc-900
          foreground: '#fafafa',
        },
        border: '#27272a', // zinc-800
        muted: {
          DEFAULT: '#27272a', // zinc-800
          foreground: '#a1a1aa', // zinc-400
        },
      },
    },
  },
  plugins: [],
}
