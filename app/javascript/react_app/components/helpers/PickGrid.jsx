import React from "react"
import PropTypes from "prop-types"

import clsx from "clsx"

function PickGrid({
  year,
  pickData,
  team,
  isCt,
  activeTrades,
  handleTradeClick
}) {
  return (
    <>
      <div className="flex justify-center border-b-2 pt-2 dark:text-gray-900 dark:border-b-gray-900">
        {year}
      </div>

      <div className="flex justify-center pt-2 w-[24rem]">
        <div className="grid grid-cols-7 gap-2">
          {pickData[team].map((pick, index) => {
            let active = false
            if (team in activeTrades && activeTrades[team].includes(pick)) {
              active = true
            }

            return (
              <button
                data-testid={`${
                  isCt ? "currentTeam" : "tradePartner"
                }_pick_${index}`}
                type="button"
                key={`2024_tp_${pick.toString()}`}
                onClick={e =>
                  handleTradeClick(e, isCt ? "currentTeam" : "tradePartner")
                }
                className={clsx(
                  "flex justify-center items-center cursor-pointer bg-base-100 dark:bg-gray-100 border-neutral border-solid p-2 border-2 hover:bg-primary dark:hover:bg-gray-900 hover:text-base-100",
                  {
                    "bg-primary dark:bg-gray-900 border-base-300 text-primary-content":
                      active
                  }
                )}
              >
                {pick}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

PickGrid.propTypes = {
  pickData: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired,
  isCt: PropTypes.bool.isRequired,
  activeTrades: PropTypes.object.isRequired,
  handleTradeClick: PropTypes.func.isRequired
}

export default PickGrid
