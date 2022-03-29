package com.itdragon.service;

import java.util.List;

import com.itdragon.payload.ProductPayload;

public interface IItemService {

	public void addProductIntoOrder(Long idOrder, Long idProduct);
	
	public List<ProductPayload> findAllByIdOrder(Long idOrder);
	
}
