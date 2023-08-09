import React from "react"

function MdmMakerSkeleton() {
  return (
    <section className="flex flex-row card w-[74rem] shadow-xl rounded bg-base-100 dark:bg-gray-500 z-30">
      <div
        role="status"
        className="animate-pulse w-full flex flex-col space-y-9 p-12"
      >
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-4 w-6/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-7/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-10/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-5/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-8/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-9/12" />
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-3/12" />
        <span className="sr-only">Loading...</span>
      </div>
    </section>
  )
}

export default MdmMakerSkeleton
