import React, { Fragment } from "react"

function MdmYourPicksTab({ yourPicks }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto w-[54rem] h-[27rem]">
          <table className="table">
            <tbody>
              {Object.entries(yourPicks).map(([team, players]) => (
                  <Fragment key={`yp_${  team}`}>
                    <tr>
                      <th>{team}</th>
                    </tr>
                    {players.map((player) => (
                        <tr key={`yps_${  player.id.toString()}`}>
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
      </div>
    </>
  )
}

export default MdmYourPicksTab
