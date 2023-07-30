import React from "react"

import Alert from "./helpers/Alert"
import useStore from "../../store/store"

// alert
// { type, message, icon, time }

function MdmAlerts() {
  const activeAlerts = useStore(state => state.activeAlerts)
  const removeAlert = useStore(state => state.removeAlert)

  return (
    <div className="flex flex-col space-y-2 pb-4">
      {activeAlerts.map(alert => (
        <Alert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          message={alert.message}
          time={alert?.time}
          removeAlert={removeAlert}
        />
      ))}
    </div>
  )
}

export default MdmAlerts
