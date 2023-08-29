// External
import React, { useState, useRef, useEffect, Fragment } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import Confetti from "react-confetti"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FaCheck, FaCopy } from "react-icons/fa"
import { HiVariable } from "react-icons/hi"
import { HiBolt } from "react-icons/hi2"
import { AiFillSetting } from "react-icons/ai"

// Internal
import MdmMakerSkeleton from "./MdmMakerSkeleton"
import { CURRENT_YEAR } from "../../constants/current"

function MdmShare() {
  const location = useLocation()
  const { draft_uuid } = useParams()

  const sectionRef = useRef()

  const [draftRecordTeams, setDraftRecordTeams] = useState({})
  const [speed, setSpeed] = useState(null)
  const [needsVsValue, setNeedsVsValue] = useState(null)
  const [randomness, setRandomness] = useState(null)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios(`/api/v1/draft_records/show/${draft_uuid}`)
      .then(res => {
        setDraftRecordTeams(res?.data?.draft_record_teams)
        setSpeed(res?.data?.speed)
        setNeedsVsValue(res?.data?.needs_vs_value)
        setRandomness(res?.data?.randomness)
        setDraftLoaded(true)
      })
      .catch(err => {
        setError(err)
      })
  }, [])

  const queryParams = new URLSearchParams(location.search)

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col grow space-y-4 justify-center items-center bg-gradient-to-t from-base-100 via-base-300 to-base-300 dark:from-gray-500 dark:to-gray-100 p-10"
    >
      {draftLoaded === false ? (
        <>{error ? <p>Error: {error?.message}</p> : <MdmMakerSkeleton />}</>
      ) : (
        <>
          {Object.entries(draftRecordTeams).length === 0 ? (
            <p>No draft record found.</p>
          ) : (
            <>
              {queryParams?.has("new") && (
                <Confetti
                  width={window.innerWidth}
                  height={sectionRef.current.clientHeight}
                  numberOfPieces={800}
                  recycle={false}
                  style={{ zIndex: 35 }}
                />
              )}
              <div className="relative card shadow-xl rounded bg-base-100 p-2 z-30 dark:bg-gray-500">
                <div className="flex items-center justify-center">
                  {copied && (
                    <span className="absolute flex items-center font-bold -top-10">
                      <FaCheck />
                      &nbsp;Copied
                    </span>
                  )}
                </div>

                <span className="flex space-x-3 items-center p-1 dark:text-gray-100">
                  <span>Your share link:</span>
                  <span className="bg-base-200 dark:text-gray-900 font-bold p-1">
                    {window.location.href.split("?")[0]}
                  </span>
                  <span>
                    <CopyToClipboard
                      text={window.location.href.split("?")[0]}
                      onCopy={() => setCopied(true)}
                    >
                      <button
                        type="button"
                        className="flex justify-center items-center"
                      >
                        <FaCopy />
                        &nbsp;Copy
                      </button>
                    </CopyToClipboard>
                  </span>
                </span>
              </div>

              <div className="flex flex-row card w-[74rem] shadow-xl rounded bg-base-100 dark:bg-gray-300 dark:text-gray-900 z-30">
                <div className="overflow-x-auto">
                  <div className="flex items-center justify-center flex-col w-[74rem]">
                    <div className="border-b-2 border-black dark:border-gray-900 w-full">
                      <table className="table">
                        <tbody>
                          {draftRecordTeams.map(({ team, picks }) => (
                            <Fragment key={`yp_${team.city}_${team.name}`}>
                              <tr className="bg-primary dark:bg-gray-900 text-white dark:text-gray-100">
                                <th className="w-2/12">
                                  <span>
                                    {team.city}&nbsp;
                                    {team.name}
                                  </span>
                                </th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th className="text-right">{CURRENT_YEAR}</th>
                              </tr>
                              <tr>
                                <th className="w-1/12 text-center">Pick</th>
                                <th className="w-2/12 text-center">
                                  Projection
                                </th>
                                <th className="w-3/12 text-center">Player</th>
                                <th className="w-1/12 text-center">Position</th>
                                <th className="w-5/12 text-center">College</th>
                              </tr>
                              {picks.map(({ pick_number, player }) => (
                                <tr key={`yps_${player.id.toString()}`}>
                                  <td className="w-1/12 text-center">
                                    Pick: {pick_number}
                                  </td>
                                  <td className="w-2/12 text-center">
                                    Projection: {player.projected}
                                  </td>
                                  <td className="w-3/12 text-center">
                                    {player.first}&nbsp;{player.last}
                                  </td>
                                  <td className="w-1/12 text-center">
                                    {player.position}
                                  </td>
                                  <td className="w-5/12 text-center">
                                    {player.college}
                                  </td>
                                </tr>
                              ))}
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <span className="flex items-center justify-between w-4/5 p-10 font-semibold">
                      <span className="flex items-center justify-center">
                        <HiBolt />
                        &nbsp;Speed: {speed === null ? "N/A" : speed}
                      </span>

                      <span className="flex items-center justify-center">
                        <AiFillSetting />
                        &nbsp;NeedsVsValue:{" "}
                        {needsVsValue === null ? "N/A" : needsVsValue}
                      </span>

                      <span className="flex items-center justify-center">
                        <HiVariable size="1.35em" />
                        &nbsp;Randomness:{" "}
                        {randomness === null ? "N/A" : randomness}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MdmShare
