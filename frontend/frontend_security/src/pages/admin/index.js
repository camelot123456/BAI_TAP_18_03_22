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
            {accessToken ? (
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