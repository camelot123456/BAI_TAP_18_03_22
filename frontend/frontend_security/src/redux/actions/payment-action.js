import paymentType from '../types/payment-type'
import paymentService from '../../services/payment-service'

export const doPayment = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paymentService.doPayment(data)
        .then((res) => {
            resolve()
        })
        .catch((err) => reject())
    })
}
