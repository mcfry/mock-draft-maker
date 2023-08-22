// External
import React, { useState } from "react"
import clsx from "clsx"
import { AiOutlineRadarChart, AiOutlineBarChart } from "react-icons/ai"

// Internal
import MdmBarChart from "../../../helpers/MdmBarChart"
import MdmRadarChart from "../../../helpers/MdmRadarChart"

function RushingAnalysis({ playerInAnalysis, rushStats }) {
  const [chartType, setChartType] = useState(0)

  const handleClick = (type = 0) => {
    setChartType(type)
  }

  return (
    <div className="flex flex-col">
      {chartType === 0 ? (
        <div className="flex justify-between items-center">
          <MdmBarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={305}
            width={265}
            data={[
              {
                name: "Lng",
                [playerInAnalysis.last]: playerInAnalysis.rushing.long,
                "Top 20": rushStats.top_20_long
              },
              {
                name: "Att",
                [playerInAnalysis.last]: playerInAnalysis.rushing.attempts,
                "Top 20": rushStats.top_20_attempts
              }
            ]}
          />

          <MdmBarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={305}
            width={265}
            data={[
              {
                name: "Tds",
                [playerInAnalysis.last]: playerInAnalysis.rushing.touchdowns,
                "Top 20": rushStats.top_20_touchdowns
              },
              {
                name: "Avg",
                [playerInAnalysis.last]: playerInAnalysis.rushing.average,
                "Top 20": rushStats.top_20_average
              }
            ]}
          />

          <MdmBarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={305}
            width={200}
            data={[
              {
                name: "Yards",
                [playerInAnalysis.last]: playerInAnalysis.rushing.yards,
                "Top 20": rushStats.top_20_yards
              }
            ]}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <MdmRadarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={305}
            width={500}
            data={[
              {
                name: "Att",
                [playerInAnalysis.last]: playerInAnalysis.rushing.attempts,
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
                [playerInAnalysis.last]: playerInAnalysis.rushing.touchdowns,
                "Top 20": rushStats.top_20_touchdowns
              },
              {
                name: "Lng",
                [playerInAnalysis.last]: playerInAnalysis.rushing.long,
                "Top 20": rushStats.top_20_long
              }
            ]}
          />
        </div>
      )}

      <div className="flex justify-center items-center space-x-5">
        <button
          type="button"
          className={clsx(
            "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-gray-600 text-primary-content text-sm"
          )}
          onClick={() => handleClick(0)}
        >
          <AiOutlineBarChart /> Bars
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-gray-600 text-primary-content text-sm"
          )}
          onClick={() => handleClick(1)}
        >
          <AiOutlineRadarChart /> Radar
        </button>
      </div>
    </div>
  )
}

export default RushingAnalysis
