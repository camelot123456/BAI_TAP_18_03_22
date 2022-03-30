import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../../../../commons/jwt-common';
import cartActions from '../../../../redux/actions/cart-action';
import { showProductList } from '../../../../redux/actions/product-action';

function ProductList () {

    const products = useSelector(state => state.productReducer.products)
    const authProvider = useSelector(state => state.authReducer.authProvider)
    const accessToken = parseJwt(authProvider.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(showProductList())
    }, [])


    const handleAddProductIntoCart = (idProduct) => {
        if (accessToken) {
            var payload = {
                idProduct: idProduct,
                username: accessToken.sub,
                quantity: 1
            }
            dispatch(cartActions.doAddProductIntoCart(payload))
            .then(() => {
                dispatch(cartActions.doCountProductOfCart(accessToken.sub))
            })
        } else navigate('/auth/login')
        
    }

    return (
        <>
            <h1>Product List</h1>
            <table className="table-1">
                <thead>
                    <tr>
                        <th className="th-1">id</th>
                        <th className="th-1">url</th>
                        <th className="th-1">name</th>
                        <th className="th-1">stock</th>
                        <th className="th-1">price</th>
                        <th className="th-1">tool</th>
                    </tr>
                </thead>
                <tbody>
                    {products && (
                        products.map((product, index) => (
                            <tr key={index}>
                                <td className="td-1">{product.id}</td>
                                <td className="td-1"><img src={product.avatarUrl} alt={product.name} style={{width: '60px'}}/></td>
                                <td className="td-1">{product.name}</td>
                                <td className="td-1">{product.stock}</td>
                                <td className="td-1">{product.price}</td>
                                <td className="td-1">
                                    <button onClick={() => handleAddProductIntoCart(product.id)}>Add to cart</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default ProductList