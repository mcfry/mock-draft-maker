// External
import React, { useState, useEffect } from "react"

// Internal
import axiosClient from "../../../other/axiosClient"
import NoData from "../../helpers/NoData"

export default function MdmPickStatsTab({ team, pickLocale }) {
  const [pickData, setPickData] = useState(null)
  const [totalCount, setTotalCount] = useState(null)

  useEffect(() => {
    if (team) {
      axiosClient
        .get(
          `/api/v1/draft_record_teams/statistics/${team.id}?pick=${
            pickLocale + 1
          }`
        )
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
          <span className="text-xl font-bold">
            {`Most frequent players selected by ${team.name} fans around pick ${
              pickLocale + 1
            }:`}
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
        <>
          {team ? (
            <NoData
              message={`Team doesn't have enough data around pick ${pickLocale} yet.`}
            />
          ) : (
            <NoData message="No team is selected. You can select a team by clicking a pick in the left menu." />
          )}
        </>
      )}
    </div>
  )
}
