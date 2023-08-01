import React, { useEffect, useRef } from "react"
import clsx from "clsx"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from "@heroicons/react/20/solid"

function Alert({ id, type, message, time, removeAlert }) {
  const timerId = useRef(null)

  const alertIcon = iconType => {
    switch (iconType) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6" />
      case "error":
        return <ExclamationCircleIcon className="h-6 w-6" />
      default:
        return <InformationCircleIcon className="h-6 w-6" />
    }
  }

  useEffect(() => {
    timerId.current = setTimeout(() => {
      removeAlert(id)
    }, time || 5000)

    return () => {
      clearTimeout(timerId.current)
    }
  }, [])

  // Tailwind can't do dynamic "alert-"+type (will purge style)
  const alertTypes = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info"
  }

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div
        className={clsx(
          "alert w-[74rem] flex justify-between z-30 absolute mb-12",
          alertTypes[type]
        )}
      >
        <div className="flex space-x-2">
          {alertIcon(type)}
          <span>{message}</span>
        </div>

        <XMarkIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => removeAlert(id)}
        />
      </div>
    </div>
  )
}

export default Alert
