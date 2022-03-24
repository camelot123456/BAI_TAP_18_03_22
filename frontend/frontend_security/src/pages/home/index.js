import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./fragment/Header";

function HomeLayout () {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HomeLayout;
