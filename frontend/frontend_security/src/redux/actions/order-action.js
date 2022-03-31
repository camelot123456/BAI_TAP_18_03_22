import orderType from '../types/order-type'
import orderServ from '../../services/order-service'

const doCreateOrder = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doCreateOrder(payload)
        .then((response) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doUpdateOrder = (token, payerId, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doPatchOrder(token, payerId, payload)
        .then((response) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const showOrderDetail = (token, payerId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.showOrderDetail(token, payerId)
        .then((res) => {
            dispatch({
                type: orderType.SHOW_ORDER_DETAIL,
                payload: {
                    order: res.data.order,
                    items: res.data.items
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const showUnpaidOrderList = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.showUnpaidOrderList(username)
        .then((res) => {
            dispatch({
                type: orderType.SHOW_UNPAID_ORDER_LIST,
                payload: {
                    orders: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const showPaidOrderUnReceivedList = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.showPaidOrderUnReceivedList(username)
        .then((res) => {
            dispatch({
                type: orderType.SHOW_PAID_ORDER_UN_RECEIVED_LIST,
                payload: {
                    ordersUnReceive: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const showPaidOrderList = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.showPaidOrderList(username)
        .then((res) => {
            dispatch({
                type: orderType.SHOW_PAID_ORDER_LIST,
                payload: {
                    ordersPaid: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doDeleteOrder = (token, payerId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doDeleteOrder(token, payerId)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doUpdateOrderStatusReceive = (token, payerId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doUpdateOrderStatusReceive(token, payerId)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doUpdateStatusRefund = (token, payerId, note) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doUpdateStatusRefund(token, payerId, note)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doUpdateStatusRefundSuccess = (token, payerId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doUpdateStatusRefundSuccess(token, payerId)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doUpdateStatusRefundFail = (token, payerId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.doUpdateStatusRefundFail(token, payerId)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const showOrderStatusRefund = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        orderServ.showOrderStatusRefund()
        .then((res) => {
            dispatch({
                type: orderType.SHOW_ORDER_STATUS_REFUND,
                payload: {
                    ordersRefund: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export default {
    doCreateOrder, 
    showOrderDetail, 
    doUpdateOrder, 
    showPaidOrderUnReceivedList, 
    showUnpaidOrderList, 
    doDeleteOrder, 
    showPaidOrderList,
    doUpdateOrderStatusReceive,
    doUpdateStatusRefund,
    showOrderStatusRefund,
    doUpdateStatusRefundSuccess,
    doUpdateStatusRefundFail
}
