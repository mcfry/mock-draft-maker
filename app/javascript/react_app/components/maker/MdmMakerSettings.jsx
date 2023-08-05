import React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable"
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BoltIcon,
  VariableIcon
} from "@heroicons/react/20/solid"
import SortableTeam from "../helpers/SortableTeam"

import useStore from "../../store/store"

function MdmMakerSettings({ teamsMapping, setStage, pickData, setPickData }) {
  // Store State
  const [teams, setTeams] = useStore(state => [state.teams, state.setTeams])
  const [selected, setSelected] = useStore(state => [
    state.selected,
    state.setSelected
  ])
  const [speed, setSpeed] = useStore(state => [state.speed, state.setSpeed])
  const [needsVsValue, setNeedsVsValue] = useStore(state => [
    state.needsVsValue,
    state.setNeedsVsValue
  ])
  const [randomness, setRandomness] = useStore(state => [
    state.randomness,
    state.setRandomness
  ])
  const [draftRounds, setDraftRounds] = useStore(state => [
    state.draftRounds,
    state.setDraftRounds
  ])
  const addAlert = useStore(state => state.addAlert)

  const findIndex = (id, arr) => {
    for (const [index, val] of arr.entries()) {
      if (val.id === id) {
        return index
      }
    }
    return -1
  }

  // Activation constraint needed to fire onClick and other events
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

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
              {teams.map((team, index) => (
                <SortableTeam
                  key={`${team.id}_${index}`}
                  id={team.id}
                  team={team}
                  pick={team.first_pick || index + 1}
                  isSelected={team.id in selected}
                  handleClick={handleClick}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>

      <div className="divider divider-horizontal" />

      {/* Options Area */}
      <section className="flex flex-col items-center pt-2 pb-2 pr-8 w-[20rem] h-full">
        <div className="text-md pt-4">Settings</div>
        <div className="divider" />

        <div className="join join-vertical pt-4 pb-4">
          <div className="join-item text-sm pb-2">Number of Rounds</div>
          <select
            data-testid="numRounds"
            value={draftRounds}
            onChange={e => setDraftRounds(parseInt(e.currentTarget.value))}
            className="select select-sm select-bordered rounded-none w-[12rem]"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(rounds => (
              <option key={`rounds_${rounds.toString()}`} value={rounds}>
                {rounds}
              </option>
            ))}
          </select>
        </div>

        <div className="join join-vertical pt-4 pb-4">
          <div className="join-item flex items-center text-sm pb-2">
            <BoltIcon className="h-5 w-5" />
            &nbsp; Speed
          </div>
          <input
            data-testid="speed"
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={e => setSpeed(parseInt(e.currentTarget.value))}
            className="range range-xs"
          />
        </div>

        <div className="join join-vertical pt-4 pb-4">
          <div className="flex justify-between join-item text-sm pb-2">
            <div className="flex justify-items-start items-center">
              <ArrowLongLeftIcon className="h-5 w-5" />
              Needs
            </div>
            <div className="flex justify-items-end items-center">
              Positional Value
              <ArrowLongRightIcon className="h-5 w-5" />
            </div>
          </div>
          <input
            data-testid="needsVsPositional"
            type="range"
            min="10"
            max="100"
            value={needsVsValue}
            onChange={e => setNeedsVsValue(parseInt(e.currentTarget.value))}
            className="range range-xs"
          />
        </div>

        <div className="join join-vertical pt-4 pb-4">
          <div className="join-item flex items-center text-sm pb-2">
            <VariableIcon className="h-5 w-5" />
            &nbsp; Randomness
          </div>
          <input
            data-testid="randomness"
            type="range"
            min="10"
            max="100"
            value={randomness}
            onChange={e => setRandomness(parseInt(e.currentTarget.value))}
            className="range range-xs"
          />
        </div>

        <div className="mt-auto pb-12">
          <button
            data-testid="start-button"
            type="button"
            onClick={e => handleClick(e, "stageClick")}
            className="btn rounded-none"
          >
            Start
          </button>
        </div>
      </section>
    </>
  )

  // Handlers
  function handleDragEnd(event) {
    const { active, over } = event
    if (over && active && active.id !== over.id) {
      const oldIdx = findIndex(active.id, teams)
      const newIdx = findIndex(over.id, teams)

      // Swap teams in teams array and set the returned array
      setTeams(arrayMove(teams, oldIdx, newIdx))
    }
  }

  function handleClick(event, type) {
    event.preventDefault()
    const pickDataCopy = pickData

    if (type === "teamClick") {
      const idx = parseInt(event.currentTarget.id)

      if (idx !== -1) {
        if (idx in selected) {
          delete selected[idx]
          setSelected(selected)
        } else {
          setSelected({
            ...selected,
            [idx]: true
          })
        }
      }
    } else if (type === "stageClick") {
      if (Object.keys(selected).length > 0) {
        for (const [i, team] of Object.entries(teams)) {
          pickDataCopy[team.full_name][0] = teamsMapping[i]
        }

        setStage(2)
        setPickData(_ => ({
          ...pickDataCopy
        }))
      } else {
        addAlert({
          type: "error",
          message: "Must select a team!",
          time: 4000
        })
      }
    }
  }
}

export default MdmMakerSettings
