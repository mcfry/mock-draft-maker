import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmMakerSettings from "./MdmMakerSettings.jsx"
import MdmMakerDraft from "./MdmMakerDraft.jsx"
import MdmMakerShare from "./MdmMakerShare.jsx"
import MdmAlerts from "./MdmAlerts.jsx"
import useStore from '../../store/store.js'

import data from './helpers/picks_2024.json'

const MdmMaker = () => {
  const navigate = useNavigate()

  // Local State
  // map the dnd reordering for each team's first first-round pick
  const [teamsMapping, setTeamsMapping] = useState([])
  const [teamsLoaded, setTeamsLoaded] = useState(false)
  const [stage, setStage] = useState(1)
  const [pickData, setPickData] = useState(data)
  const [orderedPicks, setOrderedPicks] = useState(new Array(256).fill(""))

  // Store State
  const [teams, setTeams] = useStore(state => [state.teams, state.setTeams])

  useEffect(() => {
    const url = "/api/v1/teams/index"
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => {
        if (res.length > 0) {
          setTeams(res)
          setTeamsLoaded(true)
        } else {
          console.log('No teams')
        }
      })
      .catch(() => navigate("/"))
  }, [])

  useEffect(() => {
    if (teamsLoaded === true) {
      let teamsHash = {}
      for (let team of teams) {
        teamsHash[team.full_name] = team
      }

      for (let [k, v] of Object.entries(pickData)) {
        for (let pick of v) {
          orderedPicks[pick-1] = teamsHash[k]
        }
      }

      let teamsMap = []
      let newTeams = []
      let seen = new Set()
      for (let [i, op] of Object.entries(orderedPicks)) {
        if (seen.size < 32) {
          if (!(seen.has(op.full_name))) {
            seen.add(op.full_name)
            op.first_pick = parseInt(i)+1
            newTeams.push(op)
            teamsMap.push(op.first_pick)
          }
        } else {
          break
        }
      }

      setTeams(newTeams)
      setTeamsMapping(_ => teamsMap)
      setOrderedPicks(_ => orderedPicks)
    }
  }, [pickData, teamsLoaded])

  return (<>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Maker</h1>
      </div>
    </header>

    {/* Animation */}
    <ul className="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div className="flex flex-col grow justify-center items-center bg-gradient-to-t from-base-100 via-base-300 to-base-300 p-10">
      <MdmAlerts />

      {stage === 1 && <>
        <div className="relative -top-7">
          <div className="absolute z-40 right-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="45"><g fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="20"><path d="M87.548 6.072c-21.556.856-42.411-3.021-63.754-3.035C4.07 3.024 7.433 21.816 9.215 36.406"/><path strokeinejoin="round" d="M2.452 32.48c3.721 2.326 4.349 6.604 7.403 9.482 1.045-3.027 3.442-9.07 6.125-11.113"/></g></svg>
          </div>
          <span className="absolute z-40 -left-[4.5rem] -top-[0.3rem] w-32 font-semibold">
            Drag to reorder
          </span>
        </div>

        {/* Mdm Settings */}
        <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
          <MdmMakerSettings 
            teamsMapping={teamsMapping}
            setStage={setStage}
            pickData={pickData}
            setPickData={setPickData}
          />
        </div>
      </>}

      {stage === 2 && <>
        {/* Mdm Draft */}
        <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
          <MdmMakerDraft
            setStage={setStage}
            pickData={pickData}
            setPickData={setPickData}
            orderedPicks={orderedPicks}
          />
        </div>
      </>}

      {stage === 3 && <>
        {/* Mdm Share */}
        <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
          <MdmMakerShare />
        </div>
      </>}

    </div>
  </>)
}

export default MdmMaker