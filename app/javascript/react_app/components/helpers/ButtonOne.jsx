import React from "react"
import clsx from "clsx"

export default function ButtonOne({
  handleClick,
  classNames,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "btn rounded-none hover:bg-gray-300 dark:hover:bg-gray-500 dark:hover:border-black focus:outline-accent",
        classNames
      )}
      {...props}
    >
      {children}
    </button>
  )
}
