import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <>
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

      <section className="flex flex-col grow items-center justify-center space-y-4 text-gray-900 bg-gradient-to-t from-base-100 via-base-300 to-base-300 p-10">
        <p className="text-9xl text-red-600">404</p>
        <p className="text-2xl">Oops! Page not found!</p>
        <p>Here are some helpful links:</p>
        <Link className="z-20" to="/">
          Home
        </Link>
        <Link className="z-20" to="/maker">
          Maker
        </Link>
        <Link className="z-20" to="/about">
          About
        </Link>
      </section>
    </>
  )
}

export default NotFound
