import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmailSent(props) {
    const {email} = props

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <>
            <h1>Email Sent</h1>
            <p>We sent an email to {email} with a link to reset your password.</p>

            <button onClick={handleBack}>Back</button>
        </>
    )
}

export default EmailSent