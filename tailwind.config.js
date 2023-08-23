/* eslint-disable */
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
  // Specify class to handle manually and will fetch system setting in codebase
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lofi: {
          ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
          secondary: "#111827",
          accent: "#dc2626",
          error: "#dc2626"
        }
      },
      {
        "dark-lofi": {
          ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
          accent: "#dc2626",
          error: "#dc2626",
          primary: "#ffffff",
          secondary: "#0d0d0d"
        }
      }
    ]
  },
  theme: {
    extend: {
      screens: {
        makermax: { max: "1310px" },
        makermin: { min: "1311px" }
      },
      fontFamily: {
        marker: ["Permanent Marker", "system-ui", "sans-serif"]
      }
    }
  }
}
