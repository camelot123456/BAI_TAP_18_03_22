import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from 'yup'
import { useFormik } from "formik";


import paypalAction from "../../../../redux/actions/paypal-action";
import orderActions from "../../../../redux/actions/order-action"
import parseJwt from "../../../../commons/jwt-common";
import cartActions from "../../../../redux/actions/cart-action";

function CapturePayment() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = useSelector((state) => state.orderReducer.items)
    const [searchParams, setSearchParams] = useSearchParams()
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)

    
    useEffect( () => {
      dispatch(orderActions.showOrderDetail(
        searchParams.get('token'), 
        searchParams.get('PayerID')
        ))
    }, [])

    const formik = useFormik({
      initialValues : {
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        adminArea1: '',
        adminArea2: '',
        postalCode: '',
        addressCountryCode: ''
      },
      validationSchema : Yup.object({
        fullName: Yup.string().max(300).matches(/^([\p{L}'][ \p{L}'-]*[\p{L}]){3,}$/u, { excludeEmptyString: true, message: 'Invalid name'}).required(),
        addressLine1: Yup.string().max(300).matches(/^\d+\s[A-z]+\s[A-z]+/g, { excludeEmptyString: true, message: 'Invalid name'}).required(),
        adminArea1: Yup.string().max(300).required(),
        addressCountryCode: Yup.string().min(2).max(2).required(),
        postalCode: Yup.string().matches(/^[0-9]+$/, "Must be only digits").max(60).required(),
      }),

    })

    const order = useSelector((state) => {
      formik.initialValues.fullName = state.orderReducer.order.nameShippingCus || ''
      formik.initialValues.addressLine1 = state.orderReducer.order.addLine1Cus || ''
      formik.initialValues.addressLine2 = state.orderReducer.order.addLine2Cus || ''
      formik.initialValues.adminArea1 = state.orderReducer.order.adArea1 || ''
      formik.initialValues.adminArea2 = state.orderReducer.order.adArea2 || ''
      formik.initialValues.addressCountryCode = state.orderReducer.order.couCode || ''
      formik.initialValues.postalCode = state.orderReducer.order.posCode || ''
      return state.orderReducer.order
    })

    const handleCancel = () => {
      // TODO: delete order and order items
      navigate('/cartAndOrder')
    }

    const handleSave = (values) => {
      dispatch(paypalAction.doUpdateOrder(order.idOrder, {
        address_line_1: values.addressLine1,
        address_line_2: values.addressLine2,
        admin_area_1: values.adminArea1,
        admin_area_2: values.adminArea2,
        postal_code: values.postalCode,
        country_code: values.addressCountryCode,
        reference_id: order.referenceId,
        full_name: values.fullName
      }))
      .then(() => {
        var dataPatch = {
          token: searchParams.get('token'),
          payerId: searchParams.get('PayerID'),
          payload: {
            addLine1Cus: values.addressLine1,
            addLine2Cus: values.addressLine2,
            adArea1: values.adminArea1,
            adArea2: values.adminArea2,
            posCode: values.postalCode,
            couCode: values.addressCountryCode,
            nameShippingCus: values.fullName
          }
        }
        dispatch(orderActions.doUpdateOrder(dataPatch.token, dataPatch.payerId, dataPatch.payload))
      })
      .catch(() => {
      })
    }

    const handlePayment = (values) => {
      
      dispatch(paypalAction.doCaptureOrder(order.idOrder, order.idPayer))
      .then(() => {
        dispatch(cartActions.doPaymentOrder(accessToken.sub))
        dispatch(cartActions.doCountProductOfCart(accessToken.sub))
        dispatch(cartActions.showProductCart(accessToken.sub))
        navigate('/cartAndOrder')
      })
      .catch(() => {
      })
      .finally(() => {
        dispatch(cartActions.doCountProductOfCart(accessToken.sub))
        dispatch(cartActions.showProductCart(accessToken.sub))
      })
    }

    const handleReceived = (values) => {
      dispatch(orderActions.doUpdateOrderStatusReceive(order.idOrder, order.idPayer))
      .then(() => {
        navigate('/cartAndOrder')
      })
    }

    const handleRefund = (values) => {
      let note = prompt('Why do you want to refund your order?')
      if (note != null) {
        dispatch(orderActions.doUpdateStatusRefund(order.idOrder, order.idPayer, {noteRefund: note}))
        .then(() => {
          navigate('/cartAndOrder')
        })
      }
    }

    return (
      <form>
        <h3>Review Payment</h3>
            <h5>Order Approved</h5>
            <p>Id order: {order.idOrder}</p>
            <p>Created time: {order.createTime}</p>
            <p>Intent: {order.intent}</p>
            <p className="message-error">Final Capture: {order.finalCapture ? 'PAID' : 'UNPAID'}</p>

            <h5>Payer</h5>
            <p>Id Payer: {order.idPayer}</p>
            <p>Given name: {order.givenNamePayer}</p>
            <p>Surname: {order.surnamePayer}</p>
            <p>Country Code: {order.couCodePayer}</p>

            <h5>Payee</h5>
            <p>Email: {order.emailPayer}</p>

            <h5>Items</h5>
            <table className="table-1">
              <thead>
                <tr>
                  <th className="th-1">Name</th>
                  <th className="th-1">Description</th>
                  <th className="th-1">Quantity</th>
                  <th className="th-1">Price</th>
                  <th className="th-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {items && items.map((item, index) => (
                  <tr key={index}>
                    <td className="td-1">{item.nameProduct}</td>
                    <td className="td-1"><img style={{width: '70px'}} src={item.avatarUrl} alt={item.name} /></td>
                    <td className="td-1">{item.quantity}</td>
                    <td className="td-1">{item.priceProduct}</td>
                    <td className="td-1">{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h5>Purchase Units</h5>
            <p className="message-error">Status: {order.status}</p>
            <p className="message-error">Item Total: ${order.total}</p>
            <p>Currency code: {order.currencyCode}</p>

            <h5>Shipping</h5>
            
            {order.finalCapture ? (
              <>
                <p>Full Name: {order.nameShippingCus}</p>
                <p>Address Line 1: {order.addLine1Cus}</p>
                <p>Address Line 2: {order.addLine2Cus}</p>
                <p>Admin Area 1: {order.adArea2}</p>
                <p>Admin Area 2: {order.adArea2}</p>
                <p>Postal Code: {order.posCode}</p>
                <p>Country Code: {order.couCode}</p>
              </>
            ) : (
              <>
                <div style={{marginTop: "12px"}}>
                  <label htmlFor="fullName">Full Name:</label>
                  <input type="text" id="fullName" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.fullName}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="addressLine1">Address Line 1:</label>
                  <input type="text" id="addressLine1" value={formik.values.addressLine1} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.addressLine1}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="addressLine2">Address Line 2:</label>
                  <input type="text" id="addressLine2" value={formik.values.addressLine2} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.addressLine2}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="adminArea1">Admin Area 1:</label>
                  <input type="text" id="adminArea1" value={formik.values.adminArea1} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.adminArea1}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="adminArea2">Admin Area 2:</label>
                  <input type="text" id="adminArea2" value={formik.values.adminArea2} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.adminArea2}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="postalCode">Postal Code:</label>
                  <input type="text" id="postalCode" value={formik.values.postalCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.postalCode}</p>
                </div>

                <div style={{marginTop: "12px"}}>
                  <label htmlFor="addressCountryCode">Country Code:</label>
                  <input type="text" id="addressCountryCode" value={formik.values.addressCountryCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <p className="message-error">{formik.errors.addressCountryCode}</p>
                </div>
              </>
            )}

              {order.status === 'REFUND' && (
                <div style={{color: 'green', backgroundColor: '#e5ffe5', padding: '12px'}}>
                  <h3 style={{margin: "0px 0px"}}>Your refund request has been sent. Please wait.</h3>
                </div>
              )}

              {order.status === 'REFUND_SUCCESS' && (
                <div style={{color: 'green', backgroundColor: '#e5ffe5', padding: '12px'}}>
                  <h3 style={{margin: "0px 0px"}}>Your refund request has been accepted.</h3>
                </div>
              )}
            
              {order.status === 'REFUND_FAIL' && (
                <div style={{color: 'red', backgroundColor: '#fbd1d1', padding: '12px'}}>
                  <h3 style={{margin: "0px 0px"}}>Your refund request has been denied.</h3>
                </div>
              )}

              {order.status === 'RECEIVED' && (
                <div style={{color: 'green', backgroundColor: '#e5ffe5', padding: '12px'}}>
                  <h3 style={{margin: "0px 0px"}}>Thank you.</h3>
                  <div>
                    <label htmlFor="review">Comment: </label><br />
                    <textarea  id="review" type=""></textarea><br />
                    <button>submit</button>
                  </div>
                </div>
              )}

              {order.status === 'COMPLETED' && (
                <div style={{color: 'green', backgroundColor: '#e5ffe5', padding: '12px'}}>
                  <h3 style={{margin: "0px 0px"}}>Thank you.</h3>
                  <p>We will complete the delivery in the shortest time</p>
                </div>
              )}

            <br />

            {order.finalCapture ? (
              <>
                <button type="button" onClick={handleCancel}>Cancel</button>{'   '}

                {(order.status === 'CREATED' || order.status === 'COMPLETED') && (
                  <>
                    <button type="button" onClick={handleRefund}>Refund</button> {'   '}
                    <button type="button" onClick={handleReceived}>Received</button> 
                  </>
                )}
                
                { (order.status === 'REFUND_FAIL' || order.status === 'REFUND_SUCCESS') && (
                  <>
                    <button type="button" onClick={handleReceived}>Received</button> 
                  </>
                )}
              </>
            ) : (
              <>
                {/* formik.isValid && formik.dirty */}
                <button type="button" onClick={handleCancel}>Cancel</button>{'   '}
                <button type="button" disabled={!(formik.isValid)} onClick={() => handleSave(formik.values)}>Save</button> {'   '}
                <button type="button" disabled={!(formik.isValid)} onClick={() => handlePayment(formik.values)}>Payment</button> 
              </>
            )}

      </form>
    )

}

export default CapturePayment