// External
import React, { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"

// Internal
import MdmMakerSettings from "./MdmMakerSettings"
import MdmMakerDraft from "./MdmMakerDraft"
import MdmMakerShare from "./MdmMakerShare"
import MdmAlerts from "./MdmAlerts"
import MdmMakerSkeleton from "./MdmMakerSkeleton"
import ArrowSvg from "../helpers/svgs/ArrowSvg"
import useStore from "../../store/store"
import ROUTES from "../../constants/routes"
import { getTeams, getPlayers } from "../../api/apiRoutes"

import arizona_cardinals from "../../images/arizona_cardinals.png"
import atlanta_falcons from "../../images/atlanta_falcons.png"
import baltimore_ravens from "../../images/baltimore_ravens.png"
import buffalo_bills from "../../images/buffalo_bills.png"

import carolina_panthers from "../../images/carolina_panthers.png"
import chicago_bears from "../../images/chicago_bears.png"
import cincinnati_bengals from "../../images/cincinnati_bengals.png"
import cleveland_browns from "../../images/cleveland_browns.png"

import dallas_cowboys from "../../images/dallas_cowboys.png"
import denver_broncos from "../../images/denver_broncos.png"
import detroit_lions from "../../images/detroit_lions.png"
import green_bay_packers from "../../images/green_bay_packers.png"

import houston_texans from "../../images/houston_texans.png"
import indianapolis_colts from "../../images/indianapolis_colts.png"
import jacksonville_jaguars from "../../images/jacksonville_jaguars.png"
import kansas_city_chiefs from "../../images/kansas_city_chiefs.png"

import las_vegas_raiders from "../../images/las_vegas_raiders.png"
import los_angeles_chargers from "../../images/los_angeles_chargers.png"
import los_angeles_rams from "../../images/los_angeles_rams.png"
import miami_dolphins from "../../images/miami_dolphins.png"

import minnesota_vikings from "../../images/minnesota_vikings.png"
import new_england_patriots from "../../images/new_england_patriots.png"
import new_orleans_saints from "../../images/new_orleans_saints.png"
import new_york_giants from "../../images/new_york_giants.png"

import new_york_jets from "../../images/new_york_jets.png"
import philadelphia_eagles from "../../images/philadelphia_eagles.png"
import pittsburgh_steelers from "../../images/pittsburgh_steelers.png"
import san_francisco_49ers from "../../images/san_francisco_49ers.png"

import seattle_seahawks from "../../images/seattle_seahawks.png"
import tampa_bay_buccaneers from "../../images/tampa_bay_buccaneers.png"
import tennessee_titans from "../../images/tennessee_titans.png"
import washington_commanders from "../../images/washington_commanders.png"

function MdmMaker() {
  // ---------------------
  // - Other State/Hooks -
  // ---------------------
  const navigate = useNavigate()

  // ---------------
  // - Store State -
  // ---------------
  const pickData = useStore(state => state.pickData)
  const [setPlayers] = useStore(state => [state.setPlayers])
  const [setTeams, setTeamsMapping] = useStore(state => [
    state.setTeams,
    state.setTeamsMapping
  ])
  const [orderedPicks, setOrderedPicks] = useStore(state => [
    state.orderedPicks,
    state.setOrderedPicks
  ])
  const resetDraftSlice = useStore(state => state.resetDraftSlice)
  const addAlert = useStore(state => state.addAlert)

  // ---------------
  // - Local State -
  // ---------------
  const [stage, setStage] = useState(1)

  // -----------
  // - Helpers -
  // -----------

  // Have to do it like this because of Rails asset bullshit
  const teamToImage = useMemo(
    () => ({
      arizona_cardinals,
      atlanta_falcons,
      baltimore_ravens,
      buffalo_bills,

      carolina_panthers,
      chicago_bears,
      cincinnati_bengals,
      cleveland_browns,

      dallas_cowboys,
      denver_broncos,
      detroit_lions,
      green_bay_packers,

      houston_texans,
      indianapolis_colts,
      jacksonville_jaguars,
      kansas_city_chiefs,

      las_vegas_raiders,
      los_angeles_chargers,
      los_angeles_rams,
      miami_dolphins,

      minnesota_vikings,
      new_england_patriots,
      new_orleans_saints,
      new_york_giants,

      new_york_jets,
      philadelphia_eagles,
      pittsburgh_steelers,
      san_francisco_49ers,

      seattle_seahawks,
      tampa_bay_buccaneers,
      tennessee_titans,
      washington_commanders
    }),
    []
  )

  // ---------------
  // - Query State -
  // ---------------
  const ONE_DAY = 24 * 60 * 60 * 1000
  const teamsQuery = useQuery("teams", getTeams, {
    staleTime: ONE_DAY
  })

  if (teamsQuery.isError) {
    navigate(ROUTES.HOME)
  }

  const playersQuery = useQuery("players", getPlayers, {
    staleTime: ONE_DAY
  })

  if (playersQuery.isError) {
    navigate(ROUTES.HOME)
  }

  // -------------
  // - Lifecycle -
  // -------------
  useEffect(() => {
    resetDraftSlice()

    // No longer needed, clear it
    return () => resetDraftSlice()
  }, [])

  useEffect(() => {
    if (teamsQuery.status === "success") {
      setTeams(teamsQuery.data)
    }
  }, [teamsQuery.status, teamsQuery.data])

  useEffect(() => {
    if (playersQuery.status === "success") {
      setPlayers(playersQuery.data)
    }
  }, [playersQuery.status, playersQuery.data])

  useEffect(() => {
    if (teamsQuery.status === "success" && pickData !== undefined) {
      const teamsHash = {}
      for (const team of teamsQuery.data) {
        teamsHash[team.full_name] = team
      }

      const newOrderedPicks = orderedPicks
      for (const [k, v] of Object.entries(pickData)) {
        for (const pick of v) {
          newOrderedPicks[pick - 1] = teamsHash[k]
        }
      }

      const teamsMap = []
      const newTeams = []
      const seen = new Set()
      for (const [i, op] of Object.entries(newOrderedPicks)) {
        if (op === undefined) {
          addAlert({
            message: "Bad team data, not every team has an associated pick",
            type: "error"
          })

          return
        }

        // 32 teams
        if (seen.size < 32) {
          if (!seen.has(op.full_name)) {
            seen.add(op.full_name)
            // set the 'display pick' (first_pick)
            // then use teamsMap as a reference for updating it
            op.first_pick = parseInt(i) + 1
            newTeams.push(op)
          }
          teamsMap.push(op.full_name)
        } else {
          break
        }
      }

      setTeams(newTeams)
      setTeamsMapping(teamsMap)
      setOrderedPicks(newOrderedPicks)
    }
  }, [pickData, teamsQuery.status, teamsQuery.data])

  return (
    <>
      <main className="flex flex-col grow justify-center items-center bg-gradient-to-t from-base-100 dark:from-gray-500 via-base-300 to-gray-300 dark:to-gray-100 makermax:hidden">
        <MdmAlerts />

        {teamsQuery.status === "loading" ? (
          <MdmMakerSkeleton />
        ) : (
          <>
            {stage === 1 && (
              <>
                <div className="relative -top-6">
                  <div className="absolute z-40 right-28">
                    <ArrowSvg />
                  </div>
                  <span className="absolute z-40 -left-[6.5rem] -top-[0.5rem] w-[24rem] text-xl font-semibold font-marker reveal">
                    click to select, drag to reorder
                  </span>
                </div>

                <section className="flex flex-row mb-14 card w-[82rem] h-[42rem] shadow-xl rounded-none bg-base-100 dark:bg-gray-700 z-30">
                  <MdmMakerSettings
                    setStage={setStage}
                    teamToImage={teamToImage}
                  />
                </section>
              </>
            )}

            {stage === 2 && (
              <>
                <section className="flex flex-row mb-14 card w-[82rem] h-[42rem] shadow-xl rounded-none bg-base-100 dark:bg-gray-700 z-30">
                  <MdmMakerDraft
                    setStage={setStage}
                    playersLoaded={playersQuery.status}
                    teamToImage={teamToImage}
                  />
                </section>
              </>
            )}

            {stage === 3 && (
              <>
                <section className="flex flex-row mb-14 card w-[82rem] h-[42rem] rounded-none z-30">
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
