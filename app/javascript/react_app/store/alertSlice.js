import { v4 as uuidv4 } from 'uuid'

export const createAlertSlice = (set) => ({
    activeAlertCount: 0,
    activeAlerts: [],
    addAlert: (alert) => set(state => {
        console.log(alert)
        if (alert && alert.message && alert.type) {
            alert.id = uuidv4()
            return {
                activeAlerts: state.activeAlerts.concat(alert)
            }
        } else {
            console.log('bad alert object')

            return {
                activeAlerts: state.activeAlerts
            }
        }
    }),
    removeAlert: (id) => set(state => {
        return {
            activeAlerts: state.activeAlerts.filter(alert => alert.id !== id)
        }
    })
})