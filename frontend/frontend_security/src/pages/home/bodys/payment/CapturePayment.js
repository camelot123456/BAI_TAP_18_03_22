import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { doCapturePayment, showOrderAuthorize } from "../../../../redux/actions/paypal-action";

function CapturePayment() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [orderAuthorize, setOrderAuthorize] = useState(JSON.parse(localStorage.getItem("orderAuthorize")))
    const orderAuthorizePayment = useSelector((state) => state.paypalReducer.orderCapture)

    useEffect(() => {
        dispatch(showOrderAuthorize(orderAuthorize.purchase_units[0].payments.authorizations[0].id))
    }, [])

    const handleCapturePayment = (idOrder) => {
        var payload = {
            amount: {
                value: orderAuthorizePayment.amount.value,
                currency_code: orderAuthorizePayment.amount.currency_code
            },
            invoice_id: new Date().valueOf(),
            final_capture: true,
            note_to_payer: "giao thanh cong.",
            soft_descriptor: "test description"
        }
        dispatch(doCapturePayment(idOrder, payload))
        .then(() => {
            localStorage.removeItem('orderPaypal')
            localStorage.removeItem('orderAuthorize')
            localStorage.removeItem('orderCreate')
            localStorage.removeItem('orderApproved')
            navigate('/paypal/paymentDone')
        })
    }

    return (
        <>
        {orderAuthorizePayment.id ? (
            <> 
                <h5>Capture Payment</h5>
                <h5>Order Approved</h5>
                <p>Id order authrize: {orderAuthorizePayment.id}</p>
                <p>Id order: {orderAuthorizePayment.supplementary_data.related_ids.order_id || ''}</p>
                <p>Create time: {orderAuthorizePayment.create_time}</p>
                <p>Expiration time: {orderAuthorizePayment.expiration_time}</p>
                <p>Update time: {orderAuthorizePayment.update_time}</p>
                <p>Status: {orderAuthorizePayment.status}</p>

                <h5>Amount</h5>
                <p>Currency code: {orderAuthorizePayment.amount.currency_code}</p>
                <p>Item Total: ${orderAuthorizePayment.amount.value}</p>

                <button onClick={() => handleCapturePayment(orderAuthorizePayment.id)}>Capture Order</button>    
            </>
        ) : (
            // <Navigate to="/home" />
            <></>
        )}
        </>
    )

}

export default CapturePayment