import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import parseJwt from "../../../commons/jwt-common";
import { ACCESS_TOKEN, KEY_AUTH } from "../../../constants/system-constant";
import '../../../App.css'

function Header () {

    const ref = useRef('');
    const navigate = useNavigate()

    try {
        const token = localStorage.getItem(ACCESS_TOKEN).substring(KEY_AUTH.length)

        if (parseJwt(token)) {
            ref.current = parseJwt(token)
        }
    } catch (error) {
        navigate("/auth/login")
    }

    const doLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        navigate('/auth/login')
    }

    return (
        <div className="header">
            <div>
                <Link style={{marginRight: '16px'}} to="/home">Home</Link>
                <Link style={{marginRight: '16px'}} to="/admin">Admin</Link>
            </div>

            {ref.current ? (
                <div>
                    <span>Hello, {ref.current.sub}     </span>
                    <a href="#" onClick={(e)=>doLogout(e)}>Logout</a>
                </div>
            ) : (
                <div>
                    <Link style={{marginRight: '16px'}} to="/auth/register">Register</Link>
                    <Link to="/auth/login">Login</Link>
                </div>
            )}
        </div>
    )
}

export default Header;