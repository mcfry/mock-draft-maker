// External
import React, { useMemo, Fragment } from "react"
import useStore from "../../../store/store"

// Internal
// import NoData from "../../helpers/NoData"

function MdmYourPicksTab({ yourPicks }) {
  const selected = useStore(state => state.selected);
  const teams = useStore(state => state.teams);
  const pickData = useStore(state => state.pickData);
  const draftRounds = useStore(state => state.draftRounds);
  const roundData = useStore(state => state.roundData);

  const lastGoodPick = roundData.starting[draftRounds]
  const selectedTeams = useMemo(() => teams.filter(team => team.id in selected), [teams])

  return (
    <>
      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div className="overflow-x-auto w-[62rem] h-[34.75rem]">
          {selectedTeams?.map(team => 
            <div key={`yp_${team.full_name}`} className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center text-xl font-bold py-2 w-full border-t-2 border-b-2">
                <span>{team.full_name}</span>
              </div>
              <table className="table font-mono text-base table-auto">
                <tbody>
                  <>
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
                      if (pick > lastGoodPick) return null

                      return <tr key={`ypsd_${pick}`}>
                        <td>Pick: {pick}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    })}
                  </>
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
