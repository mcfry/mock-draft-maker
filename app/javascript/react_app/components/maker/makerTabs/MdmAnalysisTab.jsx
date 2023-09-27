// External
import React, { useState, useEffect } from "react"
import {
  GiRun,
  GiThrowingBall,
  GiCatch,
  GiDefensiveWall,
  GiAmericanFootballBall
} from "react-icons/gi"

// Internal
import axiosClient from "../../../other/axiosClient"
import MdmTab from "../../helpers/MdmTab"
import NoData from "../../helpers/NoData"
import AnalysisTable from "./analysis/AnalysisTable"
import RushingAnalysis from "./analysis/RushingAnalysis"
import PassingAnalysis from "./analysis/PassingAnalysis"
import ReceivingAnalysis from "./analysis/ReceivingAnalysis"
import DefensiveAnalysis from "./analysis/DefensiveAnalysis"
import OtherAnalysis from "./analysis/OtherAnalysis"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")
  const [passStats, setPassStats] = useState(null)
  const [rushStats, setRushStats] = useState(null)
  const [recStats, setRecStats] = useState(null)
  const [defStats, setDefStats] = useState(null)
  const [otherStats, setOtherStats] = useState(null)

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

  useEffect(() => {
    if (playerInAnalysis) {
      setTab(positionToDefaultTab[playerInAnalysis.position])

      // Fetch Top 20 for each desired statistic
      const statRequests = []
      if (playerInAnalysis?.passing) {
        statRequests.push(
          axiosClient
            .get(`/api/v1/passings/statistics/${playerInAnalysis.position}`)
            .then(res => {
              setPassStats(res?.data)
              return true
            })
            .catch(_ => {
              setPassStats({})
            })
        )
      }

      if (playerInAnalysis?.rushing) {
        statRequests.push(
          axiosClient
            .get(`/api/v1/rushings/statistics/${playerInAnalysis.position}`)
            .then(res => {
              setRushStats(res?.data)
              return true
            })
            .catch(_ => {
              setRushStats({})
            })
        )
      }

      if (playerInAnalysis?.receiving) {
        statRequests.push(
          axiosClient
            .get(`/api/v1/receivings/statistics/${playerInAnalysis.position}`)
            .then(res => {
              setRecStats(res?.data)
              return true
            })
            .catch(_ => {
              setRecStats({})
            })
        )
      }

      if (playerInAnalysis?.defense) {
        statRequests.push(
          axiosClient
            .get(`/api/v1/defenses/statistics/${playerInAnalysis.position}`)
            .then(res => {
              setDefStats(res?.data)
              return true
            })
            .catch(_ => {
              setDefStats({})
            })
        )
      }

      if (playerInAnalysis) {
        axiosClient
          .get(`/api/v1/players/statistics/${playerInAnalysis.position}`)
          .then(res => {
            setOtherStats(res?.data)
          })
          .catch(_ => {
            setOtherStats({})
          })
      }

      Promise.all(statRequests).then(test => {
        if (test.every(val => !val)) {
          setTab("other")
        }
      })
    }
  }, [playerInAnalysis])

  return (
    <>
      <div className="flex flex-col overflow-x-auto w-[62rem] h-full dark:bg-gray-300 dark:text-gray-900">
        {tab === "none" || playerInAnalysis === null ? (
          <NoData message="No player selected, or no meaningful data." />
        ) : (
          <>
            <div className="tabs border-b-2 dark:bg-gray-700">
              {playerInAnalysis?.passing && (
                <MdmTab
                  handleClick={e => handleClick(e, "passing")}
                  currentTab={tab}
                  tabName="passing"
                  mainTab={
                    positionToDefaultTab[playerInAnalysis.position] ===
                    "passing"
                  }
                  displayText={
                    <>
                      <GiThrowingBall />
                      &nbsp;Passing
                    </>
                  }
                />
              )}
              {playerInAnalysis?.rushing && (
                <MdmTab
                  handleClick={e => handleClick(e, "rushing")}
                  currentTab={tab}
                  tabName="rushing"
                  mainTab={
                    positionToDefaultTab[playerInAnalysis.position] ===
                    "rushing"
                  }
                  displayText={
                    <>
                      <GiRun />
                      &nbsp;Rushing
                    </>
                  }
                />
              )}
              {playerInAnalysis?.receiving && (
                <MdmTab
                  handleClick={e => handleClick(e, "receiving")}
                  currentTab={tab}
                  tabName="receiving"
                  mainTab={
                    positionToDefaultTab[playerInAnalysis.position] ===
                    "receiving"
                  }
                  displayText={
                    <>
                      <GiCatch />
                      &nbsp;Receiving
                    </>
                  }
                />
              )}
              {playerInAnalysis?.defense && (
                <MdmTab
                  handleClick={e => handleClick(e, "defense")}
                  currentTab={tab}
                  tabName="defense"
                  mainTab={
                    positionToDefaultTab[playerInAnalysis.position] ===
                    "defense"
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
              {tab === "passing" && !playerInAnalysis?.passing && (
                <NoData message="No player selected, or no meaningful data." />
              )}
              {tab === "rushing" && !playerInAnalysis?.rushing && (
                <NoData message="No player selected, or no meaningful data." />
              )}
              {tab === "receiving" && !playerInAnalysis?.receiving && (
                <NoData message="No player selected, or no meaningful data." />
              )}
              {tab === "defense" && !playerInAnalysis?.defense && (
                <NoData message="No player selected, or no meaningful data." />
              )}

              <div className="flex flex-col">
                <AnalysisTable tab={tab} playerInAnalysis={playerInAnalysis} />

                <div className="p-4">
                  {tab === "passing" && playerInAnalysis?.passing && (
                    <PassingAnalysis
                      playerInAnalysis={playerInAnalysis}
                      passStats={passStats}
                    />
                  )}

                  {tab === "rushing" && playerInAnalysis?.rushing && (
                    <RushingAnalysis
                      playerInAnalysis={playerInAnalysis}
                      rushStats={rushStats}
                    />
                  )}

                  {tab === "receiving" && playerInAnalysis?.receiving && (
                    <ReceivingAnalysis
                      playerInAnalysis={playerInAnalysis}
                      recStats={recStats}
                    />
                  )}

                  {tab === "defense" && playerInAnalysis?.defense && (
                    <DefensiveAnalysis
                      playerInAnalysis={playerInAnalysis}
                      defStats={defStats}
                    />
                  )}

                  {tab === "other" && playerInAnalysis && (
                    <OtherAnalysis
                      playerInAnalysis={playerInAnalysis}
                      otherStats={otherStats}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
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
