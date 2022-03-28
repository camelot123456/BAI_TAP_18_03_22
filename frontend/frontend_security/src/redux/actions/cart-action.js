import cartType from '../types/cart-type'
import cartService from '../../services/cart-service'

export const doAddProductIntoCart = (payload) => (dispatch) => {
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

export const doCountProductOfCart = (username) => (dispatch) => {
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

export const showProductCart = (username) => (dispatch) => {
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

export const doDeleteProductCart = (idProductCart) => (dispatch) => {
    return new Promise((resolve, reject) => {
        cartService.doDeleteProductCart(idProductCart)
        .then(res => {
            resolve()
        })
        .catch(err => reject())
    })
}