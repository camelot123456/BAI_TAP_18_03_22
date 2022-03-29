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
                        window.location.replace(`${link.href}`)
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

export const doAuthorizePaymentForOrder = (idOrder) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doAuthorizePayment(idOrder)
        .then((res) => {
            localStorage.setItem('orderAuthorize', JSON.stringify(res.data))
            dispatch({
                type: paypalType.AUTHORIZE_PAYMENT_FOR_ORDER,
                payload: {
                    orderAuthorize: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export const showOrderAuthorize = (idOrder) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.showOrderAuthorize(idOrder)
        .then((res) => {
            dispatch({
                type: paypalType.SHOW_AUTHORIZE_PAYMENT,
                payload: {
                    orderCapture: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export const doCapturePayment = (idOrder, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doCapturePayment(idOrder, payload)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}