import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmMakerSettings from "./MdmMakerSettings.jsx"
import MdmMakerDraft from "./MdmMakerDraft.jsx"

import data from './helpers/picks_2024.json'

const MdmMaker = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([])
  const [teamsMapping, setTeamsMapping] = useState([])
  const [teamsLoaded, setTeamsLoaded] = useState(false)
  const [selected, setSelected] = useState({})
  const [stage, setStage] = useState(1)
  const [pickData, setPickData] = useState(data)
  const [orderedPicks, setOrderedPicks] = useState(new Array(256).fill(""))

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
        setTeams(res)
        setTeamsLoaded(true)
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

      setTeams(_ => newTeams)
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
    <main>
      <div className="flex w-full justify-center items-center p-10">

        {stage === 1 && <>
          {/* Mdm Settings */}
          <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100">
            <MdmMakerSettings 
              teams={teams}
              teamsMapping={teamsMapping}
              selected={selected}
              setSelected={setSelected}
              setTeams={setTeams}
              setStage={setStage}
              pickData={pickData}
              setPickData={setPickData}
            />
          </div>
        </>}

        {stage === 2 && <>
          {/* Mdm Draft */}
          <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100">
            <MdmMakerDraft
              teams={teams}
              selected={selected}
              pickData={pickData}
              setPickData={setPickData}
              orderedPicks={orderedPicks}
            />
          </div>
        </>}

      </div>
    </main>
  </>)
}

export default MdmMaker