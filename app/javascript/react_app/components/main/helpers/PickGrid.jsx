import React from "react"
import clsx from "clsx"

function PickGrid({ pickData, team, isCt, activeTrades, handleTradeClick }) {
  return (
    <div className="flex justify-center pt-2 w-[24rem]">
      <div className="grid grid-cols-7 gap-2">
        {pickData[team].map(pick => {
          let active = false
          if (team in activeTrades && activeTrades[team].includes(pick)) {
            active = true
          }

          return (
            <button
              type="button"
              key={`2024_tp_${pick.toString()}`}
              onClick={e =>
                handleTradeClick(e, isCt ? "currentTeam" : "tradePartner")
              }
              className={clsx(
                "flex justify-center items-center cursor-pointer bg-base-100 border-neutral border-solid p-2 border-2 hover:bg-primary hover:text-base-100",
                {
                  "bg-primary border-base-300 text-primary-content": active
                }
              )}
            >
              {pick}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PickGrid
