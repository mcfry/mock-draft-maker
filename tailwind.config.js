module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.jsx",
    "./app/javascript/**/*.ts",
    "./app/javascript/**/*.tsx"
  ],
  // eslint-disable-next-line
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi", "light", "dark", "fantasy"]
  },
  theme: {
    extend: {
      screens: {
        makermax: { max: "1175px" },
        makermin: { min: "1176px" }
      }
    }
  }
}
