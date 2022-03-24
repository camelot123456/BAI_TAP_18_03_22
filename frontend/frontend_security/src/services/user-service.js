import { httpCommon } from "../commons/http-common";
import {URL_BASE} from "../constants/system-constant";

const showUserList = () => {
    return httpCommon().get(`${URL_BASE}/pri/admin/users`)
}

const showFindAllUserByIdUser = (idUser) => {
    return httpCommon().get(`${URL_BASE}/pri/admin/users/${idUser}`)
}

const doCreate = (dataRequest) => {
    return httpCommon().post(`${URL_BASE}/pri/admin/users/create`, dataRequest)
}

const doUpdate = (dataRequest) => {
    return httpCommon().put(`${URL_BASE}/pri/admin/users/update`, dataRequest)
}

const doDelete = (dataRequest) => {
    return httpCommon().delete(`${URL_BASE}/pri/admin/users/delete`, {data: dataRequest})
}

export default {doCreate, showUserList, doUpdate, doDelete, showFindAllUserByIdUser}