import React from "react"

function About() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            About
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

      <section className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300">
        <div className="hero-content h-auto text-center z-20">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">More to come!</h1>
            <p className="py-6">
              Created with Rails 7, React, Zustand, and Tailwind.
              <br />
              Packaged with ESBuild.
              <br />
              Served via Render.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
