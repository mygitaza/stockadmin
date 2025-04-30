import React from 'react'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <div className='app'>
      <Outlet/>
    </div>
  )
}

export default App