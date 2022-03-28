import paypalType from '../types/paypal-type'
import paypalService from '../../services/paypal-service'
import { ACCESS_TOKEN_PAYPAL } from '../../constants/system-constant'

export const doOauth2Paypal = (auth) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.oauth2Paypal(auth)
        .then((res) => {
            localStorage.setItem(ACCESS_TOKEN_PAYPAL, `${res.data.token_type} ${res.data.access_token}`)
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export const doCreateOrder = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.createOrder(payload)
        .then((res) => {
            console.log(res.data)
            if (res.status === 201) {
                res.data.links.forEach((link) => {
                    if (link.rel === 'approve') {
                        window.open(`${link.href}`)
                    }
                })
            }
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}