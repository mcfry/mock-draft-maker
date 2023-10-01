import React, { useMemo } from "react"
import clsx from "clsx"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts"

// Pass data prop in, rest is handled by rechart
function CustomTooltip({ active, payload, label, data, position }) {
  const labelDisplayLookup = useMemo(() => {
    return {
      Int: "Interceptions",
      Lng: "Long",
      Cmp: "Completions",
      "Cmp%": "Completion Percent",
      Att: "Attempts",
      "Y/A": "Yards Per Attempt",
      Rtg: "Rating",
      Tds: "Touchdowns",
      Sckd: "Sacked",
      Yards: "Yards",
      Avg: "Average",
      Scks: "Sacks",
      Solo: "Solo Tackles",
      Asst: "Assisted Tackles",
      Total: "Total Tackles",
      "Sck Yds": "Sack Yards",
      Pd: "Passes Deflected",
      "Int Yds": "Interception Yards",
      "Int Lng": "Interception Long",
      FF: "Forced Fumbles",
      Height: "Height",
      "40 Time": "40 Time",
      Weight: "Weight",
      Rec: "Receptions"
    }
  }, [])

  const top20DisplayLoookup = () => {
    if (label === "Weight") {
      return `Top 20 Heaviest ${position}s`
    }
    if (label === "Height") {
      return `Top 20 Tallest ${position}s`
    }
    if (label === "40 Time") {
      return `Top 20 Fastest ${position}s`
    }
    if (label === "Int" && position === "QB") {
      return `Top 20 ${position}s (Fewest)`
    }
    if (label === "Sckd") {
      return `Top 20 ${position}s (Fewest)`
    }

    return `Top 20 ${position}s`
  }

  const unitLabelLookup = useMemo(() => {
    return dataPoint => {
      if (label === "Weight") {
        return `${parseInt(dataPoint)} lbs`
      }
      if (label === "Height") {
        return `${parseInt(dataPoint / 12)}' ${parseInt(dataPoint % 12)}"`
      }
      if (label === "40 Time") {
        return `${dataPoint}s`
      }
      if (label === "Y/A" || label === "Cmp%" || label === "Avg") {
        return `${dataPoint}`
      }

      return parseInt(dataPoint)
    }
  }, [label])

  if (active && payload && payload.length) {
    const currentData = data.filter(obj => obj.name === label)[0]

    return (
      <div className="flex flex-col justify-left bg-gray-100 shadow p-2 space-y-2">
        <span className="font-bold min-w-[15rem]">
          {labelDisplayLookup[label]}
        </span>
        {payload.map((pld, index) => (
          <div className="flex justify-between" key={index}>
            <span style={{ color: pld.fill }}>
              {pld.dataKey === "Top 20" ? top20DisplayLoookup() : pld.dataKey}
              :&nbsp;
            </span>
            <span>{unitLabelLookup(currentData[payload[index].dataKey])}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

function MdmRadarChart({ data, dataKey, dataKeyTwo, position, height, width }) {
  const scaledData = useMemo(() => {
    if (data) {
      const scaled = []
      for (const entry of data) {
        if ("inverse" in entry) {
          const localMin = Math.min(entry[dataKey], entry[dataKeyTwo])
          const localMax = Math.max(entry[dataKey], entry[dataKeyTwo])
          const scaleFactor = localMin / localMax
          scaled.push({
            ...entry,
            [dataKey]: entry[dataKey] === localMin ? 100 : 100 * scaleFactor,
            [dataKeyTwo]:
              entry[dataKeyTwo] === localMin ? 100 : 100 * scaleFactor
          })
        } else {
          const localMax = Math.max(entry[dataKey], entry[dataKeyTwo])
          const scaleFactor = 100 / localMax
          scaled.push({
            ...entry,
            [dataKey]:
              entry[dataKey] === localMax ? 100 : entry[dataKey] * scaleFactor,
            [dataKeyTwo]:
              entry[dataKeyTwo] === localMax
                ? 100
                : entry[dataKeyTwo] * scaleFactor
          })
        }
      }

      return scaled
    }

    return []
  }, [data, dataKey, dataKeyTwo])

  return (
    <div className="flex flex-col justify-center items-center">
      {data === undefined || data === null ? (
        <div role="status" className="animate-pulse w-full flex flex-col p-6">
          <div
            className={clsx(`bg-gray-200 rounded-full dark:bg-gray-700`)}
            style={{ height: `${height - 40}px`, width: `${height - 40}px` }}
          />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <RadarChart
          width={width}
          height={height}
          data={scaledData}
          margin={{ top: 10, right: 5, bottom: 10, left: 5 }}
          overflow="visible"
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            name={dataKey}
            dataKey={dataKey}
            stroke="#21ca51"
            fill="#21ca51"
            fillOpacity={1}
          />
          <Radar
            name={dataKeyTwo}
            dataKey={dataKeyTwo}
            stroke="#dc2626"
            fill="#dc2626"
            fillOpacity={0.4}
          />
          <Legend />
          <Tooltip
            content={<CustomTooltip data={data} position={position} />}
          />
        </RadarChart>
      )}
    </div>
  )
}

export default MdmRadarChart
