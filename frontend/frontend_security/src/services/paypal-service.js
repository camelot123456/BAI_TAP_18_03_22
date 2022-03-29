import {httpPaypal} from '../commons/http-paypal'
import { ACCESS_TOKEN_PAYPAL, URL_PAYPAL } from '../constants/system-constant'
import axios from 'axios'

const oauth2Paypal = (auth) => {
    return axios.request({
        url: `/v1/oauth2/token`,
        method: 'POST',
        baseURL: URL_PAYPAL,
        auth: {
            username: auth.clientId,
            password: auth.secret
        }, 
        data: 'grant_type=client_credentials',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

const createOrder = (payload) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.request({
        url: `/v2/checkout/orders`,
        method: 'POST',
        baseURL: URL_PAYPAL,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

const showOrder = (idOrder) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.request({
        url: `/v2/checkout/orders/${idOrder}`,
        method: 'GET',
        baseURL: URL_PAYPAL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

const doUpdateOrder = (payload) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.request({
        url: `/v2/checkout/orders`,
        method: 'PATCH',
        baseURL: URL_PAYPAL,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

const doCaptureOrder = (payload) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.post(
        `${URL_PAYPAL}/v2/checkout/orders/${payload}/capture`,
        null,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }}
    )
}


const doAuthorizePayment = (idOrder) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.post(`${URL_PAYPAL}/v2/checkout/orders/${idOrder}/authorize`,
        null,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }}
    )
}

const showOrderAuthorize = (idOrder) => {
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.request({
        url: `/v2/payments/authorizations/${idOrder}`,
        method: 'GET',
        baseURL: URL_PAYPAL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

const doCapturePayment = (idOrder, payload) => {
    console.log(payload)
    const token = localStorage.getItem(ACCESS_TOKEN_PAYPAL)
    return axios.request({
        url: `/v2/payments/authorizations/${idOrder}/capture`,
        method: 'POST',
        baseURL: URL_PAYPAL,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export default {oauth2Paypal, createOrder, showOrder, doUpdateOrder, doCaptureOrder, doAuthorizePayment, showOrderAuthorize, doCapturePayment}