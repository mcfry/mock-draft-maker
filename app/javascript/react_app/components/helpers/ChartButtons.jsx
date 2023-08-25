// External
import React from "react"
import { AiOutlineRadarChart, AiOutlineBarChart } from "react-icons/ai"

// Internal
import ButtonTwo from "./ButtonTwo"

export default function ChartButtons({ handleClick }) {
  return (
    <div className="flex justify-center items-center space-x-5">
      <ButtonTwo handleClick={() => handleClick(1)}>
        <AiOutlineBarChart /> Bars
      </ButtonTwo>
      <ButtonTwo handleClick={() => handleClick(0)}>
        <AiOutlineRadarChart /> Radar
      </ButtonTwo>
    </div>
  )
}
