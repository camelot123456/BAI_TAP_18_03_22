import roleType from "../types/role-type";

const initialState = {
    roles: [],
    role: {}
}

const roleReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case roleType.SHOW_ROLE_LIST:
            var roles = {...state.roles}
            roles = payload.roles
            return {
                ...state,
                roles
            }
    
        default:
            return state
    }

}

export default roleReducer;