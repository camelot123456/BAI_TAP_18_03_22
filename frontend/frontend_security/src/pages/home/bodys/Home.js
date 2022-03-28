import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home () {
    return (
        <>
            <h1>This is Home Page</h1>
            {/* <Link to="/home/checkout">Checkout</Link> */}

            <Outlet />
        </>
    )
}

export default Home;