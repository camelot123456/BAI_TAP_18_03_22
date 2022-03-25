import React from 'react';
import {Form, Formik} from "formik"
import * as Yup from "yup"
import {useDispatch} from 'react-redux'
import { doPayment } from '../../../../redux/actions/payment-action';


function Checkout () {

    const dispatch = useDispatch()

    const initialValues = {
        productName: '',
        subTotal: '',
        shipping: '',
        tax: '',
        total: ''
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required(),
        subTotal: Yup.number().min(0).required(),
        shipping: Yup.number().min(0).required(),
        tax: Yup.number().min(0).required(),
        total: Yup.number().min(0).required(),
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={(values) => {
                var data = {
                    productName: values.productName,
                    subTotal: values.subTotal,
                    shipping: values.shipping,
                    tax: values.tax,
                    total: values.total
                }
                dispatch(doPayment(data))
            }}
        >
            {(formikProps) => {
                const {errors, values, handleChange, handleBlur} = formikProps;

                return (
                    <Form>
                        <h3>Check Out</h3>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="productName">product name</label><br />
                            <input id="productName" value={values.productName} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.productName}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="subTotal">sub total</label><br />
                            <input id="subTotal" type="number" value={values.subTotal} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.subTotal}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="shipping">shipping</label><br />
                            <input id="shipping" type="number" value={values.shipping} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.shipping}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="tax">tax</label><br />
                            <input id="tax" type="number" value={values.tax} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.tax}</p>
                        </div>

                        <div style={{marginTop: '8px'}}>
                            <label htmlFor="total">total</label><br />
                            <input id="total" type="number"value={values.total} onChange={handleChange} onBlur={handleBlur} />
                            <p className="message-error">{errors.total}</p>
                        </div>

                        <button type="submit">Checkout</button>

                    </Form>
                )
            }}
        </Formik>
    )
}

export default  Checkout;