const createThemeSlice = set => ({
  currentTheme: (() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark"
    }
    return "light"
  })(),
  setTheme: theme =>
    set(_ => ({
      currentTheme: theme
    }))
})

export default createThemeSlice
