import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik"
import * as Yup from "yup"

import { doCreate } from "../../../../redux/actions/user-action";

function UserCreate () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationScheme = Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().min(6).max(40).matches(/^([\p{L}'][ \p{L}'-]*[\p{L}]){3,}$/u, { excludeEmptyString: true, message: 'Invalid' }).required(),
        username: Yup.string().min(6).matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, { excludeEmptyString: true, message: 'Invalid' }).required(),
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string().min(6).required().oneOf([Yup.ref('password')], "Confirm password not mattchers!")
    })

    const handleComeback = () => {
        navigate(-1)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationScheme}
            onSubmit={(values) => {
                dispatch(doCreate({
                    email: values.email,
                    name: values.name, 
                    username: values.username, 
                    password: values.confirmPassword
                }))
                .then(() => {
                    navigate(-1)
                })
                .catch(() => {
                    alert('Failure created.')
                })
            }}
        >
            {(formikProps) => {
                const {errors, values, handleBlur, handleChange} = formikProps

                return (
                    <Form>
                        <h1>Users Management</h1>
                        <hr />
                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="name">name</label><br />
                            <input id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.name}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="email">email</label><br />
                            <input id="email" value={values.email} type="email" onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.email}</p>
                        </div>

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

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="confirmPassword">confirm password</label><br />
                            <input type='password' id="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.confirmPassword}</p>
                        </div>

                        <button className="mr-3 mt-3" onClick={handleComeback}>Cancel</button>
                        <button className="mt-3" type="submit">Create</button>

                    </Form>
                )
            }}
            
        </Formik>
    )

}

export default UserCreate;