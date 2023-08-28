// External
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
import { CgArrowLongLeftL, CgArrowLongRightL } from "react-icons/cg"
import { HiBolt } from "react-icons/hi2"
import { HiVariable } from "react-icons/hi"

// Internal
import ButtonOne from "../helpers/ButtonOne"
import SortableTeam from "../helpers/SortableTeam"
import useStore from "../../store/store"

function MdmMakerSettings({
  teamsMapping,
  setTeamsMapping,
  setStage,
  pickData,
  setPickData,
  teamToImage
}) {
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
        <div className="pl-4 pt-8 pb-0 pr-0 w-[62rem] h-full">
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
                  teamToImage={teamToImage}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>

      <div className="divider divider-horizontal dark:before:bg-gray-100 dark:after:bg-gray-100" />

      {/* Options Area */}
      <section className="flex flex-col items-center pt-2 pb-2 pr-8 w-[20rem] h-full dark:text-gray-100">
        <div className="text-md pt-4">Settings</div>
        <div className="divider dark:before:bg-gray-100 dark:after:bg-gray-100" />

        <div className="join join-vertical pt-4 pb-4">
          <div className="join-item text-sm pb-2">Number of Rounds</div>
          <select
            data-testid="numRounds"
            value={draftRounds}
            onChange={e => setDraftRounds(parseInt(e.currentTarget.value))}
            className="select select-sm select-bordered dark:select-primary rounded-none w-[12rem] dark:bg-gray-500 dark:border-gray-100"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(rounds => (
              <option key={`rounds_${rounds.toString()}`} value={rounds}>
                {rounds}
              </option>
            ))}
          </select>
        </div>

        <div className="join join-vertical pt-4 pb-4 w-9/12">
          <div className="join-item flex items-center text-sm pb-2">
            <HiBolt className="h-5 w-5" />
            <span className="font-bold">&nbsp;Speed</span>
          </div>
          <input
            data-testid="speed"
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={e => setSpeed(parseInt(e.currentTarget.value))}
            className="range range-xs range-primary dark:range-secondary dark:[&::-webkit-slider-runnable-track]:bg-gray-200 dark:[&::-moz-range-track]:bg-gray-200 dark:[&::-ms-track]:bg-gray-200 dark:[&::-ms-fill-upper]:bg-gray-200 dark:[&::-ms-fill-lower]:bg-gray-200"
          />
        </div>

        <div className="join join-vertical pt-4 pb-4 w-9/12">
          <div className="flex justify-between join-item text-sm pb-2">
            <div className="flex justify-items-start items-center">
              <CgArrowLongLeftL className="h-5 w-5" />
              <span className="font-bold">&nbsp;Needs</span>
            </div>
            <div className="flex justify-items-end items-center">
              <span className="font-bold">Positional Value&nbsp;</span>
              <CgArrowLongRightL className="h-5 w-5" />
            </div>
          </div>
          <input
            data-testid="needsVsPositional"
            type="range"
            min="10"
            max="100"
            value={needsVsValue}
            onChange={e => setNeedsVsValue(parseInt(e.currentTarget.value))}
            className="range range-xs range-primary dark:range-secondary dark:[&::-webkit-slider-runnable-track]:bg-gray-200 dark:[&::-moz-range-track]:bg-gray-200 dark:[&::-ms-track]:bg-gray-200"
          />
        </div>

        <div className="join join-vertical pt-4 pb-4 w-9/12">
          <div className="join-item flex items-center text-sm pb-2">
            <HiVariable className="h-6 w-6 pt-0.5" />
            <span className="font-bold">&nbsp;Randomness</span>
          </div>
          <input
            data-testid="randomness"
            type="range"
            min="10"
            max="100"
            value={randomness}
            onChange={e => setRandomness(parseInt(e.currentTarget.value))}
            className="range range-xs range-primary dark:range-secondary dark:[&::-webkit-slider-runnable-track]:bg-gray-200 dark:[&::-moz-range-track]:bg-gray-200 dark:[&::-ms-track]:bg-gray-200"
          />
        </div>

        <div className="mt-auto pb-12">
          <ButtonOne
            data-testid="start-button"
            onClick={e => handleClick(e, "stageClick")}
          >
            Go to Draft
          </ButtonOne>
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

      const mapOldIdx = teams[oldIdx].first_pick - 1
      const mapNewIdx = teams[newIdx].first_pick - 1

      // Get new order for teams and picks map
      const newTeams = arrayMove(teams, oldIdx, newIdx)
      const newTeamsMapping = arrayMove(teamsMapping, mapOldIdx, mapNewIdx)

      const seen = {}
      let j = 0
      for (const [i, team] of newTeamsMapping.entries()) {
        // set the 'display pick' to first found in new pick map
        if (!(team in seen)) {
          seen[team] = true
          newTeams[j].first_pick = i + 1
          j += 1
        }
      }

      setTeams(newTeams)
      setTeamsMapping(_ => newTeamsMapping)
    }
  }

  function handleClick(event, type) {
    event.preventDefault()
    const pickDataCopy = { ...pickData }

    if (type === "teamClick") {
      const idx = event.currentTarget.id

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
        const newFirstPicks = {}
        for (const [i, team] of teamsMapping.entries()) {
          if (team in newFirstPicks) {
            newFirstPicks[team].push(i + 1)
          } else {
            newFirstPicks[team] = [i + 1]
          }
        }

        for (const [team, firstPicks] of Object.entries(newFirstPicks)) {
          pickDataCopy[team] = firstPicks.concat(
            pickDataCopy[team].slice(firstPicks.length)
          )
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
