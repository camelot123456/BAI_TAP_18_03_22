import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'

import "../../../App.css";
import { CLIENT_ID, SECRET } from "../../../constants/system-constant";
import { doLogin } from "../../../redux/actions/auth-action";
import paypalAction from "../../../redux/actions/paypal-action";


function Login() {
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  })
  
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} 
      onSubmit={(values) => {
        dispatch(doLogin({
          username: values.username, 
          password: values.password
        }))
        .then(() => {
            dispatch(paypalAction.doOauth2Paypal({
              clientId: CLIENT_ID, 
              secret: SECRET
            }))
            navigate("/home")
        })
        .catch(() => {
          navigate("/auth/login")
          setError('Incorrect Username or Password.')
        })
      }}>
      {(formikProps) => {
        const {values, errors, handleChange, handleBlur} = formikProps;

        return (
          <Form className="container-center">
            <h1>Login</h1>
        
            <div style={{marginTop: '8px'}}>
              <label htmlFor="username">username</label><br />
              <input id="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
              <p className="message-error">{errors.username}</p>
            </div>

            <div style={{marginTop: '8px'}}>
              <label htmlFor="password">password</label><br />
              <input type='password' id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
              <p className="message-error">{errors.password}</p>
            </div>
        
            <p style={{color: "red"}}>{error}</p>
        
            <button style={{ maxWidth: "100px" }} type="submit">
              Sign In
            </button>
            <hr />
            {/* <fb:login-button 
              scope="public_profile,email"
              onlogin="checkLoginState();">
            </fb:login-button> */}
            <hr />
            <Link style={{marginRight: '16px'}} to="/auth/register">Register</Link>
            <Link to="/auth/forgotPassword">Forgot Password ?</Link>
          </Form>
        )
      }}
    </Formik>
  );
}

export default Login;