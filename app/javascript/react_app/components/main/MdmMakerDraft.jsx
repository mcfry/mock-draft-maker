import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmTradeTab from "./helpers/MdmTradeTab"
import MdmDraftTab from "./helpers/MdmDraftTab"
import MdmAnalysisTab from "./helpers/MdmAnalysisTab"

import data from './helpers/picks_2024.json'

const MdmMakerDraft = ({ teams, selected }) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([])
    const [tab, setTab] = useState('trade')
    const [pickData, setPickData] = useState(data)
    const [draftState, setDraftState] = useState({})

    let orderedPicks = new Array(256).fill("")
    for (let [k, v] of Object.entries(pickData)) {
        for (let pick of v) {
            orderedPicks[pick-1] = k
        }
    }

    function classNames(...classes) {
        return classes.join(" ")
    }

    // Lifecycle Hooks
    useEffect(() => {
        const url = "/api/v1/players/index"
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Network response was not ok.")
            })
        .then((res) => setPlayers(res))
        .catch(() => navigate("/"))
    }, []);

    return (<>
        {/* PMenu */}
        <div className="overflow-x-hidden overflow-y-auto border-r-2">
            <ul className="menu bg-base-200 w-[20rem] p-0 [&_li>*]:rounded-none divide-y">
                {orderedPicks.slice(0, 32).map((value, index) => {
                    return <li key={value + "_" + index.toString()}>
                        <div className="flex justify-center items-center">
                            <a className="text-lg">{value}: {index+1}</a>
                        </div>
                    </li>
                })}
            </ul>
        </div>

        {/* Trade Stuff + PInfo */}
        <div className="flex flex-col">
            <div className="tabs border-b-2">
                <a onClick={(e) => handleClick(e, 'trade')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'trade' ? "tab-active" : "")}>Trade</a> 
                <a onClick={(e) => handleClick(e, 'draft')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'draft' ? "tab-active" : "")}>Draft a Player</a> 
                <a onClick={(e) => handleClick(e, 'analysis')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'analysis' ? "tab-active" : "")}>Analysis</a>
            </div>
            <div className="flex justify-evenly w-[54rem] h-full">
                {tab === 'trade' && <MdmTradeTab teams={teams} selected={selected} pickData={pickData} setPickData={setPickData} />}
                {tab === 'draft' && <MdmDraftTab players={players} />}
                {tab === 'analysis' && <MdmAnalysisTab/>}
            </div>
        </div>
    </>)

    // Handlers
    function handleClick(event, type) {
        event.preventDefault()

        setTab(type)
    }
}

export default MdmMakerDraft