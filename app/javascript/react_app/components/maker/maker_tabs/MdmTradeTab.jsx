// External
import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { MdInfo } from "react-icons/md"

// Internal
import PickGrid from "../../helpers/PickGrid"
import useStore from "../../../store/store"
import TradeValue from "../../helpers/TradeValue"
import ButtonOne from "../../helpers/ButtonOne"
import CurrentlyPicking from "../../helpers/CurrentlyPicking"
import { CURRENT_YEAR } from "../../../constants/current"

// Json
import pickValueData from "../maker_static_data/pick_value_rich_hill.json"

// NOTE: reality, future pick value is dependent on many factors
//       - number of picks in future draft (can maybe use avg # in each round)
//       - team outlook (can use projections, or previous year as indicator,
//         or even average over a smaller segment like 1-8 instead of 1-32
//         where 32 is the max in the current round)
//       - can't use it for a year, less value
//
// Ideally: algo is something like slot=(team_rank / 8)
//                                 num_in_slot=(round_picks/8)
//                                 avg(values(slot*num_in_slot...(slot
//                                     +1)*num_in_slot))
//                                 * wait_time_value_percent (0.9?)

// NOTE: uncomment to find averages for future picks
// NOTE: comp picks start round 3 (avg 8)
// for (let i = 1; i < 264; i += i < 64 ? 32 : 40) {
//   let avg = 0
//   for (let j = i; j < i + (i < 64 ? 32 : 40); j += 1) {
//     avg += j in pickValueData ? pickValueData[j] : 1
//   }
//   console.log(avg / (i < 64 ? 32 : 40))
// }

// Extrapolate to fill remaining
for (let i = 225; i < 257; i += 1) {
  const diff = 1

  const pickValueDataVal =
    pickValueData[i - 1] - diff > 0 ? pickValueData[i - 1] - diff : 1

  pickValueData[i] = pickValueDataVal
}

function MdmTradeTab({
  startOrPauseDraft,
  teams,
  selected,
  selectedTeams,
  setSelectedTeams,
  currentPickIndex,
  forceNewIntervalAndContinue
}) {
  // ---------------
  // - Store State -
  // ---------------
  const addAlert = useStore(state => state.addAlert)
  const [userPicking, pickData, setUserPicking, setPickData] = useStore(
    state => [
      state.userPicking,
      state.pickData,
      state.setUserPicking,
      state.setPickData
    ]
  )
  const draftRunning = useStore(state => state.draftRunning)

  // ---------------
  // - Local State -
  // ---------------
  const [localTeams, setLocalTeams] = useState(
    teams.filter(team => !(team.id in selected))
  )
  const [tradePartner, setTradePartner] = useState(localTeams[0].full_name)
  const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].full_name)
  const [activeTrades, setActiveTrades] = useState({})
  const [tradeValue, setTradeValue] = useState(0)

  const findAndSetTradeValue = (tp, ct, newActiveTrades = activeTrades) => {
    let pvd = 0
    if (tp in newActiveTrades)
      newActiveTrades[tp].forEach(value => {
        pvd += pickValueData[value]
      })
    if (ct in newActiveTrades)
      newActiveTrades[ct].forEach(value => {
        pvd -= pickValueData[value]
      })

    setTradeValue(_ => pvd)
  }

  useEffect(() => {
    setSelectedTeams(teams.filter(team => team.id in selected))
    setLocalTeams(teams.filter(team => !(team.id in selected)))
  }, [selected])

  return (
    <div className="flex dark:bg-gray-300 dark:text-gray-900 w-full">
      {draftRunning && !userPicking ? (
        <CurrentlyPicking startOrPauseDraft={startOrPauseDraft} />
      ) : (
        <>
          <div className="flex flex-col items-center border-r-2 w-[31rem]">
            <div className="pt-6 font-bold">Teams you can trade with</div>
            <div className="pt-2">
              <select
                data-testid="tradePartner"
                value={tradePartner}
                onChange={e => handleChange(e, "tradePartner")}
                className="select select-bordered rounded-none w-[20rem] dark:text-gray-100 dark:placeholder-gray-200 dark:bg-gray-500 dark:border-gray-100"
              >
                {localTeams.map(team => (
                  <option key={team.name + team.id.toString()}>
                    {team.full_name}
                  </option>
                ))}
              </select>
            </div>

            <TradeValue
              tradeValue={tradeValue}
              zeroOverride={Object.keys(activeTrades).length > 0}
            />

            <PickGrid
              year={CURRENT_YEAR}
              team={tradePartner}
              isCt={false}
              activeTrades={activeTrades}
              handleTradeClick={handleTradeClick}
            />
          </div>
          <div className="flex flex-col items-center w-[31rem]">
            <div className="pt-6 font-bold">
              {selectedTeams.length > 1 ? "Your teams" : "Your team"}
            </div>
            <div className="pt-2">
              <select
                data-testid="currentTeam"
                value={currentTeam}
                onChange={e => handleChange(e, "currentTeam")}
                className="select select-bordered rounded-none w-[20rem] dark:text-gray-100 dark:placeholder-gray-200 dark:bg-gray-500 dark:border-gray-100"
              >
                {selectedTeams.map(team => (
                  <option key={team.name + team.id.toString()}>
                    {team.full_name}
                  </option>
                ))}
              </select>
            </div>

            <TradeValue
              tradeValue={-tradeValue}
              zeroOverride={Object.keys(activeTrades).length > 0}
            />

            <PickGrid
              year={CURRENT_YEAR}
              team={currentTeam}
              isCt={true}
              activeTrades={activeTrades}
              handleTradeClick={handleTradeClick}
            />

            <div className="flex flex-col justify-center items-center space-y-1 mt-auto pb-12">
              {(tradeValue !== 0 || Object.keys(activeTrades).length > 0) && (
                <div
                  className={clsx(
                    "flex justify-center items-center space-x-2",
                    tradeValue <= 10 && tradeValue >= -10
                      ? "text-success"
                      : "text-error"
                  )}
                >
                  <div
                    className="tooltip"
                    data-tip="Trade values are based on the 2024 Rich Hill model."
                  >
                    <MdInfo className="h-5 w-5" />
                  </div>
                  <span>
                    {tradeValue <= 10 && tradeValue >= -10
                      ? "Accepted"
                      : "Difference Too Big"}
                  </span>
                </div>
              )}
              <ButtonOne handleClick={handleTradeSubmitClick}>
                {tradeValue <= 10 && tradeValue >= -10
                  ? "Make Trade"
                  : "Force Trade Anyway"}
              </ButtonOne>
            </div>
          </div>
        </>
      )}
    </div>
  )

  // Handlers
  function handleChange(e, type) {
    e.preventDefault()

    if (type === "tradePartner") {
      setTradePartner(e.currentTarget.value)
      findAndSetTradeValue(e.currentTarget.value, currentTeam)
    } else if (type === "currentTeam") {
      setCurrentTeam(e.currentTarget.value)
      findAndSetTradeValue(tradePartner, e.currentTarget.value)
    }
  }

  function handleTradeClick(e, type) {
    let k = null
    let pickInt = null
    if (e.currentTarget.innerText) {
      pickInt = parseInt(e.currentTarget.innerText)
    } else {
      pickInt = parseInt(e.currentTarget.textContent)
    }

    if (type === "tradePartner") k = tradePartner
    if (type === "currentTeam") k = currentTeam

    const newActiveTrades = { ...activeTrades }
    if (k in activeTrades && activeTrades[k].includes(pickInt)) {
      newActiveTrades[k] = newActiveTrades[k].filter(x => x !== pickInt)

      // So that we can show a trade value message at 0
      if (newActiveTrades[k].length === 0) {
        delete newActiveTrades[k]
      }
    } else if (k in newActiveTrades) {
      newActiveTrades[k].push(pickInt)
    } else {
      newActiveTrades[k] = [pickInt]
    }

    findAndSetTradeValue(tradePartner, currentTeam, newActiveTrades)
    setActiveTrades(_ => ({
      ...newActiveTrades
    }))
  }

  function handleTradeSubmitClick() {
    const oldTp = pickData[tradePartner]
    const oldCt = pickData[currentTeam]

    const activeTp =
      tradePartner in activeTrades ? activeTrades[tradePartner] : []
    const activeCt =
      currentTeam in activeTrades ? activeTrades[currentTeam] : []

    if (activeTp.length === 0 && activeCt.length === 0) {
      addAlert({
        type: "error",
        message: "You must select picks to trade first!"
      })
    } else {
      const newTp = oldTp
        .filter(x => !activeTp.includes(x))
        .concat(activeCt)
        .sort((a, b) => a - b)
      const newCt = oldCt
        .filter(x => !activeCt.includes(x))
        .concat(activeTp)
        .sort((a, b) => a - b)

      setPickData({
        ...pickData,
        [tradePartner]: newTp,
        [currentTeam]: newCt
      })

      if (userPicking && oldCt[0] !== newCt[0]) {
        forceNewIntervalAndContinue()
      } else if (
        draftRunning &&
        !userPicking &&
        newCt[0] === currentPickIndex + 1
      ) {
        setUserPicking(true)
      }

      setActiveTrades(_ => ({}))
      setTradeValue(_ => 0)

      addAlert({
        type: "success",
        message: "Trade completed."
      })
    }
  }
}

export default MdmTradeTab
