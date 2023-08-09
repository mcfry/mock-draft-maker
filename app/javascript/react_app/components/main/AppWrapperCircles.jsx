import React from "react"
import { Outlet, useLocation } from "react-router-dom"

// Header/Footers
import Navbar from "../nav/Nav"

function AppWrapperCircles() {
  const location = useLocation()

  const getTitle = pathname => {
    if (pathname === "/maker") {
      return "Mock Draft Maker"
    }
    if (pathname === "/about") {
      return "About"
    }
    if (pathname.startsWith("/share_draft/")) {
      return "Your Mock Draft"
    }

    return "Not Found"
  }

  return (
    <div className="AppContent flex flex-col h-full min-h-full">
      <Navbar />

      <header className="bg-primary-content dark:bg-gray-500 shadow z-30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="pl-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-base-200">
            {getTitle(location.pathname)}
          </h1>
        </div>
      </header>

      {/* Animation */}
      <ul className="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>

      {/* First tag in outlet requires flex grow to set proper page height for circles animation */}
      <Outlet />
    </div>
  )
}

export default AppWrapperCircles
