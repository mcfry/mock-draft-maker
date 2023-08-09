import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <section className="flex flex-col grow items-center justify-center space-y-4 text-gray-900 bg-gradient-to-t from-base-100 via-base-300 to-base-300 dark:from-gray-500 dark:to-gray-100 dark:text-gray-900">
      <p className="text-9xl text-accent">404</p>
      <p className="text-2xl">Oops! Page not found!</p>
      <p>Here are some helpful links:</p>
      <Link className="dark:hover:text-gray-100 z-20" to="/">
        Home
      </Link>
      <Link className="dark:hover:text-gray-100 z-20" to="/maker">
        Maker
      </Link>
      <Link className="dark:hover:text-gray-100 z-20" to="/about">
        About
      </Link>
    </section>
  )
}

export default NotFound
