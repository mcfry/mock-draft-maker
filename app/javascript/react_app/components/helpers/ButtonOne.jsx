import React from "react"

export default function ButtonOne({ handleClick, children, ...props }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn rounded-none hover:bg-gray-300 dark:hover:bg-gray-500 dark:hover:border-black"
      {...props}
    >
      {children}
    </button>
  )
}
