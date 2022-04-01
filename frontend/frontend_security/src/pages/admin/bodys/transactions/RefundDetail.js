import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";


import orderActions from "../../../../redux/actions/order-action"
import paypalActions from "../../../../redux/actions/paypal-action";

function RefundDetail() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = useSelector((state) => state.orderReducer.items)
    const [searchParams, setSearchParams] = useSearchParams()
    
    const order = useSelector((state) => state.orderReducer.order)


    useEffect( () => {
        dispatch(orderActions.showOrderDetail(
            searchParams.get('token'), 
            searchParams.get('PayerID')
        ))
    }, [])

    const handleAccept = () => {
        let cf = window.confirm(`Are you sure you want to accept refund this order?`)
        if (cf) {
            var payload = {
                amount: {
                    value: order.payAuthNetAmount,
                    currency_code: order.currencyCode
                },
                note_to_payer: order.noteRefund
            }
            dispatch(paypalActions.doRefundPayment(order.payAuthId, order.idOrder, order.idPayer, payload))
            .then(() => {
                navigate('/admin/refundList')
            })
        } return
    }

    const handleDeny = () => {
        let cf = window.confirm(`Are you sure you want to deny refund this order ?`)
        if (cf) {
            dispatch(orderActions.doUpdateStatusRefundFail(order.idOrder, order.idPayer))
            .then(() => navigate('/admin/refundList'))
        } return
    }

    return (
        <>
            <h3>Order Detail</h3>
            <h5>Order Approved</h5>
            <p>Id order: {order.idOrder}</p>
            <p>Created time: {order.createTime}</p>
            <p>Intent: {order.intent}</p>
            <p className="message-error">Final Capture: {order.finalCapture ? 'PAID' : 'UNPAID'}</p>

            <h5>Payer</h5>
            <p>Id Payer: {order.idPayer}</p>
            <p>Given name: {order.givenNamePayer}</p>
            <p>Surname: {order.surnamePayer}</p>
            <p>Country Code: {order.couCodePayer}</p>

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
            <p className="message-error">Status: {order.status}</p>
            <p className="message-error">Item Total: ${order.total}</p>
            <p>Currency code: {order.currencyCode}</p>

            <h5>Shipping</h5>
            <p>Full Name: {order.nameShippingCus}</p>
            <p>Address Line 1: {order.addLine1Cus}</p>
            <p>Address Line 2: {order.addLine2Cus}</p>
            <p>Admin Area 1: {order.adArea2}</p>
            <p>Admin Area 2: {order.adArea2}</p>
            <p>Postal Code: {order.posCode}</p>
            <p>Country Code: {order.couCode}</p>
            <br />

            <div style={{color: 'blue', backgroundColor: '#c6c6ff', padding: '12px'}}>
                <h4>Reason:</h4>
                <p>{order.noteRefund}</p>
            </div>
            
            <button type="button" onClick={handleAccept}>Accept</button>{'   '}
            <button type="button" onClick={handleDeny}>Deny</button>
        </>
    )

}

export default RefundDetail