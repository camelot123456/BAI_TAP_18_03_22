import productType from "../types/product-type";

const initialState = {
    products: [],
    product: {}
}

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case productType.SHOW_PRODUCT_LIST:
            var products = { ...state.products }
            products = payload.products
            return {
                ...state,
                products
            }
    
        default:
            return state
    }
}

export default productReducer