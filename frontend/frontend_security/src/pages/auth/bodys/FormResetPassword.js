import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik"
import * as Yup from "yup"

import { doChangePassword } from "../../../redux/actions/auth-action";
import { useDispatch } from "react-redux";

function FormResetPassword() {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const initialValues = {
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string().min(6).oneOf([Yup.ref('password')], 'Confirm password not mattchers!')
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(doChangePassword({
                    otpCode: searchParams.get('otpCode'),
                    password: values.confirmPassword
                }))
                .then(() => {
                    navigate('/auth/passwordChanged')
                })
            }}
        >
            {(formikProps) => {
                const {errors, values, handleBlur, handleChange} = formikProps

                return (
                    <Form>
                        <h1>Reset Password</h1>
                        <hr />

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

                        <button className="mt-3" type="submit">Reset</button>

                    </Form>
                )
            }}
            
        </Formik>
    )
}

export default FormResetPassword