// Libraries
import React from "react"

/// //////////////
//  Begin App  //
/// //////////////

// Routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import components from "."

// Header/Footers
import Navbar from "./nav/Nav"

// Other Components
// import AlertMain from './views/main/alert/AlertMain';

// Root component & App Layout
function App() {
    return (
        <div data-theme="lofi" className="App">
            <div className="h-screen min-h-screen">
                <Router>
                    <div className="AppContent flex flex-col h-full min-h-full">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<components.Home />} />
                            <Route
                                path="/maker"
                                element={<components.MdmMaker />}
                            />
                            <Route
                                path="/about"
                                element={<components.About />}
                            />
                            <Route
                                path="/share_draft/:draft_uuid"
                                element={<components.MdmShare />}
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default App
