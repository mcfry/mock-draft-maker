import React, { useState, useEffect, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

const MdmShare = () => {
    //const navigate = useNavigate()
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
        <main>
            <div className="flex flex-col w-full justify-center items-center p-10">
                <div className="flex flex-row card w-[74rem] shadow-xl rounded bg-base-100">
                    <div className="overflow-x-auto">
                        <div className="flex flex-col w-[74rem]">
                            <div className="flex items-center justify-center w-full">
                                <table className="table">
                                    <tbody>
                                        {Object.entries(draftRecord).map(([team, players]) => {
                                            return <Fragment key={"yp_"+team}>
                                                <tr>
                                                    <th className="w-2/12">{team}</th>
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
        </main>
    </>)
}

export default MdmShare