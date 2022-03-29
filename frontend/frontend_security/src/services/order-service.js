import {httpCommon} from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const doCreateOrder = (payload) => {
    return httpCommon().post(`${URL_BASE}/pri/orders/create`, payload)
}

export default {doCreateOrder}