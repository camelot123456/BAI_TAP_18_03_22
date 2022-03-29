import orderType from "../types/order-type";

const initialState = {
    order: {}
}

const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
}

export default orderReducer