// External
import React, { useState } from "react"

// Internal
import MdmRadarChart from "../../../helpers/MdmRadarChart"
import MdmBarChart from "../../../helpers/MdmBarChart"
import ChartButtons from "../../../helpers/ChartButtons"

function PassingAnalysis({ playerInAnalysis, passStats }) {
  const [chartType, setChartType] = useState(0)

  return (
    <div className="flex flex-col justify-evenly h-[24.25rem]">
      {passStats && Object.keys(passStats).length === 0 ? (
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
                width={285}
                data={
                  passStats && [
                    {
                      name: "Tds",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.touchdowns,
                      "Top 20": passStats.top_20_touchdowns
                    },
                    {
                      name: "Int",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.interceptions,
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
                  ]
                }
              />

              <MdmBarChart
                dataKey={playerInAnalysis.last}
                dataKeyTwo="Top 20"
                position={playerInAnalysis.position}
                height={315}
                width={250}
                data={
                  passStats && [
                    {
                      name: "Att",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.attempts,
                      "Top 20": passStats.top_20_attempts
                    },
                    {
                      name: "Cmp",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.completions,
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
                  passStats && [
                    {
                      name: "Yards",
                      [playerInAnalysis.last]: playerInAnalysis.passing.yards,
                      "Top 20": passStats.top_20_yards
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
                  passStats && [
                    {
                      name: "Tds",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.touchdowns,
                      "Top 20": passStats.top_20_touchdowns
                    },
                    {
                      name: "Int",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.interceptions,
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
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.attempts,
                      "Top 20": passStats.top_20_attempts
                    },
                    {
                      name: "Cmp",
                      [playerInAnalysis.last]:
                        playerInAnalysis.passing.completions,
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

export default PassingAnalysis
