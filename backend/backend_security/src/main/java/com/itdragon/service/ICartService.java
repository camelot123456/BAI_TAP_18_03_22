package com.itdragon.service;

import com.itdragon.entity.CartEntity;

public interface ICartService {

	public CartEntity createCart(Long idUser);
	
	public int countQuantityProduct(String username);
	
	public void paymentOrder(String username);
	
}
