import React from "react"
import clsx from "clsx"

import useStore from "../../../store/store"

function MdmDraftTab({
  localPlayers,
  preselectedPick,
  setPreselectedPick,
  userPicking,
  pickModal,
  pickPlayer,
  handleAnalyzeClick
}) {
  const addAlert = useStore(state => state.addAlert)

  const selectPlayer = () => {
    if (preselectedPick && userPicking) {
      pickPlayer(preselectedPick, undefined, true)
    }
  }

  return (
    <>
      <dialog ref={pickModal} id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <p className="py-4">
            Select {preselectedPick && preselectedPick.full_name}?
          </p>

          <div className="modal-action">
            <button
              type="button"
              className="btn bg-primary text-primary-content hover:bg-primary-content hover:text-primary hover:border-2 hover:border-primary"
              onClick={e => handleDraftClick(e, false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn bg-primary text-primary-content hover:bg-primary-content hover:text-primary hover:border-2 hover:border-primary"
              onClick={e => handleDraftClick(e, true)}
            >
              Yes
            </button>
          </div>
        </form>
      </dialog>

      <div className="flex flex-col">
        <div className="overflow-x-auto w-[54rem] h-[27rem]">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Projected</th>
                <th>Name</th>
                <th>Position</th>
                <th>College</th>
                <th>&nbsp;</th>
                <th className="w-2/12">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {localPlayers.map(player => (
                <tr
                  key={player.id}
                  className={
                    preselectedPick && preselectedPick.id === player.id
                      ? "bg-success"
                      : "hover cursor-pointer"
                  }
                  onClick={e => handleClick(e, player)}
                >
                  <th>{player.projected}</th>
                  <td>{player.full_name}</td>
                  <td>{player.position}</td>
                  <td>{player.college}</td>
                  <td>
                    <button
                      type="button"
                      className={clsx(
                        "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-gray-600 text-primary-content text-sm"
                      )}
                      onClick={e => handleAnalyzeClick(e, player)}
                    >
                      Analyze
                    </button>
                  </td>
                  <td>
                    {preselectedPick === player && (
                      <button
                        type="button"
                        className={clsx(
                          "btn btn-sm hover:bg-white hover:text-primary rounded-none border-primary bg-gray-600 text-primary-content text-sm"
                        )}
                        onClick={() => {
                          if (pickModal.current) {
                            pickModal.current.showModal()
                          }
                        }}
                      >
                        Draft
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )

  // Handlers
  function handleClick(e, player) {
    e.preventDefault()

    if (player && userPicking) {
      setPreselectedPick(player)
    } else {
      addAlert({
        type: "error",
        message: "It's not your turn to pick!",
        time: 4000
      })
    }
  }

  function handleDraftClick(e, isSure) {
    e.preventDefault()

    if (isSure) {
      selectPlayer()
      setPreselectedPick(null)
      if (pickModal.current) pickModal.current.close()
    } else if (pickModal.current) {
      pickModal.current.close()
    }
  }
}

export default MdmDraftTab
