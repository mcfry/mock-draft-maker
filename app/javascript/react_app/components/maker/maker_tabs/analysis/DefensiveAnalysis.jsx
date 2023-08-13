import React, { useState } from "react"
import clsx from "clsx"

import MdmRadarChart from "../../../helpers/MdmRadarChart"
import MdmBarChart from "../../../helpers/MdmBarChart"

function DefensiveAnalysis({ playerInAnalysis, defStats }) {
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
                name: "Int",
                [playerInAnalysis.last]: playerInAnalysis.defense.interceptions,
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
                "Top 20": defStats.top_20_tds
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
                name: "FF",
                [playerInAnalysis.last]:
                  playerInAnalysis.defense.forced_fumbles,
                "Top 20": defStats.top_20_forced_fumbles
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
                [playerInAnalysis.last]: playerInAnalysis.defense.interceptions,
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
                "Top 20": defStats.top_20_tds
              },
              {
                name: "FF",
                [playerInAnalysis.last]:
                  playerInAnalysis.defense.forced_fumbles,
                "Top 20": defStats.top_20_forced_fumbles
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

export default DefensiveAnalysis
