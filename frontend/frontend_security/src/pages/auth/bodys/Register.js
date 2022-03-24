import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doRegister } from "../../../redux/actions/auth-action";
import * as Yup from 'yup'
import { Form, Formik } from "formik";

import '../../../App.css'

function Register () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(6).matches(/^([\p{L}'][ \p{L}'-]*[\p{L}]){3,}$/u, { excludeEmptyString: true, message: 'Invalid name'}).required(),
        username: Yup.string().min(6).matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, {excludeEmptyString: true, message: 'Invalid username'}).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string().min(6).required().oneOf([Yup.ref('password')], "Confirm password not mattchers!")
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} 
            onSubmit={(values) => {
                var data = {
                    name: values.name,
                    email: values.email, 
                    username: values.username, 
                    password: values.confirmPassword
                }
                dispatch(doRegister(data))
                .then(() =>{
                    navigate('/auth/login')
                })
                .catch(() => alert('Failure Register'))
            }}
        >
            {(formikProps) => {
                const {errors, values, handleChange, handleBlur} = formikProps
                return (
                    <Form>
                        <h1>Register</h1>
                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="name">name</label><br />
                            <input id="name" onChange={handleChange} value={values.name} onBlur={handleBlur}/>
                            <p className="message-error">{errors.name}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="username">username</label><br />
                            <input id="username" onChange={handleChange} value={values.username} onBlur={handleBlur}/>
                            <p className="message-error">{errors.username}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="email">email</label><br />
                            <input id="email" type="email" onChange={handleChange} value={values.email} onBlur={handleBlur}/>
                            <p className="message-error">{errors.email}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="password">password</label><br />
                            <input id="password" type="password" onChange={handleChange} value={values.password} onBlur={handleBlur}/>
                            <p className="message-error">{errors.password}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="confirmPassword">confirmPassword</label><br />
                            <input id="confirmPassword" type="password" onChange={handleChange} value={values.confirmPassword} onBlur={handleBlur}/>
                            <p className="message-error">{errors.confirmPassword}</p>
                        </div>

                        <button style={{marginTop: '8px'}} type="submit">Register</button>
                    </Form>
                )
            }}

        </Formik>
    )
}

export default Register