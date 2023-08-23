// External
import React, { useState, useEffect } from "react"
import { GiRun, GiThrowingBall, GiCatch } from "react-icons/gi"
import axiosClient from "../../../other/axiosClient"

// Internal
import MdmTab from "../../helpers/MdmTab"
import NoPlayerData from "../../helpers/NoPlayerData"
import AnalysisTable from "./analysis/AnalysisTable"
import RushingAnalysis from "./analysis/RushingAnalysis"
import PassingAnalysis from "./analysis/PassingAnalysis"
import ReceivingAnalysis from "./analysis/ReceivingAnalysis"
import DefensiveAnalysis from "./analysis/DefensiveAnalysis"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")
  const [passStats, setPassStats] = useState(null)
  const [rushStats, setRushStats] = useState(null)
  const [recStats, setRecStats] = useState(null)
  const [defStats, setDefStats] = useState(null)

  const positionToDefaultTab = {
    QB: "passing",
    OT: "none",
    DE: "defense",
    OL: "none",
    WR: "receiving",
    DT: "defense",
    DL: "defense",
    C: "none",
    CB: "defense",
    DB: "defense",
    G: "none",
    S: "defense",
    TE: "receiving",
    LB: "defense",
    RB: "rushing",
    PK: "none",
    FB: "rushing",
    P: "none",
    LS: "none"
  }

  useEffect(() => {
    if (playerInAnalysis) {
      setTab(positionToDefaultTab[playerInAnalysis.position])

      if (playerInAnalysis?.passing) {
        axiosClient
          .get(`/api/v1/passings/statistics/${playerInAnalysis.position}`)
          .then(res => {
            setPassStats(res?.data)
          })
      }

      if (playerInAnalysis?.rushing) {
        axiosClient
          .get(`/api/v1/rushings/statistics/${playerInAnalysis.position}`)
          .then(res => {
            setRushStats(res?.data)
          })
      }

      if (playerInAnalysis?.receiving) {
        axiosClient
          .get(`/api/v1/receivings/statistics/${playerInAnalysis.position}`)
          .then(res => {
            setRecStats(res?.data)
          })
      }

      if (playerInAnalysis?.defense) {
        axiosClient
          .get(`/api/v1/defenses/statistics/${playerInAnalysis.position}`)
          .then(res => {
            setDefStats(res?.data)
          })
      }
    }
  }, [playerInAnalysis])

  return (
    <>
      <div className="flex flex-col overflow-x-auto w-[62rem] h-full dark:bg-gray-300 dark:text-gray-900">
        {tab === "none" || playerInAnalysis === null ? (
          <NoPlayerData />
        ) : (
          <>
            <div className="tabs border-b-2 dark:bg-gray-700">
              {playerInAnalysis?.passing && (
                <MdmTab
                  handleClick={e => handleClick(e, "passing")}
                  currentTab={tab}
                  tabName="passing"
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
                  displayText="Defensive"
                />
              )}
            </div>
            <div className="h-full">
              {tab === "passing" && !playerInAnalysis?.passing && (
                <NoPlayerData />
              )}
              {tab === "rushing" && !playerInAnalysis?.rushing && (
                <NoPlayerData />
              )}
              {tab === "receiving" && !playerInAnalysis?.receiving && (
                <NoPlayerData />
              )}
              {tab === "defense" && !playerInAnalysis?.defense && (
                <NoPlayerData />
              )}

              <div className="flex flex-col">
                <AnalysisTable tab={tab} playerInAnalysis={playerInAnalysis} />

                <div className="p-4">
                  {tab === "passing" &&
                    playerInAnalysis?.passing &&
                    passStats !== null && (
                      <PassingAnalysis
                        playerInAnalysis={playerInAnalysis}
                        passStats={passStats}
                      />
                    )}

                  {tab === "rushing" &&
                    playerInAnalysis?.rushing &&
                    rushStats !== null && (
                      <RushingAnalysis
                        playerInAnalysis={playerInAnalysis}
                        rushStats={rushStats}
                      />
                    )}

                  {tab === "receiving" &&
                    playerInAnalysis?.receiving &&
                    recStats !== null && (
                      <ReceivingAnalysis
                        playerInAnalysis={playerInAnalysis}
                        recStats={recStats}
                      />
                    )}

                  {tab === "defense" &&
                    playerInAnalysis?.defense &&
                    defStats !== null && (
                      <DefensiveAnalysis
                        playerInAnalysis={playerInAnalysis}
                        defStats={defStats}
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
