import React from "react"

import useStore from "../../../store/store"

const MdmDraftTab = ({ localPlayers, preselectedPick, setPreselectedPick, userPicking, pickModal, pickPlayer }) => {

    const addAlert = useStore(state => state.addAlert)

    const selectPlayer = () => {
        if (preselectedPick) {
            pickPlayer(preselectedPick, undefined, true)
        }
    }

    return (<>
        <dialog ref={pickModal} id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
                <p className="py-4">Select {preselectedPick && preselectedPick.full_name}?</p>

                <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleDraftClick}>Yes</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {localPlayers.map(player => {
                            return <tr key={player.id} className={preselectedPick && preselectedPick.id === player.id ? "bg-success" : "hover cursor-pointer"} onClick={(e) => handleClick(e, player)}>
                                <th>{player.projected}</th>
                                <td>{player.full_name}</td>
                                <td>{player.position}</td>
                                <td>{player.college}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)

    // Handlers
    function handleClick(e, player) {
        e.preventDefault()

        if (player && userPicking) {
            setPreselectedPick(player)
        } else {
            addAlert({
                type: 'error',
                message: "It's not your turn to pick!",
                time: 4000
            })
        }
    }

    function handleDraftClick(e) {
        e.preventDefault()

        selectPlayer()
        setPreselectedPick(null)
        if (pickModal.current)
            pickModal.current.close()
    }
}

export default MdmDraftTab