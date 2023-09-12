// External
import React from "react"

// Internal
import ButtonTwo from "../../helpers/ButtonTwo"
import useStore from "../../../store/store"
import CurrentlyPicking from "../../helpers/CurrentlyPicking"

function MdmDraftTab({
  startOrPauseDraft,
  localPlayers,
  playersLoaded,
  preselectedPick,
  setPreselectedPick,
  pickModal,
  pickPlayer,
  handleAnalyzeClick
}) {
  // ---------------
  // - Store State -
  // ---------------
  const addAlert = useStore(state => state.addAlert)
  const draftRunning = useStore(state => state.draftRunning)
  const userPicking = useStore(state => state.userPicking)

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

          <div className="flex modal-action">
            <ButtonTwo handleClick={e => handleDraftClick(e, false)}>
              No
            </ButtonTwo>
            <ButtonTwo handleClick={e => handleDraftClick(e, true)}>
              Yes
            </ButtonTwo>
          </div>
        </form>
      </dialog>

      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div className="overflow-x-auto w-[62rem] h-[34.75rem]">
          {playersLoaded === false ? (
            <div className="flex flex-col justify-center items-center h-full">
              <span>Loading Players...</span>
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <>
              {!userPicking && draftRunning ? (
                <CurrentlyPicking startOrPauseDraft={startOrPauseDraft} />
              ) : (
                <table className="table rounded-none">
                  <thead>
                    <tr className="text-sm font-bold text-black dark:text-gray-900">
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
                          <ButtonTwo
                            handleClick={e => handleAnalyzeClick(e, player)}
                          >
                            Analyze
                          </ButtonTwo>
                        </td>
                        <td>
                          <ButtonTwo
                            handleClick={() => {
                              if (userPicking === true) {
                                setPreselectedPick(player)

                                if (pickModal.current) {
                                  pickModal.current.showModal()
                                }
                              }
                            }}
                          >
                            Draft
                          </ButtonTwo>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
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
