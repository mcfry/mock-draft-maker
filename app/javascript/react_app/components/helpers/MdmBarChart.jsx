import React, { useState, useMemo } from "react"
import clsx from "clsx"
import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts"

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
      Weight: "Weight"
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

  const unitLabelLookup = dataPoint => {
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

  if (active && payload && payload.length) {
    const currentData = data.filter(obj => obj.name === label)[0]

    return (
      <div className="flex flex-col justify-left bg-gray-100 shadow p-2 space-y-2">
        <span className="font-bold min-w-[9rem]">
          {labelDisplayLookup[label]}
        </span>
        {payload.map((pld, index) => (
          <div className="flex justify-between" key={index}>
            <span
              className={clsx(
                pld.dataKey === "Top 20" ? "text-accent" : "text-success"
              )}
            >
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

function MdmBarChart({ data, dataKey, dataKeyTwo, position, height, width }) {
  const [barOpacity, setBarOpacity] = useState({})

  const handleOpacityChange = (bop, index) => {
    setBarOpacity(_ => ({
      [index]: bop
    }))
  }

  return (
    <div className="flex flex-col justify-center items-center mr-8">
      {data === undefined || data === null ? (
        <div
          role="status"
          className="animate-pulse flex justify-center items-end space-x-3 py-4"
          style={{ width: `${width}px` }}
        >
          <div
            className={clsx(`bg-gray-200 rounded-none dark:bg-gray-700`)}
            style={{ height: `${height - 180}px`, width: "30px" }}
          />
          <div
            className={clsx(`bg-gray-200 rounded-none dark:bg-gray-700`)}
            style={{ height: `${height - 120}px`, width: "30px" }}
          />
          <div
            className={clsx(`bg-gray-200 rounded-none dark:bg-gray-700`)}
            style={{ height: `${height - 160}px`, width: "30px" }}
          />
          <div
            className={clsx(`bg-gray-200 rounded-none dark:bg-gray-700`)}
            style={{ height: `${height - 50}px`, width: "30px" }}
          />
          <div
            className={clsx(`bg-gray-200 rounded-none dark:bg-gray-700`)}
            style={{ height: `${height - 95}px`, width: "30px" }}
          />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 10, right: 5, bottom: 10, left: 5 }}
          overflow="visible"
        >
          <CartesianGrid stroke="#6b7280" strokeDasharray="10 10" />
          <XAxis dataKey="name" stroke="#0d0d0d" />
          <YAxis stroke="#0d0d0d" />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip data={data} position={position} />}
          />
          <Bar dataKey={dataKey}>
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill="#21ca51"
                  stroke="#21ca51"
                  onMouseEnter={() => handleOpacityChange(0.9, `bar1-${index}`)}
                  onMouseLeave={() => handleOpacityChange(0.3, `bar1-${index}`)}
                  fillOpacity={barOpacity[`bar1-${index}`] || 0.3}
                />
              )
            })}
          </Bar>
          <Bar dataKey={dataKeyTwo}>
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill="#dc2626"
                  stroke="#dc2626"
                  onMouseEnter={() => handleOpacityChange(0.9, `bar2-${index}`)}
                  onMouseLeave={() => handleOpacityChange(0.3, `bar2-${index}`)}
                  fillOpacity={barOpacity[`bar2-${index}`] || 0.3}
                />
              )
            })}
          </Bar>
        </BarChart>
      )}
    </div>
  )
}

export default MdmBarChart
