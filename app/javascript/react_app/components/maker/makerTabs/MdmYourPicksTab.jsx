// External
import React, { Fragment } from "react"

// Internal
import NoData from "../../helpers/NoData"

function MdmYourPicksTab({ yourPicks }) {
  return (
    <>
      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        {yourPicks && Object.keys(yourPicks).length > 0 ? (
          <div className="overflow-x-auto w-[62rem] h-[31rem]">
            <table className="table">
              <tbody>
                {Object.entries(yourPicks).map(([team, players]) => (
                  <Fragment key={`yp_${team}`}>
                    <tr>
                      <th>{team}</th>
                    </tr>
                    {players.map(player => (
                      <tr key={`yps_${player.id}`}>
                        <td>Projection: {player.projected}</td>
                        <td>Pick: {player.pickedAt}</td>
                        <td>{player.full_name}</td>
                        <td>{player.position}</td>
                        <td>{player.college}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData message={"You haven't picked any players yet."} />
        )}
      </div>
    </>
  )
}

export default MdmYourPicksTab
