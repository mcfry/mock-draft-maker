import React, { useState } from "react"

import MdmTab from "../../helpers/MdmTab"
import NoPlayerData from "../../helpers/NoPlayerData"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")

  return (
    <>
      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
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
        </div>
        <div className="overflow-x-auto w-[54rem] h-[27rem]">
          {tab === "passing" && !playerInAnalysis?.passing && (
            <NoPlayerData type={tab} />
          )}
          {tab === "rushing" && !playerInAnalysis?.rushing && (
            <NoPlayerData type={tab} />
          )}
          {tab === "receiving" && !playerInAnalysis?.receiving && (
            <NoPlayerData type={tab} />
          )}
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-bold">
                {tab === "passing" && (
                  <>
                    {playerInAnalysis?.passing && (
                      <>
                        <th>Games</th>
                        <th>Comp</th>
                        <th>Att</th>
                        <th>Comp %</th>
                        <th>Yards</th>
                        <th>Y/A</th>
                        <th>TDs</th>
                        <th>Ints</th>
                        <th>Rating</th>
                      </>
                    )}
                  </>
                )}
                {tab === "rushing" && (
                  <>
                    {playerInAnalysis?.rushing && (
                      <>
                        <th>Games</th>
                        <th>Att</th>
                        <th>Yards</th>
                        <th>Avg</th>
                        <th>TDs</th>
                      </>
                    )}
                  </>
                )}
                {tab === "receiving" && (
                  <>
                    {playerInAnalysis?.receiving && (
                      <>
                        <th>Games</th>
                        <th>Receptions</th>
                        <th>Yards</th>
                        <th>Avg</th>
                        <th>TDs</th>
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
                        <td>{playerInAnalysis.passing?.games_played}</td>
                        <td>{playerInAnalysis.passing?.completions}</td>
                        <td>{playerInAnalysis.passing?.attempts}</td>
                        <td>{playerInAnalysis.passing?.completion_percent}</td>
                        <td>{playerInAnalysis.passing?.yards}</td>
                        <td>{playerInAnalysis.passing?.yards_per_attempt}</td>
                        <td>{playerInAnalysis.passing?.touchdowns}</td>
                        <td>{playerInAnalysis.passing?.interceptions}</td>
                        <td>{playerInAnalysis.passing?.rating}</td>
                      </>
                    )}
                  </>
                )}
                {tab === "rushing" && (
                  <>
                    {playerInAnalysis?.rushing && (
                      <>
                        <td>{playerInAnalysis.rushing?.games_played}</td>
                        <td>{playerInAnalysis.rushing?.attempts}</td>
                        <td>{playerInAnalysis.rushing?.yards}</td>
                        <td>{playerInAnalysis.rushing?.average}</td>
                        <td>{playerInAnalysis.rushing?.touchdowns}</td>
                      </>
                    )}
                  </>
                )}
                {tab === "receiving" && (
                  <>
                    {playerInAnalysis?.receiving && (
                      <>
                        <td>{playerInAnalysis.receiving?.games_played}</td>
                        <td>{playerInAnalysis.receiving?.receptions}</td>
                        <td>{playerInAnalysis.receiving?.yards}</td>
                        <td>{playerInAnalysis.receiving?.average}</td>
                        <td>{playerInAnalysis.receiving?.touchdowns}</td>
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
