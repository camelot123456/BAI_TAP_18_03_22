import { URL_BASE } from '../constants/system-constant'

import {httpCommon} from '../commons/http-common'

const showProductList = () => {
    return httpCommon().get(`${URL_BASE}/pub/products/list`)
}

export default {showProductList}