import { create } from 'zustand'

import { createAlertSlice } from './alertSlice'
import { createDraftSlice } from './draftSlice'

const useStore = create((...a) => ({
    ...createAlertSlice(...a),
    ...createDraftSlice(...a),
}))

export default useStore
