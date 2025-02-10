import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';


import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const history = useHistory();

  const {loginUser} = useContext(FirebaseContext);


  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      
    await loginUser(email,password);
    console.log("User logged in successfully");
    history.push('/');
    } catch (error) {
      console.error("Login error:",error.message);
      setError(error.message);

    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
