import React from "react"
import clsx from "clsx"

import useStore from "../../store/store"

function NoPlayerData() {
  const setOuterTab = useStore(state => state.setOuterTab)

  return (
    <div className="flex flex-col items-center justify-center w-[62rem] h-full space-y-3">
      <span className="font-semibold">
        No player selected, or no meaningful data.
      </span>
      <button
        type="button"
        className={clsx(
          "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-[#0e0c0a] dark:bg-gray-600 text-primary-content text-sm"
        )}
        onClick={_ => {
          setOuterTab("draft")
        }}
      >
        Back to Draft
      </button>
    </div>
  )
}

export default NoPlayerData
