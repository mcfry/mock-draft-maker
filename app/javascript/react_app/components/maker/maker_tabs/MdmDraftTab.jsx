import React from "react"
import clsx from "clsx"

import useStore from "../../../store/store"

function MdmDraftTab({
  localPlayers,
  playersLoaded,
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
        <form method="dialog" className="modal-box dark:bg-gray-700">
          <p className="py-4 dark:text-gray-100">
            Select {preselectedPick && preselectedPick.full_name}?
          </p>

          <div className="modal-action">
            <button
              type="button"
              className="btn bg-primary dark:bg-gray-900 text-primary-content dark:text-gray-100 hover:bg-primary-content dark:hover:bg-gray-100 hover:text-primary dark:hover:text-gray-900 hover:border-2 hover:border-primary dark:hover:border-gray-100"
              onClick={e => handleDraftClick(e, false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn bg-primary dark:bg-gray-900 text-primary-content dark:text-gray-100 hover:bg-primary-content dark:hover:bg-gray-100 hover:text-primary dark:hover:text-gray-900 hover:border-2 hover:border-primary dark:hover:border-gray-100"
              onClick={e => handleDraftClick(e, true)}
            >
              Yes
            </button>
          </div>
        </form>
      </dialog>

      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div className="overflow-x-auto w-[54rem] h-[27rem]">
          {playersLoaded === false ? (
            <div className="flex flex-col justify-center items-center h-full">
              <span>Loading Players...</span>
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <table className="table rounded-none">
              <thead>
                <tr className="font-bold">
                  <th className="w-1/12">Projected</th>
                  <th className="w-3/12">Name</th>
                  <th className="w-1/12">Position</th>
                  <th className="w-3/12">College</th>
                  <th className="w-2/12">&nbsp;</th>
                  <th className="w-2/12">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {localPlayers.slice(0, 400).map(player => (
                  <tr
                    key={player.id}
                    className={
                      preselectedPick && preselectedPick.id === player.id
                        ? "bg-success"
                        : "hover cursor-pointer"
                    }
                    onClick={e => handleClick(e, player)}
                  >
                    <th>
                      {player.projected === -1 ? "N/A" : player.projected}
                    </th>
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
          )}
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
