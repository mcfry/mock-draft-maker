// External
import React, { useState } from "react"

// Internal
import MdmBarChart from "../../../helpers/MdmBarChart"
import MdmRadarChart from "../../../helpers/MdmRadarChart"
import ChartButtons from "../../../helpers/ChartButtons"

function OtherAnalysis({ playerInAnalysis, otherStats }) {
  const [chartType, setChartType] = useState(0)

  return (
    <div className="flex flex-col justify-evenly h-[24.25rem]">
      {otherStats && Object.keys(otherStats).length === 0 ? (
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
                width={243}
                data={
                  otherStats && [
                    {
                      name: "Height",
                      [playerInAnalysis.last]: playerInAnalysis.height,
                      "Top 20": otherStats.top_20_height
                    }
                  ]
                }
              />

              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={243}
                data={
                  otherStats && [
                    {
                      name: "Weight",
                      [playerInAnalysis.last]: playerInAnalysis.weight,
                      "Top 20": otherStats.top_20_weight
                    }
                  ]
                }
              />

              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={243}
                data={
                  otherStats && [
                    {
                      name: "40 Time",
                      [playerInAnalysis.last]: playerInAnalysis.forty_time,
                      "Top 20": otherStats.top_20_forty_time
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
                  otherStats && [
                    {
                      name: "Height",
                      [playerInAnalysis.last]: playerInAnalysis.height,
                      "Top 20": otherStats.top_20_height
                    },
                    {
                      name: "Weight",
                      [playerInAnalysis.last]: playerInAnalysis.weight,
                      "Top 20": otherStats.top_20_weight
                    },
                    {
                      name: "40 Time",
                      [playerInAnalysis.last]: playerInAnalysis.forty_time,
                      "Top 20": otherStats.top_20_forty_time,
                      inverse: true
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

export default OtherAnalysis
