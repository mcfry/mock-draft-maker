import React, { useState, useEffect } from "react"

const MdmTradeTab = ({ teams, selected, pickData, setPickData }) => {
    const selectedTeams = teams.filter(team => team.id in selected)
    const localTeams = teams.filter(team => !(team.id in selected))

    const [tradePartner, setTradePartner] = useState(teams[0].city + " " + teams[0].name)
    const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].city + " " + selectedTeams[0].name)

    const [activeTrades, setActiveTrades] = useState({})

    function classNames(...classes) {
        return classes.join(" ")
    }

    return (<>
        <div className="flex flex-col items-center border-r-2 w-[27rem]">
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
                    {pickData[tradePartner].map(pick => {
                        let active = false
                        if (tradePartner in activeTrades && activeTrades[tradePartner].includes(pick)) {
                            active = true
                        }

                        return <div key={"2024_tp_"+pick.toString()} onClick={(e) => handleTradeClick(e, 'tradePartner')} className={classNames("flex justify-center items-center bg-base-100 border-neutral border-solid p-2 border-2", active ? "border-primary" : "")}>{pick}</div>
                    })}
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center w-[27rem]">
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
                    {pickData[currentTeam].map(pick => {
                        let active = false
                        if (currentTeam in activeTrades && activeTrades[currentTeam].includes(pick)) {
                            active = true
                        }

                        return <div key={"2024_ct_"+pick.toString()} onClick={(e) => handleTradeClick(e, 'currentTeam')} className={classNames("flex justify-center items-center bg-base-100 border-neutral border-solid p-2 border-2", active ? "border-primary" : "")}>{pick}</div>
                    })}
                </div>
            </div>

            <div className="mt-auto pb-28">
                <button onClick={handleTradeSubmitClick} className="btn rounded-none">Make Trade</button>
            </div>
        </div>
    </>)

    // Handlers
    function handleChange(e, type) {
        e.preventDefault()

        if (type === "tradePartner") {
            setTradePartner(e.currentTarget.value)
        } else if (type === "currentTeam") {
            setCurrentTeam(e.currentTarget.value)
        }
    }

    function handleTradeClick(e, type) {
        let k = null
        if (type === 'tradePartner') {
            k = tradePartner
        } else if (type === 'currentTeam') {
            k = currentTeam
        }

        if (k in activeTrades) {
            activeTrades[k].push(parseInt(e.currentTarget.innerText))
        } else {
            activeTrades[k] = [parseInt(e.currentTarget.innerText)]
        }

        setActiveTrades(_ => ({
            ...activeTrades
        }))
    }

    function handleTradeSubmitClick(e) {
        newTp = pickData[tradePartner]
        newCt = pickData[currentTeam]

        newTp = newTp.filter(x => !activeTrades[tradePartner].includes(x)).concat(activeTrades[currentTeam]).sort((a,b) => a-b)
        newCt = newCt.filter(x => !activeTrades[currentTeam].includes(x)).concat(activeTrades[tradePartner]).sort((a,b) => a-b)

        setPickData(prev => ({
            ...prev,
            [tradePartner]: newTp,
            [currentTeam]: newCt
        }))
    }
}

export default MdmTradeTab