import React from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Mock Draft Maker
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

      <div className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Sup!</h1>
            <p className="py-6">
              Interested in making a mock draft for the NFL and tired of bad
              simulators... or worse, simulators that you have pay for? Look no
              further.{" "}
            </p>
            <button
              type="button"
              className="btn btn-primary rounded-none"
              onClick={() => navigate("/maker")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
