import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../../../commons/jwt-common";
import cartActions from "../../../../redux/actions/cart-action";
import paypalAction from "../../../../redux/actions/paypal-action";
import {doCreateOrder } from "../../../../redux/actions/order-action"

function PaymentInfo() {
  const authProvider = useSelector((state) => state.authReducer.authProvider);
  const accessToken = parseJwt(authProvider.accessToken);
  const [referenceId, setReferenceId] = useState(new Date().valueOf());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCart = useSelector((state) => state.cartReducer.productCart);

  useEffect(() => {
    dispatch(cartActions.showProductCart(accessToken.sub));
  }, []);

  const handlePayment = () => {
    var items = productCart.map((pc) => {
      var json = new Object();
      json.name = pc.nameProduct;
      json.quantity = pc.quantity;
      json.description = "Sale";
      json.sku = pc.idProduct;
      json.unit_amount = {
        currency_code: "USD",
        value: pc.priceProduct,
      };
      return json;
    });

    var data = {
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: referenceId,
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
        return_url: "http://localhost:3000/redirect/reviewPayment",
        cancel_url: "http://localhost:3000/cart",
      },
    };

    dispatch(paypalAction.doCreateOrderPaypal(data))
    .then(() => {
        localStorage.setItem("orderPaypal", JSON.stringify(data))
    })
  };

  return (
    <>
      <h3>Payment</h3>
      <hr />

      <h5>Payment</h5>
      <span>Intent: 
        <select>
          <option>CAPTURE</option>
          <option>AUTHORIZE</option>
        </select>
      </span>
      <p>Reference Id: {referenceId}</p>

      <h5>Amount </h5>
      <p>Currency code: USD</p>
      <p>Grand Total: ${productCart.reduce(
          (prev, curr) => Number(prev) + Number(curr.totalPrice),
          0
        )}
      </p>

      <h5>Items </h5>
      <table className="table-1">
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
      <br />
      <button onClick={handlePayment}>Payment</button>
    </>
  );
}

export default PaymentInfo;
