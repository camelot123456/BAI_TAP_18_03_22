import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainLayout () {
    return (
        <>
            <Outlet />
        </>
    )
}

export default MainLayout;