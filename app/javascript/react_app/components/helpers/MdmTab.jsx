import React from "react"
import PropTypes from "prop-types"

import clsx from "clsx"

const MdmTab = React.memo(
  ({ handleClick, currentTab, tabName, displayText }) => {
    return (
      <button
        type="button"
        onClick={e => handleClick(e, tabName)}
        className={clsx(
          "tab tab-lg hover:bg-gray-400 hover:text-primary-content",
          {
            "bg-gray-600 border-box text-primary-content":
              currentTab === tabName
          }
        )}
      >
        {displayText}
      </button>
    )
  }
)

MdmTab.propTypes = {
  handleClick: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  displayText: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired
}

export default MdmTab
