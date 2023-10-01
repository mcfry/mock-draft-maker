// External
import React, { useEffect } from "react"
import { useQuery } from "react-query"

// Internal
import { getPickStatistics } from "../../../api/apiRoutes"
import NoData from "../../helpers/NoData"

export default function MdmPickStatsTab({ team, pickLocale }) {
  const TWO_MINUTES = 2 * 60 * 1000
  const { data, status, refetch, isStale } = useQuery(
    ["pickStatistics", team.id, pickLocale + 1],
    () => getPickStatistics(team.id, pickLocale + 1),
    {
      staleTime: TWO_MINUTES
    }
  )

  useEffect(() => {
    if (isStale) refetch()
  }, [team])

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full dark:bg-gray-300 dark:text-gray-900">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-20 p-10 w-full h-full dark:bg-gray-300 dark:text-gray-900">
      {status === "success" && data.total_count > 0 ? (
        <>
          <span className="text-xl font-bold">
            {`Most frequent players selected by ${team.name} fans around pick ${
              pickLocale + 1
            }:`}
          </span>
          <div className="grid grid-cols-3 grid-rows-3 gap-8">
            {data.picks.map(({ player, count }) => {
              const percentDrafted = (count / data.total_count) * 100.0

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
              message={`Team doesn't have enough data around pick ${
                pickLocale + 1
              } yet.`}
            />
          ) : (
            <NoData message="No team is selected. You can select a team by clicking a pick in the left menu." />
          )}
        </>
      )}
    </div>
  )
}
