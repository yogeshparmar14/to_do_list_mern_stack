// Login.js
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send login request to server)
    const data = {
        email,
        password,
    };
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if(result.status===200){
        localStorage.setItem('token',result?.data?.accessToken );
      navigate("/to-do-list");}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label className='label-login'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input-login'
          />
        </div>
        <div className="form-group">
          <label className='label-login'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input-login'
          />
        </div>
        <button className='button-login' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
