import React from "react";
import { Link, useNavigate } from "react-router-dom";
import parseJwt from "../../../commons/jwt-common";
import { ACCESS_TOKEN} from "../../../constants/system-constant";
import '../../../App.css'
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../../../redux/actions/auth-action";

function Header () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authProvider = useSelector(state => state.authReducer.authProvider)

    const accessToken = parseJwt(authProvider.accessToken)

    const doLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        dispatch(removeAuth())
        navigate('/auth/login')
    }

    return (
        <div className="header">
            <div>
                <Link style={{marginRight: '16px'}} to="/home">Home</Link>
                <Link style={{marginRight: '16px'}} to="/admin">Admin</Link>
                <Link style={{marginRight: '16px'}} to="/admin/users">User Management</Link>
                <Link style={{marginRight: '16px'}} to="/admin/roles">Role Management</Link>
            </div>

            <div>
                <span>Hello, {accessToken.sub}     </span>
                <a href="#" onClick={(e)=>doLogout(e)}>Logout</a>
            </div>
        </div>
    )
}

export default Header;