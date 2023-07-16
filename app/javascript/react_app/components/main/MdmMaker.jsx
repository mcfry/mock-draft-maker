import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmMakerSettings from "./MdmMakerSettings.jsx"
import MdmMakerDraft from "./MdmMakerDraft.jsx"

const MdmMaker = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([])
  const [selected, setSelected] = useState({})
  const [stage, setStage] = useState(1)

  useEffect(() => {
    const url = "/api/v1/teams/index"
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setTeams(res))
      .catch(() => navigate("/"))
  }, []);

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
              selected={selected}
              setSelected={setSelected}
              setTeams={setTeams}
              setStage={setStage}
            />
          </div>
        </>}

        {stage === 2 && <>
          {/* Mdm Draft */}
          <div className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100">
            <MdmMakerDraft
              teams={teams}
              selected={selected}
            />
          </div>
        </>}

      </div>
    </main>
  </>)
}

export default MdmMaker