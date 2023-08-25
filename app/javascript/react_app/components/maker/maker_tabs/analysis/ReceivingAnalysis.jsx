// External
import React, { useState } from "react"

// Internal
import MdmBarChart from "../../../helpers/MdmBarChart"
import MdmRadarChart from "../../../helpers/MdmRadarChart"
import ChartButtons from "../../../helpers/ChartButtons"

function ReceivingAnalysis({ playerInAnalysis, recStats }) {
  const [chartType, setChartType] = useState(0)

  return (
    <div className="flex flex-col justify-evenly h-[24.25rem]">
      {chartType === 1 ? (
        <div className="flex justify-between items-center">
          <MdmBarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={315}
            width={265}
            data={
              recStats && [
                {
                  name: "Lng",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.long,
                  "Top 20": recStats.top_20_long
                },
                {
                  name: "Rec",
                  [playerInAnalysis.last]:
                    playerInAnalysis.receiving.receptions,
                  "Top 20": recStats.top_20_receptions
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
              recStats && [
                {
                  name: "Tds",
                  [playerInAnalysis.last]:
                    playerInAnalysis.receiving.touchdowns,
                  "Top 20": recStats.top_20_touchdowns
                },
                {
                  name: "Avg",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.average,
                  "Top 20": recStats.top_20_average
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
              recStats && [
                {
                  name: "Yards",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.yards,
                  "Top 20": recStats.top_20_yards
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
              recStats && [
                {
                  name: "Att",
                  [playerInAnalysis.last]:
                    playerInAnalysis.receiving.receptions,
                  "Top 20": recStats.top_20_receptions
                },
                {
                  name: "Yards",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.yards,
                  "Top 20": recStats.top_20_yards
                },
                {
                  name: "Avg",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.average,
                  "Top 20": recStats.top_20_average
                },
                {
                  name: "Tds",
                  [playerInAnalysis.last]:
                    playerInAnalysis.receiving.touchdowns,
                  "Top 20": recStats.top_20_touchdowns
                },
                {
                  name: "Lng",
                  [playerInAnalysis.last]: playerInAnalysis.receiving.long,
                  "Top 20": recStats.top_20_long
                }
              ]
            }
          />
        </div>
      )}

      <ChartButtons handleClick={handleClick} />
    </div>
  )

  // Handlers
  function handleClick(type = 0) {
    setChartType(type)
  }
}

export default ReceivingAnalysis
