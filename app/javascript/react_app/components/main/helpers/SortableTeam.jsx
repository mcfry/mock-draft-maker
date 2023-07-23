import React from 'react'
import classNames from 'classnames'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

const SortableTeam = ({ id, team, pick, isSelected, handleClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            id={id}
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className={classNames({"border-primary": isSelected === true}, "flex justify-center items-center card w-full h-12 border-solid border-2 rounded-sm bg-base-100")}
            onClick={(e) => handleClick(e, 'teamClick')}
        >
            <span className="text-xs">{pick}: {team.full_name}</span>
        </div>
    )
}

export default SortableTeam