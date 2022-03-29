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

export default {doCreateOrder, showOrderDetail}
