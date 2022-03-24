import React from "react";
import { useNavigate } from "react-router-dom";

function PageError403 () {
    const navigate = useNavigate()

    return (
        <>
            <h1>Status code: 403</h1>
            <h1>Message: Forbidden</h1>
            <a href="#" onClick={() => navigate(-2)}>Go back</a>
        </>
    )
}

export default PageError403;