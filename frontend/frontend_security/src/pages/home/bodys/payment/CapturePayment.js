import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from 'yup';
import {Formik, Form} from 'formik'


import paypalAction from "../../../../redux/actions/paypal-action";
import orderAction from "../../../../redux/actions/order-action"
import parseJwt from "../../../../commons/jwt-common";
import { doCountProductOfCart, doPaymentOrder, showProductCart } from "../../../../redux/actions/cart-action";

function CapturePayment() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
      givenName: '',
      surname: '',
      countryCode: '',

      fullName: '',
      addressLine1: '',
      addressLine2: '',
      adminArea1: '',
      adminArea2: '',
      addressCountryCode: ''
    }

    const validationSchema = Yup.object().shape({
      givenName: Yup.string().max(140).required(),
      surname: Yup.string().max(140).required(),
      countryCode: Yup.string().min(2).max(2).required(),

      fullName: Yup.string().max(300).required(),
      addressLine1: Yup.string().max(300).required(),
      adminArea1: Yup.string().max(300).required(),
      addressCountryCode: Yup.string().min(2).max(2).required()
    })
    
    const order = useSelector((state) => {
      initialValues.givenName = state.orderReducer.order.givenNamePayer || ''
      initialValues.surname = state.orderReducer.order.surnamePayer || ''
      initialValues.countryCode = state.orderReducer.order.countryCode || ''

      initialValues.fullName = `${initialValues.givenName} ${initialValues.surname}` || ''
      initialValues.addressLine1 = state.orderReducer.order.addLine1Cus || ''
      initialValues.addressLine2 = state.orderReducer.order.addLine2Cus || ''
      initialValues.adminArea1 = state.orderReducer.order.adArea1 || ''
      initialValues.adminArea2 = state.orderReducer.order.adArea2 || ''
      initialValues.addressCountryCode = state.orderReducer.order.couCode || ''
      return state.orderReducer.order
    })

    const items = useSelector((state) => state.orderReducer.items)
    const authProvider = useSelector((state) => state.authReducer.authProvider);
    const accessToken = parseJwt(authProvider.accessToken);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect( () => {
        dispatch(orderAction.showOrderDetail(
            searchParams.get('token'), 
            searchParams.get('PayerID')
        ))
    }, [])

    

    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} 
        onSubmit={(values) => {
          // TODO:
          dispatch(paypalAction.doCaptureOrder(order.idOrder))
          .then(() => {
              dispatch(doPaymentOrder(accessToken.sub))
              dispatch(doCountProductOfCart(accessToken.sub))
              dispatch(showProductCart(accessToken.sub))
          })
          .finally(() => {
              navigate('/cart')
          })
        }}
      >
        {(formikProps) => {
          const {errors, values, handleChange, handleBlur } = formikProps
          
          return (
            <>
              <h3>Review Payment</h3>
              {order.id && (
                <>
                  <h5>Order Approved</h5>
                  <p>Id order: {order.idOrder}</p>
                  <p>Created time: {order.createTime}</p>
                  <p>Intent: {order.intent}</p>

                  <h5>Payer</h5>
                  <p>Id Payer: {order.idPayer}</p>

                  <div style={{marginTop: "12px"}}>
                    <label htmlFor="givenName">Given name:</label>
                    <input type="text" id="givenName" value={values.givenName} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="message-error">{errors.givenName}</p>
                  </div>

                  <div style={{marginTop: "12px"}}>
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" id="surname" value={values.surname} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="message-error">{errors.surname}</p>
                  </div>

                  <div style={{marginTop: "12px"}}>
                    <label htmlFor="countryCode">Country Code:</label>
                    <input type="text" id="countryCode" value={values.countryCode} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="message-error">{errors.countryCode}</p>
                  </div>

                  <h5>Shipping</h5>
                  
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
                    <label htmlFor="addressCountryCode">Country Code:</label>
                    <input type="text" id="addressCountryCode" value={values.addressCountryCode} onChange={handleChange} onBlur={handleBlur}/>
                    <p className="message-error">{errors.addressCountryCode}</p>
                  </div>

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
                  <p>Status: {order.status}</p>
                  <p>Item Total: ${order.total}</p>
                  <p>Currency code: {order.currencyCode}</p>

                  <button type="submit">Payment</button>    
                </>
              )}  
            </>
          )
        }}
      </Formik>
    )

}

export default CapturePayment