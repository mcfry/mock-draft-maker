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
  const headerWidths = {
    projected: "w-1/12",
    full_name: "w-[20.833%]",
    position: "w-1/12",
    college: "w-[29.167%]",
    analyzeButton: "w-2/12",
    draftButton: "w-2/12"
  }
  const refForVirtualizer = useRef(null)
  const columnHelper = createColumnHelper()

  const defaultColumns = [
    columnHelper.accessor("projected", {
      cell: info =>
        info.getValue() === -1 ? (
          <center>N/A</center>
        ) : (
          <center>{info.getValue()}</center>
        ),
      header: () => <center>Projected</center>
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
    estimateSize: () => 70,
    overscan: 2
  })

  const tableItems = virtualizer.getVirtualItems()

  const [paddingTop, paddingBottom] =
    tableItems.length > 0
      ? [
          Math.max(0, tableItems[0].start - virtualizer.options.scrollMargin),
          Math.max(
            0,
            virtualizer.getTotalSize() - tableItems[tableItems.length - 1].end
          )
        ]
      : [0, 0]

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
          <div
            className={draftRunning && !userPicking ? "h-full" : ""}
            style={
              !draftRunning || userPicking
                ? {
                    paddingTop,
                    paddingBottom
                  }
                : null
            }
          >
            {playersLoaded === "loading" ? (
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
                            <th
                              id={header.id}
                              key={header.id}
                              className={headerWidths[header.id]}
                            >
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
                      {tableItems.map(virtRow => {
                        const row = rows[virtRow.index]

                        return (
                          <tr
                            key={row.id}
                            data-index={virtRow.index}
                            className={
                              preselectedPick && preselectedPick.id === row.id
                                ? "bg-success"
                                : "hover cursor-pointer border-b-2"
                            }
                            ref={virtualizer.measureElement}
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
