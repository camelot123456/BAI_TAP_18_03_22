package com.itdragon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.OrderEntity;
import com.itdragon.repository.IOrderRepository;
import com.itdragon.service.IOrderServie;

@Service
public class OrderService implements IOrderServie{

	@Autowired
	private IOrderRepository orderRepo;
	
	@Override
	public void createOrder(OrderEntity order) {
		// TODO Auto-generated method stub
		
	}

}
