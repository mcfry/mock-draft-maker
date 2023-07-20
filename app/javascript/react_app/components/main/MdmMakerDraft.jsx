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
    const [userPicking, setUserPicking] = useState(false)
    const [search, setSearch] = useState("")
    const [localPlayers, setLocalPlayers] = useState(players)
    const [preselectedPick, setPreselectedPick] = useState(null)

    const pickModal = useRef(null)
    let draftInterval = useRef(undefined)
    const fuse = useRef(new Fuse(players, {
        keys: [
            "last",
            "first"
        ]
    }))

    const pickPlayer = (playerToAdd, total) => {
        if (!total) {
            total = Object.keys(draftState).length
        }

        setDraftState(prev => ({
            ...prev,
            [total+1]: playerToAdd
        }))

        // Remove from possible picks
        removePlayer(playerToAdd)

        // Remove pick data (trades)
        oldPd = pickData[orderedPicks[total].full_name]
        setPickData(prev => ({
            ...prev,
            [orderedPicks[total].full_name]: oldPd.slice(1)
        }))
    }

    const removePlayer = (playerToRemove) => {
        let idx = players.indexOf(playerToRemove)
        setPlayers(_ => players.slice(0, idx).concat(players.slice(idx+1)))
    }

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

                pickPlayer(possibleNeeds[curPick], total)
            } else {
                let curPick = parseInt(Math.random() * possiblePositional.length * ((100-needsVsValue)*.01))

                pickPlayer(possiblePositional[curPick][0], total)
            }
        }, 1000)
    }

    const startOrPauseDraft = () => {
        if (draftRunning === true) {
            clearInterval(draftInterval.current)
            setDraftRunning(prev => !prev)
        } else {
            picking = orderedPicks[Object.keys(draftState).length]
            playerIsPicking = selectedTeams.includes(picking)
            if (draftRunning === true && playerIsPicking) {
                setDraftRunning(_ => false)
                setUserPicking(_ => true)
                setTab('draft')
            } else {
                setDraftRunning(_ => true)
                setUserPicking(_ => false)
                setTab('draft')
                draftInterval.current = createDraftInterval()
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

    useEffect(() => {
        picking = orderedPicks[Object.keys(draftState).length]
        // stop on selected team
        if (draftRunning === true && !selectedTeams.includes(picking)) {
            draftInterval.current = createDraftInterval()
            // setDraftRunning(_ => false) // only can do 2 picks with this
            setUserPicking(_ => false)
        } else if (draftRunning === true) {
            setUserPicking(_ => true)
            setTab('draft')
        }

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

    return (<>
        {/* PMenu */}
        <div className="overflow-x-hidden overflow-y-auto border-r-2">
            <ul className="menu bg-base-200 w-[20rem] p-0 [&_li>*]:rounded-none divide-y">
                {orderedPicks.slice(roundStart, roundEnd).map((team, index) => {
                    index = roundStart + index

                    return currentPick >= index+1 ? 
                        <li key={team.name + "_" + index.toString()}>
                            <div className="flex justify-center items-center">
                                <a className="text-sm">{team.name}: {draftState[index+1].full_name} ({draftState[index+1].position})</a>
                            </div>
                        </li>
                    :
                        <li key={team.name + "_" + index.toString()}>
                            <div className="flex justify-center items-center">
                                <a className="text-lg">{team.name}: {index+1}</a>
                            </div>
                        </li>
                })}
            </ul>
        </div>

        {/* Trade Stuff + PInfo */}
        <div className="flex flex-col">
            <div className="navbar bg-base-300">
                {!userPicking && 
                    <button onClick={startOrPauseDraft} className="btn rounded-none">
                        {draftRunning ? "Pause" : "Start"}
                    </button>
                }

                <div>&nbsp;&nbsp;&nbsp;</div>

                <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
                    <span className="countdown font-mono text-xl">
                    <span style={{"--value":currentRound+1}}></span>
                    </span>
                    <span className="text-xs">Round</span>
                </div>

                <div>&nbsp;&nbsp;</div>

                <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
                    <span className="countdown font-mono text-xl">
                    <span style={{"--value":currentPick}}></span>
                    </span>
                    <span className="text-xs">Pick</span>
                </div>

                <div>&nbsp;&nbsp;&nbsp;</div>

                <div className="flex justify-end w-full">
                    {(tab === 'draft' && userPicking && preselectedPick) && 
                    <button 
                        className="btn bg-primary hover:bg-secondary text-base-100 rounded-none pr-4"
                        onClick={() => {
                            if (pickModal.current) {
                                return pickModal.current.showModal()
                            }
                        }}
                    >
                        Draft Player
                    </button>}

                    <div className="flex-none gap-2">
                        <div className="form-control pl-2 pr-4">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} name="search" type="text" placeholder="Search" className="input input-bordered rounded-none w-24 md:w-auto" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs border-b-2">
                <a onClick={(e) => handleClick(e, 'trade')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'trade' ? "tab-active" : "")}>Trade</a> 
                <a onClick={(e) => handleClick(e, 'draft')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'draft' ? "tab-active" : "")}>Draft a Player</a> 
                <a onClick={(e) => handleClick(e, 'analysis')} className={classNames("tab tab-bordered border-info tab-lg", tab === 'analysis' ? "tab-active" : "")}>Analysis</a>
                {userPicking && <div className="flex justify-end items-center h-full pl-48">
                    <div className="text-xl font-bold text-error whitespace-nowrap">You are picking</div>
                </div>}
            </div>

            <div className="flex justify-evenly w-[54rem] h-full">
                {tab === 'trade' && <MdmTradeTab teams={teams} selected={selected} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} pickData={pickData} setPickData={setPickData} draftRunning={draftRunning} userPicking={userPicking} />}
                {tab === 'draft' && <MdmDraftTab localPlayers={localPlayers}   preselectedPick={preselectedPick} setPreselectedPick={setPreselectedPick} userPicking={userPicking} pickModal={pickModal} pickPlayer={pickPlayer} />}
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