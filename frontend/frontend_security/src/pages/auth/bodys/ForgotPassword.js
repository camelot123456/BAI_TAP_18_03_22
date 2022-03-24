import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom"
import "../../../App.css";

import * as Yup from "yup"
import { Form, Formik } from "formik"

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const initialValues = {
        email: ''
    }
  
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required()
    })

    const handleBack = () => {
        navigate(-1)
    }
  
    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={(values) => {
            // dispatch(doEmailReset())
            // .then(() => {
            //     navigate("/home")
            //     setError('')
            // })
            // .catch(() => {
            //     navigate("/auth/login")
            //     setError('Incorrect Username or Password.')
            // })
        }}
      >
        {(formikProps) => { 
          const { errors, values, handleChange, handleBlur } = formikProps
  
          return (
            <Form className="container-center">
              <h1>Forgot Password</h1>
  
              <div>
                <label htmlFor="email">Email</label><br />
                <input id="email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                <p className="message-error">{errors.email}</p>
              </div>
  
              <div>
                <button style={{ maxWidth: "100px", marginRight: '8px' }} onClick={handleBack}>Cancel</button>
                <button style={{ maxWidth: "100px" }} type="submit">
                    Submit
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    );
}

export default ForgotPassword;
