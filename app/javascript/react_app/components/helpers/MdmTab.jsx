import React from "react"
import PropTypes from "prop-types"

import clsx from "clsx"

const MdmTab = React.memo(
  ({ handleClick, currentTab, tabName, mainTab, displayText, ...props }) => {
    return (
      <button
        type="button"
        onClick={e => handleClick(e, tabName)}
        className={clsx(
          "tab tab-lg text-white hover:bg-gray-500 dark:hover:bg-gray-500 dark:text-gray-100 focus:bg-gray-200 focus:dark:bg-gray-500 focus:dark:text-gray-100",
          {
            "bg-primary !text-gray-100 hover:bg-primary dark:bg-gray-900 dark:hover:bg-gray-900 border-box focus:bg-primary dark:focus:bg-gray-900":
              currentTab === tabName
          },
          {
            "bg-accent-back hover:!bg-accent focus:!bg-accent": mainTab
          },
          {
            "!bg-accent": mainTab && currentTab === tabName
          }
        )}
        {...props}
      >
        {displayText}
      </button>
    )
  }
)

MdmTab.defaultProps = {
  mainTab: false
}

MdmTab.propTypes = {
  handleClick: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  mainTab: PropTypes.bool,
  displayText: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired
}

export default MdmTab
