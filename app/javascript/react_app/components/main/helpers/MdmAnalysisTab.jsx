import React, { useState, useEffect } from "react"

const MdmAnalysisTab = () => {
    return (<>
        <div className="flex flex-col items-center w-full">
            <div className="pt-6">
                <select className="select select-bordered rounded-none w-[20rem]">
                    <option disabled>Pick your favorite Simpson</option>
                    <option>Homer</option>
                </select>
            </div>

            <div className="flex justify-center border-b-2 pt-6">2024</div>
            <div className="flex justify-center pt-2 w-[24rem]">
                <div className="grid grid-cols-7 gap-2">
                    <div className="flex justify-center items-center bg-base-100 border-neutral border-2 border-solid p-2">01</div>
                </div>
            </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex flex-col items-center w-full">
            <div className="pt-6">
                <select className="select select-bordered rounded-none w-[20rem]">
                    <option disabled>Who shot first?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
            </div>

            <div className="pt-6 w-[20rem]">
                test
            </div>
        </div>
    </>)
}

export default MdmAnalysisTab