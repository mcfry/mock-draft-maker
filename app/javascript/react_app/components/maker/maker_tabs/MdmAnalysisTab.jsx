import React, { useState } from "react"

import MdmTab from "../../helpers/MdmTab"
import NoPlayerData from "../../helpers/NoPlayerData"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")

  return (
    <>
      <div className="flex flex-col overflow-x-auto w-[54rem] h-full dark:bg-gray-300 dark:text-gray-900">
        <div className="tabs border-b-2 dark:bg-gray-700">
          <MdmTab
            handleClick={e => handleClick(e, "passing")}
            currentTab={tab}
            tabName="passing"
            displayText="Passing"
          />
          <MdmTab
            handleClick={e => handleClick(e, "rushing")}
            currentTab={tab}
            tabName="rushing"
            displayText="Rushing"
          />
          <MdmTab
            handleClick={e => handleClick(e, "receiving")}
            currentTab={tab}
            tabName="receiving"
            displayText="Receiving"
          />
          <MdmTab
            handleClick={e => handleClick(e, "defense")}
            currentTab={tab}
            tabName="defense"
            displayText="Defensive"
          />
        </div>
        <div className="h-full">
          {tab === "passing" && !playerInAnalysis?.passing && (
            <NoPlayerData type={tab} />
          )}
          {tab === "rushing" && !playerInAnalysis?.rushing && (
            <NoPlayerData type={tab} />
          )}
          {tab === "receiving" && !playerInAnalysis?.receiving && (
            <NoPlayerData type={tab} />
          )}
          {tab === "defense" && !playerInAnalysis?.defense && (
            <NoPlayerData type={tab} />
          )}
          <table className="table rounded-none">
            {/* head */}
            <thead>
              <tr className="font-bold">
                {tab === "passing" && (
                  <>
                    {playerInAnalysis?.passing && (
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
                {tab === "rushing" && (
                  <>
                    {playerInAnalysis?.rushing && (
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
                {tab === "receiving" && (
                  <>
                    {playerInAnalysis?.receiving && (
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
                {tab === "defense" && (
                  <>
                    {playerInAnalysis?.defense && (
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
                {tab === "passing" && (
                  <>
                    {playerInAnalysis?.passing && (
                      <>
                        <td>{playerInAnalysis.passing?.completions}</td>
                        <td>{playerInAnalysis.passing?.attempts}</td>
                        <td>{playerInAnalysis.passing?.completion_percent}</td>
                        <td>{playerInAnalysis.passing?.yards}</td>
                        <td>{playerInAnalysis.passing?.yards_per_attempt}</td>
                        <td>{playerInAnalysis.passing?.long}</td>
                        <td>{playerInAnalysis.passing?.touchdowns}</td>
                        <td>{playerInAnalysis.passing?.interceptions}</td>
                        <td>{playerInAnalysis.passing?.sacked}</td>
                        <td>{playerInAnalysis.passing?.rating}</td>
                      </>
                    )}
                  </>
                )}
                {tab === "rushing" && (
                  <>
                    {playerInAnalysis?.rushing && (
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
                {tab === "receiving" && (
                  <>
                    {playerInAnalysis?.receiving && (
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
                {tab === "defense" && (
                  <>
                    {playerInAnalysis?.defense && (
                      <>
                        <td>{playerInAnalysis.defense?.solo}</td>
                        <td>{playerInAnalysis.defense?.assisted}</td>
                        <td>{playerInAnalysis.defense?.total}</td>
                        <td>{playerInAnalysis.defense?.sacks}</td>
                        <td>{playerInAnalysis.defense?.sack_yards}</td>
                        <td>{playerInAnalysis.defense?.passes_deflected}</td>
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
