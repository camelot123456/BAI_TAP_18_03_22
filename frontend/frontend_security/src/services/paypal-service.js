import {httpPaypal} from '../commons/http-paypal'
import { URL_PAYPAL } from '../constants/system-constant'
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

export default {oauth2Paypal}