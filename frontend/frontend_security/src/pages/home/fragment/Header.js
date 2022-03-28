import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import parseJwt from "../../../commons/jwt-common";
import { ACCESS_TOKEN, ACCESS_TOKEN_PAYPAL } from "../../../constants/system-constant";
import '../../../App.css'
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../../../redux/actions/auth-action";
import { doCountProductOfCart } from "../../../redux/actions/cart-action";

function Header () {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)

    const cartTotal = useSelector(state => state.cartReducer.cartTotal)

    useEffect(() => {
        if (accessToken) {
            dispatch(doCountProductOfCart(accessToken.sub))
        }
    }, [])

    const doLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(ACCESS_TOKEN_PAYPAL)
        dispatch(removeAuth())
        navigate('/auth/login')
    }

    return (
        <div className="header">
            <div>
                <Link style={{marginRight: '16px'}} to="/home">Home</Link>
                <Link style={{marginRight: '16px'}} to="/admin">Admin</Link>
            </div>

            {accessToken ? (
                <div>
                    <Link to="/cart"><span>cart({cartTotal || 0})</span></Link>
                    {'    '}
                    <span>Hello, {accessToken.sub}     </span>
                    <a href="#" onClick={(e)=>doLogout(e)}>Logout</a>
                </div>
            ) : (
                <div>
                    <Link style={{marginRight: '16px'}} to="/auth/register">Register</Link>
                    <Link to="/auth/login">Login</Link>
                </div>
            )}
        </div>
    )
}

export default Header;