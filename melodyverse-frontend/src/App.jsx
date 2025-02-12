import { useState } from 'react'
import './App.css'
import AuthPage from './components/AuthPage'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ForgotPass from './components/ForgotPass'
function App() {
  

  return (
    <>  
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<AuthPage />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/forgot-password" element={<ForgotPass/>}/>
    </Routes>


    </BrowserRouter>
    
    </>
  )
}

export default App
