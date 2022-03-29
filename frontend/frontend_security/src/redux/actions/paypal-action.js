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

export const doCreateOrderPaypal = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.createOrder(payload)
        .then((res) => {
            if (res.status === 201) {
                localStorage.setItem('orderCreate', JSON.stringify(res.data))
                dispatch({
                    type: paypalType.DO_CREATE_ORDER,
                    payload: {
                        responseCreateOrder: res.data
                    }
                })
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

export const showOrder = (idOrder) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.showOrder(idOrder)
        .then((res) => {
            localStorage.setItem('orderApproved', JSON.stringify(res.data))
            dispatch({
                type: paypalType.SHOW_ORDER,
                payload: {
                    orderApproved: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}