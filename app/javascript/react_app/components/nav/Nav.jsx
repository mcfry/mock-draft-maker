import React from "react"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import MdmLogo from "../../images/mdm_logo.png"

import useStore from "../../store/store"

const navigation = [
  { name: "Home", link: "" },
  { name: "Maker", link: "maker" },
  { name: "About", link: "about" }
]

const linkActive = (link, pathname) => {
  if (link === "") {
    return pathname === "/"
  }

  return pathname.slice(1).startsWith(link)
}

function Navbar() {
  const location = useLocation()
  const setContextTheme = useStore(state => state.setTheme)

  const setTheme = theme => {
    if (theme === "light") {
      localStorage.theme = "light"
      setContextTheme("light")
    } else if (theme === "dark") {
      localStorage.theme = "dark"
      setContextTheme("dark")
    }
  }

  return (
    <>
      <Disclosure as="nav" className="bg-primary dark:bg-gray-900 z-30">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center justify-center">
                  <a href="/" className="flex items-center justify-center">
                    <span className="text-accent text-2xl font-bold">MDM</span>
                    <div className="flex-shrink-0">
                      <img className="h-14 w-14" src={MdmLogo} alt="mdm logo" />
                    </div>
                  </a>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map(item => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={clsx(
                            linkActive(item.link, location.pathname)
                              ? "text-primary-content border-b-2 border-accent"
                              : "text-gray-300 hover:bg-gray-700 hover:text-primary-content",
                            "px-3 py-2 text-sm font-medium group relative"
                          )}
                          aria-current={
                            linkActive(item.link, location.pathname)
                              ? "page"
                              : undefined
                          }
                        >
                          <div
                            className={clsx(
                              "after:block after:absolute after:mt-2 after:left-0 after:border-b-2 after:border-accent after:w-0 after:transition-all group-hover:after:w-full"
                            )}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dark Mode Changer */}
                <div className="flex justify-center items-center">
                  <div className="font-semibold text-sm text-base-100 dark:text-gray-100 mr-2">
                    Theme{" "}
                  </div>
                  <select
                    data-testid="themeChanger"
                    value={localStorage?.theme || "system managed"}
                    onChange={e => setTheme(e.currentTarget.value)}
                    className="select select-sm select-bordered dark:select-primary rounded-none dark:bg-gray-500 dark:border-gray-100"
                  >
                    {["light", "dark"].map(themeType => (
                      <option key={themeType} value={themeType}>
                        {/* Capitalize first letter each word */}
                        {themeType.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                          letter.toUpperCase()
                        )}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-primary-content focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.link}
                    className={clsx(
                      linkActive(item.link, location.pathname)
                        ? "bg-gray-900 text-primary-content"
                        : "text-gray-300 hover:bg-gray-700 hover:text-primary-content",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      linkActive(item.link, location.pathname)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar
