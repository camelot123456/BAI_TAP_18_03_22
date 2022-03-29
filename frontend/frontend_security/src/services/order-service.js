import {httpCommon} from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const doCreateOrder = (payload) => {
    return httpCommon().post(`${URL_BASE}/pri/orders/create`, payload)
}

const showOrderDetail = (token, payerId) => {
    return httpCommon().get(`${URL_BASE}/pri/orders/detail?token=${token}&PayerID=${payerId}`)
}

export default {doCreateOrder, showOrderDetail}