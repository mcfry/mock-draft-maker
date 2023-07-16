import React, { useState, useEffect } from "react"

import Fuse from "fuse.js";

const MdmDraftTab = ({ players }) => {
    const [search, setSearch] = useState("")
    const [localPlayers, setLocalPlayers] = useState(players)
    const fuse = new Fuse(players, {
        keys: [
            "last",
            "first"
        ]
    })

    console.log(localPlayers)

    useEffect(() => {
        if (search !== "") {
            setLocalPlayers(fuse.search(search).map(searchItem => searchItem.item))
        }
    }, [search]);

    return (<>
        <div className="flex flex-col">
            <div className="navbar bg-base-300">
                <div className="flex justify-end w-full">
                    <div className="flex-none gap-2">
                        <div className="form-control pr-4">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} name="search" type="text" placeholder="Search" className="input input-bordered rounded-none w-24 md:w-auto" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-[54rem] h-[27rem]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>College</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localPlayers.map((player, index) => {
                            return <tr key={player.id} className="hover">
                                <th>{index}</th>
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