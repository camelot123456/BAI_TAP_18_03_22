function WaittingList(props) {

    const {orders, onPaymentOrder} = props

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

export default WaittingList