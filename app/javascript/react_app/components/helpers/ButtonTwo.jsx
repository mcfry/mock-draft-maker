import React from "react"

export default function ButtonTwo({ handleClick, children, ...props }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn btn-sm text-sm bg-[#0e0c0a] text-white hover:bg-white hover:text-black rounded-none border-primary dark:bg-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-white"
      {...props}
    >
      {children}
    </button>
  )
}
