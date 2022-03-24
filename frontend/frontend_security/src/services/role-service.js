import { httpCommon } from '../commons/http-common'
import { URL_BASE } from '../constants/system-constant'

const showRoleList = () => {
    return httpCommon().get(`${URL_BASE}/pri/admin/roles`)
}

export default {showRoleList}