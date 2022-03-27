import paypalType from '../types/paypal-type'
import paypalService from '../../services/paypal-service'

export const doOauth2Paypal = (auth) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.oauth2Paypal(auth)
        .then((res) => {
            console.log(res.data)
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}