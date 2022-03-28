package com.itdragon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.ProductEntity;
import com.itdragon.repository.IProductRepository;
import com.itdragon.service.IProductService;

@Service
public class ProductService implements IProductService{

	@Autowired
	private IProductRepository productRepo;
	
	@Override
	public List<ProductEntity> findAll() {
		// TODO Auto-generated method stub
		return productRepo.findAll();
	}

}
