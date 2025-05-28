import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import SignUp from "./pages/SighUp"
import SymptomHistory from "./pages/SymptomHistory"

function App() {

  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/symptom-history" element={<SymptomHistory />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
