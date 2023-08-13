import React, { useState } from "react"
import clsx from "clsx"

import MdmRadarChart from "../../../helpers/MdmRadarChart"
import MdmBarChart from "../../../helpers/MdmBarChart"

function PassingAnalysis({ playerInAnalysis, passStats }) {
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
            width={285}
            data={[
              {
                name: "Tds",
                [playerInAnalysis.last]: playerInAnalysis.passing.touchdowns,
                "Top 20": passStats.top_20_touchdowns
              },
              {
                name: "Int",
                [playerInAnalysis.last]: playerInAnalysis.passing.interceptions,
                "Top 20": passStats.top_20_interceptions
              },
              {
                name: "Sckd",
                [playerInAnalysis.last]: playerInAnalysis.passing.sacked,
                "Top 20": passStats.top_20_sacked
              },
              {
                name: "Lng",
                [playerInAnalysis.last]: playerInAnalysis.passing.long,
                "Top 20": passStats.top_20_long
              },
              {
                name: "Y/A",
                [playerInAnalysis.last]:
                  playerInAnalysis.passing.yards_per_attempt,
                "Top 20": passStats.top_20_yards_per_attempt
              }
            ]}
          />

          <MdmBarChart
            dataKey={playerInAnalysis.last}
            dataKeyTwo="Top 20"
            position={playerInAnalysis.position}
            height={305}
            width={250}
            data={[
              {
                name: "Att",
                [playerInAnalysis.last]: playerInAnalysis.passing.attempts,
                "Top 20": passStats.top_20_attempts
              },
              {
                name: "Cmp",
                [playerInAnalysis.last]: playerInAnalysis.passing.completions,
                "Top 20": passStats.top_20_completions
              },
              {
                name: "Cmp%",
                [playerInAnalysis.last]:
                  playerInAnalysis.passing.completion_percent * 100,
                "Top 20": passStats.top_20_completion_percent * 100
              },
              {
                name: "Rtg",
                [playerInAnalysis.last]: playerInAnalysis.passing.rating,
                "Top 20": passStats.top_20_rating
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
                [playerInAnalysis.last]: playerInAnalysis.passing.yards,
                "Top 20": passStats.top_20_yards
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
                name: "Tds",
                [playerInAnalysis.last]: playerInAnalysis.passing.touchdowns,
                "Top 20": passStats.top_20_touchdowns
              },
              {
                name: "Int",
                [playerInAnalysis.last]: playerInAnalysis.passing.interceptions,
                "Top 20": passStats.top_20_interceptions
              },
              {
                name: "Sckd",
                [playerInAnalysis.last]: playerInAnalysis.passing.sacked,
                "Top 20": passStats.top_20_sacked
              },
              {
                name: "Lng",
                [playerInAnalysis.last]: playerInAnalysis.passing.long,
                "Top 20": passStats.top_20_long
              },
              {
                name: "Y/A",
                [playerInAnalysis.last]:
                  playerInAnalysis.passing.yards_per_attempt,
                "Top 20": passStats.top_20_yards_per_attempt
              },
              {
                name: "Yards",
                [playerInAnalysis.last]: playerInAnalysis.passing.yards,
                "Top 20": passStats.top_20_yards
              },
              {
                name: "Att",
                [playerInAnalysis.last]: playerInAnalysis.passing.attempts,
                "Top 20": passStats.top_20_attempts
              },
              {
                name: "Cmp",
                [playerInAnalysis.last]: playerInAnalysis.passing.completions,
                "Top 20": passStats.top_20_completions
              },
              {
                name: "Cmp%",
                [playerInAnalysis.last]:
                  playerInAnalysis.passing.completion_percent * 100,
                "Top 20": passStats.top_20_completion_percent * 100
              },
              {
                name: "Rtg",
                [playerInAnalysis.last]: playerInAnalysis.passing.rating,
                "Top 20": passStats.top_20_rating
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
          Bars
        </button>
        <button
          type="button"
          className={clsx(
            "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-gray-600 text-primary-content text-sm"
          )}
          onClick={() => handleClick(1)}
        >
          Radar
        </button>
      </div>
    </div>
  )
}

export default PassingAnalysis
