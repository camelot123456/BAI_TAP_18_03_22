import orderType from "../types/order-type";

const initialState = {
    order: {},
    items: []
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
        default:
            return state;
    }
}

export default orderReducer