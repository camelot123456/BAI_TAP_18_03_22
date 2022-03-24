import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants/system-constant'

const doLogin = (loginForm) => {
    return httpCommon().post(`${URL_BASE}/pub/login`, loginForm)
}

const doRegister = (loginForm) => {
    return httpCommon().post(`${URL_BASE}/pub/register`, loginForm)
}

const doEmailSent = (data) => {
    return httpCommon().post(`${URL_BASE}/pub/forgotPassword`, data)
}

const doChangePassword = (data) => {
    return httpCommon().post(`${URL_BASE}/pub/changePassword`, data)
}

export default {doLogin, doRegister, doEmailSent, doChangePassword}