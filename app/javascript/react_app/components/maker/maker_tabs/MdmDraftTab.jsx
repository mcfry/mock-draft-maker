// External
import React, { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"

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

  // ---------------
  // - Table Stuff -
  // ---------------
  const refForVirtualizer = useRef(null)
  const columnHelper = createColumnHelper()

  const defaultColumns = [
    columnHelper.accessor("projected", {
      cell: info => (info.getValue() === -1 ? "N/A" : info.getValue()),
      header: () => "Projected"
    }),
    columnHelper.accessor("full_name", {
      cell: info => info.getValue(),
      header: () => "Name"
    }),
    columnHelper.accessor("position", {
      cell: info => info.getValue(),
      header: () => "Position"
    }),
    columnHelper.accessor("college", {
      cell: info => info.getValue(),
      header: () => "College"
    }),
    columnHelper.display({
      id: "analyzeButton",
      cell: props => (
        <ButtonTwo handleClick={e => handleAnalyzeClick(e, props.row.original)}>
          Analyze
        </ButtonTwo>
      )
    }),
    columnHelper.display({
      id: "draftButton",
      cell: props => (
        <ButtonTwo
          handleClick={() => {
            if (userPicking === true) {
              setPreselectedPick(props.row.original)

              if (pickModal.current) {
                pickModal.current.showModal()
              }
            } else {
              addAlert({
                type: "error",
                message: "It's not your turn to pick!",
                time: 4000
              })
            }
          }}
        >
          Draft
        </ButtonTwo>
      )
    })
  ]

  const table = useReactTable({
    data: localPlayers,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel()
  })

  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => refForVirtualizer.current,
    estimateSize: () => 65,
    overscan: 20
  })

  return (
    <>
      {userPicking && (
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
      )}

      <div className="flex flex-col dark:bg-gray-300 dark:text-gray-900">
        <div
          className="overflow-x-auto w-[62rem] h-[34.75rem]"
          ref={refForVirtualizer}
        >
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
                <table className="table rounded-none" tabIndex={-1}>
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr
                        key={headerGroup.id}
                        className="text-sm font-bold text-black dark:text-gray-900"
                      >
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="w-2/12">
                            {header.isPlaceholder ? null : (
                              <div>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {virtualizer.getVirtualItems().map((virtRow, rowIndex) => {
                      const row = rows[virtRow.index]

                      return (
                        <tr
                          key={row.id}
                          className={
                            preselectedPick && preselectedPick.id === row.id
                              ? "bg-success"
                              : "hover cursor-pointer"
                          }
                          style={{
                            height: `${virtRow.size}px`,
                            transform: `translateY(${
                              virtRow.start - rowIndex * virtRow.size
                            }px)`
                          }}
                        >
                          {row.getVisibleCells().map(cell => {
                            return (
                              <td key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
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
  // function handleClick(e, player) {
  //   e.preventDefault()

  //   if (player && userPicking) {
  //     setPreselectedPick(player)
  //   } else {
  //     addAlert({
  //       type: "error",
  //       message: "It's not your turn to pick!",
  //       time: 4000
  //     })
  //   }
  // }

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

export default React.memo(MdmDraftTab)
