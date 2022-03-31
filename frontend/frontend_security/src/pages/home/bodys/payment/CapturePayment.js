import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from 'yup'
import { Form, Formik } from "formik";


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

    const initialValues = {
      givenName: '',
      surname: '',
      countryCode: '',

      fullName: '',
      addressLine1: '',
      addressLine2: '',
      adminArea1: '',
      adminArea2: '',
      postalCode: '',
      addressCountryCode: ''
    }

    const validationSchema = Yup.object().shape({
      fullName: Yup.string().max(300).required(),
      addressLine1: Yup.string().max(300).required(),
      adminArea1: Yup.string().max(300).required(),
      addressCountryCode: Yup.string().min(2).max(2).required(),
      postalCode: Yup.string().matches(/^[0-9]+$/, "Must be only digits").max(60).required(),
    })
    
    const order = useSelector((state) => {
      initialValues.givenName = state.orderReducer.order.givenNamePayer || ''
      initialValues.surname = state.orderReducer.order.surnamePayer || ''
      initialValues.countryCode = state.orderReducer.order.countryCode || ''

      initialValues.fullName = `${state.orderReducer.order.nameShippingCus}` || ''
      initialValues.addressLine1 = state.orderReducer.order.addLine1Cus || ''
      initialValues.addressLine2 = state.orderReducer.order.addLine2Cus || ''
      initialValues.adminArea1 = state.orderReducer.order.adArea1 || ''
      initialValues.adminArea2 = state.orderReducer.order.adArea2 || ''
      initialValues.addressCountryCode = state.orderReducer.order.couCode || ''
      initialValues.postalCode = state.orderReducer.order.posCode || ''
      return state.orderReducer.order
    })


    useEffect( () => {
        dispatch(orderActions.showOrderDetail(
            searchParams.get('token'), 
            searchParams.get('PayerID')
        ))
    }, [])

    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} >
        {(formikProps) => {
          const {errors, values, handleChange, handleBlur } = formikProps

          const handleCancel = (values) => {
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
            <Form>
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
                        <input type="text" id="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.fullName}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="addressLine1">Address Line 1:</label>
                        <input type="text" id="addressLine1" value={values.addressLine1} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.addressLine1}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="addressLine2">Address Line 2:</label>
                        <input type="text" id="addressLine2" value={values.addressLine2} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.addressLine2}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="adminArea1">Admin Area 1:</label>
                        <input type="text" id="adminArea1" value={values.adminArea1} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.adminArea1}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="adminArea2">Admin Area 2:</label>
                        <input type="text" id="adminArea2" value={values.adminArea2} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.adminArea2}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input type="text" id="postalCode" value={values.postalCode} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.postalCode}</p>
                      </div>

                      <div style={{marginTop: "12px"}}>
                        <label htmlFor="addressCountryCode">Country Code:</label>
                        <input type="text" id="addressCountryCode" value={values.addressCountryCode} onChange={handleChange} onBlur={handleBlur}/>
                        <p className="message-error">{errors.addressCountryCode}</p>
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
                          <label htmlFor="review">Review: </label><br />
                          <textarea  id="review" type=""></textarea><br />
                          <button>submit</button>
                        </div>
                      </div>
                    )}

                  <br />

                  {order.finalCapture ? (
                    <>
                      <button type="button" onClick={() => handleCancel(values)}>Cancel</button>{'   '}

                      {(order.status === 'CREATED' || order.status === 'COMPLETED') && (
                        <>
                          <button type="button" onClick={() => handleRefund(values)}>Refund</button> {'   '}
                          <button type="button" onClick={() => handleReceived(values)}>Received</button> 
                        </>
                      )}
                      
                      { (order.status === 'REFUND_FAIL' || order.status === 'REFUND_SUCCESS') && (
                        <>
                          <button type="button" onClick={() => handleReceived(values)}>Received</button> 
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleCancel(values)}>Cancel</button>{'   '}
                      <button type="button" onClick={() => handleSave(values)}>Save</button> {'   '}
                      <button type="button" onClick={() => handlePayment(values)}>Payment</button> 
                    </>
                  )}

            </Form>
          )
        }}
      </Formik>
    )

}

export default CapturePayment