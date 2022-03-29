import paypalType from '../types/paypal-type'

const initialState = {
    accessToken: null,
    tokenType: null,
    responseOrder: {},
    responseCreateOrder: {},
    orderApproved: {},
    orderAuthorize: {},
    orderCapture: {}

}

const paypalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case paypalType.DO_CREATE_ORDER:
            var responseCreateOrder = { ...state.responseCreateOrder }
            responseCreateOrder = payload.responseCreateOrder
            return {
                ...state,
                responseCreateOrder
            }
        case paypalType.SHOW_ORDER:
            var orderApproved = { ...state.orderApproved }
            orderApproved = payload.orderApproved
            return {
                ...state,
                orderApproved
            }
        case paypalType.AUTHORIZE_PAYMENT_FOR_ORDER:
            var orderAuthorize = { ...state.orderAuthorize }
            orderAuthorize = payload.orderAuthorize
            return {
                ...state,
                orderAuthorize
            }
        case paypalType.SHOW_AUTHORIZE_PAYMENT:
            var orderCapture = { ...state.orderCapture }
            orderCapture = payload.orderCapture
            return {
                ...state,
                orderCapture
            }
        default:
            return state;
    }
}

export default paypalReducer