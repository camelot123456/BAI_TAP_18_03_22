import cartType from '../types/cart-type'
import cartService from '../../services/cart-service'

const doAddProductIntoCart = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.doAddProductIntoCart(payload)
        .then(res => {
            dispatch({
                type: cartType.DO_ADD_PRODUCT_INTO_CART,
                payload: {
                    cartTotal: res.data
                }
            })
            resolve()
        })
        .catch(err => reject())
    })
}

const doCountProductOfCart = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.doCountProductOfCart(username)
        .then(res => {
            dispatch({
                type: cartType.DO_COUNT_PRODUCT_OF_CART,
                payload: {
                    cartTotal: res.data
                }
            })
            resolve()
        })
        .catch(err => reject())
    })
}

const showProductCart = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.showProductCart(username)
        .then(res => {
            dispatch({
                type: cartType.SHOW_PRODUCT_CART,
                payload: {
                    productCart: res.data
                }
            })
            resolve()
        })
        .catch(err => reject())
    })
}

const doDeleteProductCart = (idProductCart) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.doDeleteProductCart(idProductCart)
        .then(res => {
            resolve()
        })
        .catch(err => reject())
    })
}

const doPaymentOrder = (username) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.doPaymentOrder(username)
        .then(res => {
            resolve()
        })
        .catch(err => reject())
    })
}

export default {
    doAddProductIntoCart,
    doCountProductOfCart,
    showProductCart,
    doDeleteProductCart,
    doPaymentOrder,
}