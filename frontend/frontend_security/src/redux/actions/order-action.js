import orderType from '../types/order-type'
import orderServ from '../../services/order-service'

export const doCreateOrder = (payload) => (dispatch) => {
    console.log(payload)
    return new Promise((resolve, reject) => {
        orderServ.doCreateOrder(payload)
        .then((response) => {
            console.log(response.data)
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}
