module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      new: 'rgba(149, 157, 165, 0.2) 0px 4px 14px'
    },
  },
  variants: {
    extend: {},
    display: ['group-hover']
  },
  plugins: [],
}
