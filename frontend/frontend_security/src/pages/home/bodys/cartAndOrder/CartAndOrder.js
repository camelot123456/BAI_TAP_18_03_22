import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

import parseJwt from "../../../../commons/jwt-common";
import cartActions from "../../../../redux/actions/cart-action";
import orderActions from "../../../../redux/actions/order-action";
import paypalActions from "../../../../redux/actions/paypal-action";

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

    const handleFinishResponse = (idOrder, payerId) => {

    }

    const handleRefund = (idOrder, payerId) => {
        
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
                onDeleteOrder={handleDeleteOrder} 
                onPaymentOrder={handlePaymentOrder}
            />
            <hr style={{margin : '8px 0px'}}/>
        </>
    )
}

function Cart(props) {
    
    const {productCart, onDeleteProduct, onPayment} = props

    const handleDeleteProduct = (idProduct) => {
        if (onDeleteProduct) {
            onDeleteProduct(idProduct)
        }
    }

    const handlePayment = () => {
        if (onPayment) {
            onPayment()
        }
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
                                <th className="th-1">
                                    <button onClick={handlePayment}>Payment</button>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </>
            ) : (
                <h3 className="message-error">Cart Empty</h3>
            )}
            
        </>
    )

}


function Order(props) {

    const {orders, onDeleteOrder, onPaymentOrder} = props

    const handleDeleteOrder = (idOrder, payerId) => {
        if (onDeleteOrder) {
            onDeleteOrder(idOrder, payerId)
        }
    }
    const handlePaymentOrder = (idOrder, payerId) => {
        if (onPaymentOrder) {
            onPaymentOrder(idOrder, payerId)
        }
    }

    return (
        <>
            <h1>Order</h1>
            {orders.length != 0 ? (
                <>
                    <table className="table-1">
                        <thead>
                            <tr>
                                <th className="th-1">Id Order</th>
                                <th className="th-1">Status</th>
                                <th className="th-1">Create Time</th>
                                <th className="th-1">Reference Id</th>
                                <th className="th-1">Full name</th>
                                <th className="th-1">Payer Id</th>
                                <th className="th-1">Total</th>
                                <th className="th-1">tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && (
                                orders.map((or, index) => (
                                    <tr key={index}>
                                        <td className="td-1">{or.idOrder}</td>
                                        <td className="td-1">{or.status}</td>
                                        <td className="td-1">{or.createTime}</td>
                                        <td className="td-1">{or.referenceId}</td>
                                        <td className="td-1">{or.nameShippingCus}</td>
                                        <td className="td-1">{or.idPayer}</td>
                                        <td className="td-1">{or.total}</td>
                                        <td className="td-1">
                                            <button onClick={() => handleDeleteOrder(or.idOrder, or.idPayer)}>Delete</button>
                                            <button onClick={() => handlePaymentOrder(or.idOrder, or.idPayer)}>Continue</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3 className="message-error">Order Empty</h3>
            )}
        </>
    )

}

function WaittingList(props) {

    const {orders, onDeleteOrder, onPaymentOrder} = props

    const handleDeleteOrder = (idOrder, payerId) => {
        if (onDeleteOrder) {
            onDeleteOrder(idOrder, payerId)
        }
    }
    const handlePaymentOrder = (idOrder, payerId) => {
        if (onPaymentOrder) {
            onPaymentOrder(idOrder, payerId)
        }
    }

    return (
        <>
            <h1>Waitting List</h1>
            {orders.length != 0 ? (
                <>
                    <table className="table-1">
                        <thead>
                            <tr>
                                <th className="th-1">Id Order</th>
                                <th className="th-1">Status</th>
                                <th className="th-1">Create Time</th>
                                <th className="th-1">Reference Id</th>
                                <th className="th-1">Full name</th>
                                <th className="th-1">Payer Id</th>
                                <th className="th-1">Total</th>
                                <th className="th-1">tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && (
                                orders.map((or, index) => (
                                    <tr key={index}>
                                        <td className="td-1">{or.idOrder}</td>
                                        <td className="td-1">{or.status}</td>
                                        <td className="td-1">{or.createTime}</td>
                                        <td className="td-1">{or.referenceId}</td>
                                        <td className="td-1">{or.nameShippingCus}</td>
                                        <td className="td-1">{or.idPayer}</td>
                                        <td className="td-1">{or.total}</td>
                                        <td className="td-1">
                                            {/* <button onClick={() => handleDeleteOrder(or.idOrder, or.idPayer)}>Delete</button> */}
                                            <button onClick={() => handlePaymentOrder(or.idOrder, or.idPayer)}>Detail</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3 className="message-error">Order Empty</h3>
            )}
        </>
    )

}

export default CartAndOrder