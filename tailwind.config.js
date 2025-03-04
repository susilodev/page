const typography = require("@tailwindcss/typography");

module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/css/custom.css", // Tambahkan path ke file custom.css
    "./themes/hugoplate/layouts/**/*.html", // Tambahkan path themes
    "./themes/hugoplate/assets/css/**/*.css", // Tambahkan path assets themes
    "./assets/css/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
