import paymentType from '../types/payment-type'
import paymentService from '../../services/payment-service'

export const doPayment = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paymentService.doPayment(data)
        .then((res) => {
            window.open(res.data);
            resolve()
        })
        .catch((err) => reject())
    })
}

export const doReviewPayment = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paymentService.doReviewPayment(data)
        .then((res) => {
            dispatch({
                type: paymentType.DO_REVIEW_PAYMENT,
                payload: {
                    payerInfo: res.data.payerInfo,
                    transaction: res.data.transaction,
                    shippingAddress: res.data.shippingAddress,
                }
            })
            resolve()
        })
        .catch((err) => reject())
    })
}

export const doExecutePayment = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paymentService.doExecutePayment(data)
        .then((res) => {
            dispatch({
                type: paymentType.DO_EXECUTE_PAYMENT,
                payload: {
                    payerInfo: res.data.payerInfo,
                    transaction: res.data.transaction
                }
            })
            resolve()
        })
        .catch((err) => reject())
    })
}