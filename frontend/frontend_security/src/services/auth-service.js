import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants/system-constant'

const doLogin = (loginForm) => {
    return httpCommon().post(`${URL_BASE}/pub/login`, loginForm)
}

const doRegister = (loginForm) => {
    return httpCommon().post(`${URL_BASE}/pub/register`, loginForm)
}

export default {doLogin, doRegister}