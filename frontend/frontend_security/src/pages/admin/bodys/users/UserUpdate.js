import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { doResetUserAndRoles, doUpdate } from '../../../../redux/actions/user-action'
import { showRoleList } from '../../../../redux/actions/role-action'

function UserUpdate() {

    const {idUser} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [idRoles, setIdRole] = useState([])

    const roles = useSelector(state => state.roleReducer.roles)
    const userAndRoles = useSelector(state => state.userReducer.userAndRoles)

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationScheme = Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().min(6).max(40).matches(/^([\p{L}'][ \p{L}'-]*[\p{L}]){3,}$/u, { excludeEmptyString: true, message: 'Invalid' }).required(),
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string().min(6).required().oneOf([Yup.ref('password')], "Confirm password not mattchers!")
    })

    useEffect(() => {
        dispatch(showRoleList())
    }, [])

    useEffect(() => {
        userAndRoles.forEach(user => handleAddIdRole(user.idRole))
        initialValues.name = userAndRoles[0].name || ''
        initialValues.email = userAndRoles[0].email || ''
    }, [])

    const handleComeback = () => {
        dispatch(doResetUserAndRoles())
        navigate(-1)
    }

    const handleAddIdRole = (idRole) => {
        setIdRole(prev => {
            if (idRoles.includes(idRole)) {
                return idRoles.filter(r => r !== idRole)
            } else {
                return [...prev, idRole]
            }
        })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationScheme}
            onSubmit={(values) => {
                var data = {
                    id: idUser,
                    name: values.name, 
                    email: values.email,
                    password: values.confirmPassword, 
                    idRoles
                }

                console.log({name: values.name, password: values.confirmPassword, idRoles})

                dispatch(doUpdate(data))
                .then(() => {
                    navigate(-1)
                })
                .catch(() => {
                    alert('Failure created.')
                })
                .finally(() => {
                    dispatch(doResetUserAndRoles())
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
                            <input id="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.email}</p>
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

                        <ul>
                            {roles && (
                                roles.map((role, index) => (
                                    <li key={index}>
                                        {idRoles.includes(role.id) ? (
                                            <input className="checkbox-role" type="checkbox" defaultChecked id={role.id} onClick={() => handleAddIdRole(role.id)}/>
                                        ) : (
                                            <input className="checkbox-role" type="checkbox" id={role.id} onClick={() => handleAddIdRole(role.id)}/>
                                        )}
                                        <label htmlFor={role.id}>{role.code}</label>
                                    </li>
                                ))
                            )}
                        </ul>
                        <button type="button" className="mr-3 mt-3" onClick={handleComeback}>Cancel</button>
                        <button type="submit">update</button>
                    </Form>
                )
            }}
            
        </Formik>
    )
}

export default UserUpdate