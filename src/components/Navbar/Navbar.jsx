import React from 'react'
import './Navbar.css'
import { useDispatch } from 'react-redux'
import { useLogoutUserMutation } from '../../redux/feature/user/userApi';
import { logOut } from '../../redux/feature/slice/authSlice';

const Navbar = () => {
  const [logoutUser] = useLogoutUserMutation();
      const dispatch = useDispatch();
  
      const handleLogout = async () =>{
          const confirmLogout = window.confirm("Are you sure you want to log out?");
          if(!confirmLogout) return;
          try {
              await logoutUser().unwrap();
              dispatch(logOut());
          } catch (error) {
              console.error(error, 'Failed to logout')
          }
      }
  return (
    <header className='admin-header'>
        <nav className="admin-header-wrapper">
        <h3>Admin Panel</h3>
        <button onClick={handleLogout}>Logout</button>
        </nav>
    </header>
  )
}

export default Navbar