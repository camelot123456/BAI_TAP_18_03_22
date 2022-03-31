import orderType from "../types/order-type";

const initialState = {
    order: {},
    orders: [],
    items: [],
    ordersPaid: [],
    ordersUnReceive: [],
    ordersRefund: []
}

const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case orderType.SHOW_ORDER_DETAIL:
            var order = {...state.order}
            var items = { ...state.items}
            order = payload.order
            items = payload.items
            return {
                ...state,
                order,
                items
            }
        case orderType.SHOW_UNPAID_ORDER_LIST:
            var orders = {...state.orders}
            orders = payload.orders
            return {
                ...state,
                orders
            }
        case orderType.SHOW_PAID_ORDER_LIST:
            var ordersPaid = {...state.ordersPaid}
            ordersPaid = payload.ordersPaid
            return {
                ...state,
                ordersPaid
            }
        case orderType.SHOW_PAID_ORDER_UN_RECEIVED_LIST:
            var ordersUnReceive = {...state.ordersUnReceive}
            ordersUnReceive = payload.ordersUnReceive
            return {
                ...state,
                ordersUnReceive
            }
        case orderType.SHOW_ORDER_STATUS_REFUND:
            var ordersRefund = {...state.ordersRefund}
            ordersRefund = payload.ordersRefund
            return {
                ...state,
                ordersRefund
            }
        default:
            return state;
    }
}

export default orderReducer