import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import MdmTradeTab from "./helpers/MdmTradeTab"
import MdmDraftTab from "./helpers/MdmDraftTab"
import MdmAnalysisTab from "./helpers/MdmAnalysisTab"

import data from './helpers/picks_2024.json'
import needsData from './helpers/needs_2024.json'
import positionalData from './helpers/positional_value.json'

const MdmMakerDraft = ({ teams, selected }) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([])
    const [tab, setTab] = useState('trade')
    const [pickData, setPickData] = useState(data)
    const [orderedPicks, setOrderedPicks] = useState(new Array(256).fill(""))
    const [speed, setSpeed] = useState(80)
    const [needsVsValue, setNeedsVsValue] = useState(50)
    const [randomness, setRandomness] = useState(10)
    const [draftRunning, setDraftRunning] = useState(false)
    const [draftState, setDraftState] = useState({})
    let draftInterval = useRef(undefined)

    const createDraftInterval = () => {
        return setInterval(() => {
            let total = Object.keys(draftState).length
            let teamPicking = orderedPicks[total]
            let needs = needsData[teamPicking]
            let needsHash = {}
            for (let need of needs) {
                needsHash[need] = true
            }

            let possibleNeeds = []
            if (needs.length > 0) {
                let i = 0
                for (let player of players) {
                    if (player.position in needsHash) possibleNeeds.push(player)
                    if (possibleNeeds.length >= 5) break

                    i += 1
                    if (i >= 15) break
                }
            }

            let possiblePositional = []
            let i = 0
            for (let player of players) {
                if (!(player.position in positionalData)) console.log(player)

                possiblePositional.push([player, positionalData[player.position]])

                i += 1
                if (i >= total*3 || i >= 15) break
            }
            possiblePositional.sort((a, b) => b[1] - a[1]) // reverse

            let roll = parseInt(Math.random() * 10)
            if (possibleNeeds.length > 0 && roll*10 < needsVsValue) {
                let curPick = parseInt(Math.random() * possibleNeeds.length)

                setDraftState(prev => ({
                    ...prev,
                    [total+1]: possibleNeeds[curPick]
                }))

                console.log("WAZAUP")

                let idx = players.indexOf(possibleNeeds[curPick])
                setPlayers(_ => players.slice(0, idx).concat(players.slice(idx+1)))
            } else {
                let curPick = parseInt(Math.random() * possiblePositional.length * ((100-needsVsValue)*.01))

                setDraftState(prev => ({
                    ...prev,
                    [total+1]: possiblePositional[curPick][0]
                }))

                let idx = players.indexOf(possiblePositional[curPick][0])
                console.log(idx, players, players.slice(0, idx).concat(players.slice(idx+1)))
                setPlayers(_ => players.slice(0, idx).concat(players.slice(idx+1)))
            }
        }, 1000)
    }

    const startOrPauseDraft = () => {
        if (draftRunning === true) {
            clearInterval(draftInterval.current)
            setDraftRunning(prev => !prev)
        } else {
            setDraftRunning(prev => !prev)
            draftInterval.current = createDraftInterval()
        }
    }

    console.log(draftState)

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

    useEffect(() => {
        for (let [k, v] of Object.entries(pickData)) {
            for (let pick of v) {
                orderedPicks[pick-1] = k
            }
        }
    }, [pickData])

    useEffect(() => {
        if (draftRunning === true)
            draftInterval.current = createDraftInterval()

        return () => clearInterval(draftInterval.current)
    }, [draftState])

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
                {tab === 'draft' && <MdmDraftTab players={players} startOrPauseDraft={startOrPauseDraft} draftRunning={draftRunning} />}
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