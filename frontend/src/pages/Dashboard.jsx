import React from 'react'
import AppBar from '../components/AppBar';
import Balance from '../components/Balance';

const Dashboard = () => {
  return (
    <>
    <div>
      <AppBar/>
      <Balance value={10000}/>
    </div>
    </>
  )
}

export default Dashboard
