import authTypes from '../types/auth-type'

const initialState = {
    authProvider: null
}

const authReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case authTypes.LOGIN:
            var authProvider =  {...state.authProvider}
            authProvider = payload.authProvider
            return {
                ...state,
                authProvider: authProvider
            }
        case authTypes.SET_AUTH:
            var authProvider =  {...state.authProvider}
            authProvider = payload.authProvider
            return {
                ...state,
                authProvider: authProvider
            }
        case authTypes.REMOVE_AUTH:
            var authProvider =  {...state.authProvider}
            authProvider = payload.authProvider
            return {
                ...state,
                authProvider: authProvider
            }
        default:
            return state;
    }
}

export default authReducer