import paypalType from '../types/paypal-type'

const initialState = {
    accessToken: null,
    tokenType: null,
    responseOrder: {}


}

const paypalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case paypalType.DO_CREATE_ORDER:
            var responseOrder = { ...state.responseOrder }
            responseOrder = payload.responseOrder
            return {
                ...state.responseOrder,
                responseOrder
            }
    
        default:
            return state;
    }
}

export default paypalReducer