import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../../../commons/jwt-common";
import { showProductCart } from "../../../../redux/actions/cart-action";
import { doCreateOrderPaypal } from "../../../../redux/actions/paypal-action";
import {doCreateOrder } from "../../../../redux/actions/order-action"

function PaymentInfo() {
  const authProvider = useSelector((state) => state.authReducer.authProvider);
  const accessToken = parseJwt(authProvider.accessToken);
  const [referenceId, setReferenceId] = useState(new Date().valueOf());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCart = useSelector((state) => state.cartReducer.productCart);

  useEffect(() => {
    dispatch(showProductCart(accessToken.sub));
  }, []);

  const handlePayment = () => {
    var items = productCart.map((pc) => {
      var json = new Object();
      json.name = pc.nameProduct;
      json.quantity = pc.quantity;
      json.description = "Sale";
      json.unit_amount = {
        currency_code: "USD",
        value: pc.priceProduct,
      };
      return json;
    });

    var data = {
      intent: "AUTHORIZE",
      purchase_units: [
        {
          invoice_id: `INVOICE_${referenceId}`,
          reference_id: referenceId,
          amount: {
            currency_code: "USD",
            value: productCart.reduce(
              (prev, curr) => Number(prev) + Number(curr.totalPrice),
              0
            ),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: productCart.reduce(
                  (prev, curr) => Number(prev) + Number(curr.totalPrice),
                  0
                ),
              },
            },
          },
          description: "Test order",
          items: items,
        },
      ],
      application_context: {
        return_url: "http://localhost:3000/paypal/reviewPayment",
        cancel_url: "http://localhost:3000/paypal/cancel",
      },
    };

    // dispatch(doCreateOrderPaypal(data))
    // .then(() => {
    //   localStorage.setItem("orderPaypal", JSON.stringify(data))
    // })
    dispatch(doCreateOrder({
      // id: data.purchase_units[0].invoice_id,
      description: data.purchase_units[0].description,
      intent: data.intent,
      // items: productCart,
      total: data.purchase_units[0].amount.value,
      currencyCode: data.purchase_units[0].amount.currency_code
    }))
  };

  return (
    <>
      <h3>Payment</h3>
      <hr />
      <table>
        <tbody>
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
            <td>
              $
              {productCart.reduce(
                (prev, curr) => Number(prev) + Number(curr.totalPrice),
                0
              )}
            </td>
          </tr>
          <tr>
            <th colSpan="2">Items </th>
          </tr>
        </tbody>
      </table>

      <table className="table-1" style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th className="th-1">id</th>
            <th className="th-1">url</th>
            <th className="th-1">name</th>
            <th className="th-1">quantity</th>
            <th className="th-1">price</th>
            <th className="th-1">total price</th>
          </tr>
          {productCart &&
            productCart.map((pdc, index) => (
              <tr key={index}>
                <td className="td-1">{pdc.idProductCart}</td>
                <td className="td-1">
                  <img
                    src={pdc.avatarUrl}
                    alt={pdc.nameProduct}
                    style={{ width: "60px" }}
                  />
                </td>
                <td className="td-1">{pdc.nameProduct}</td>
                <td className="td-1">{pdc.quantity}</td>
                <td className="td-1">{pdc.priceProduct}</td>
                <td className="td-1">{pdc.totalPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handlePayment}>Payment</button>
    </>
  );
}

export default PaymentInfo;
