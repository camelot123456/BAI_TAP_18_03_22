import paypalType from '../types/paypal-type'

const initialState = {
    accessToken: null,
    tokenType: null,
    responseOrder: {},
    responseCreateOrder: {}


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
    
        default:
            return state;
    }
}

export default paypalReducer