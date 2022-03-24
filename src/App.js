import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './components/Style.js'
import Homepage from './components/Homepage.js'
import Contact from './components/Contact.js'
import Login from './components/Login.js'
import Register from './components/Register.js'

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
