import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyles } from './components/Style.js'
import Homepage from './components/Homepage.js'
import Contact from './components/Contact.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import AdminDashboard from './components/AdminDashboard.js'
import AdminDayView from './components/AdminDayView.js'
import AdminInspectUser from './components/AdminInspectUser.js'
import AdminSearch from './components/AdminSearch.js'
import UserDashboard from './components/UserDashboard.js'
import UserDayView from './components/UserDayView.js'

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route exact path='/' element={<Homepage />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

          {/* Private Routes*/}
          {/* Administrator routes */}
          <Route path='/administrator' element={<AdminDashboard />}></Route>
          <Route path='/day-info' element={<AdminDayView />}></Route>
          <Route path='/user-info' element={<AdminInspectUser />}></Route>
          <Route path='/search' element={<AdminSearch />}></Route>
          {/* User routes */}
          <Route path='/user' element={<UserDashboard />}></Route>
          <Route path='/timer' element={<UserDayView />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
