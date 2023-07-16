import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmTradeTab from "./helpers/MdmTradeTab"
import MdmDraftTab from "./helpers/MdmDraftTab"
import MdmAnalysisTab from "./helpers/MdmAnalysisTab"

const MdmMakerDraft = ({ teams, selected }) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([])
    const [tab, setTab] = useState('trade')

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

    function handleClick(event, type) {
        event.preventDefault()

        setTab(type)
    }

    function classNames(...classes) {
        return classes.join(" ")
    }

    return (<>
        {/* PMenu */}
        <div className="overflow-x-auto border-r-2">
            <ul className="menu bg-base-200 w-[20rem] p-0 [&_li>*]:rounded-none divide-y">
                <li>
                    <div className="flex justify-center items-center">
                        <a className="text-lg">Item 1</a>
                    </div>
                </li>
                <li>
                    <div className="flex justify-center items-center">
                        <a className="text-lg">Item 1</a>
                    </div>
                </li>
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
                {tab === 'trade' && <MdmTradeTab teams={teams} selected={selected} />}
                {tab === 'draft' && <MdmDraftTab players={players} />}
                {tab === 'analysis' && <MdmAnalysisTab/>}
            </div>
        </div>
    </>)
}

export default MdmMakerDraft