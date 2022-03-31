import  React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import orderActions from '../../../../redux/actions/order-action'

function RefundList() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orders = useSelector(state => state.orderReducer.ordersRefund)

    console.log(orders)

    useEffect(() => {
        dispatch(orderActions.showOrderStatusRefund())
    }, [])

    const handleShowRefundDetail = (token, payerId) => {
        navigate(`/admin/refund?token=${token}&PayerID=${payerId}`)
    }

    return (
        <>
            <h1>Refund List</h1>
            {orders.length != 0 ? (
                <>
                    <table className="table-1">
                        <thead>
                            <tr>
                                <th className="th-1">Id Order</th>
                                <th className="th-1">Id Payer</th>
                                <th className="th-1">Status</th>
                                <th className="th-1">Total</th>
                                <th className="th-1">Paypal Fee</th>
                                <th className="th-1">Tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="td-1">{order.idOrder}</td>
                                    <td className="td-1">{order.idPayer}</td>
                                    <td className="td-1">{order.status}</td>
                                    <td className="td-1">{order.payAuthAmount}</td>
                                    <td className="td-1">{order.payAuthPaypalFee}</td>
                                    <td className="td-1">
                                        <button onClick={() => handleShowRefundDetail(order.idOrder, order.idPayer)}>Detail</button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <p className="message-error">Refund list empty.</p>
                </>
            )}
        </>
    )
}

export default RefundList