// External
import React, { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MdSaveAlt } from "react-icons/md"
import { HiBolt, HiVariable } from "react-icons/hi2"
import { AiFillSetting } from "react-icons/ai"

// Internal
import useStore from "../../store/store"
import getCsrfToken from "../../other/getCsrfToken"

function MdmMakerShare() {
  const navigate = useNavigate()

  const yourPicks = useStore(state => state.yourPicks)
  const addAlert = useStore(state => state.addAlert)
  const speed = useStore(state => state.speed)
  const needsVsValue = useStore(state => state.needsVsValue)
  const randomness = useStore(state => state.randomness)

  const handleSubmit = e => {
    e.preventDefault()

    const token = getCsrfToken()

    if (yourPicks && Object.keys(yourPicks).length > 0) {
      axios({
        url: "/api/v1/draft_records/create",
        method: "post",
        data: {
          draft_picks: yourPicks,
          speed,
          needsVsValue,
          randomness
        },
        headers: {
          Accept: "Application/json",
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          navigate(`/share_draft/${res?.data?.id}?new=true`)
        })
        .catch(_ => {
          addAlert({
            type: "error",
            message: "Save failed, please try again."
          })
        })
    } else {
      addAlert({
        type: "error",
        message: "There is no data to submit."
      })
    }
  }

  return (
    <>
      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div className="overflow-x-auto">
          <div className="flex flex-col w-[82rem]">
            <button
              type="button"
              className="btn btn-primary hover:bg-white hover:text-black dark:bg-gray-900 dark:border-gray-900 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900 rounded-none"
              onClick={handleSubmit}
            >
              <MdSaveAlt />
              &nbsp;Save and Share!
            </button>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full border-b-2 border-black dark:border-gray-900">
                <table className="table">
                  <tbody>
                    {Object.entries(yourPicks).map(([team, players]) => (
                      <Fragment key={`yp_${team}`}>
                        <tr>
                          <th>{team}</th>
                        </tr>
                        {players.map(player => (
                          <tr key={`yps_${player.id.toString()}`}>
                            <td>Projection: {player.projected}</td>
                            <td>Pick: {player.pickedAt}</td>
                            <td>{player.full_name}</td>
                            <td>{player.position}</td>
                            <td>{player.college}</td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className="flex items-center justify-between w-4/5 p-10">
                <span className="flex items-center justify-center">
                  <HiBolt />
                  &nbsp;Speed: {speed}
                </span>

                <span className="flex items-center justify-center">
                  <AiFillSetting />
                  &nbsp;NeedsVsValue: {needsVsValue}
                </span>

                <span className="flex items-center justify-center">
                  <HiVariable />
                  &nbsp;Randomness: {randomness}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MdmMakerShare
