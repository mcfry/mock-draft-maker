import React from "react"
import clsx from "clsx"

function TradeValue({ tradeValue }) {
  return (
    <>
      <div
        className={clsx(
          "pt-4 text-success transition-all duration-300 ease-in",
          tradeValue > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        {tradeValue > 0 && <>Trade Value: {tradeValue}</>}
      </div>
      <div
        className={clsx(
          "text-error transition-all duration-300 ease-in",
          tradeValue < 0 ? "opacity-100" : "opacity-0"
        )}
      >
        {tradeValue < 0 && <>Trade Value: {tradeValue}</>}
      </div>
    </>
  )
}

export default TradeValue
