import { combineReducers } from "redux";

import authReducer from '../reducers/auth-reducer'
import userReducer from '../reducers/user-reducer'
import roleReducer from '../reducers/role-reducer'
import paymentReducer from '../reducers/payment-reducer'
import paypalReducer from '../reducers/paypal-reducer'
import productReducer from '../reducers/product-reducer'
import cartReducer from '../reducers/cart-reducer'

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    roleReducer,
    paymentReducer,
    paypalReducer,
    productReducer,
    cartReducer
})

export default rootReducer