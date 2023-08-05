import React, { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import startWave from "../../other/wave"
import ROUTES from "../../constants/routes"

function Home() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    startWave()
  }, [])

  return (
    <>
      <header className="bg-white shadow z-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Mock Draft Maker
          </h1>
        </div>
      </header>

      {/* Animation */}
      {/* <ul className="circles">
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
      </ul> */}
      <canvas id="waves" />

      <section className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300 z-0">
        <div className="hero-content text-center z-50">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Sup!</h1>
            <p className="py-6">
              Interested in making a mock draft for the NFL and tired of bad
              simulators... or worse, simulators that you have pay for? Look no
              further.{" "}
            </p>
            <button
              type="button"
              className="btn btn-primary rounded-none z-50"
              onClick={() => navigate(ROUTES.MAKER)}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
