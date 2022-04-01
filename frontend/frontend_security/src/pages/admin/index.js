import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import parseJwt from "../../commons/jwt-common"

import Header from "./fragments/Header";

function AdminLayout () {

    const authProvider = useSelector(state => state.authReducer.authProvider)

    const accessToken = parseJwt(authProvider.accessToken)

    return (
        <>
            {accessToken && accessToken.roles.some(role => role === 'ROLE_ADMIN' || role === 'ROLE_SUPER_ADMIN') ? (
                <>
                    <Header />
                    <Outlet />
                </>
            ) : (
                <Navigate to="/error403" />
            )}
        </>
    )
}

export default AdminLayout;