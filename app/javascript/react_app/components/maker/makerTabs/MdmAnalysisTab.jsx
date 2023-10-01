// External
import React, { useState, useEffect } from "react"
import {
  GiRun,
  GiThrowingBall,
  GiCatch,
  GiDefensiveWall,
  GiAmericanFootballBall
} from "react-icons/gi"
import { useQuery } from "react-query"

// Internal
import { getTop20Statistics } from "../../../api/apiRoutes"
import MdmTab from "../../helpers/MdmTab"
import NoData from "../../helpers/NoData"
import AnalysisTable from "./analysis/AnalysisTable"
import RushingAnalysis from "./analysis/RushingAnalysis"
import PassingAnalysis from "./analysis/PassingAnalysis"
import ReceivingAnalysis from "./analysis/ReceivingAnalysis"
import DefensiveAnalysis from "./analysis/DefensiveAnalysis"
import OtherAnalysis from "./analysis/OtherAnalysis"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  if (playerInAnalysis === null || playerInAnalysis === undefined) {
    return (
      <div className="flex flex-col overflow-x-auto w-[62rem] h-full dark:bg-gray-300 dark:text-gray-900">
        <NoData message="No player selected, or no meaningful data." />
      </div>
    )
  }

  const positionToDefaultTab = {
    QB: "passing",
    OT: "other",
    DE: "defense",
    OL: "other",
    WR: "receiving",
    DT: "defense",
    DL: "defense",
    C: "other",
    CB: "defense",
    DB: "defense",
    G: "other",
    S: "defense",
    TE: "receiving",
    LB: "defense",
    RB: "rushing",
    PK: "other",
    FB: "rushing",
    P: "other",
    LS: "other"
  }

  const [tab, setTab] = useState(
    positionToDefaultTab[playerInAnalysis.position]
  )

  const ONE_DAY = 24 * 60 * 60 * 1000
  let passingStatsQuery = null
  if (playerInAnalysis.passing) {
    passingStatsQuery = useQuery(
      ["passings", playerInAnalysis.position],
      () => getTop20Statistics("passings", playerInAnalysis.position),
      {
        staleTime: ONE_DAY
      }
    )
  }

  let rushingStatsQuery = null
  if (playerInAnalysis.rushing) {
    rushingStatsQuery = useQuery(
      ["rushings", playerInAnalysis.position],
      () => getTop20Statistics("rushings", playerInAnalysis.position),
      {
        staleTime: ONE_DAY
      }
    )
  }

  let receivingStatsQuery = null
  if (playerInAnalysis.receiving) {
    receivingStatsQuery = useQuery(
      ["receivings", playerInAnalysis.position],
      () => getTop20Statistics("receivings", playerInAnalysis.position),
      {
        staleTime: ONE_DAY
      }
    )
  }

  let defenseStatsQuery = null
  if (playerInAnalysis.defense) {
    defenseStatsQuery = useQuery(
      ["defenses", playerInAnalysis.position],
      () => getTop20Statistics("defenses", playerInAnalysis.position),
      {
        staleTime: ONE_DAY
      }
    )
  }

  const playerStatsQuery = useQuery(
    ["players", playerInAnalysis.position],
    () => getTop20Statistics("players", playerInAnalysis.position),
    {
      staleTime: ONE_DAY
    }
  )

  useEffect(() => {
    if (
      passingStatsQuery === null &&
      rushingStatsQuery === null &&
      receivingStatsQuery === null &&
      defenseStatsQuery === null
    ) {
      setTab("other")
    }
  }, [])

  useEffect(() => {
    if (passingStatsQuery?.isStale) passingStatsQuery.refetch()
    if (rushingStatsQuery?.isStale) rushingStatsQuery.refetch()
    if (receivingStatsQuery?.isStale) receivingStatsQuery.refetch()
    if (defenseStatsQuery?.isStale) defenseStatsQuery.refetch()
    if (playerStatsQuery?.isStale) playerStatsQuery.refetch()
  }, [playerInAnalysis])

  return (
    <>
      <div className="flex flex-col overflow-x-auto w-[62rem] h-full dark:bg-gray-300 dark:text-gray-900">
        <div className="tabs border-b-2 dark:bg-gray-700">
          {playerInAnalysis.passing && (
            <MdmTab
              handleClick={e => handleClick(e, "passing")}
              currentTab={tab}
              tabName="passing"
              mainTab={
                positionToDefaultTab[playerInAnalysis.position] === "passing"
              }
              displayText={
                <>
                  <GiThrowingBall />
                  &nbsp;Passing
                </>
              }
            />
          )}
          {playerInAnalysis.rushing && (
            <MdmTab
              handleClick={e => handleClick(e, "rushing")}
              currentTab={tab}
              tabName="rushing"
              mainTab={
                positionToDefaultTab[playerInAnalysis.position] === "rushing"
              }
              displayText={
                <>
                  <GiRun />
                  &nbsp;Rushing
                </>
              }
            />
          )}
          {playerInAnalysis.receiving && (
            <MdmTab
              handleClick={e => handleClick(e, "receiving")}
              currentTab={tab}
              tabName="receiving"
              mainTab={
                positionToDefaultTab[playerInAnalysis.position] === "receiving"
              }
              displayText={
                <>
                  <GiCatch />
                  &nbsp;Receiving
                </>
              }
            />
          )}
          {playerInAnalysis.defense && (
            <MdmTab
              handleClick={e => handleClick(e, "defense")}
              currentTab={tab}
              tabName="defense"
              mainTab={
                positionToDefaultTab[playerInAnalysis.position] === "defense"
              }
              displayText={
                <>
                  <GiDefensiveWall />
                  &nbsp;Defense
                </>
              }
            />
          )}
          {playerInAnalysis && (
            <MdmTab
              handleClick={e => handleClick(e, "other")}
              currentTab={tab}
              tabName="other"
              displayText={
                <>
                  <GiAmericanFootballBall />
                  &nbsp;Other
                </>
              }
            />
          )}
        </div>
        <div className="h-full">
          {tab === "passing" && !playerInAnalysis.passing && (
            <NoData message="No player selected, or no meaningful data." />
          )}
          {tab === "rushing" && !playerInAnalysis.rushing && (
            <NoData message="No player selected, or no meaningful data." />
          )}
          {tab === "receiving" && !playerInAnalysis.receiving && (
            <NoData message="No player selected, or no meaningful data." />
          )}
          {tab === "defense" && !playerInAnalysis.defense && (
            <NoData message="No player selected, or no meaningful data." />
          )}

          <div className="flex flex-col">
            <AnalysisTable tab={tab} playerInAnalysis={playerInAnalysis} />

            <div className="p-4">
              {tab === "passing" && playerInAnalysis.passing && (
                <PassingAnalysis
                  playerInAnalysis={playerInAnalysis}
                  passStats={passingStatsQuery.data}
                />
              )}

              {tab === "rushing" && playerInAnalysis.rushing && (
                <RushingAnalysis
                  playerInAnalysis={playerInAnalysis}
                  rushStats={rushingStatsQuery.data}
                />
              )}

              {tab === "receiving" && playerInAnalysis.receiving && (
                <ReceivingAnalysis
                  playerInAnalysis={playerInAnalysis}
                  recStats={receivingStatsQuery.data}
                />
              )}

              {tab === "defense" && playerInAnalysis.defense && (
                <DefensiveAnalysis
                  playerInAnalysis={playerInAnalysis}
                  defStats={defenseStatsQuery.data}
                />
              )}

              {tab === "other" && (
                <OtherAnalysis
                  playerInAnalysis={playerInAnalysis}
                  otherStats={playerStatsQuery.data}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // Handlers
  function handleClick(event, type) {
    event.preventDefault()

    setTab(type)
  }
})

export default MdmAnalysisTab
