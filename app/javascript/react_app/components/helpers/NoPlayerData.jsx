// External
import React from "react"

// Internal
import useStore from "../../store/store"
import ButtonTwo from "./ButtonTwo"

function NoPlayerData() {
  const setOuterTab = useStore(state => state.setOuterTab)

  return (
    <div className="flex flex-col items-center justify-center w-[62rem] h-full space-y-3">
      <span className="font-semibold">
        No player selected, or no meaningful data.
      </span>
      <ButtonTwo
        handleClick={_ => {
          setOuterTab("draft")
        }}
      >
        Back to Draft
      </ButtonTwo>
    </div>
  )
}

export default NoPlayerData
