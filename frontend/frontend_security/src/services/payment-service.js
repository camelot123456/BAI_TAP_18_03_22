import { httpCommon } from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const doPayment = (data) => {
    return httpCommon().post(`${URL_BASE}/pub/payment`, data)
}

export default {doPayment}