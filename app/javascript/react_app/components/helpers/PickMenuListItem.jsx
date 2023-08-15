import React from "react"
import clsx from "clsx"

import useStore from "../../store/store"

function PickMenuListItem({
  team,
  actualIndex,
  handleClick,
  draftState,
  pickedYet
}) {
  const selected = useStore(state => state.selected)

  return (
    <li
      id={`${team.name}_${actualIndex.toString()}`}
      className="scroll-mt-[10px]"
    >
      <button
        type="button"
        className={clsx(
          "flex justify-center items-center dark:hover:bg-gray-700",
          {
            "dark:bg-gray-700": team.id in selected
          }
        )}
        onClick={handleClick}
      >
        {pickedYet ? (
          <div
            className={clsx("text-sm dark:text-gray-100", {
              "text-accent dark:text-accent": team.id in selected
            })}
          >
            <span className="font-semibold">{team.name}:</span>{" "}
            {draftState[actualIndex + 1].full_name} (
            {draftState[actualIndex + 1].position})
          </div>
        ) : (
          <div
            className={clsx(
              "text-lg dark:text-gray-100",
              team.id in selected ? "text-accent dark:text-accent" : ""
            )}
          >
            {team.name}: {actualIndex + 1}
          </div>
        )}
      </button>
    </li>
  )
}

export default PickMenuListItem
