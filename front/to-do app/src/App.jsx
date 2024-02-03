import React from 'react'
import LoginPage from './pages/loginPage';
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
function App() {
  return (

    <div className='container'>
      
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/home" element={<HomePage />}/>
        
      </Routes>
      </Router>
    </div>
  )
}

export default App