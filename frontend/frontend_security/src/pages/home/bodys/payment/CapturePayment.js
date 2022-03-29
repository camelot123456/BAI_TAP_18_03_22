import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import paypalAction from "../../../../redux/actions/paypal-action";
import orderAction from "../../../../redux/actions/order-action"
import parseJwt from "../../../../commons/jwt-common";
import { doCountProductOfCart, doPaymentOrder, showProductCart } from "../../../../redux/actions/cart-action";

function CapturePayment() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const order = useSelector((state) => state.orderReducer.order)
    const items = useSelector((state) => state.orderReducer.items)
    const authProvider = useSelector((state) => state.authReducer.authProvider);
    const accessToken = parseJwt(authProvider.accessToken);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(orderAction.showOrderDetail(
            searchParams.get('token'), 
            searchParams.get('PayerID')
            ))
    }, [])

    const handlePayment = (idOrder) => {
        dispatch(paypalAction.doCaptureOrder(idOrder))
        .then(() => {
            dispatch(doPaymentOrder(accessToken.sub))
            dispatch(doCountProductOfCart(accessToken.sub))
            dispatch(showProductCart(accessToken.sub))
        })
        .finally(() => {
            navigate('/cart')
        })
    }

    return (
        <>
      <h3>Review Payment</h3>
      {order.id && (
        <>
          <h5>Order Approved</h5>
          <p>Id order: {order.idOrder}</p>
          <p>Created time: {order.createTime}</p>
          <p>Intent: {order.intent}</p>

          <h5>Payer</h5>
          <p>Id Payer: {order.idPayer}</p>
          <p>Given name: {order.givenNamePayer}</p>
          <p>Surname: {order.surnamePayer}</p>
          <p>Country code: {order.countryCode}</p>

          <h5>Shipping</h5>
          <p>Full Name: {`${order.givenNamePayer} ${order.surnamePayer}`}</p>
          <p>Address Line 1: {order.addLine1Cus}</p>
          <p>Address Line 2: {order.addLine2Cus}</p>
          <p>Admin area 1: {order.adArea1}</p>
          <p>Admin area 2: {order.adArea2}</p>
          <p>Address Country Code: {order.couCode}</p>

          <h5>Payee</h5>
          <p>Email: {order.emailPayer}</p>

          <h5>Items</h5>
          <table className="table-1">
            <thead>
              <tr>
                <th className="th-1">Name</th>
                <th className="th-1">Description</th>
                <th className="th-1">Quantity</th>
                <th className="th-1">Price</th>
                <th className="th-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {items && items.map((item, index) => (
                <tr key={index}>
                  <td className="td-1">{item.nameProduct}</td>
                  <td className="td-1"><img style={{width: '70px'}} src={item.avatarUrl} alt={item.name} /></td>
                  <td className="td-1">{item.quantity}</td>
                  <td className="td-1">{item.priceProduct}</td>
                  <td className="td-1">{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Purchase Units</h5>
          <p>Status: {order.status}</p>
          <p>Item Total: ${order.total}</p>
          <p>Currency code: {order.currencyCode}</p>

          <button onClick={() => handlePayment(order.idOrder)}>Payment</button>    
        </>
      )}
    </>
    )

}

export default CapturePayment