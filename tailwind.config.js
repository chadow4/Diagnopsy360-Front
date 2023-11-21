/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        purplebackround: '#1a042f',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
