// External
import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXMark
} from "react-icons/hi2"

function Alert({ id, type, message, time, removeAlert }) {
  const timerId = useRef(null)

  const alertIcon = iconType => {
    switch (iconType) {
      case "success":
        return <HiCheckCircle className="h-6 w-6" />
      case "error":
        return <HiExclamationCircle className="h-6 w-6" />
      default:
        return <HiInformationCircle className="h-6 w-6" />
    }
  }

  useEffect(() => {
    timerId.current = setTimeout(() => {
      removeAlert(id)
    }, time)

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
    <div
      className="flex flex-col justify-center items-center relative"
      role="alert"
    >
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

        <HiXMark
          className="h-6 w-6 cursor-pointer"
          onClick={() => removeAlert(id)}
        />
      </div>
    </div>
  )
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.number,
  removeAlert: PropTypes.func.isRequired
}

Alert.defaultProps = {
  time: 5000
}

export default Alert
