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
        'outline': '0px 0px 0px 2px #333333,1px 1px 0px 2px #333333,2px 2px 0px 2px #333333,3px 3px 0px 2px #333333,4px 4px 0px 2px #333333,5px 5px 0px 2px #333333',
        'outline-dark': '0px 0px 0px 2px #ffffff,1px 1px 0px 2px #ffffff,2px 2px 0px 2px #ffffff,3px 3px 0px 2px #ffffff,4px 4px 0px 2px #ffffff,5px 5px 0px 2px #ffffff',
        'outline-down': '0px 4px 6px 1px #888888',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

