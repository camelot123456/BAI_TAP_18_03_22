package com.itdragon.service;

import java.util.List;

import com.itdragon.payload.ProductCartPayload;
import com.itdragon.payload.ProductPayload;

public interface IProductCartService {

	public void addProductIntoCart(ProductCartPayload productCartPayload);
	
	public List<ProductPayload> findAllByUsername(String username);
	
	public void deleteById(Long idProductCart);
}
