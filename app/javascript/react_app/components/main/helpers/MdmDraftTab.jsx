import React from "react"

const MdmDraftTab = ({ localPlayers, atPick }) => {
    return (<>
        <div className="flex flex-col">
            <div className="overflow-x-auto w-[54rem] h-[27rem]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Projected</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>College</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localPlayers.map((player, index) => {
                            return <tr key={player.id} className="hover">
                                <th>{player.projected}</th>
                                <td>{player.first + " " + player.last}</td>
                                <td>{player.position}</td>
                                <td>{player.college}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}

export default MdmDraftTab