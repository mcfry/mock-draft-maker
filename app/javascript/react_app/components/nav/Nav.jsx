import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', link: ""},
    { name: 'Maker', link: "maker"},
    { name: 'About', link: "about"},
]

const linkActive = (link, pathname) => {
    if (link === "") {
        return pathname === "/"
    } else {
        return pathname.slice(1).startsWith(link)
    }
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// TODO: Router Link for mobile buttons
const Navbar = () => {
    const location = useLocation()

    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
            <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                    linkActive(item.link, location.pathname)
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={linkActive(item.link, location.pathname) ? 'page' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

                <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        as="a"
                        className={classNames(
                            linkActive(item.link, location.pathname) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={linkActive(item.link, location.pathname) ? 'page' : undefined}
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
)}

export default Navbar