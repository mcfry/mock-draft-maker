import React, { useState, useEffect } from "react"
import axios from "axios"

import MdmTab from "../../helpers/MdmTab"
import NoPlayerData from "../../helpers/NoPlayerData"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")

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

      // cache this, will be shared between players
      if (playerInAnalysis?.passing) {
        axios.get("/api/v1/passings/statistics").then(res => {
          console.log(res)
        })
      }

      if (playerInAnalysis?.rushing) {
        axios.get("/api/v1/rushings/statistics").then(res => {
          console.log(res)
        })
      }

      if (playerInAnalysis?.receiving) {
        axios.get("/api/v1/receivings/statistics").then(res => {
          console.log(res)
        })
      }

      if (playerInAnalysis?.defense) {
        axios.get("/api/v1/defenses/statistics").then(res => {
          console.log(res)
        })
      }
    }
  }, [])

  return (
    <>
      <div className="flex flex-col overflow-x-auto w-[54rem] h-full dark:bg-gray-300 dark:text-gray-900">
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
                  displayText="Passing"
                />
              )}
              {playerInAnalysis?.rushing && (
                <MdmTab
                  handleClick={e => handleClick(e, "rushing")}
                  currentTab={tab}
                  tabName="rushing"
                  displayText="Rushing"
                />
              )}
              {playerInAnalysis?.receiving && (
                <MdmTab
                  handleClick={e => handleClick(e, "receiving")}
                  currentTab={tab}
                  tabName="receiving"
                  displayText="Receiving"
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
              <table className="table rounded-none">
                {/* head */}
                <thead>
                  <tr className="font-bold">
                    {playerInAnalysis?.passing && (
                      <>
                        {tab === "passing" && (
                          <>
                            <th>Comp</th>
                            <th>Att</th>
                            <th>Comp %</th>
                            <th>Yards</th>
                            <th>Y/A</th>
                            <th>Lng</th>
                            <th>TDs</th>
                            <th>Ints</th>
                            <th>Sacked</th>
                            <th>Rtg</th>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.rushing && (
                      <>
                        {tab === "rushing" && (
                          <>
                            <th>Att</th>
                            <th>Yards</th>
                            <th>Avg</th>
                            <th>Lng</th>
                            <th>TDs</th>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.receiving && (
                      <>
                        {tab === "receiving" && (
                          <>
                            <th>Receptions</th>
                            <th>Yards</th>
                            <th>Avg</th>
                            <th>Lng</th>
                            <th>TDs</th>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.defense && (
                      <>
                        {tab === "defense" && (
                          <>
                            <td>Solo</td>
                            <td>Ast</td>
                            <td>Total</td>
                            <td>Sacks</td>
                            <td>Sk Yds</td>
                            <td>PD</td>
                            <td>Int</td>
                            <td>Int Yds</td>
                            <td>Int Lng</td>
                            <td>TDs</td>
                            <td>FFs</td>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {playerInAnalysis?.passing && (
                      <>
                        {tab === "passing" && (
                          <>
                            <td>{playerInAnalysis.passing?.completions}</td>
                            <td>{playerInAnalysis.passing?.attempts}</td>
                            <td>
                              {playerInAnalysis.passing?.completion_percent}
                            </td>
                            <td>{playerInAnalysis.passing?.yards}</td>
                            <td>
                              {playerInAnalysis.passing?.yards_per_attempt}
                            </td>
                            <td>{playerInAnalysis.passing?.long}</td>
                            <td>{playerInAnalysis.passing?.touchdowns}</td>
                            <td>{playerInAnalysis.passing?.interceptions}</td>
                            <td>{playerInAnalysis.passing?.sacked}</td>
                            <td>{playerInAnalysis.passing?.rating}</td>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.rushing && (
                      <>
                        {tab === "rushing" && (
                          <>
                            <td>{playerInAnalysis.rushing?.attempts}</td>
                            <td>{playerInAnalysis.rushing?.yards}</td>
                            <td>{playerInAnalysis.rushing?.average}</td>
                            <td>{playerInAnalysis.rushing?.long}</td>
                            <td>{playerInAnalysis.rushing?.touchdowns}</td>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.receiving && (
                      <>
                        {tab === "receiving" && (
                          <>
                            <td>{playerInAnalysis.receiving?.receptions}</td>
                            <td>{playerInAnalysis.receiving?.yards}</td>
                            <td>{playerInAnalysis.receiving?.average}</td>
                            <td>{playerInAnalysis.receiving?.long}</td>
                            <td>{playerInAnalysis.receiving?.touchdowns}</td>
                          </>
                        )}
                      </>
                    )}
                    {playerInAnalysis?.defense && (
                      <>
                        {tab === "defense" && (
                          <>
                            <td>{playerInAnalysis.defense?.solo}</td>
                            <td>{playerInAnalysis.defense?.assisted}</td>
                            <td>{playerInAnalysis.defense?.total}</td>
                            <td>{playerInAnalysis.defense?.sacks}</td>
                            <td>{playerInAnalysis.defense?.sack_yards}</td>
                            <td>
                              {playerInAnalysis.defense?.passes_deflected}
                            </td>
                            <td>{playerInAnalysis.defense?.interceptions}</td>
                            <td>{playerInAnalysis.defense?.int_yards}</td>
                            <td>{playerInAnalysis.defense?.int_long}</td>
                            <td>{playerInAnalysis.defense?.touchdowns}</td>
                            <td>{playerInAnalysis.defense?.forced_fumbles}</td>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
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
