import React from "react";
import { Link } from "react-router-dom";
import '../../../App.css'

function Header () {

    return (
        <div>
            <Link style={{marginRight: '16px'}} to="/home">Home</Link>
            <Link style={{marginRight: '16px'}} to="/admin">Admin</Link>
        </div>
    )
}

export default Header;