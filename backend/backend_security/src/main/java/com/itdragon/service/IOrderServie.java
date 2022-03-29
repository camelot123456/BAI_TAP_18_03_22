package com.itdragon.service;

import com.itdragon.entity.OrderEntity;

public interface IOrderServie {

	public OrderEntity createOrder(OrderEntity order);
	
	public OrderEntity findByIdOrderAndIdPayer(String idOrder, String idPayer);
	
}
