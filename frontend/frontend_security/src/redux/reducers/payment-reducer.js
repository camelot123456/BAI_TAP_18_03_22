import paymentType from "../types/payment-type";

const initialState = {
    payment: {}
}

const paymentReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case paymentType.DO_PAYMENT:
            return {...state}
    
        default:
            return state
    }
}

export default paymentReducer