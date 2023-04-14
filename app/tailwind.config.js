/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        richblack: "#030407",
        richblack2: "#0A0E18",
        richblack3: "#0F1524",
        brilliantazure: "#2FA1F9",
        brilliantazure2: "#025697",
        brilliantazure3: "#52B1FA",
        brilliantazure4: "#0877CD",
        babyblue: "#91CAF6",
        babyblue2: "#B7DCF8",
      },
    },
  },
  plugins: [],
};

// npx tailwindcss -i ./styles.css -o ./dist/output.css --watch
