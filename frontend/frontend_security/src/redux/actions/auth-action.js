import { ACCESS_TOKEN } from '../../constants/system-constant'
import authService from  '../../services/auth-service'
import authTypes from '../types/auth-type'

export const doLogin = (loginForm) => (dispatch) => {
    return new Promise((resolve, reject) => {
        authService.doLogin(loginForm)
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN,`${res.data.keyAuth} ${res.data.accessToken}`)
                dispatch({
                    type: authTypes.LOGIN,
                    payload: {
                        authProvider: {
                            keyAuth: res.data.keyAuth,
                            accessToken: res.data.accessToken
                        }
                    }
                })
                resolve()
            } else reject()
        })
        .catch(err => reject())
    })
}

export const doRegister = (loginForm) => (dispatch) => {
    return new Promise((resolve, reject) => {
        authService.doRegister(loginForm)
        .then(res => {
            resolve()
        })
        .catch(err => reject())
    })
}