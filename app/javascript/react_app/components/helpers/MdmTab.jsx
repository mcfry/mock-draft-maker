import React from "react"
import clsx from "clsx"

function MdmTab({ handleClick, currentTab, tabName, displayText }) {
  return (
    <button
      type="button"
      onClick={e => handleClick(e, tabName)}
      className={clsx(
        "tab tab-lg hover:bg-gray-400 hover:text-primary-content",
        {
          "bg-gray-600 border-box text-primary-content": currentTab === tabName
        }
      )}
    >
      {displayText}
    </button>
  )
}

export default MdmTab
