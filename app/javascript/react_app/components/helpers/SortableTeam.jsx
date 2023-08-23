// External
import React from "react"
import clsx from "clsx"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { RiDraggable } from "react-icons/ri"

function SortableTeam({
  id,
  team,
  pick,
  isSelected,
  handleClick,
  teamToImage
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const convertToSnakeCase = inputString => {
    return inputString.toLowerCase().replace(/\s+/g, "_")
  }

  return (
    <button
      type="button"
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        { "border-accent": isSelected === true },
        "flex justify-center items-center card w-full h-14 border-solid border-2 rounded-sm bg-base-100 font-semibold dark:bg-gray-500 dark:text-gray-100 glass"
      )}
      onClick={e => handleClick(e, "teamClick")}
    >
      <span className="flex items-center w-full">
        <RiDraggable className="flex-[1]" />
        <span className="text-xs flex flex-col justify-center flex-[6]">
          <span className="text-lg">Pick {pick}</span>
          <span>{team.full_name}</span>
        </span>
        <img
          src={teamToImage[convertToSnakeCase(team.full_name)]}
          alt={team.full_name}
          className="flex-[1] h-7 w-7 mr-1"
        />
      </span>
    </button>
  )
}

export default SortableTeam
