import React from "react"
import clsx from "clsx"

import useStore from "../../store/store"

function PickMenuListItem({
  team,
  actualIndex,
  handleClick,
  pickedYet,
  lastPick,
  teamToImage
}) {
  const selected = useStore(state => state.selected)
  const draftState = useStore(state => state.draftState)

  const convertToSnakeCase = inputString => {
    return inputString.toLowerCase().replace(/\s+/g, "_")
  }

  return (
    <li
      id={`${team.name}_${actualIndex.toString()}`}
      className={clsx("scroll-mt-[10px]", {
        "!border-b-2 !border-b-accent": lastPick
      })}
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
            <span className="flex justify-center items-center space-x-2">
              <span className="font-semibold">{team.name}:</span>
              <span>{draftState[actualIndex + 1].full_name}</span>
              <span>({draftState[actualIndex + 1].position})</span>
            </span>
          </div>
        ) : (
          <div
            className={clsx(
              "flex flex-col justify-center items-center text-lg dark:text-gray-100",
              team.id in selected ? "text-accent dark:text-accent" : ""
            )}
          >
            <span className="flex space-x-2">
              <img
                src={teamToImage[convertToSnakeCase(team.full_name)]}
                className="h-6 w-6"
                alt={team.full_name}
              />
              <span>{team.name}</span>
              <span>-</span>
              <span>Pick {actualIndex + 1}</span>
            </span>
          </div>
        )}
      </button>
    </li>
  )
}

export default PickMenuListItem
