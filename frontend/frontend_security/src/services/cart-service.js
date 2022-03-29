import {httpCommon} from '../commons/http-common'
import {URL_BASE} from '../constants/system-constant'

const doAddProductIntoCart = (payload) => {
    return httpCommon().post(`${URL_BASE}/pri/cart/add_product`, payload)
}

const doCountProductOfCart = (username) => {
    return httpCommon().get(`${URL_BASE}/pri/cart/total_product/${username}`)
}

const showProductCart = (username) => {
    return httpCommon().get(`${URL_BASE}/pri/cart/product_cart/${username}`)
}

const doDeleteProductCart = (idProductCart) => {
    return httpCommon().delete(`${URL_BASE}/pri/cart/delete_product_cart/${idProductCart}`)
}

const doPaymentOrder = (username) => {
    return httpCommon().post(`${URL_BASE}/pri/cart/payment/${username}`)
}

export default {doAddProductIntoCart, doCountProductOfCart, showProductCart, doDeleteProductCart, doPaymentOrder}