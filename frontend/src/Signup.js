// SignUp.js
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import './Signup.css';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Mock registration logic for demonstration purposes
    if(email==''){
      setError(3)
    }
    if(name==''){
      setError(1)
    }
    if(phone==''){
      setError(2)
    }
    if(password==''){
      setError(4)
    }
    
    const data = {
      email,
      password,
      phone,
      name,
    userType:"USER",
    termCondition:true

  };
    const response = await fetch('http://localhost:8000/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const result = await response.json();
  if(result.status===200){
   
    navigate("/login");
  }
  };


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label className='label-tag'>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='input-tag'
          />
            {error===1?
            <p style={{color:"red"}}>please enter name</p>
          :null}
        </div>
        <div className="form-group">
          <label className='label-tag'>Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className='input-tag'
          />
          {error===2?
            <p style={{color:"red"}}>please enter phone</p>
          :null}
        
        </div>
        <div className="form-group">
          <label className='label-tag'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input-tag'
          />
            {error===3?
            <p style={{color:"red"}}>please enter email</p>
          :null}
        </div>
        <div className="form-group">
          <label className='label-tag'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input-tag'
          />
             {error===4?
            <p style={{color:"red"}}>please enter password</p>
          :null}
        </div>
        <button type="submit" className='button-tag'>Sign Up</button>
      </form>
      <div className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
