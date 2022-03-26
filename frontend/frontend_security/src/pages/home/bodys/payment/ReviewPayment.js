import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  doExecutePayment,
  doReviewPayment,
} from "../../../../redux/actions/payment-action";

function ReviewPayment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const transaction = useSelector((state) => state.paymentReducer.transaction);
  const payerInfo = useSelector((state) => state.paymentReducer.payerInfo);
  const shippingAddress = useSelector(
    (state) => state.paymentReducer.shippingAddress
  );

  console.log({
    paymentId: searchParams.get("paymentId"),
    token: searchParams.get("token"),
    PayerID: searchParams.get("PayerID"),
  });

  console.log({ transaction, payerInfo, shippingAddress });

  useEffect(() => {
    var data = {
      paymentId: searchParams.get("paymentId"),
      token: searchParams.get("token"),
      PayerID: searchParams.get("PayerID"),
    };
    dispatch(doReviewPayment(data));
  }, []);

  const handleExecutePayment = () => {
    dispatch(
      doExecutePayment({
        paymentId: searchParams.get("paymentId"),
        PayerID: searchParams.get("PayerID"),
      })
    )
    .then(() => {
      navigate('/paypal/paymentDone')
    });
  };

  return (
    <>
      <h3>Review Payment</h3>
      {transaction && shippingAddress && payerInfo && (
        <ContentPaymnet
          transaction={transaction}
          shippingAddress={shippingAddress}
          payerInfo={payerInfo}
        />
      )}
      <button onClick={handleExecutePayment}>payment</button>
    </>
  );
}

function ContentPaymnet(props) {
  const { transaction, shippingAddress, payerInfo } = props;

  return (
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

        <tr>
          <th colSpan="2">Payer Information</th>
        </tr>
        <tr>
          <td>First name: </td>
          <td>{payerInfo.firstName}</td>
        </tr>
        <tr>
          <td>Last name: </td>
          <td>{payerInfo.lastName}</td>
        </tr>
        <tr>
          <td>Email: </td>
          <td>{payerInfo.email}</td>
        </tr>

        <tr>
          <th colSpan="2">Shipping Address</th>
        </tr>
        <tr>
          <td>Recipient Name: </td>
          <td>{shippingAddress.recipientName}</td>
        </tr>
        <tr>
          <td>Line 1: </td>
          <td>{shippingAddress.line1}</td>
        </tr>
        <tr>
          <td>City: </td>
          <td>{shippingAddress.city}</td>
        </tr>
        <tr>
          <td>State: </td>
          <td>{shippingAddress.state}</td>
        </tr>
        <tr>
          <td>Country Code: </td>
          <td>{shippingAddress.countryCode}</td>
        </tr>
        <tr>
          <td>Postal Code: </td>
          <td>{shippingAddress.postalCode}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReviewPayment;
