// External
import React, { useMemo, Fragment } from "react"
import useStore from "../../../store/store"

// Internal
// import NoData from "../../helpers/NoData"

function MdmYourPicksTab({ yourPicks }) {
  const selected = useStore(state => state.selected);
  const teams = useStore(state => state.teams);
  const pickData = useStore(state => state.pickData);

  const selectedTeams = useMemo(() => teams.filter(team => team.id in selected), [teams])

  console.log(yourPicks)

  return (
    <>
      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div className="overflow-x-auto w-[62rem] h-[34.75rem]">
          {selectedTeams?.map(team => 
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center text-xl font-bold py-2 w-full border-t-2 border-b-2">
                <span>{team.full_name}</span>
              </div>
              <table className="table font-mono text-base table-auto">
                <tbody>
                  <Fragment key={`yp_${team.full_name}`}>
                    {yourPicks[team.full_name]?.map(player => {
                      return <tr key={`yps_${player.pickedAt}`}>
                        <td>Pick: {player.pickedAt}</td>
                        <td>{player.full_name}</td>
                        <td>{player.position}</td>
                        <td>{player.college}</td>
                        <td>Projection: {player.projected}</td>
                      </tr>
                    })}
                    {pickData[team.full_name]?.map(pick => {
                      return <tr key={`yps_${pick}`}>
                        <td>Pick: {pick}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    })}
                  </Fragment>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MdmYourPicksTab
