import React from "react"
import clsx from "clsx"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableTeam({ id, team, pick, isSelected, handleClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
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
        "flex justify-center items-center card w-full h-14 border-solid border-2 rounded-sm bg-base-100 font-semibold dark:bg-gray-500 dark:text-gray-100"
      )}
      onClick={e => handleClick(e, "teamClick")}
    >
      <span className="text-xs">
        {pick}: {team.full_name}
      </span>
    </button>
  )
}

export default SortableTeam
