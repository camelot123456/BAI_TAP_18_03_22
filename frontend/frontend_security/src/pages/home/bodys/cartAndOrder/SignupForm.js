import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      lastName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
    }),
    onSubmit: values => {
      console.log(values)
    },
    
  });

  formik.initialValues.firstName = "nguyensybao1403" || ''
  useEffect(() => {
  }, [])

  const handleSave = values => {
    console.log(values)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      <p className="message-error">{formik.errors.firstName}</p>
      <br />


      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <p className="message-error">{formik.errors.lastName}</p>
      <br />


      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <p className="message-error">{formik.errors.email}</p>

      <br />
      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>Submit</button>
      <button type="button" onClick={() => handleSave(formik.values)} disabled={!(formik.isValid && formik.dirty)}>save</button>
    </form>
  );
};

export default SignupForm