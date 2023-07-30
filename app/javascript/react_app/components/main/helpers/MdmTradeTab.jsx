import React, { useState, useEffect } from "react"
import PickGrid from "./PickGrid"

import pickValueData from "./pick_value_rich_hill.json"
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
  teams,
  selected,
  pickData,
  setPickData,
  selectedTeams,
  setSelectedTeams,
  draftRunning,
  userPicking,
  forceNewIntervalAndContinue
}) {
  // useState
  const [localTeams, setLocalTeams] = useState(
    teams.filter(team => !(team.id in selected))
  )
  const [tradePartner, setTradePartner] = useState(teams[0].full_name)
  const [currentTeam, setCurrentTeam] = useState(selectedTeams[0].full_name)
  const [activeTrades, setActiveTrades] = useState({})
  const [tradeValue, setTradeValue] = useState(0)

  const findAndSetTradeValue = (tp, ct) => {
    let pvd = 0
    if (tp in activeTrades)
      activeTrades[tp].forEach(value => {
        pvd += pickValueData[value]
      })
    if (ct in activeTrades)
      activeTrades[ct].forEach(value => {
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
        <div className="flex justify-center items-center w-[54rem]">
          <span className="text-info text-5xl whitespace-nowrap">
            Can&apos;t trade while draft is running.
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center border-r-2 w-[27rem]">
            <div className="pt-6">
              <select
                onChange={e => handleChange(e, "tradePartner")}
                className="select select-bordered rounded-none w-[20rem]"
              >
                {localTeams.map(team => (
                  <option key={team.name + team.id.toString()}>
                    {team.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4" />
            {tradeValue > 0 && (
              <div className="text-success">Trade Value: {tradeValue}</div>
            )}
            {tradeValue < 0 && (
              <div className="text-error">Trade Value: {tradeValue}</div>
            )}
            <div className="flex justify-center border-b-2 pt-2">2024</div>
            <PickGrid
              pickData={pickData}
              team={tradePartner}
              isCt={false}
              activeTrades={activeTrades}
              handleTradeClick={handleTradeClick}
            />
          </div>
          <div className="flex flex-col items-center w-[27rem]">
            <div className="pt-6">
              <select
                onChange={e => handleChange(e, "currentTeam")}
                className="select select-bordered rounded-none w-[20rem]"
              >
                {selectedTeams.map(team => (
                  <option key={team.name + team.id.toString()}>
                    {team.full_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4" />
            {tradeValue < 0 && (
              <div className="text-success">Trade Value: {-tradeValue}</div>
            )}
            {tradeValue > 0 && (
              <div className="text-error">Trade Value: {-tradeValue}</div>
            )}
            <div className="flex justify-center border-b-2 pt-2">2024</div>
            <PickGrid
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
    const pickInt = parseInt(e.currentTarget.innerText)

    if (type === "tradePartner") k = tradePartner
    if (type === "currentTeam") k = currentTeam

    if (k in activeTrades && activeTrades[k].includes(pickInt)) {
      activeTrades[k] = activeTrades[k].filter(x => x !== pickInt)
    } else if (k in activeTrades) {
      activeTrades[k].push(pickInt)
    } else {
      activeTrades[k] = [pickInt]
    }

    findAndSetTradeValue(tradePartner, currentTeam)
    setActiveTrades(_ => ({
      ...activeTrades
    }))
  }

  function handleTradeSubmitClick() {
    const oldTp = pickData[tradePartner]
    const oldCt = pickData[currentTeam]

    const activeTp =
      tradePartner in activeTrades ? activeTrades[tradePartner] : []
    const activeCt =
      currentTeam in activeTrades ? activeTrades[currentTeam] : []

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
    }

    setActiveTrades(_ => ({}))
    setTradeValue(_ => 0)
  }
}

export default MdmTradeTab
