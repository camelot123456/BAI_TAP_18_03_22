import React, { useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import parseJwt from "../../commons/jwt-common"
import { ACCESS_TOKEN, KEY_AUTH } from "../../constants/system-constant";

import Header from "./fragments/Header";

function AdminLayout () {

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

    return (
        <>
            {ref.current.exp && ref.current.iat && ref.current.sub ? (
                <>
                    <Header />
                    <Outlet />
                </>
            ) : (
                <Navigate to="/auth/login" />
            )}
        </>
    )
}

export default AdminLayout;