// External
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../../other/axiosClient"

// Internal
import MdmMakerSettings from "./MdmMakerSettings"
import MdmMakerDraft from "./MdmMakerDraft"
import MdmMakerShare from "./MdmMakerShare"
import MdmAlerts from "./MdmAlerts"
import MdmMakerSkeleton from "./MdmMakerSkeleton"
import ArrowSvg from "../helpers/svgs/ArrowSvg"
import useStore from "../../store/store"
import ROUTES from "../../constants/routes"

// Json
import data from "./maker_static_data/picks_2024.json"

function MdmMaker() {
  const navigate = useNavigate()

  // Local State
  // map the dnd reordering for each team's first first-round pick
  const [teamsMapping, setTeamsMapping] = useState([])
  const [teamsLoaded, setTeamsLoaded] = useState(false)
  const [players, setPlayers] = useState([])
  const [playersLoaded, setPlayersLoaded] = useState(false)
  const [stage, setStage] = useState(1)
  const [pickData, setPickData] = useState(data)
  const [orderedPicks, setOrderedPicks] = useState(new Array(256).fill(""))

  // Store State
  const [teams, setTeams] = useStore(state => [state.teams, state.setTeams])
  const addAlert = useStore(state => state.addAlert)

  // Lifecycle Hooks
  useEffect(() => {
    const url = "/api/v1/teams/index"
    axiosClient
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
    const url = "/api/v1/players/index"
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(res => {
        setPlayersLoaded(true)
        setPlayers(res)
      })
      .catch(() => navigate("/"))
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
      <main className="flex flex-col grow justify-center items-center bg-gradient-to-t from-base-100 dark:from-gray-500 via-base-300 to-base-300 dark:to-gray-100 makermax:hidden">
        <MdmAlerts />

        {teamsLoaded === false ? (
          <MdmMakerSkeleton />
        ) : (
          <>
            {stage === 1 && (
              <>
                <div className="relative -top-6">
                  <div className="absolute z-40 right-20">
                    <ArrowSvg />
                  </div>
                  <span className="absolute z-40 -left-[4.5rem] -top-[0.5rem] w-48 text-xl font-semibold font-marker">
                    Drag to reorder
                  </span>
                </div>

                {/* Mdm Settings */}
                <section className="flex flex-row mb-14 card w-[74rem] h-[39rem] shadow-xl rounded-none bg-base-100 dark:bg-gray-700 z-30">
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
                <section className="flex flex-row mb-14 card w-[74rem] h-[39rem] shadow-xl rounded-none bg-base-100 dark:bg-gray-700 z-30">
                  <MdmMakerDraft
                    setStage={setStage}
                    pickData={pickData}
                    setPickData={setPickData}
                    orderedPicks={orderedPicks}
                    players={players}
                    setPlayers={setPlayers}
                    playersLoaded={playersLoaded}
                  />
                </section>
              </>
            )}

            {stage === 3 && (
              <>
                {/* Mdm Share */}
                <section className="flex flex-row mb-14 card w-[74rem] h-[39rem] shadow-xl rounded-none bg-base-100 dark:bg-gray-700 z-30">
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
