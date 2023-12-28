/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'sm': '25%',
        'md': '50%',
        'lg': '75%',
        'full': '100%',
      },
      minHeight: {
        md: '1rem',
      },
      boxShadow: {
        'outline': '3px 3px 6px 2px #999999',
        'outline-down': '0px 4px 6px 1px #888888',
      }
    },
  },
  plugins: [],
}

