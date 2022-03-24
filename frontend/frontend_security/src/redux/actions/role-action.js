import roleService from "../../services/role-service";
import roleType from "../types/role-type";

export const showRoleList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        roleService.showRoleList()
        .then(res => {
            dispatch({
                type: roleType.SHOW_ROLE_LIST,
                payload: {
                    roles: res.data
                }
            })
        })
        .catch(err => reject())
    })
}