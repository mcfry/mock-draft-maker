// External
import React, { useState } from "react"

// Internal
import MdmBarChart from "../../../helpers/MdmBarChart"
import MdmRadarChart from "../../../helpers/MdmRadarChart"
import ChartButtons from "../../../helpers/ChartButtons"

function RushingAnalysis({ playerInAnalysis, rushStats }) {
  const [chartType, setChartType] = useState(0)

  return (
    <div className="flex flex-col justify-evenly h-[24.25rem]">
      {rushStats && Object.keys(rushStats).length === 0 ? (
        <div className="flex justify-center items-center">
          <span className="font-bold">Error fetching graph data.</span>
        </div>
      ) : (
        <>
          {chartType === 1 ? (
            <div className="flex justify-between items-center">
              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={265}
                data={
                  rushStats && [
                    {
                      name: "Lng",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.long,
                      "Top 20": rushStats.top_20_long
                    },
                    {
                      name: "Att",
                      [playerInAnalysis.last]:
                        playerInAnalysis.rushing.attempts,
                      "Top 20": rushStats.top_20_attempts
                    }
                  ]
                }
              />

              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={265}
                data={
                  rushStats && [
                    {
                      name: "Tds",
                      [playerInAnalysis.last]:
                        playerInAnalysis.rushing.touchdowns,
                      "Top 20": rushStats.top_20_touchdowns
                    },
                    {
                      name: "Avg",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.average,
                      "Top 20": rushStats.top_20_average
                    }
                  ]
                }
              />

              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={200}
                data={
                  rushStats && [
                    {
                      name: "Yards",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.yards,
                      "Top 20": rushStats.top_20_yards
                    }
                  ]
                }
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <MdmRadarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={500}
                data={
                  rushStats && [
                    {
                      name: "Att",
                      [playerInAnalysis.last]:
                        playerInAnalysis.rushing.attempts,
                      "Top 20": rushStats.top_20_attempts
                    },
                    {
                      name: "Yards",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.yards,
                      "Top 20": rushStats.top_20_yards
                    },
                    {
                      name: "Avg",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.average,
                      "Top 20": rushStats.top_20_average
                    },
                    {
                      name: "Tds",
                      [playerInAnalysis.last]:
                        playerInAnalysis.rushing.touchdowns,
                      "Top 20": rushStats.top_20_touchdowns
                    },
                    {
                      name: "Lng",
                      [playerInAnalysis.last]: playerInAnalysis.rushing.long,
                      "Top 20": rushStats.top_20_long
                    }
                  ]
                }
              />
            </div>
          )}

          <ChartButtons handleClick={handleClick} />
        </>
      )}
    </div>
  )

  // Handlers
  function handleClick(type = 0) {
    setChartType(type)
  }
}

export default RushingAnalysis
