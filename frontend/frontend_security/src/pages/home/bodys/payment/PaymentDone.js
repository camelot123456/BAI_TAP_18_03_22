import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function PaymentDone () {

    const transaction = useSelector((state) => state.paymentReducer.transaction);
    const payerInfo = useSelector((state) => state.paymentReducer.payerInfo);

    
    return (
        <>
            <h3>Payment Done. Thank you for purchasing our products</h3>
            <table>
            <tbody>
            <tr>
                <th colSpan="2">Transaction Details</th>
            </tr>
            <tr>
                <td>Description: </td>
                <td>{transaction.description}</td>
            </tr>
            <tr>
                <td>Sub total: </td>
                <td>${transaction.amount.details.subtotal}</td>
            </tr>
            <tr>
                <td>Shipping: </td>
                <td>${transaction.amount.details.shipping}</td>
            </tr>
            <tr>
                <td>Tax: </td>
                <td>${transaction.amount.details.tax}</td>
            </tr>
            <tr>
                <td>Total: </td>
                <td>${transaction.amount.total}</td>
            </tr>

            </tbody>
        </table>
        </>
    )
}

export default PaymentDone