import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import "../../../App.css";

import { doLogin } from "../../../redux/actions/auth-action";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    dispatch(doLogin({ username, password }))
    .then(() => {
        navigate("/home")
        setError('')
    })
    .catch(() => {
        navigate("/auth/login")
        setError('Incorrect Username or Password.')
    })
  };
  
  return (
    <div className="container-center">
      <h1>Login</h1>
  
      <div>
        <label htmlFor="username"></label>
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
  
      <div>
        <label htmlFor="password"></label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
  
      <p style={{color: "red"}}>{error}</p>
  
      <button style={{ maxWidth: "100px" }} onClick={handleSignIn}>
        Sign In
      </button>
      <hr />
      <Link style={{marginRight: '16px'}} to="/auth/register">Register</Link>
      <Link to="/auth/forgotPassword">Forgot Password ?</Link>
    </div>
  );
}

export default Login;