import React, { useState, useEffect } from "react"

import pickValueData from './pick_value_rich_hill.json'
// Extrapolate so don't have to manually enter everything
for (let i=17; i < 257; i++) {
    let diff = 0
    if (i<=20) {
        diff = 9
    } else if (i <= 24) {
        diff = 8
    } else if (i <= 32) {
        diff = 7
    } else if (i <= 35) {
        diff = 5
    } else if (i <= 47) {
        diff = 4
    } else if (i <= 56) {
        diff = 3
    } else if (i <= 68) {
        diff = 2
    } else {
        diff = 1
    }

    pickValueDataVal = pickValueData[i-1] - diff > 0 ? pickValueData[i-1] - diff : 1
    pickValueData[i] = pickValueDataVal
}

const MdmTradeTab = ({ teams, selected, pickData, setPickData }) => {
    // useState
    const [selectedTeams, setSelectedTeams] = useState(teams.filter(team => team.id in selected))
    const [localTeams, setLocalTeams] = useState(teams.filter(team => !(team.id in selected)))
    const [tradePartner, setTradePartner] = useState(teams[0].city + " " + teams[0].name)
    const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].city + " " + selectedTeams[0].name)
    const [activeTrades, setActiveTrades] = useState({})
    const [tradeValue, setTradeValue] = useState(0)

    const findAndSetTradeValue = (tp, ct) => {
        let pvd = 0
        if (tp in activeTrades) 
            activeTrades[tp].forEach(value => pvd += pickValueData[value])
        if (ct in activeTrades) 
            activeTrades[ct].forEach(value => pvd -= pickValueData[value])

        setTradeValue(_ => pvd)
    }

    function classNames(...classes) {
        return classes.join(" ")
    }

    useEffect(() => {
        setSelectedTeams(teams.filter(team => team.id in selected))
        setLocalTeams(teams.filter(team => !(team.id in selected)))
    }, [selected])

    return (<>
        <div className="flex flex-col items-center border-r-2 w-[27rem]">
            <div className="pt-6">
                <select onChange={(e) => handleChange(e, 'tradePartner')} className="select select-bordered rounded-none w-[20rem]">
                    {localTeams.map((team) => {
                        return <option key={team.name + team.id.toString()}>{team.city + " " + team.name}</option>
                    })}
                </select>
            </div>

            <div className="pt-4"></div>
            {tradeValue > 0 && <div className="text-success">Trade Value: {tradeValue}</div>}
            {tradeValue < 0 && <div className="text-error">Trade Value: {tradeValue}</div>}
            <div className="flex justify-center border-b-2 pt-2">2024</div>
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

            <div className="pt-4"></div>
            {tradeValue < 0 && <div className="text-success">Trade Value: {-tradeValue}</div>}
            {tradeValue > 0 && <div className="text-error">Trade Value: {-tradeValue}</div>}
            <div className="flex justify-center border-b-2 pt-2">2024</div>
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

            <div className="flex flex-col justify-center items-center mt-auto pb-28">
                {tradeValue !== 0 && 
                    <div 
                        className={tradeValue <= 10 && tradeValue >= -10 ? "text-success" : "text-error"}
                    >
                        {tradeValue <= 10 && tradeValue >= -10 ? "Accepted" : "Difference Too Big"}
                    </div>
                }
                <button onClick={handleTradeSubmitClick} className="btn rounded-none">{tradeValue <= 10 && tradeValue >= -10 ? "Make Trade" : "Force Trade Anyway"}</button>
            </div>
        </div>
    </>)

    // Handlers
    function handleChange(e, type) {
        e.preventDefault()

        if (type === "tradePartner") {
            setTradePartner(e.currentTarget.value)
            findAndSetTradeValue(e.currentTarget.value, currentTeam)
        } else if (type === "currentTeam") {
            setCurrentTeam(e.currentTarget.value)
            findAndSetTradeValue(tradePartner, e.currentTarget.value)
        }
    }

    function handleTradeClick(e, type) {
        let k = null
        let pickInt = parseInt(e.currentTarget.innerText)

        if (type === 'tradePartner') k = tradePartner
        if (type === 'currentTeam') k = currentTeam

        if (k in activeTrades && activeTrades[k].includes(pickInt)) {
            activeTrades[k] = activeTrades[k].filter(x => x !== pickInt)
        } else {
            if (k in activeTrades) {
                activeTrades[k].push(pickInt)
            } else {
                activeTrades[k] = [pickInt]
            }
        }

        findAndSetTradeValue(tradePartner, currentTeam)
        setActiveTrades(_ => ({
            ...activeTrades
        }))
    }

    function handleTradeSubmitClick(e) {
        newTp = pickData[tradePartner]
        newCt = pickData[currentTeam]

        activeTp = tradePartner in activeTrades ? activeTrades[tradePartner] : []
        activeCt = currentTeam in activeTrades ? activeTrades[currentTeam] : []

        newTp = newTp.filter(x => !activeTp.includes(x)).concat(activeCt).sort((a,b) => a-b)
        newCt = newCt.filter(x => !activeCt.includes(x)).concat(activeTp).sort((a,b) => a-b)

        setPickData(prev => ({
            ...prev,
            [tradePartner]: newTp,
            [currentTeam]: newCt
        }))
    }
}

export default MdmTradeTab