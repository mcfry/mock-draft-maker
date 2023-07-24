import React, { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

const MdmShare = () => {
    const { draft_uuid } = useParams()
    const [draftRecord, setDraftRecord] = useState({})

    useEffect(() => {
        axios("/api/v1/draft_records/show/"+draft_uuid).then(res =>
            setDraftRecord(res?.data?.draft_picks)
        ).catch(err => 
            console.log(err)
        )
    }, [])

    return (<>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Mock Draft</h1>
            </div>
        </header>
        <div className="flex flex-col grow space-y-4 justify-center items-center bg-gradient-to-t from-base-100 via-base-300 to-base-300 p-10">
            <div className="card shadow-xl rounded bg-base-100 p-2">
                <span className="p-1">Your share link: <span className="bg-base-200 font-semibold p-1">{window.location.href}</span></span>
            </div>

            <div className="flex flex-row card w-[74rem] shadow-xl rounded bg-base-100">
                <div className="overflow-x-auto">
                    <div className="flex flex-col w-[74rem]">
                        <div className="flex items-center justify-center w-full">
                            <table className="table">
                                <tbody>
                                    {Object.entries(draftRecord).map(([team, players]) => {
                                        return <Fragment key={"yp_"+team}>
                                            <tr className="bg-black text-white">
                                                <th className="w-2/12">{team}</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <th className="w-1/12 text-center">Pick</th>
                                                <th className="w-2/12 text-center">Projection</th>
                                                <th className="w-3/12 text-center">Player</th>
                                                <th className="w-1/12 text-center">Position</th>
                                                <th className="w-5/12 text-center">College</th>
                                            </tr>
                                            {players.map(player => {
                                                return <tr key={"yps_"+player.id.toString()}>
                                                    <td className="w-1/12 text-center">Pick: {player.pickedAt}</td>
                                                    <td className="w-2/12 text-center">Projection: {player.projected}</td>
                                                    <td className="w-3/12 text-center">{player.full_name}</td>
                                                    <td className="w-1/12 text-center">{player.position}</td>
                                                    <td className="w-5/12 text-center">{player.college}</td>
                                                </tr>
                                            })}
                                        </Fragment>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default MdmShare