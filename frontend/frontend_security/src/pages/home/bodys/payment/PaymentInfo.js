import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../../../../commons/jwt-common';
import { showProductCart } from '../../../../redux/actions/cart-action';
import { doCreateOrder } from '../../../../redux/actions/paypal-action';

function PaymentInfo () {

    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)
    const [referenceId, setReferenceId] = useState(new Date().valueOf())
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productCart = useSelector(state => state.cartReducer.productCart)

    useEffect(() => {
        dispatch(showProductCart(accessToken.sub))
    }, [])

    
    const handlePayment = () => {
        
        var items = productCart.map(pc => {
            var json = new Object()
            json.name = pc.nameProduct
            json.quantity = pc.quantity
            json.description = "Sale"
            json.unit_amount = {
                currency_code: "USD",
                value: pc.priceProduct
            }
            return json
        })

        var data = {
            intent: "AUTHORIZE",
            purchase_units: [
                {
                    reference_id: referenceId,
                    amount: {
                        currency_code: 'USD',
                        value: productCart.reduce((prev, curr) => Number(prev) + Number(curr.totalPrice), 0),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: productCart.reduce((prev, curr) => Number(prev) + Number(curr.totalPrice), 0)
                            }
                        }
                    },
                    description: "Test order",
                    items: items
                }
            ],
            application_context: {
                return_url: "http://localhost:3000/paypal/reviewPayment",
                cancel_url: "http://localhost:3000/paypal/cancel"
            }
        }

        dispatch(doCreateOrder(data))
    }

    return (
        <>
            <h3>Payment</h3>
            <hr />
            <table className="table-1" style={{width: '100%'}}>
                <tr>
                    <th colSpan="2">Payment</th>
                </tr>
                <tr>
                    <td>Intent: </td>
                    <td>AUTHORIZE</td>
                </tr>
                <tr>
                    <td>Reference Id: </td>
                    <td>{referenceId}</td>
                </tr>
                <tr>
                    <th colSpan="2">Amount </th>
                </tr>
                <tr>
                    <td>Currency code: </td>
                    <td>USD</td>
                </tr>
                <tr>
                    <td>Grand Total: </td>
                    <td>$115.00</td>
                </tr>
                <tr>
                    <th colSpan="2">Items </th>
                </tr>

                <tbody>
                    <tr>
                        <th className="th-1">id</th>
                        <th className="th-1">url</th>
                        <th className="th-1">name</th>
                        <th className="th-1">quantity</th>
                        <th className="th-1">price</th>
                        <th className="th-1">total price</th>
                    </tr>
                    {productCart && (
                        productCart.map((pdc, index) => (
                            <tr key={index}>
                                <td className="td-1">{pdc.idProductCart}</td>
                                <td className="td-1"><img src={pdc.avatarUrl} alt={pdc.nameProduct} style={{width: '60px'}}/></td>
                                <td className="td-1">{pdc.nameProduct}</td>
                                <td className="td-1">{pdc.quantity}</td>
                                <td className="td-1">{pdc.priceProduct}</td>
                                <td className="td-1">{pdc.totalPrice}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tr>
                    <td>Address line 1: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Address line 2: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Addmin area 1: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Addmin area  2: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Postal Code: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Country Code: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>Description: </td>
                    <td><input /></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handlePayment}>Payment</button>
                    </td>
                </tr>
            </table>
        </>
    )
}

export default PaymentInfo