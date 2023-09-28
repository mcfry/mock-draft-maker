import React from "react"

import MdmLogo from "../../images/mdm_logo.png"

function About() {
  return (
    <main className="hero grow bg-gradient-to-t from-base-100 via-base-300 to-base-300 dark:from-gray-500 dark:to-gray-100 dark:text-gray-900">
      <div className="hero-content h-auto text-center z-20">
        <div className="flex flex-col items-center max-w-md">
          <img src={MdmLogo} alt="mdm logo" />
          <span className="text-5xl font-bold">More to come!</span>
          <p className="py-6">
            Created with Rails 7, React, Zustand, and Tailwind.
            <br />
            Packaged with ESBuild.
            <br />
            Served via Render.
          </p>

          <span className="font-bold text-xl mt-10">Like my work?</span>
          <a
            href="https://www.buymeacoffee.com/mockdraftmaker"
            target="_blank"
            rel="noreferrer"
            className="mt-2"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
              alt="Buy Me A Coffee"
              className="h-[60px] w-[217px] cursor-pointer"
            />
          </a>
        </div>
      </div>
    </main>
  )
}

export default About
