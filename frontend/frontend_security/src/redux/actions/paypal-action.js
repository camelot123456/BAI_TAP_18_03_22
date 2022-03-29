import paypalType from '../types/paypal-type'
import paypalService from '../../services/paypal-service'
import { ACCESS_TOKEN_PAYPAL } from '../../constants/system-constant'
import orderService from '../../services/order-service'

const doOauth2Paypal = (auth) => (dispatch) => {
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

const doCreateOrderPaypal = (payload) => (dispatch) => {
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

const showOrder = (idOrder) => (dispatch) => {
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

const doUpdateOrder = (idOrder, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doUpdateOrder(idOrder, payload)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doCreateOrderBackend = (token, idUser) => async (dispatch) => {
    try {
        var orderDetail = await paypalService.showOrder(token)
        var payload = {
            idOrder: orderDetail.data.id,
            intent: orderDetail.data.intent,
            status: orderDetail.data.status,
            createTime: orderDetail.data.create_time,
      
            referenceId: orderDetail.data.purchase_units[0].reference_id,
            nameShippingCus: orderDetail.data.purchase_units[0].shipping.name.full_name,
            addLine1Cus: orderDetail.data.purchase_units[0].shipping.address.address_line_1,
            addLine2Cus: orderDetail.data.purchase_units[0].shipping.address.address_line_2,
            adArea1: orderDetail.data.purchase_units[0].shipping.address.admin_area_1,
            adArea2: orderDetail.data.purchase_units[0].shipping.address.admin_area_2,
            posCode: orderDetail.data.purchase_units[0].shipping.address.postal_code,
            couCode: orderDetail.data.purchase_units[0].shipping.address.country_code,
            total:  orderDetail.data.purchase_units[0].amount.value,
            currencyCode: orderDetail.data.purchase_units[0].amount.breakdown.item_total.currency_code,
            items: orderDetail.data.purchase_units[0].items.map(item => {
                return {
                    idProduct: item.sku,
                    quantity: item.quantity
                }
            }),
            // payAuthStatus: '',
            // payAuthId: '',
            // payAuthamount: '',
            // payAuthExpTime: '',
            // payAuthCreTime: '',
            // payAuthUpdTime: '',
            // items: orderDetail.data.purchase_units[0].items
      
            givenNamePayer: orderDetail.data.payer.name.given_name,
            surnamePayer: orderDetail.data.payer.name.surname,
            emailPayer: orderDetail.data.payer.email_address,
            idPayer: orderDetail.data.payer.payer_id,
            couCodePayer: orderDetail.data.payer.address.country_code,
            user: {
                username: idUser
            }
      
          }
          console.log(payload)
        orderService.doCreateOrder(payload)
    } catch (error) {
        alert(error.message)
    }
}

const doCaptureOrder = (idOrder) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doCaptureOrder(idOrder)
        .then((res) => {
            dispatch({
                type: paypalType.DO_CAPTURE_ORDER,
                payload: {
                    responseCreateOrder: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}




const doAuthorizePaymentForOrder = (idOrder) => (dispatch) => {
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

const showOrderAuthorize = (idOrder) => (dispatch) => {
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

const doCapturePayment = (idOrder, payload) => (dispatch) => {
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

export default {
    doOauth2Paypal,
    doCreateOrderPaypal,
    showOrder,
    doUpdateOrder,
    doCaptureOrder,
    doAuthorizePaymentForOrder,
    showOrderAuthorize,
    doCapturePayment,
    doCreateOrderBackend
}