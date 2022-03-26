import { httpCommon } from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const doPayment = (data) => {
    return httpCommon().post(`${URL_BASE}/pub/payment`, data)
}

const doReviewPayment = (data) => {
    return httpCommon().get(`${URL_BASE}/pub/paypal/reviewPayment?paymentId=${data.paymentId}&token=${data.token}&PayerID=${data.PayerID}`)
}

const doExecutePayment = (data) => {
    return httpCommon().post(`${URL_BASE}/pub/execute?paymentId=${data.paymentId}&PayerID=${data.PayerID}`)
}

export default {doPayment, doReviewPayment, doExecutePayment}