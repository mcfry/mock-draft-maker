// Libraries
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

/// //////////////
//  Begin App  //
/// //////////////

// Routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import clsx from "clsx"

import components from "."
import useStore from "../store/store"

const queryClient = new QueryClient()

// Root component & App Layout
function App() {
  const currentTheme = useStore(state => state.currentTheme)

  return (
    <div data-theme="lofi" className={clsx("App", currentTheme)}>
      <div className="h-screen min-h-screen">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route element={<components.AppWrapperWave />}>
                <Route path="/" element={<components.Home />} />
              </Route>

              <Route element={<components.AppWrapperCircles />}>
                <Route path="/maker" element={<components.MdmMaker />} />
                <Route path="/about" element={<components.About />} />
                <Route
                  path="/share_draft/:draft_uuid"
                  element={<components.MdmShare />}
                />
                <Route path="*" element={<components.NotFound />} />
              </Route>
            </Routes>
          </Router>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
