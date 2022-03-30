import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../../../commons/jwt-common";
import orderActions from "../../../../redux/actions/order-action";

function HistoryOrder () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)
    const orders = useSelector(state => state.orderReducer.ordersPaid)

    
    useEffect(() => {
        dispatch(orderActions.showPaidOrderList(accessToken.sub))
    }, [])

    const handleDeleteOrder = (idOrder, payerId) => {
        dispatch(orderActions.doDeleteOrder(idOrder, payerId))
        .then(() => {
            dispatch(orderActions.showPaidOrderList(accessToken.sub))
        })
    }
    const handlePaymentOrder = (idOrder, payerId) => {
        navigate(`/capture?token=${idOrder}&PayerID=${payerId}`)
    }

    return (
        <>
            <h1>History Order</h1>
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
                                            <button onClick={() => handlePaymentOrder(or.idOrder, or.idPayer)}>Detail</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3 className="message-error">History Order Empty</h3>
            )}
        </>
    )

}

export default HistoryOrder