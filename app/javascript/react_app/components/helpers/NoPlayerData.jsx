import React from "react"
import PropTypes from "prop-types"

function NoPlayerData({ type }) {
  return (
    <div className="flex flex-col items-center justify-center w-[54rem] h-[27rem]">
      <p className="font-semibold">No {type} data for this player</p>
      <p>
        (If you think this player should have data, they may have been injured)
      </p>
    </div>
  )
}

NoPlayerData.propTypes = {
  type: PropTypes.string.isRequired
}

export default NoPlayerData
