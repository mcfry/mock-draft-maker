import React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import SortableTeam from "./helpers/SortableTeam"

const MdmMakerSettings = ({ teams, selected, setSelected, setTeams, setStage }) => {
 
    // Activation constraint needed to fire onClick and other events
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 1
        }
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    findIndex = (id, arr) => {
        for (let [index, val] of arr.entries()) {
            if (val.id === id) {
                return index
            }
        }
    
        return -1
    }

    function handleDragEnd(event) {
        const {active, over} = event
        if (active.id !== over.id) {
            setTeams((teams) => {
                const oldIdx = findIndex(active.id, teams)
                const newIdx = findIndex(over.id, teams)

                return arrayMove(teams, oldIdx, newIdx)
            })
        }
    }

    function handleClick(event, type) {
        console.log(event, type)
        if (type === 'teamClick') {
            let idx = parseInt(event.currentTarget.id)
            if (idx !== -1) {
                setSelected(prev => ({
                    ...prev,
                    [idx]: true
                }))
            }
        } else if (type === 'stageClick') {
            setStage(2)
        }
    }
  
    return (
        <>
            {/* Team Area */}
            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            >
                <div className="pl-4 pt-8 pb-0 pr-0 w-[54rem] h-full">
                    <div className="grid gap-4 grid-cols-4 grid-row-8">
                    <SortableContext items={teams}>
                        {teams.map((team, index) => {
                            return <SortableTeam 
                                key={team.id} 
                                id={team.id} 
                                team={team} 
                                pick={index}
                                isSelected={team.id in selected}
                                handleClick={handleClick}
                            />
                        })}
                    </SortableContext>
                    </div>
                </div>
            </DndContext>

            <div className="divider divider-horizontal"></div>

            {/* Options Area */}
            <div className="flex flex-col items-center pt-2 pb-2 pr-8 w-[20rem] h-full">
                <div className="text-md pt-4">Settings</div>
                <div className="divider"></div>

                <div className="join join-vertical pt-4 pb-4">
                    <div className="join-item text-sm pb-2">Speed</div>
                    <input type="range" min={0} max="100" defaultValue="80" className="range range-xs" />
                </div>

                <div className="join join-vertical pt-4 pb-4">
                    <div className="flex justify-between join-item text-sm pb-2">
                    <div className="flex justify-items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                        </svg>
                        Needs
                    </div>
                    <div className="flex justify-items-end">
                        Positional Value
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                    <input type="range" min={0} max="100" defaultValue="50" className="range range-xs" />
                </div>

                <div className="join join-vertical pt-4 pb-4">
                    <div className="join-item text-sm pb-2">Randomness</div>
                    <input type="range" min={0} max="100" defaultValue="10" className="range range-xs" />
                </div>

                <div className="mt-auto pb-28">
                    <button onClick={(e) => handleClick(e, 'stageClick')} className="btn">Start</button>
                </div>
            </div>
        </>
    )
}
  
  export default MdmMakerSettings