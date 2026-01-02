/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'light-gray': '#f9f9f9',
        'input-bg': '#e9e9e9',
        'text-muted': '#757575',
        'text-dark': '#464646',
        'dark-button': '#282828',
      },
      boxShadow: {
        'button': '0px 2px 5px 0px rgba(103,110,118,0.08),0px 0px 0px 1px rgba(103,110,118,0.16),0px 1px 1px 0px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
