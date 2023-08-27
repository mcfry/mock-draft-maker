// External
import React, { useState, useEffect } from "react"

// Internal
import axiosClient from "../../../other/axiosClient"

export default function MdmPickStatsTab({ team }) {
  const [pickData, setPickData] = useState(null)
  const [totalCount, setTotalCount] = useState(null)

  useEffect(() => {
    if (team) {
      axiosClient
        .get(`/api/v1/draft_record_teams/statistics/${team.id}`)
        .then(res => {
          setPickData(res?.data?.picks)
          setTotalCount(res?.data?.total_count)
        })
    }
  }, [team])

  return (
    <div className="flex flex-col items-center space-y-20 p-10 w-full h-full dark:bg-gray-300 dark:text-gray-900">
      {totalCount && totalCount > 0 ? (
        <>
          <span className="text-2xl font-bold">
            Most frequent players selected by {team.name} fans:
          </span>
          <div className="grid grid-cols-3 grid-rows-3 gap-8">
            {pickData.map(({ player, count }) => {
              const percentDrafted = (count / totalCount) * 100.0

              return (
                <div
                  key={player.id}
                  className="flex flex-col justify-center items-center"
                >
                  <span>{`${player.first} ${player.last}, ${player.position}`}</span>
                  <div className="flex justify-center items-center space-x-2">
                    <span>{percentDrafted.toFixed(2)}%</span>
                    <progress
                      className="progress progress-accent w-52"
                      value={parseInt(percentDrafted)}
                      max="100"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <span className="font-bold">
            {team
              ? "Team has no data."
              : "No team is selected. You can select a team by clicking a pick in the left menu."}
          </span>
        </div>
      )}
    </div>
  )
}
