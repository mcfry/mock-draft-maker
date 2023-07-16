import React, { useState, useEffect } from "react"
import * as data from './picks_2024.json'

const MdmTradeTab = ({ teams, selected }) => {
    const selectedTeams = teams.filter(team => team.id in selected)
    const localTeams = teams.filter(team => !(team.id in selected))

    const [tradePartner, setTradePartner] = useState(teams[0].city + " " + teams[0].name)
    const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].city + " " + selectedTeams[0].name)

    const handleChange = (e, type) => {
        e.preventDefault()

        console.log(e.currentTarget.value)
        if (type === "tradePartner") {
            setTradePartner(e.currentTarget.value)
        } else if (type === "currentTeam") {
            setCurrentTeam(e.currentTarget.value)
        }
    }

    // console.log(data)
    // console.log(selected)
    // console.log(teams)

    return (<>
        <div className="flex flex-col items-center w-full">
            <div className="pt-6">
                <select onChange={(e) => handleChange(e, 'tradePartner')} className="select select-bordered rounded-none w-[20rem]">
                    {localTeams.map((team) => {
                        return <option key={team.name + team.id.toString()}>{team.city + " " + team.name}</option>
                    })}
                </select>
            </div>

            <div className="flex justify-center border-b-2 pt-6">2024</div>
            <div className="flex justify-center pt-2 w-[24rem]">
                <div className="grid grid-cols-7 gap-2">
                    {data[tradePartner].map(pick => {
                        return <div key={"2024_tp_"+pick.toString()} className="flex justify-center items-center bg-base-100 border-neutral border-2 border-solid p-2">{pick}</div>
                    })}
                </div>
            </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex flex-col items-center w-full">
            <div className="pt-6">
                <select onChange={(e) => handleChange(e, 'currentTeam')}className="select select-bordered rounded-none w-[20rem]">
                    {selectedTeams.map(team => {
                        return <option key={team.name + team.id.toString()}>{team.city + " " + team.name}</option>
                    })}
                </select>
            </div>

            <div className="flex justify-center border-b-2 pt-6">2024</div>
            <div className="flex justify-center pt-2 w-[24rem]">
                <div className="grid grid-cols-7 gap-2">
                    {data[currentTeam].map(pick => {
                        return <div key={"2024_ct_"+pick.toString()} className="flex justify-center items-center bg-base-100 border-neutral border-2 border-solid p-2">{pick}</div>
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default MdmTradeTab