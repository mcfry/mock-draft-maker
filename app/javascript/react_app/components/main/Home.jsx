import React, { useLayoutEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import startWave from "../../other/wave"
import ROUTES from "../../constants/routes"

function Home() {
  const navigate = useNavigate()
  const [Waves] = useOutletContext()

  useLayoutEffect(() => {
    // Off for mobile
    if (window.innerWidth > 500) {
      startWave()
    }
  }, [])

  return (
    <section className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300 dark:from-gray-500 dark:to-gray-100 dark:text-gray-900 z-0">
      {/* Place waves here to fix stacking context */}
      <Waves />

      <div className="hero-content text-center z-50">
        <div className="max-w-md">
          <span className="text-5xl font-bold">Sup!</span>
          <p className="py-6">
            Interested in making a mock draft for the NFL and tired of bad
            simulators... or worse, simulators that you have pay for? Look no
            further.{" "}
          </p>
          <button
            type="button"
            className="relative btn btn-primary dark:bg-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 rounded-none z-50"
            onClick={() => navigate(ROUTES.MAKER)}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}

export default Home
