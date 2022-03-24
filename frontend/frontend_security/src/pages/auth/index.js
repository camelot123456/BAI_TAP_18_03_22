import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../auth/fragments/Header"

function AuthLayout () {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AuthLayout;
