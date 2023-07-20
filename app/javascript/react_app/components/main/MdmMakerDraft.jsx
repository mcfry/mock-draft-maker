import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import MdmTradeTab from "./helpers/MdmTradeTab"
import MdmDraftTab from "./helpers/MdmDraftTab"
import MdmAnalysisTab from "./helpers/MdmAnalysisTab"

import needsData from './helpers/needs_2024.json'
import positionalData from './helpers/positional_value.json'

import Fuse from "fuse.js";

const MdmMakerDraft = ({ teams, selected, pickData, setPickData, orderedPicks }) => {
    const navigate = useNavigate();
    const [selectedTeams, setSelectedTeams] = useState(teams.filter(team => team.id in selected))
    const [players, setPlayers] = useState([])
    const [tab, setTab] = useState('trade')
    const [speed, setSpeed] = useState(80)
    const [needsVsValue, setNeedsVsValue] = useState(50)
    const [randomness, setRandomness] = useState(10)
    const [draftRunning, setDraftRunning] = useState(false)
    const [draftState, setDraftState] = useState({})
    const [search, setSearch] = useState("")
    const [localPlayers, setLocalPlayers] = useState(players)

    let draftInterval = useRef(undefined)
    const fuse = useRef(new Fuse(players, {
        keys: [
            "last",
            "first"
        ]
    }))

    const createDraftInterval = () => {
        return setInterval(() => {
            let total = Object.keys(draftState).length
            let teamPicking = orderedPicks[total].full_name
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
            picking = orderedPicks[Object.keys(draftState).length].full_name
            if (!selectedTeams.includes(picking)) {
                setDraftRunning(prev => !prev)
                draftInterval.current = createDraftInterval()
            } else {
                console.log('Must pick')
            }
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
    }, [])

    // stop on team
    useEffect(() => {
        picking = orderedPicks[Object.keys(draftState).length].full_name
        console.log(picking, selectedTeams.includes(picking))
        if (draftRunning === true && !selectedTeams.includes(picking))
            draftInterval.current = createDraftInterval()

        return () => clearInterval(draftInterval.current)
    }, [draftState])

    useEffect(() => {
        if (search !== "") {
            setLocalPlayers(fuse.current.search(search).map(searchItem => searchItem.item))
        } else {
            setLocalPlayers(players)
        }
    }, [search])

    useEffect(() => {
        fuse.current.setCollection(players)

        if (search !== "") {
            setLocalPlayers(fuse.current.search(search).map(searchItem => searchItem.item))
        } else {
            setLocalPlayers(players)
        }
    }, [players])


    let currentPick = Object.keys(draftState).length
    let currentRound = parseInt(currentPick / 32)
    let roundStart = currentRound * 32
    let roundEnd = Math.min(roundStart + 32, 256)

    // console.log(currentPick)
    // console.log(currentRound)
    // console.log(roundStart)
    // console.log(roundEnd)
    return (<>
        {/* PMenu */}
        <div className="overflow-x-hidden overflow-y-auto border-r-2">
            <ul className="menu bg-base-200 w-[20rem] p-0 [&_li>*]:rounded-none divide-y">
                {orderedPicks.slice(roundStart, roundEnd).map((team, index) => (
                    currentPick >= index+1 ? 
                        <li key={team.full_name + "_" + index.toString()}>
                            <div className="flex justify-center items-center">
                                <a className="text-sm">{team.full_name}: {draftState[index+1].first + " " + draftState[index+1].last}</a>
                            </div>
                        </li>
                    :
                        <li key={team.full_name + "_" + index.toString()}>
                            <div className="flex justify-center items-center">
                                <a className="text-lg">{team.full_name}: {index+1}</a>
                            </div>
                        </li>
                ))}
            </ul>
        </div>

        {/* Trade Stuff + PInfo */}
        <div className="flex flex-col">
            <div className="navbar bg-base-300">
                <button onClick={startOrPauseDraft} className="btn rounded-none">{draftRunning ? "Pause" : "Start"}</button>

                <div className="flex justify-end w-full">
                    <div className="flex-none gap-2">
                        <div className="form-control pr-4">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} name="search" type="text" placeholder="Search" className="input input-bordered rounded-none w-24 md:w-auto" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs border-b-2">
                <a onClick={(e) => handleClick(e, 'trade')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'trade' ? "tab-active" : "")}>Trade</a> 
                <a onClick={(e) => handleClick(e, 'draft')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'draft' ? "tab-active" : "")}>Draft a Player</a> 
                <a onClick={(e) => handleClick(e, 'analysis')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'analysis' ? "tab-active" : "")}>Analysis</a>
            </div>

            <div className="flex justify-evenly w-[54rem] h-full">
                {tab === 'trade' && <MdmTradeTab teams={teams} selected={selected} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} pickData={pickData} setPickData={setPickData} />}
                {tab === 'draft' && <MdmDraftTab localPlayers={localPlayers} atPick={currentPick + 1} />}
                {tab === 'analysis' && <MdmAnalysisTab />}
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