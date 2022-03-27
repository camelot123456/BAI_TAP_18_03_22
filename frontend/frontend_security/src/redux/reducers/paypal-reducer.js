import paypalType from '../types/paypal-type'

const initialState = {
    accessToken: null,
    tokenType: null
}

const paypalReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    
        default:
            return state;
    }
}

export default paypalReducer