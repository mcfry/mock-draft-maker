import React from "react"
import { GrPauseFill } from "react-icons/gr"

export default function CurrentlyPicking({ startOrPauseDraft }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full h-full">
      <span>Picking Players...</span>
      <span className="loading loading-spinner loading-lg" />
      <button
        type="button"
        className="btn btn-lg rounded-none"
        onClick={() => startOrPauseDraft()}
      >
        <GrPauseFill />
        &nbsp;Pause
      </button>
    </div>
  )
}
