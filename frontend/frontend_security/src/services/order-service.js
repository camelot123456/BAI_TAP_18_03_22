import {httpCommon} from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const doCreateOrder = (payload) => {
    return httpCommon().post(`${URL_BASE}/pri/orders/create`, payload)
}

const showOrderDetail = (token, payerId) => {
    return httpCommon().get(`${URL_BASE}/pri/orders/detail?token=${token}&PayerID=${payerId}`)
}

const showUnpaidOrderList = (username) => {
    return httpCommon().get(`${URL_BASE}/pri/orders/list/unpaid?username=${username}`)
}

const showPaidOrderList = (username) => {
    return httpCommon().get(`${URL_BASE}/pri/orders/list/paid?username=${username}`)
}

const showPaidOrderUnReceivedList = (username) => {
    return httpCommon().get(`${URL_BASE}/pri/orders/list/unReceive?username=${username}`)
}

const doPatchOrder = (token, payerId, payload) => {
    return httpCommon().patch(`${URL_BASE}/pri/orders/patch?token=${token}&PayerID=${payerId}`, payload)
}

const doDeleteOrder = (token, payerId) => {
    return httpCommon().delete(`${URL_BASE}/pri/orders/delete?token=${token}&PayerID=${payerId}`)
}

const doUpdateOrder = (token, payerId, payload) => {
    return httpCommon().put(`${URL_BASE}/pri/orders/update?token=${token}&PayerID=${payerId}`, payload)
}

const doUpdateOrderStatusReceive = (token, payerId) => {
    return httpCommon().patch(`${URL_BASE}/pri/orders/update/status/receive?token=${token}&PayerID=${payerId}`)
}

export default {
    doCreateOrder, 
    showOrderDetail, 
    doPatchOrder, 
    showUnpaidOrderList, 
    showPaidOrderUnReceivedList, 
    showPaidOrderList, 
    doDeleteOrder, 
    doUpdateOrder,
    doUpdateOrderStatusReceive
}