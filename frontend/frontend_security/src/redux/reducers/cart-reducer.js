import cartType from "../types/cart-type";

const initialState = {
    carts: [],
    cart: {},
    cartTotal: null,
    productCart: []
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case cartType.DO_ADD_PRODUCT_INTO_CART:
            var cartTotal = { ...state.cartTotal }
            cartTotal = payload.cartTotal
            return {
                ...state,
                cartTotal
            }
        case cartType.DO_COUNT_PRODUCT_OF_CART:
            var cartTotal = { ...state.cartTotal }
            cartTotal = payload.cartTotal
            return {
                ...state,
                cartTotal
            }
        case cartType.SHOW_PRODUCT_CART:
            var productCart = { ...state.productCart }
            productCart = payload.productCart
            return {
                ...state,
                productCart
            }
        default:
            return state;
    }
}

export default cartReducer