import React from "react"
import clsx from "clsx"

import useStore from "../../store/store"

function ThemeChanger() {
  const setContextTheme = useStore(state => state.setTheme)

  const setTheme = theme => {
    if (theme === "light") {
      localStorage.theme = "light"
      setContextTheme("light")
    } else if (theme === "dark") {
      localStorage.theme = "dark"
      setContextTheme("dark")
    }
  }

  return (
    <div className="flex justify-center items-center">
      <svg
        className={clsx(
          "h-6 w-6 pr-1",
          localStorage?.theme === "dark" ? "text-gray-400" : "text-gray-100"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <input
        type="checkbox"
        className="toggle"
        checked={localStorage?.theme === "dark"}
        onChange={e => setTheme(e.currentTarget.checked ? "dark" : "light")}
        aria-label="checkbox"
      />
      <span className="">
        <svg
          className={clsx(
            "h-6 w-6 pl-1",
            localStorage?.theme === "dark" ? "text-gray-100" : "text-gray-400"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </div>
  )
}

export default ThemeChanger
