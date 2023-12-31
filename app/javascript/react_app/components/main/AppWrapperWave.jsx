import React from "react"
import { Outlet } from "react-router-dom"

// Header/Footers
import Navbar from "../nav/Nav"

function Waves() {
  return <canvas id="waves" className="mb-[8.5rem]" />
}

function AppWrapperWave() {
  return (
    <div className="AppContent flex flex-col h-full min-h-full">
      <Navbar />

      <header className="bg-primary-content dark:bg-gray-500 shadow z-30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="pl-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-base-200">
            Welcome to Mock Draft Maker
          </h1>
        </div>
      </header>

      {/* First tag in outlet requires flex grow to set proper page height for animation */}
      <Outlet context={[Waves]} />
    </div>
  )
}

export default AppWrapperWave
