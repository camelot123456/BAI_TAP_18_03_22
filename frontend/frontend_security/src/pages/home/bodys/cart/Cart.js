import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import parseJwt from "../../../../commons/jwt-common";
import { doCountProductOfCart, doDeleteProductCart, showProductCart } from "../../../../redux/actions/cart-action";

function Cart () {

    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productCart = useSelector(state => state.cartReducer.productCart)

    useEffect(() => {
        dispatch(showProductCart(accessToken.sub))
    }, [])

    const handleDeleteProduct = (idProductCart) => {
        dispatch(doDeleteProductCart(idProductCart))
        .then(() => {
            dispatch(doCountProductOfCart(accessToken.sub))
            dispatch(showProductCart(accessToken.sub))
        })
    }

    const handlePayment = () => {
        navigate('/payment')
    }

    return (
        <>
            <h1>Cart</h1>
            {productCart ? (
                <>
                    <table className="table-1">
                        <thead>
                            <tr>
                                <th className="th-1">id</th>
                                <th className="th-1">url</th>
                                <th className="th-1">name</th>
                                <th className="th-1">quantity</th>
                                <th className="th-1">price</th>
                                <th className="th-1">total price</th>
                                <th className="th-1">tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productCart && (
                                productCart.map((pdc, index) => (
                                    <tr key={index}>
                                        <td className="td-1">{pdc.idProductCart}</td>
                                        <td className="td-1"><img src={pdc.avatarUrl} alt={pdc.nameProduct} style={{width: '60px'}}/></td>
                                        <td className="td-1">{pdc.nameProduct}</td>
                                        <td className="td-1">{pdc.quantity}</td>
                                        <td className="td-1">{pdc.priceProduct}</td>
                                        <td className="td-1">{pdc.totalPrice}</td>
                                        <td className="td-1">
                                            <button onClick={() => handleDeleteProduct(pdc.idProductCart)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="th-1" colSpan="3">Total</th>
                                <th className="th-1">{productCart.reduce((prev, curr) => Number(prev) + Number(curr.quantity), 0)}</th>
                                <th className="th-1"></th>
                                <th className="th-1">{productCart.reduce((prev, curr) => Number(prev) + Number(curr.totalPrice), 0)}</th>
                                <th className="th-1"></th>
                            </tr>
                        </tfoot>
                    </table>
                    <hr/>

                    <button onClick={handlePayment}>Payment</button>
                </>
            ) : (
                <h3>Cart Empty</h3>
            )}
            
        </>
    )
}

export default Cart