import React, { useState, useEffect, useMemo } from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts"

// Pass data prop in, rest is handled by rechart
function CustomTooltip({ active, payload, label, data }) {
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
      PD: "Passes Deflected",
      "Int Yds": "Interception Yards",
      "Int Long": "Interception Long",
      FF: "Forced Fumbles"
    }
  }, [])

  if (active && payload && payload.length) {
    const currentData = data.filter(obj => obj.name === label)[0]

    return (
      <div className="flex flex-col justify-left bg-gray-100 shadow p-2 space-y-2">
        <span className="font-bold min-w-[8rem]">
          {labelDisplayLookup[label]}
        </span>
        {payload.map((pld, index) => (
          <div className="flex justify-between" key={index}>
            <span style={{ color: pld.fill }}>{pld.dataKey}:&nbsp;</span>
            <span>{currentData[payload[index].dataKey]}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

function MdmRadarChart({ data, dataKey, dataKeyTwo, height, width }) {
  const [scaledData, setScaledData] = useState([])

  const scaleData = () => {
    const scaled = []
    for (const entry of data) {
      const localMax = Math.max(entry[dataKey], entry[dataKeyTwo])
      const scaleFactor = 100 / localMax
      scaled.push({
        ...entry,
        [dataKey]:
          entry[dataKey] === localMax ? 100 : entry[dataKey] * scaleFactor,
        [dataKeyTwo]:
          entry[dataKeyTwo] === localMax ? 100 : entry[dataKeyTwo] * scaleFactor
      })
    }

    setScaledData(scaled)
  }

  useEffect(() => {
    scaleData()
  }, [data])

  return (
    <div className="flex flex-col justify-center items-center">
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
        <Tooltip content={<CustomTooltip data={data} />} />
      </RadarChart>
    </div>
  )
}

export default MdmRadarChart
