import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import paypalAction from "../../../../redux/actions/paypal-action";

function ReviewPayment() {
  const dispatch = useDispatch();

  const [orderCreate, setOrderCreate] = useState(JSON.parse(localStorage.getItem("orderCreate")))
  const orderApproved = useSelector((state) => state.paypalReducer.orderApproved)

  useEffect(() => {
    dispatch(paypalAction.showOrder(orderCreate.id))
  }, []) 

  const handleAuthorize = (idOrder) => {
    dispatch(paypalAction.doAuthorizePaymentForOrder(idOrder))
    .then(() => {
      var payload = {
        idOrder: orderApproved.id,
        intent: orderApproved.intent,
        status: orderApproved.status,
        createTime: orderApproved.create_time,
  
        referenceId: orderApproved.purchase_units[0].reference_id,
        nameShippingCus: orderApproved.purchase_units[0].shipping.name.full_name,
        addLine1Cus: orderApproved.purchase_units[0].shipping.address.address_line_1,
        addLine2Cus: orderApproved.purchase_units[0].shipping.address.address_line_2,
        adArea1: orderApproved.purchase_units[0].shipping.address.admin_area_1,
        adArea2: orderApproved.purchase_units[0].shipping.address.admin_area_2,
        posCode: orderApproved.purchase_units[0].shipping.address.postal_code,
        couCode: orderApproved.purchase_units[0].shipping.address.country_code,
  
        givenNamePayer: orderApproved.payer.name.given_name,
        surnamePayer: orderApproved.payer.name.surname,
        emailPayer: orderApproved.payer.email_address,
        idPayer: orderApproved.payer.payer_id,
        couCodePayer: orderApproved.payer.address.country_code,
  
      }
    })
  }

  return (
    <>
      <h3>Review Payment</h3>
      {orderApproved.status && (
        <>
          <h5>Order Approved</h5>
          <p>Id order: {orderApproved.id}</p>
          <p>Created time: {orderApproved.create_time}</p>
          <p>Intent: {orderApproved.intent}</p>

          <h5>Payer</h5>
          <p>Id Payer: {orderApproved.payer.payer_id}</p>
          <p>Given name: {orderApproved.payer.name.given_name}</p>
          <p>Surname: {orderApproved.payer.name.surname}</p>
          <p>Country code: {orderApproved.payer.address.country_code}</p>

          <h5>Shipping</h5>
          <p>Full Name: {orderApproved.purchase_units[0].shipping.name.full_name}</p>
          <p>Address Line 1: {orderApproved.purchase_units[0].shipping.address.address_line_1}</p>
          <p>Address Line 2: {orderApproved.purchase_units[0].shipping.address.address_line_2 || ''}</p>
          <p>Admin area 1: {orderApproved.purchase_units[0].shipping.address.admin_area_1}</p>
          <p>Admin area 2: {orderApproved.purchase_units[0].shipping.address.admin_area_2}</p>
          <p>Address Country Code: {orderApproved.purchase_units[0].shipping.address.admin_area_2}</p>

          <h5>Payee</h5>
          <p>Email: {orderApproved.purchase_units[0].payee.email_address}</p>
          <p>Merchant Id: {orderApproved.purchase_units[0].payee.merchant_id}</p>

          <h5>Items</h5>
          <table className="table-1">
            <thead>
              <tr>
                <th className="th-1">Name</th>
                <th className="th-1">Description</th>
                <th className="th-1">Quantity</th>
                <th className="th-1">Price</th>
                <th className="th-1">Currency Code</th>
              </tr>
            </thead>
            <tbody>
              {orderApproved.purchase_units[0].items.map((item, index) => (
                <tr key={index}>
                  <td className="td-1">{item.name}</td>
                  <td className="td-1">{item.description}</td>
                  <td className="td-1">{item.quantity}</td>
                  <td className="td-1">{item.unit_amount.value}</td>
                  <td className="td-1">{item.unit_amount.currency_code}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Purchase Units</h5>
          <p>Status: {orderApproved.purchase_units.status}</p>
          <p>Item Total: ${orderApproved.purchase_units[0].amount.breakdown.item_total.value}</p>
          <p>Currency code: {orderApproved.purchase_units[0].amount.breakdown.item_total.currency_code}</p>
          <p>Description: {orderApproved.purchase_units[0].description}</p>     

          <button onClick={() => handleAuthorize(orderApproved.id)}>Authorize payment for order</button>    
        </>
      )}
    </>
  );
}


export default ReviewPayment;
