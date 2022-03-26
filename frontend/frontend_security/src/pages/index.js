import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ACCESS_TOKEN, KEY_AUTH } from "../constants/system-constant";
import { removeAuth, setAuth } from "../redux/actions/auth-action";

function MainLayout () {

    const dispatch = useDispatch()

    const tokenStorage = localStorage.getItem(ACCESS_TOKEN) || ''
    const token = tokenStorage.substring(KEY_AUTH.length)
    
    dispatch(setAuth(token))


    return (
        <>
            <Outlet />
        </>
    )
}

export default MainLayout;