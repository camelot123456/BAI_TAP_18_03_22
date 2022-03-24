import { combineReducers } from "redux";

import authReducer from '../reducers/auth-reducer'
import userReducer from '../reducers/user-reducer'
import roleReducer from '../reducers/role-reducer'

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    roleReducer
})

export default rootReducer