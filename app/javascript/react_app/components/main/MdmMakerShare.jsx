import React, { Fragment } from "react"

import useStore from '../../store/store.js'

const MdmMakerShare = () => {
    const yourPicks = useStore(state => state.yourPicks)

    return (<>
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <table className="table">
                    <tbody>
                        {Object.entries(yourPicks).map(([team, players]) => {
                            return <Fragment key={"yp_"+team}>
                                <tr>
                                    <th>{team}</th>
                                </tr>
                                {players.map(player => {
                                    return <tr key={"yps_"+player.id.toString()}>
                                        <td>Projection: {player.projected}</td>
                                        <td>Pick: {player.pickedAt}</td>
                                        <td>{player.full_name}</td>
                                        <td>{player.position}</td>
                                        <td>{player.college}</td>
                                    </tr>
                                })}
                            </Fragment>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default MdmMakerShare