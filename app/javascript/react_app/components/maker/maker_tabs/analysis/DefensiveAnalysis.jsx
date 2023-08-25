// External
import React, { useState } from "react"

// Internal
import MdmRadarChart from "../../../helpers/MdmRadarChart"
import MdmBarChart from "../../../helpers/MdmBarChart"
import ChartButtons from "../../../helpers/ChartButtons"

function DefensiveAnalysis({ playerInAnalysis, defStats }) {
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
            width={285}
            data={
              defStats && [
                {
                  name: "Solo",
                  [playerInAnalysis.last]: playerInAnalysis.defense.solo,
                  "Top 20": defStats.top_20_solo
                },
                {
                  name: "Asst",
                  [playerInAnalysis.last]: playerInAnalysis.defense.assisted,
                  "Top 20": defStats.top_20_assisted
                },
                {
                  name: "Total",
                  [playerInAnalysis.last]: playerInAnalysis.defense.total,
                  "Top 20": defStats.top_20_total
                },
                {
                  name: "Scks",
                  [playerInAnalysis.last]: playerInAnalysis.defense.sacks,
                  "Top 20": defStats.top_20_sacks
                },
                {
                  name: "Sck Yds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.sack_yards,
                  "Top 20": defStats.top_20_sack_yards
                },
                {
                  name: "Pd",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.passes_deflected,
                  "Top 20": defStats.top_20_passes_deflected
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
              defStats && [
                {
                  name: "Int",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.interceptions,
                  "Top 20": defStats.top_20_interceptions
                },
                {
                  name: "Int Yds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.int_yards,
                  "Top 20": defStats.top_20_int_yards
                },
                {
                  name: "Int Lng",
                  [playerInAnalysis.last]: playerInAnalysis.defense.int_long,
                  "Top 20": defStats.top_20_int_long
                },
                {
                  name: "Tds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.touchdowns,
                  "Top 20": defStats.top_20_touchdowns
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
              defStats && [
                {
                  name: "FF",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.forced_fumbles,
                  "Top 20": defStats.top_20_forced_fumbles
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
              defStats && [
                {
                  name: "Solo",
                  [playerInAnalysis.last]: playerInAnalysis.defense.solo,
                  "Top 20": defStats.top_20_solo
                },
                {
                  name: "Asst",
                  [playerInAnalysis.last]: playerInAnalysis.defense.assisted,
                  "Top 20": defStats.top_20_assisted
                },
                {
                  name: "Total",
                  [playerInAnalysis.last]: playerInAnalysis.defense.total,
                  "Top 20": defStats.top_20_total
                },
                {
                  name: "Scks",
                  [playerInAnalysis.last]: playerInAnalysis.defense.sacks,
                  "Top 20": defStats.top_20_sacks
                },
                {
                  name: "Sck Yds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.sack_yards,
                  "Top 20": defStats.top_20_sack_yards
                },
                {
                  name: "Pd",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.passes_deflected,
                  "Top 20": defStats.top_20_passes_deflected
                },
                {
                  name: "Int",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.interceptions,
                  "Top 20": defStats.top_20_interceptions
                },
                {
                  name: "Int Yds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.int_yards,
                  "Top 20": defStats.top_20_int_yards
                },
                {
                  name: "Int Lng",
                  [playerInAnalysis.last]: playerInAnalysis.defense.int_long,
                  "Top 20": defStats.top_20_int_long
                },
                {
                  name: "Tds",
                  [playerInAnalysis.last]: playerInAnalysis.defense.touchdowns,
                  "Top 20": defStats.top_20_touchdowns
                },
                {
                  name: "FF",
                  [playerInAnalysis.last]:
                    playerInAnalysis.defense.forced_fumbles,
                  "Top 20": defStats.top_20_forced_fumbles
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

export default DefensiveAnalysis
