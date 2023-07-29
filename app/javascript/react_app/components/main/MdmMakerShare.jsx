import React, { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import useStore from "../../store/store"

function MdmMakerShare() {
  const navigate = useNavigate()

  const yourPicks = useStore((state) => state.yourPicks)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Get CSRF token
    const token = document.querySelector('meta[name="csrf-token"]').content

    axios({
      url: "/api/v1/draft_records/create",
      method: "post",
      data: { draft_picks: yourPicks },
      headers: {
        Accept: "Application/json",
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        navigate(`/share_draft/${res?.data?.uuid}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex flex-col w-[74rem]">
            <button
              type="button"
              className="btn btn-primary rounded-none"
              onClick={handleSubmit}
            >
              Save and Share!
            </button>
            <div className="flex items-center justify-center w-full">
              <table className="table">
                <tbody>
                  {Object.entries(yourPicks).map(([team, players]) => (
                    <Fragment key={`yp_${team}`}>
                      <tr>
                        <th>{team}</th>
                      </tr>
                      {players.map((player) => (
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
          </div>
        </div>
      </div>
    </>
  )
}

export default MdmMakerShare
