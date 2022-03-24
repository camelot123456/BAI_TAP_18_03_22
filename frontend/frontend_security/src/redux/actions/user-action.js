import userType from '../types/user-type';

import userService from '../../services/user-service';

export const showFindAllUserByIdUser = (idUser) => (dispatch) => {
    return new Promise((resolve, reject) => {
        userService.showFindAllUserByIdUser(idUser)
        .then((res) => {
            dispatch({
                type: userType.SHOW_FIND_ALL_BY_ID_USER,
                payload: {
                    userAndRoles: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            dispatch({
                type: userType.ERROR
            })
            reject()
        })
    })
}

export const showUserList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        userService.showUserList()
        .then((res) => {
            dispatch({
                type: userType.SHOW_LIST,
                payload: {
                    users: res.data
                }
            })
            resolve()
        })
        .catch((err) => {
            reject()
        })
    })
}

export const doCreate = (dataRequest) => (dispatch) => {
    return new Promise((resolve, reject) => {
        userService.doCreate(dataRequest)
        .then((res) => {
            resolve()
        })
        .catch((err) => reject())
    })
}

export const doUpdate = (dataRequest) => (dispatch) => {

    return new Promise((resolve, reject) => {
        userService.doUpdate(dataRequest)
        .then((res) => {
            resolve()
        })
        .catch((err) => reject())
    })
}

export const doDelete = (dataRequest) => (dispatch) => {

    return new Promise((resolve, reject) => {
        userService.doDelete(dataRequest)
        .then((res) => {
            resolve()
        })
        .catch((err) => reject())
    })
}

export const doResetUserAndRoles = () => {
    return {
        type: userType.RESET_USER_AND_ROLE
    }
}