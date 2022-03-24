import React from "react";
import { useNavigate } from "react-router-dom";

function PasswordChanged () {

    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate('/auth/login')
    }

    return (
        <>
            <h1>Password Changed</h1>
            <p>Your password has been successfully changed.</p>

            <button onClick={handleRedirect}>Log in</button>
        </>
    )
}

export default PasswordChanged