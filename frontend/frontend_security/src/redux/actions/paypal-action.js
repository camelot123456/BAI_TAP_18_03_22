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
    var data = [
        {
            op: 'replace',
            path: `/purchase_units/@reference_id=='${payload.reference_id}'/shipping/address`,
            value: {
                address_line_1: payload.address_line_1,
                address_line_2: payload.address_line_2,
                admin_area_1: payload.admin_area_1,
                admin_area_2: payload.admin_area_2,
                postal_code: payload.postal_code,
                country_code: payload.country_code
            }
        },
        {
            op: "replace",
            path: `/purchase_units/@reference_id=='${payload.reference_id}'/shipping/name`,
            value: {
                full_name: payload.full_name
            }
        }
    ]
    return new Promise((resolve, reject) => {
        paypalService.doUpdateOrder(idOrder, data)
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
        orderService.doCreateOrder(payload)
    } catch (error) {
        alert(error.message)
    }
}

const doCaptureOrder = (idOrder, payerId) => async (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doCaptureOrder(idOrder)
        .then((res) => {
            var payload = {
                status: res.data.status,
                finalCapture: res.data.purchase_units[0].payments.captures[0].final_capture,
                payAuthStatus: res.data.purchase_units[0].payments.captures[0].status,
                payAuthId: res.data.purchase_units[0].payments.captures[0].id,
                payAuthAmount: res.data.purchase_units[0].payments.captures[0].amount.value,
                payAuthGrossAmount: res.data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value,
                payAuthPaypalFee: res.data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value,
                payAuthNetAmount: res.data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value,
                payAuthCreTime: res.data.purchase_units[0].payments.captures[0].create_time,
                payAuthUpdTime: res.data.purchase_units[0].payments.captures[0].update_time,               
              }
             
            orderService.doUpdateOrder(idOrder, payerId, payload)
            dispatch({
                type: paypalType.DO_CAPTURE_ORDER,
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




const doAuthorizePaymentForOrder = (idOrder) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doAuthorizePayment(idOrder)
        .then((res) => {
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

const doCapturePayment = (idCapture, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        paypalService.doCapturePayment(idCapture, payload)
        .then((res) => {
            resolve()
        })
        .catch((err) => {
            reject(err)
        })
    })
}

const doRefundPayment = (idCapture, idOrder, payerId, payload) => async (dispatch) => {
    // return new Promise((resolve, reject) => {
    //     paypalService.doRefundPayment(idCapture, payload)
    //     .then((res) => {
    //         var responseRefundDetail = paypalService.showRefundDetail(res.data.id)
    //         console.log(responseRefundDetail.data)
    //         var payloadRequest = {
    //             idRefund: responseRefundDetail.id,
    //             grossAmountRefund: responseRefundDetail.seller_payable_breakdown.gross_amount.value,
    //             paypalFeeRefund: responseRefundDetail.seller_payable_breakdown.paypal_fee.value,
    //             netAmountRefund: responseRefundDetail.seller_payable_breakdown.net_amount.value,
    //             createTimeRefund: responseRefundDetail.create_time,
    //             updateTimeRefund: responseRefundDetail.update_time,
    //             totalRefundedAmount: responseRefundDetail.seller_payable_breakdown.total_refunded_amount.value,
    //             statusRefund: responseRefundDetail.status
    //         }
    //         console.log(payloadRequest)
    //         orderService.updateOrderRefundBackend(idOrder, payerId, payloadRequest)
    //         resolve()
    //     })
    //     .catch((err) => {
    //         reject(err)
    //     })
    // })
        try {
            const contentResponse = await paypalService.doRefundPayment(idCapture, payload)
        
            console.log(contentResponse.data)

            var responseRefundDetail = await paypalService.showRefundDetail(contentResponse.data.id)

            console.log(responseRefundDetail.data)
            var payloadRequest = {
                idRefund: responseRefundDetail.id,
                grossAmountRefund: responseRefundDetail.seller_payable_breakdown.gross_amount.value,
                paypalFeeRefund: responseRefundDetail.seller_payable_breakdown.paypal_fee.value,
                netAmountRefund: responseRefundDetail.seller_payable_breakdown.net_amount.value,
                createTimeRefund: responseRefundDetail.create_time,
                updateTimeRefund: responseRefundDetail.update_time,
                totalRefundedAmount: responseRefundDetail.seller_payable_breakdown.total_refunded_amount.value,
                statusRefund: responseRefundDetail.status
            }
            
            await orderService.updateOrderRefundBackend(idOrder, payerId, payloadRequest)
            return contentResponse
        } catch (error) {
        }
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
    doCreateOrderBackend,
    doRefundPayment
}