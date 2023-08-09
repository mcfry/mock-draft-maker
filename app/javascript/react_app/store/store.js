import { create } from "zustand"

import createAlertSlice from "./alertSlice"
import createDraftSlice from "./draftSlice"
import createThemeSlice from "./themeSlice"

const useStore = create((...a) => ({
  ...createAlertSlice(...a),
  ...createDraftSlice(...a),
  ...createThemeSlice(...a)
}))

export default useStore
