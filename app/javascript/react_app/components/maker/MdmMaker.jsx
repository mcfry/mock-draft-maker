import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import MdmMakerSettings from "./MdmMakerSettings"
import MdmMakerDraft from "./MdmMakerDraft"
import MdmMakerShare from "./MdmMakerShare"
import MdmAlerts from "./MdmAlerts"
import MdmMakerSkeleton from "./MdmMakerSkeleton"
import useStore from "../../store/store"
import ROUTES from "../../constants/routes"

import data from "./maker_static_data/picks_2024.json"

function MdmMaker() {
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
  const addAlert = useStore(state => state.addAlert)

  useEffect(() => {
    const url = "/api/v1/teams/index"
    axios
      .get(url)
      .then(res => {
        if (res.data.length > 0) {
          setTeams(res.data)
          setTeamsLoaded(true)
        } else {
          console.log("No teams")
        }
      })
      .catch(() => navigate(ROUTES.HOME))
  }, [])

  useEffect(() => {
    if (teamsLoaded === true && pickData !== undefined) {
      const teamsHash = {}
      for (const team of teams) {
        teamsHash[team.full_name] = team
      }

      for (const [k, v] of Object.entries(pickData)) {
        for (const pick of v) {
          orderedPicks[pick - 1] = teamsHash[k]
        }
      }

      const teamsMap = []
      const newTeams = []
      const seen = new Set()
      for (const [i, op] of Object.entries(orderedPicks)) {
        if (op === undefined) {
          addAlert({
            message: "Bad team data, not every team has an associated pick",
            type: "Error"
          })

          return
        }

        if (seen.size < 32) {
          if (!seen.has(op.full_name)) {
            seen.add(op.full_name)
            op.first_pick = parseInt(i) + 1
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

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Maker
          </h1>
        </div>
      </header>

      {/* Animation */}
      <ul className="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>

      <main className="flex flex-col grow justify-center items-center bg-gradient-to-t from-base-100 via-base-300 to-base-300 p-10 makermax:hidden">
        <MdmAlerts />

        {teamsLoaded === false ? (
          <MdmMakerSkeleton />
        ) : (
          <>
            {stage === 1 && (
              <>
                <div className="relative -top-7">
                  <div className="absolute z-40 right-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="45"
                    >
                      <g
                        fill="none"
                        stroke="#000"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeMiterlimit="20"
                      >
                        <path d="M87.548 6.072c-21.556.856-42.411-3.021-63.754-3.035C4.07 3.024 7.433 21.816 9.215 36.406" />
                        <path
                          strokeLinejoin="round"
                          d="M2.452 32.48c3.721 2.326 4.349 6.604 7.403 9.482 1.045-3.027 3.442-9.07 6.125-11.113"
                        />
                      </g>
                    </svg>
                  </div>
                  <span className="absolute z-40 -left-[4.5rem] -top-[0.3rem] w-32 font-semibold">
                    Drag to reorder
                  </span>
                </div>

                {/* Mdm Settings */}
                <section className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
                  <MdmMakerSettings
                    teamsMapping={teamsMapping}
                    setStage={setStage}
                    pickData={pickData}
                    setPickData={setPickData}
                  />
                </section>
              </>
            )}

            {stage === 2 && (
              <>
                {/* Mdm Draft */}
                <section className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
                  <MdmMakerDraft
                    setStage={setStage}
                    pickData={pickData}
                    setPickData={setPickData}
                    orderedPicks={orderedPicks}
                  />
                </section>
              </>
            )}

            {stage === 3 && (
              <>
                {/* Mdm Share */}
                <section className="flex flex-row card w-[74rem] h-[35rem] shadow-xl rounded bg-base-100 z-30">
                  <MdmMakerShare />
                </section>
              </>
            )}
          </>
        )}
      </main>

      {/* Small screens */}
      <main className="flex flex-col grow justify-center items-center bg-gradient-to-t from-base-100 via-base-300 to-base-300 p-10 makermin:hidden space-y-4">
        <p>
          <span className="font-semibold">Mock Draft Maker</span> is only
          available on a larger screen&nbsp;
          <span className="italic">for the moment.</span>
        </p>
        <p className="text-xl">Stay tuned!</p>
      </main>
    </>
  )
}

export default MdmMaker
