import React, { useEffect, useRef } from "react"
import classNames from "classnames"
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

const Alert = ({id, type, message, time, removeAlert}) => {
    const timerId = useRef(null)

    const alertIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="h-6 w-6" />
            case 'error':
                return <ExclamationCircleIcon className="h-6 w-6" />
            default:
                return <InformationCircleIcon className="h-6 w-6" />
        }
    }

    useEffect(() => {
        timerId.current = setTimeout(() => {
            removeAlert(id)
        }, time ? time : 5000)

        return () => {
            clearTimeout(timerId.current)
        }
    }, [])

    return (
        <div 
            className={classNames('alert', {[`alert-${type}`]: true}, 'w-[74rem]', 'flex justify-between')}
        >
            <div className="flex space-x-2">
                {alertIcon(type)}
                <span>
                    {message}
                </span>
            </div>

            <XMarkIcon 
                className="h-6 w-6" 
                onClick={() => removeAlert(id)} 
            />
        </div>
    )
}

export default Alert