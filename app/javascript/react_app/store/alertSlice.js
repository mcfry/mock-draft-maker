import { v4 as uuidv4 } from "uuid"

const createAlertSlice = (set) => ({
  activeAlertCount: 0,
  activeAlerts: [],
  addAlert: (alert) =>
    set((state) => {
      const newAlert = alert
      if (newAlert && newAlert.message && newAlert.type) {
        newAlert.id = uuidv4()

        // Limit to 3
        let newAlerts = []
        if (state.activeAlerts.length <= 2) {
          newAlerts = state.activeAlerts.concat(newAlert)
        } else {
          newAlerts = state.activeAlerts.slice(1).concat(newAlert)
        }

        return {
          activeAlerts: newAlerts
        }
      }

      return {
        activeAlerts: state.activeAlerts
      }
    }),
  removeAlert: (id) =>
    set((state) => ({
      activeAlerts: state.activeAlerts.filter((alert) => alert.id !== id)
    }))
})

export default createAlertSlice
