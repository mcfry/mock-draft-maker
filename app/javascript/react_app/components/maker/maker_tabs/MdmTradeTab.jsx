// External
import React, { useState, useEffect } from "react"
import { GrPauseFill } from "react-icons/gr"

// Internal
import PickGrid from "../../helpers/PickGrid"
import useStore from "../../../store/store"
import TradeValue from "../../helpers/TradeValue"

// Json
import pickValueData from "../maker_static_data/pick_value_rich_hill.json"

// Extrapolate so don't have to manually enter everything
for (let i = 17; i < 257; i += 1) {
  let diff = 0
  if (i <= 20) {
    diff = 9
  } else if (i <= 24) {
    diff = 8
  } else if (i <= 32) {
    diff = 7
  } else if (i <= 35) {
    diff = 5
  } else if (i <= 47) {
    diff = 4
  } else if (i <= 56) {
    diff = 3
  } else if (i <= 68) {
    diff = 2
  } else {
    diff = 1
  }

  const pickValueDataVal =
    pickValueData[i - 1] - diff > 0 ? pickValueData[i - 1] - diff : 1

  pickValueData[i] = pickValueDataVal
}

function MdmTradeTab({
  startOrPauseDraft,
  teams,
  selected,
  pickData,
  setPickData,
  selectedTeams,
  setSelectedTeams,
  draftRunning,
  userPicking,
  setUserPicking,
  currentPickIndex,
  forceNewIntervalAndContinue
}) {
  const [localTeams, setLocalTeams] = useState(
    teams.filter(team => !(team.id in selected))
  )
  const [tradePartner, setTradePartner] = useState(localTeams[0].full_name)
  const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].full_name)
  const [activeTrades, setActiveTrades] = useState({})
  const [tradeValue, setTradeValue] = useState(0)

  const addAlert = useStore(state => state.addAlert)

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
    <>
      {draftRunning && !userPicking ? (
        <div className="flex flex-col justify-center items-center w-[62rem] space-y-8">
          <span className="text-info text-5xl whitespace-nowrap">
            Can&apos;t trade while draft is running.
          </span>
          <button
            type="button"
            className="btn btn-lg rounded-none"
            onClick={() => startOrPauseDraft()}
          >
            <GrPauseFill />
            &nbsp;Pause
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center border-r-2 w-[31rem]">
            <div className="pt-6">
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

            <TradeValue tradeValue={tradeValue} />

            <PickGrid
              year={2024}
              pickData={pickData}
              team={tradePartner}
              isCt={false}
              activeTrades={activeTrades}
              handleTradeClick={handleTradeClick}
            />
          </div>
          <div className="flex flex-col items-center w-[31rem]">
            <div className="pt-6">
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

            <TradeValue tradeValue={-tradeValue} />

            <PickGrid
              year={2024}
              pickData={pickData}
              team={currentTeam}
              isCt={true}
              activeTrades={activeTrades}
              handleTradeClick={handleTradeClick}
            />

            <div className="flex flex-col justify-center items-center mt-auto pb-12">
              {tradeValue !== 0 && (
                <div
                  className={
                    tradeValue <= 10 && tradeValue >= -10
                      ? "text-success"
                      : "text-error"
                  }
                >
                  {tradeValue <= 10 && tradeValue >= -10
                    ? "Accepted"
                    : "Difference Too Big"}
                </div>
              )}
              <button
                type="button"
                onClick={handleTradeSubmitClick}
                className="btn rounded-none"
              >
                {tradeValue <= 10 && tradeValue >= -10
                  ? "Make Trade"
                  : "Force Trade Anyway"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
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

      setPickData(prev => ({
        ...prev,
        [tradePartner]: newTp,
        [currentTeam]: newCt
      }))

      if (userPicking && oldCt[0] !== newCt[0]) {
        forceNewIntervalAndContinue()
      } else if (!userPicking && newCt[0] === currentPickIndex + 1) {
        setUserPicking(_ => true)
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
