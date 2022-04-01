import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

import parseJwt from "../../../../commons/jwt-common";
import cartActions from "../../../../redux/actions/cart-action";
import orderActions from "../../../../redux/actions/order-action";
import Cart from "./Cart";
import Order from "./Order";
import WaittingList from "./WaittingList";

function CartAndOrder () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)
    const productCart = useSelector(state => state.cartReducer.productCart)
    const orders = useSelector(state => state.orderReducer.orders)
    const ordersPaid = useSelector(state => state.orderReducer.ordersUnReceive)

    
    useEffect(() => {
        dispatch(cartActions.showProductCart(accessToken.sub))
        dispatch(orderActions.showUnpaidOrderList(accessToken.sub))
        dispatch(orderActions.showPaidOrderUnReceivedList(accessToken.sub))
    }, [])
    
    const handleDeleteProduct = (idProductCart) => {
        dispatch(cartActions.doDeleteProductCart(idProductCart))
        .then(() => {
            dispatch(cartActions.doCountProductOfCart(accessToken.sub))
            dispatch(cartActions.showProductCart(accessToken.sub))
            dispatch(orderActions.showPaidOrderUnReceivedList(accessToken.sub))
        })
    }
    
    const handlePayment = () => {
        navigate('/payment')
    }
    
    const handleDeleteOrder = (idOrder, payerId) => {
        dispatch(orderActions.doDeleteOrder(idOrder, payerId))
        .then(() => {
            dispatch(cartActions.showProductCart(accessToken.sub))
            dispatch(orderActions.showUnpaidOrderList(accessToken.sub))
            dispatch(orderActions.showPaidOrderUnReceivedList(accessToken.sub))
        })
    }
    const handlePaymentOrder = (idOrder, payerId) => {
        navigate(`/capture?token=${idOrder}&PayerID=${payerId}`)
    }

    return (
        <>
            <Cart 
                productCart={productCart} 
                onDeleteProduct={handleDeleteProduct} 
                onPayment={handlePayment}
            />
            <hr style={{margin : '8px 0px'}}/>
            <Order
                orders={orders} 
                onDeleteOrder={handleDeleteOrder} 
                onPaymentOrder={handlePaymentOrder}
            />
            <hr style={{margin : '8px 0px'}}/>
            <WaittingList 
                orders={ordersPaid} 
                onPaymentOrder={handlePaymentOrder}
            />
            <hr style={{margin : '8px 0px'}}/>
        </>
    )
}

export default CartAndOrder