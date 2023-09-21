import React from "react"
import clsx from "clsx"

function ButtonTwo({ handleClick, classNames, children, ...props }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "btn btn-sm text-sm bg-[#0e0c0a] text-white hover:bg-white hover:text-black rounded-none border-primary dark:bg-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-white focus:outline-accent",
        classNames
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default React.memo(ButtonTwo)
