// External
import React, { useState, useEffect, useRef } from "react"
import Fuse from "fuse.js"
import { IoMdSwap } from "react-icons/io"
import { TbAnalyze } from "react-icons/tb"
import { GiAmericanFootballPlayer } from "react-icons/gi"
import { PiUsersThree } from "react-icons/pi"
import { GrPauseFill, GrResume, GrPlayFill } from "react-icons/gr"
import { driver } from "driver.js"

// Internal
import MdmTradeTab from "./maker_tabs/MdmTradeTab"
import MdmDraftTab from "./maker_tabs/MdmDraftTab"
import MdmPickStatsTab from "./maker_tabs/MdmPickStatsTab"
import MdmAnalysisTab from "./maker_tabs/MdmAnalysisTab"
import MdmYourPicksTab from "./maker_tabs/MdmYourPicksTab"
import MdmTab from "../helpers/MdmTab"
import ButtonOne from "../helpers/ButtonOne"
import PickMenuListItem from "../helpers/PickMenuListItem"
import DownArrowSvg from "../helpers/svgs/DownArrowSvg"
import useStore from "../../store/store"

// Json
import needsData from "./maker_static_data/needs_2024.json"
import positionalData from "./maker_static_data/positional_value.json"

function MdmMakerDraft({
  pickData,
  setPickData,
  orderedPicks,
  setStage,
  players,
  setPlayers,
  playersLoaded,
  teamToImage
}) {
  // ---------------
  // - Local State -
  // ---------------
  const [draftRunning, setDraftRunning] = useState(false)
  const [draftState, setDraftState] = useState({})
  const [userPicking, setUserPicking] = useState(false)
  const [search, setSearch] = useState("")
  const [localPlayers, setLocalPlayers] = useState(players)
  const [preselectedPick, setPreselectedPick] = useState(null)
  const [isMouseOverPicks, setIsMouseOverPicks] = useState(false)
  const [pickStatsTeam, setPickStatsTeam] = useState(null)
  const [pickStatsTeamIndex, setPickStatsTeamIndex] = useState(null)
  const [playerInAnalysis, setPlayerInAnalysis] = useState(null)
  const [positionSelect, setPositionSelect] = useState("default")

  // ---------------
  // - Store State -
  // ---------------
  const [viewRound, setViewRound] = useStore(state => [
    state.viewRound,
    state.setViewRound
  ])
  const [outerTab, setOuterTab] = useStore(state => [
    state.outerTab,
    state.setOuterTab
  ])
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
  const addAlert = useStore(state => state.addAlert)

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

  // -----------
  // - Helpers -
  // -----------
  const pickPlayer = (
    playerToAdd,
    total = Object.keys(draftState).length,
    manualPick = false
  ) => {
    if (manualPick === true) {
      const newYourPicks = { ...yourPicks }
      if (!(orderedPicks[total].full_name in newYourPicks))
        newYourPicks[orderedPicks[total].full_name] = []

      const playerToAddCopy = {
        ...playerToAdd
      }
      playerToAddCopy.pickedAt = total + 1
      newYourPicks[orderedPicks[total].full_name].push(playerToAddCopy)

      setYourPicks(newYourPicks)
    }

    setDraftState(prev => ({
      ...prev,
      [total + 1]: playerToAdd
    }))

    // Set analysis team automatically
    setPickStatsTeam(orderedPicks[total + 1])
    setPickStatsTeamIndex(total + 1)

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
    }, 1000 / (speed / 4))

  const startOrPauseDraft = () => {
    if (draftRunning === false) {
      setOuterTab("trade")
    }

    setDraftRunning(prev => !prev)
  }

  const forceNewIntervalAndContinue = () => {
    draftInterval.current = createDraftInterval()
    setUserPicking(_ => false)
    setDraftRunning(_ => true)
    setViewRound(parseInt(Object.keys(draftState).length / 32))

    return () => clearInterval(draftInterval.current)
  }

  const filterPlayers = (setCollection = false) => {
    // Edit csv and reseed, remove erroneous from positionalData
    // G/C/OL -> OL
    //
    let newPlayers = players
    if (positionSelect !== "ALL" && positionSelect !== "default") {
      newPlayers = players.filter(player => player.position === positionSelect)
    }

    if (setCollection === true) fuse.current.setCollection(newPlayers)

    if (search !== "") {
      const searchedPlayers = searchPlayers()
      if (searchedPlayers) {
        setLocalPlayers(searchedPlayers)
      } else {
        addAlert({
          type: "error",
          message: "Error searching"
        })
        setLocalPlayers(newPlayers)
      }
    } else {
      setLocalPlayers(newPlayers)
    }
  }

  const guidedTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#main-draft-nav__draft-info",
          popover: {
            title: "Main Draft Controls",
            description:
              "From here you can start and pause the draft, as well as obtain real-time information on the current draft round and pick number.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#main-draft-nav__draft-filters",
          popover: {
            title: "Draft Filters",
            description:
              "Here, you can effortlessly filter players by their positions and conduct quick searches by their names.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#draft-tabs__trade",
          popover: {
            title: "Trade Tab",
            description:
              "From here you can trade picks from your selected teams to any other team.\nTrade values are based on the 2024 Rich Hill model. If you think the trade values suck, at least shoot him first.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#draft-tabs__draft",
          popover: {
            title: "Draft Tab",
            description: "The primo tab. Draft players here.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#draft-tabs__your-picks",
          popover: {
            title: "Your Picks Tab",
            description:
              "Here you can view your amazing draft that everybody, and I mean everybody, should copy.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#draft-tabs__pick-stats",
          popover: {
            title: "Team Stats Tab",
            description:
              "Here you can view what all the less-intelligent fans are picking.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#draft-tabs__analysis",
          popover: {
            title: "Analysis Tab",
            description:
              "Here, you can access comprehensive player statistics to help you make your choice.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#picks-menu",
          popover: {
            title: "Picks menu",
            description:
              "Here, you'll find a comprehensive, clickable list of every team and their associated draft picks.",
            side: "left",
            align: "start"
          }
        },
        {
          element: "#picks-menu__round-select",
          popover: {
            title: "Round select",
            description:
              "To reveal upcoming rounds, simply click here, or click back to view players chosen in previous rounds.\nRest assured, this feature will seamlessly update as the draft unfolds.",
            side: "left",
            align: "start"
          }
        }
      ],
      onHighlightStarted: (_, step) => {
        if (step.element === "#draft-tabs__trade") {
          setOuterTab("trade")
        } else if (step.element === "#draft-tabs__draft") {
          setOuterTab("draft")
        } else if (step.element === "#draft-tabs__your-picks") {
          setOuterTab("your-picks")
        } else if (step.element === "#draft-tabs__pick-stats") {
          setOuterTab("pick-stats")
        } else if (step.element === "#draft-tabs__analysis") {
          setOuterTab("analysis")
        }
      },
      onDestroyStarted: () => {
        localStorage.setItem("draftTourCompleted", "true")
        setOuterTab("draft")
        driverObj.destroy()
      }
    })

    driverObj.drive()
  }

  const searchPlayers = () => {
    return fuse.current.search(search).map(searchItem => searchItem.item)
  }

  // -------------
  // - Lifecycle -
  // -------------
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
        setOuterTab("draft")
      }

      setViewRound(parseInt(total / 32))
    } else {
      setStage(3)
    }

    return () => clearInterval(draftInterval.current)
  }, [draftState, draftRunning])

  useEffect(() => {
    filterPlayers(false)
  }, [search])

  useEffect(() => {
    filterPlayers(true)
  }, [players, positionSelect])

  useEffect(() => {
    if (!localStorage.getItem("draftTourCompleted")) guidedTutorial()
  }, [])

  // not 32 picks in each round
  const currentPickIndex = Object.keys(draftState).length
  const currentRound = parseInt(currentPickIndex / 32)
  const roundStart = viewRound * 32
  const roundEnd = Math.min(roundStart + 32, 256)

  return (
    <>
      <section id="picks-menu" className="overflow-x-hidden overflow-y-auto">
        <menu
          onFocus={() => setIsMouseOverPicks(true)}
          onBlur={() => setIsMouseOverPicks(false)}
          onMouseOver={() => setIsMouseOverPicks(true)}
          onMouseOut={() => setIsMouseOverPicks(false)}
          className="menu bg-base-200 dark:bg-gray-500 w-[20rem] p-0 [&_li>*]:rounded-none divide-y"
        >
          {/* Dropdown */}
          <li className="dropdown dropdown-bottom sticky top-0 z-50">
            <button
              id="picks-menu__round-select"
              type="button"
              tabIndex={0}
              className="btn text-2xl w-full hover:!bg-neutral-400 dark:!bg-gray-700 dark:hover:!bg-gray-900 dark:!text-gray-100 border-t-0 border-l-0 border-r-0 border-b-2 border-primary dark:border-gray-200"
            >
              Round {viewRound + 1}
              <DownArrowSvg />
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
              <PickMenuListItem
                key={`${team.name}_${actualIndex.toString()}`}
                team={team}
                actualIndex={actualIndex}
                handleClick={e =>
                  handleAnalyzeClick(e, draftState[actualIndex + 1])
                }
                draftState={draftState}
                pickedYet={true}
                lastPick={currentPickIndex === actualIndex + 1}
                teamToImage={teamToImage}
              />
            ) : (
              <PickMenuListItem
                key={`${team.name}_${actualIndex.toString()}`}
                team={team}
                actualIndex={actualIndex}
                handleClick={e => handlePickStatsClick(e, team, actualIndex)}
                draftState={null}
                pickedYet={false}
                teamToImage={teamToImage}
              />
            )
          })}
        </menu>
      </section>

      {/* Trade Stuff + PInfo */}
      <section className="flex flex-col h-full">
        <div className="navbar bg-primary dark:bg-gray-900 text-primary-content justify-between h-[4.5rem]">
          <div id="main-draft-nav__draft-info" className="navbar w-max">
            {!userPicking ? (
              <ButtonOne
                handleClick={e => {
                  if (playersLoaded === true) {
                    startOrPauseDraft(e)
                  }
                }}
              >
                {playersLoaded === false ? (
                  <span className="loading loading-infinity loading-xs" />
                ) : (
                  <>
                    {draftRunning ? (
                      <>
                        <GrPauseFill />
                        &nbsp;Pause
                      </>
                    ) : currentPickIndex === 0 ? (
                      <>
                        <GrPlayFill />
                        &nbsp;Start
                      </>
                    ) : (
                      <>
                        <GrResume />
                        &nbsp;Resume
                      </>
                    )}
                  </>
                )}
              </ButtonOne>
            ) : null}

            <div>&nbsp;&nbsp;&nbsp;</div>

            <div className="flex flex-col p-2 bg-base-100 rounded text-primary dark:bg-gray-700 dark:text-gray-100">
              <span className="countdown font-mono text-xl">
                <span style={{ "--value": currentRound + 1 }} />
              </span>
              <span className="text-xs">Round</span>
            </div>

            <div>&nbsp;&nbsp;</div>

            <div className="flex flex-col p-2 bg-base-100 rounded text-primary dark:bg-gray-700 dark:text-gray-100">
              <span className="countdown font-mono text-xl">
                {currentPickIndex + 1}
              </span>
              <span className="text-xs">Pick</span>
            </div>
          </div>

          {userPicking && (
            <div className="flex justify-center items-center h-full w-full">
              <div className="text-md font-bold text-warning whitespace-nowrap">
                You are picking (
                {orderedPicks[Object.keys(draftState).length].name})
              </div>
            </div>
          )}

          <div
            id="main-draft-nav__draft-filters"
            className="flex justify-between space-x-2"
            role="search"
          >
            <div className="flex justify-center">
              <select
                id="main-draft-nav__position-filter"
                data-testid="positionFilter"
                value={positionSelect}
                onChange={handleChange}
                className="select select-bordered rounded-none text-primary dark:text-gray-100 dark:bg-gray-500 dark:border-gray-100"
              >
                <option value="default">Select a position</option>
                <option value="ALL">ALL</option>
                {Object.keys(positionalData).map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <input
                id="main-draft-nav__search-filter"
                value={search}
                onChange={e => {
                  setOuterTab("draft")
                  setSearch(e.target.value)
                }}
                name="search"
                type="text"
                placeholder="Search Player"
                className="input input-bordered rounded-none w-24 text-primary md:w-auto dark:text-gray-100 dark:placeholder-gray-200 dark:bg-gray-500 dark:border-gray-100"
              />
            </div>

            <ButtonOne classNames="btn-md" onClick={handleResetFiltersClick}>
              Reset
            </ButtonOne>
          </div>
        </div>

        <div
          className="tabs border-b-2 border-t-2"
          aria-label="Draft management"
        >
          <MdmTab
            id="draft-tabs__trade"
            handleClick={e => handleClick(e, "trade")}
            currentTab={outerTab}
            tabName="trade"
            displayText={
              <>
                <IoMdSwap />
                &nbsp;Trade
              </>
            }
          />
          <MdmTab
            id="draft-tabs__draft"
            handleClick={e => handleClick(e, "draft")}
            currentTab={outerTab}
            tabName="draft"
            mainTab={true}
            displayText={
              <>
                <GiAmericanFootballPlayer />
                &nbsp;Draft
              </>
            }
          />
          <MdmTab
            id="draft-tabs__your-picks"
            handleClick={e => handleClick(e, "your-picks")}
            currentTab={outerTab}
            tabName="your-picks"
            displayText={
              <>
                <PiUsersThree />
                &nbsp;Your Picks
              </>
            }
          />
          <MdmTab
            id="draft-tabs__pick-stats"
            handleClick={e => handleClick(e, "pick-stats")}
            currentTab={outerTab}
            tabName="pick-stats"
            displayText={
              <>
                <TbAnalyze />
                &nbsp;Team Stats
                {pickStatsTeam && (
                  <span className="font-semibold">
                    &nbsp;({pickStatsTeam.name})
                  </span>
                )}
              </>
            }
          />
          <MdmTab
            id="draft-tabs__analysis"
            handleClick={e => handleClick(e, "analysis")}
            currentTab={outerTab}
            tabName="analysis"
            displayText={
              <>
                <TbAnalyze />
                &nbsp;Analysis
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
        </div>

        <section className="flex justify-evenly w-[62rem] h-full">
          {outerTab === "trade" && (
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
          {outerTab === "draft" && (
            <MdmDraftTab
              startOrPauseDraft={startOrPauseDraft}
              localPlayers={localPlayers}
              playersLoaded={playersLoaded}
              preselectedPick={preselectedPick}
              setPreselectedPick={setPreselectedPick}
              draftRunning={draftRunning}
              userPicking={userPicking}
              pickModal={pickModal}
              pickPlayer={pickPlayer}
              handleAnalyzeClick={handleAnalyzeClick}
            />
          )}
          {outerTab === "analysis" && (
            <MdmAnalysisTab playerInAnalysis={playerInAnalysis} />
          )}
          {outerTab === "pick-stats" && (
            <MdmPickStatsTab
              team={pickStatsTeam}
              pickLocale={pickStatsTeamIndex}
            />
          )}
          {outerTab === "your-picks" && (
            <MdmYourPicksTab yourPicks={yourPicks} />
          )}
        </section>
      </section>
    </>
  )

  // ------------
  // - Handlers -
  // ------------
  function handleClick(event, type) {
    event.preventDefault()

    setOuterTab(type)
  }

  function handleAnalyzeClick(event, player) {
    event.preventDefault()
    event.stopPropagation()

    if (userPicking) {
      setPreselectedPick(player)
    }

    setPlayerInAnalysis(player)
    setOuterTab("analysis")
  }

  function handlePickStatsClick(event, team, teamIndex) {
    event.preventDefault()
    event.stopPropagation()

    setPickStatsTeam(team)
    setPickStatsTeamIndex(teamIndex)
    setOuterTab("pick-stats")
  }

  function handleResetFiltersClick() {
    setSearch("")
    setPositionSelect("default")
  }

  function handleChange(event) {
    const pos = event.currentTarget.value

    if (pos) {
      setPositionSelect(pos)
      setOuterTab("draft")
    }
  }
}

export default MdmMakerDraft
