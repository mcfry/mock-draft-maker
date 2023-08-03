import React, { useState } from "react"
import clsx from "clsx"

const MdmAnalysisTab = React.memo(({ playerInAnalysis }) => {
  const [tab, setTab] = useState("passing")

  return (
    <>
      <div className="flex flex-col">
        <div className="tabs border-b-2">
          <button
            type="button"
            onClick={e => handleClick(e, "passing")}
            className={clsx(
              "tab tab-lg hover:bg-gray-600 hover:text-primary-content",
              {
                "bg-primary border-box text-primary-content": tab === "passing"
              }
            )}
          >
            Passing
          </button>
          <button
            type="button"
            onClick={e => handleClick(e, "rushing")}
            className={clsx(
              "tab tab-lg hover:bg-gray-600 hover:text-primary-content",
              {
                "bg-primary border-box text-primary-content": tab === "rushing"
              }
            )}
          >
            Rushing
          </button>
          <button
            type="button"
            onClick={e => handleClick(e, "receiving")}
            className={clsx(
              "tab tab-lg hover:bg-gray-600 hover:text-primary-content",
              {
                "bg-primary border-box text-primary-content":
                  tab === "receiving"
              }
            )}
          >
            Receiving
          </button>
          {/* <div className="flex justify-end items-center h-full pl-24">
            <div className="text-md font-bold text-warning whitespace-nowrap">
              {playerInAnalysis?.full_name}
            </div>
          </div> */}
        </div>
        <div className="overflow-x-auto w-[54rem] h-[27rem]">
          {tab === "passing" && !playerInAnalysis?.passing && (
            <div className="flex flex-col items-center justify-center w-[54rem] h-[27rem]">
              <p className="font-semibold">No passing data for this player</p>
              <p>
                (If you think this player should have data, they may have been
                injured)
              </p>
            </div>
          )}
          {tab === "rushing" && !playerInAnalysis?.rushing && (
            <div className="flex flex-col items-center justify-center w-[54rem] h-[27rem]">
              <p className="font-semibold">No rushing data for this player</p>
              <p>
                (If you think this player should have data, they may have been
                injured)
              </p>
            </div>
          )}
          {tab === "receiving" && !playerInAnalysis?.receiving && (
            <div className="flex flex-col items-center justify-center w-[54rem] h-[27rem]">
              <p className="font-semibold">No receiving data for this player</p>
              <p>
                (If you think this player should have data, they may have been
                injured)
              </p>
            </div>
          )}
          <table className="table">
            {/* head */}
            <thead>
              <tr>
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
