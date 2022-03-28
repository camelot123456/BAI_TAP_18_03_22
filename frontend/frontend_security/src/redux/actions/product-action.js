import productType from '../types/product-type'
import productServ from '../../services/product-service'

export const showProductList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        productServ.showProductList()
        .then(res => {
            dispatch({
                type: productType.SHOW_PRODUCT_LIST,
                payload: {
                    products: res.data
                }
            })
            resolve(
                
            )
        })
        .catch(err => reject())
    })
}