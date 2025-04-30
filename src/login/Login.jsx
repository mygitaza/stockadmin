import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useLoginUserMutation } from '../redux/feature/user/userApi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loginUser, {isLoading}] = useLoginUserMutation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
          const res = await loginUser({ email, password }).unwrap();
    
          if (res?.user?.role !== 'admin') {
            setError('Access denied. Admins only.');
            return;
          }
    
          navigate('/admindashboard');
        } catch (err) {
          setError(err?.data?.message || 'Login failed');
        }
      };
    
  return (
    <div className='login'>
        <div className='login-wrapper'>
            <h1>Login</h1>
        <form className='login-form' onSubmit={handleLogin}>
            <div className="login-email">
                <label>Email</label>
                <input type="email" required placeholder='Email' className='login-email-input' value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login-email">
                <label>Password</label>
                <input type="password" required placeholder='password' className='login-password-input' value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button className='login-btn' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
        </form>
        </div>
    </div>
  )
}

export default Login