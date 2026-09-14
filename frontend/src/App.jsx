import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

const App = () => {

  return (
   <>
   <Routes>
   <Route path="/signup" element={< Signup />} />
   <Route path="/dashboard" element={< Dashboard />} />
   <Route path="/" element={< Signin/>}/>
   </Routes>
   </>
  )
}

export default App
