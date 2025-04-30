import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className='admin-header'>
        <nav className="admin-header-wrapper">
        <h3>Admin Panel</h3>
        <button>Logout</button>
        </nav>
    </header>
  )
}

export default Navbar