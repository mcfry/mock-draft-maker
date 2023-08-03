import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Fuse from "fuse.js"
import clsx from "clsx"

import MdmTradeTab from "./maker_tabs/MdmTradeTab"
import MdmDraftTab from "./maker_tabs/MdmDraftTab"
import MdmAnalysisTab from "./maker_tabs/MdmAnalysisTab"
import MdmYourPicksTab from "./maker_tabs/MdmYourPicksTab"
import MdmTab from "../helpers/MdmTab"
import useStore from "../../store/store"

import needsData from "./maker_static_data/needs_2024.json"
import positionalData from "./maker_static_data/positional_value.json"

function MdmMakerDraft({ pickData, setPickData, orderedPicks, setStage }) {
  const navigate = useNavigate()

  // Local State
  const [players, setPlayers] = useState([])
  const [tab, setTab] = useState("trade")
  const [draftRunning, setDraftRunning] = useState(false)
  const [draftState, setDraftState] = useState({})
  const [userPicking, setUserPicking] = useState(false)
  const [search, setSearch] = useState("")
  const [localPlayers, setLocalPlayers] = useState(players)
  const [preselectedPick, setPreselectedPick] = useState(null)
  const [viewRound, setViewRound] = useState(0)
  const [isMouseOverPicks, setIsMouseOverPicks] = useState(false)
  const [playerInAnalysis, setPlayerInAnalysis] = useState(null)
  const [playersLoaded, setPlayersLoaded] = useState(false)

  // Store State
  const teams = useStore(state => state.teams)
  const selected = useStore(state => state.selected)
  const speed = useStore(state => state.speed)
  const needsVsValue = useStore(state => state.needsVsValue)
  const randomness = useStore(state => state.randomness)
  const draftRounds = useStore(state => state.draftRounds)
  const [yourPicks, setYourPicks] = useStore(state => [
    state.yourPicks,
    state.setYourPicks
  ])

  const [selectedTeams, setSelectedTeams] = useState(
    teams.filter(team => team.id in selected)
  )

  const pickModal = useRef(null)
  const draftInterval = useRef(undefined)
  const fuse = useRef(
    new Fuse(players, {
      keys: ["full_name"],
      threshold: 0.3
    })
  )

  const pickPlayer = (
    playerToAdd,
    total = Object.keys(draftState).length,
    manualPick = false
  ) => {
    if (manualPick === true) {
      if (!(orderedPicks[total].full_name in yourPicks))
        yourPicks[orderedPicks[total].full_name] = []

      const playerToAddCopy = {
        ...playerToAdd
      }
      playerToAddCopy.pickedAt = total + 1
      yourPicks[orderedPicks[total].full_name].push(playerToAddCopy)

      setYourPicks(yourPicks)
    }

    setDraftState(prev => ({
      ...prev,
      [total + 1]: playerToAdd
    }))

    // Remove from possible picks
    removePlayer(playerToAdd)

    // Reset preselected
    setPreselectedPick(_ => null)

    // Remove pick data (trades)
    const oldPd = pickData[orderedPicks[total].full_name]
    setPickData(prev => ({
      ...prev,
      [orderedPicks[total].full_name]: oldPd.slice(1)
    }))

    setViewRound(parseInt(total / 32))

    const elementId = `${orderedPicks[total].name}_${total}`
    if (!isMouseOverPicks)
      document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" })
  }

  const removePlayer = playerToRemove => {
    const idx = players.indexOf(playerToRemove)
    setPlayers(_ => players.slice(0, idx).concat(players.slice(idx + 1)))
  }

  const createDraftInterval = () =>
    setInterval(() => {
      const total = Object.keys(draftState).length
      const teamPicking = orderedPicks[total].full_name
      const needs = needsData[teamPicking]
      const needsHash = {}
      for (const need of needs) {
        needsHash[need] = true
      }

      const possibleNeeds = []
      if (needs.length > 0) {
        let i = 0
        for (const player of players) {
          if (player.position in needsHash) possibleNeeds.push(player)
          if (possibleNeeds.length >= 5) break

          i += 1
          if (i >= 15) break
        }
      }

      // TODO: Allow needs to have weighted value selection
      // i.e. if First pick wants a QB, don't hard cap them at 2 choices like
      // in possiblePositional.
      const possiblePositional = []
      let i = 0
      for (const player of players) {
        if (!(player.position in positionalData)) console.log(player)

        possiblePositional.push([player, positionalData[player.position]])

        i += 1
        if (
          i >= (total + 1) * 2 * (randomness / 10 / 2) ||
          i >= 5 * (randomness / 10)
        )
          break
      }
      possiblePositional.sort((a, b) => b[1] - a[1]) // reverse

      const roll = parseInt(Math.random() * 10)
      if (possibleNeeds.length > 0 && roll * 10 < needsVsValue) {
        const curPick = parseInt(Math.random() * possibleNeeds.length)

        pickPlayer(possibleNeeds[curPick], total)
      } else {
        // cumulative dist func to get weighted arr
        const weighted = possiblePositional.map(
          (
            sum => value =>
              (sum += value[1])
          )(0)
        )

        const min = weighted[0]
        const max = weighted[weighted.length - 1]
        const weightedPick = Math.random() * (max - min) + min
        const curPick = weighted.findIndex(el => el >= weightedPick)

        pickPlayer(possiblePositional[curPick][0], total)
      }
    }, 1000 / (speed / 10))

  const startOrPauseDraft = () => {
    setDraftRunning(prev => !prev)
  }

  const forceNewIntervalAndContinue = () => {
    draftInterval.current = createDraftInterval()
    setUserPicking(_ => false)
    setDraftRunning(_ => true)
    setViewRound(parseInt(Object.keys(draftState).length / 32))

    return () => clearInterval(draftInterval.current)
  }

  // Lifecycle Hooks
  useEffect(() => {
    const url = "/api/v1/players/index"
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(res => {
        console.log(res)
        setPlayersLoaded(false)
        setPlayers(res)
      })
      .catch(() => navigate("/"))
  }, [])

  useEffect(() => {
    const total = Object.keys(draftState).length

    // TODO: update with actual number of picks in round (variable based on comp picks)
    // json file with number of picks in each round
    if (total < draftRounds * 32) {
      // stop on selected team, keep draft running
      const picking = orderedPicks[total]
      if (draftRunning === true && !selectedTeams.includes(picking)) {
        draftInterval.current = createDraftInterval()
        setUserPicking(_ => false)
      } else if (draftRunning === true) {
        setUserPicking(_ => true)
        setTab("draft")
      }

      setViewRound(parseInt(total / 32))
    } else {
      setStage(3)
    }

    return () => clearInterval(draftInterval.current)
  }, [draftState, draftRunning])

  useEffect(() => {
    if (search !== "") {
      setLocalPlayers(
        fuse.current.search(search).map(searchItem => searchItem.item)
      )
    } else {
      setLocalPlayers(players)
    }
  }, [search])

  useEffect(() => {
    fuse.current.setCollection(players)

    if (search !== "") {
      setLocalPlayers(
        fuse.current.search(search).map(searchItem => searchItem.item)
      )
    } else {
      setLocalPlayers(players)
    }
  }, [players])

  // not 32 picks in each round
  const currentPickIndex = Object.keys(draftState).length
  const currentRound = parseInt(currentPickIndex / 32)
  const roundStart = viewRound * 32
  const roundEnd = Math.min(roundStart + 32, 256)

  return (
    <>
      {/* PMenu */}
      <div className="overflow-x-hidden overflow-y-auto border-r-2">
        <ul
          onFocus={() => setIsMouseOverPicks(true)}
          onBlur={() => setIsMouseOverPicks(false)}
          onMouseOver={() => setIsMouseOverPicks(true)}
          onMouseOut={() => setIsMouseOverPicks(false)}
          className="menu bg-base-200 w-[20rem] p-0 [&_li>*]:rounded-none divide-y"
        >
          <li className="dropdown dropdown-bottom sticky top-0 z-50">
            <button
              type="button"
              tabIndex={0}
              className="btn text-2xl w-full !bg-neutral-200 hover:!bg-neutral-300"
            >
              Round {viewRound + 1}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {[...Array(draftRounds)].map((_, index) => (
                <li key={`dr_${index.toString()}`}>
                  <button
                    tabIndex={0}
                    type="button"
                    onClick={e => {
                      document.activeElement?.blur()

                      return setViewRound(parseInt(e.currentTarget.value))
                    }}
                    value={index}
                  >
                    Round {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          {/* List of Picks */}
          {orderedPicks.slice(roundStart, roundEnd).map((team, index) => {
            const actualIndex = roundStart + index

            return currentPickIndex >= actualIndex + 1 ? (
              <li
                id={`${team.name}_${actualIndex.toString()}`}
                key={`${team.name}_${actualIndex.toString()}`}
              >
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className={clsx("text-sm", {
                      "text-info": team.id in selected
                    })}
                    onClick={e =>
                      handleAnalyzeClick(e, draftState[actualIndex + 1])
                    }
                  >
                    {team.name}: {draftState[actualIndex + 1].full_name} (
                    {draftState[actualIndex + 1].position})
                  </button>
                </div>
              </li>
            ) : (
              <li
                id={`${team.name}_${actualIndex.toString()}`}
                key={`${team.name}_${actualIndex.toString()}`}
              >
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    className={clsx(
                      "text-lg",
                      team.id in selected
                        ? orderedPicks[Object.keys(draftState).length].id ===
                          team.id
                          ? "text-warning"
                          : "text-info"
                        : ""
                    )}
                  >
                    {team.name}: {actualIndex + 1}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Trade Stuff + PInfo */}
      <div className="flex flex-col">
        <div className="navbar bg-primary text-primary-content justify-between">
          <div className="navbar w-max">
            {!userPicking && (
              <button
                type="button"
                onClick={startOrPauseDraft}
                className="btn rounded-none"
              >
                {draftRunning ? "Pause" : "Start"}
              </button>
            )}

            <div>&nbsp;&nbsp;&nbsp;</div>

            <div className="flex flex-col p-2 bg-primary-content rounded text-primary">
              <span className="countdown font-mono text-xl">
                <span style={{ "--value": currentRound + 1 }} />
              </span>
              <span className="text-xs">Round</span>
            </div>

            <div>&nbsp;&nbsp;</div>

            <div className="flex flex-col p-2 bg-primary-content rounded text-primary">
              <span className="countdown font-mono text-xl">
                {currentPickIndex + 1}
              </span>
              <span className="text-xs">Pick</span>
            </div>
          </div>

          {userPicking && (
            <div className="flex justify-center items-center h-full w-full">
              <div className="text-md font-bold text-warning whitespace-nowrap animate-pulse">
                You are picking (
                {orderedPicks[Object.keys(draftState).length].name})
              </div>
            </div>
          )}

          <div className="flex justify-end w-max">
            <div className="flex-none gap-2">
              <div className="form-control pl-2 pr-4">
                <input
                  value={search}
                  onChange={e => {
                    setTab("draft")
                    setSearch(e.target.value)
                  }}
                  name="search"
                  type="text"
                  placeholder="Search"
                  className="input input-bordered rounded-none w-24 text-primary md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="tabs border-b-2 border-t-2">
          <MdmTab
            handleClick={e => handleClick(e, "trade")}
            currentTab={tab}
            tabName="trade"
            displayText="Trade"
          />
          <MdmTab
            handleClick={e => handleClick(e, "draft")}
            currentTab={tab}
            tabName="draft"
            displayText="Draft a Player"
          />
          <MdmTab
            handleClick={e => handleClick(e, "analysis")}
            currentTab={tab}
            tabName="analysis"
            displayText={
              <>
                Analysis
                {playerInAnalysis?.full_name ? (
                  <span className="font-semibold">
                    &nbsp;({playerInAnalysis.full_name})
                  </span>
                ) : (
                  ""
                )}
              </>
            }
          />
          <MdmTab
            handleClick={e => handleClick(e, "your-picks")}
            currentTab={tab}
            tabName="your-picks"
            displayText="Your Picks"
          />
        </div>

        <div className="flex justify-evenly w-[54rem] h-full">
          {tab === "trade" && (
            <MdmTradeTab
              startOrPauseDraft={startOrPauseDraft}
              teams={teams}
              selected={selected}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
              pickData={pickData}
              setPickData={setPickData}
              draftRunning={draftRunning}
              userPicking={userPicking}
              setUserPicking={setUserPicking}
              currentPickIndex={currentPickIndex}
              forceNewIntervalAndContinue={forceNewIntervalAndContinue}
            />
          )}
          {tab === "draft" && (
            <MdmDraftTab
              localPlayers={localPlayers}
              preselectedPick={preselectedPick}
              setPreselectedPick={setPreselectedPick}
              userPicking={userPicking}
              pickModal={pickModal}
              pickPlayer={pickPlayer}
              handleAnalyzeClick={handleAnalyzeClick}
            />
          )}
          {tab === "analysis" && (
            <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
          )}
          {tab === "your-picks" && <MdmYourPicksTab yourPicks={yourPicks} />}
        </div>
      </div>
    </>
  )

  // Handlers
  function handleClick(event, type) {
    event.preventDefault()

    setTab(type)
  }

  function handleAnalyzeClick(event, player) {
    event.preventDefault()
    event.stopPropagation()

    setPlayerInAnalysis(player)
    setTab("analysis")
  }
}

export default MdmMakerDraft
