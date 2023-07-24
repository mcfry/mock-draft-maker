module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    './app/javascript/**/*.ts',
    './app/javascript/**/*.tsx'
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['lofi', 'light', 'dark', 'fantasy'],
  }
}
