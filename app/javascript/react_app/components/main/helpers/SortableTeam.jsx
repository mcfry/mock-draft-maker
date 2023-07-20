import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const SortableTeam = ({ id, team, pick, isSelected, handleClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div
            id={id}
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners} 
            className={classNames((isSelected === true ? "border-primary " : "") + "flex justify-center items-center card w-full h-12 border-solid border-2 rounded-sm bg-base-100")}
            onClick={(e) => handleClick(e, 'teamClick')}
        >
            <span className="text-xs">{pick}: {team.city} {team.name}</span>
        </div>
    );
}

export default SortableTeam