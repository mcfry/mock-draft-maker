import React from "react"
import MdmLogo from "../../images/mdm_logo.png"

function About() {
  return (
    <section className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300 dark:from-gray-500 dark:to-gray-100 dark:text-gray-900">
      <div className="hero-content h-auto text-center z-20">
        <div className="flex flex-col items-center max-w-md">
          <img src={MdmLogo} alt="mdm logo" />
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
  )
}

export default About
