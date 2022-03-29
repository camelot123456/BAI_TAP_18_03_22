package com.itdragon.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.ItemsEntity;
import com.itdragon.entity.OrderEntity;
import com.itdragon.entity.ProductEntity;
import com.itdragon.payload.ProductPayload;
import com.itdragon.repository.IItemRepository;
import com.itdragon.repository.IOrderRepository;
import com.itdragon.repository.IProductRepository;
import com.itdragon.service.IItemService;

@Service
public class ItemService implements IItemService{

	@Autowired
	private IItemRepository itemRepo;
	
	@Autowired
	private IProductRepository productRepo;
	
	@Autowired
	private IOrderRepository orderRepo;
	
	@Override
	public void addProductIntoOrder(Long idOrder, Long idProduct) {
		// TODO Auto-generated method stub
		ProductEntity product = productRepo.findById(idProduct).get();
		
		OrderEntity order = orderRepo.findById(idOrder).get();
		
		ItemsEntity item = new ItemsEntity();
		item.setOrder(order);
		item.setProduct(product);
		itemRepo.save(item);
	}

	@Override
	public List<ProductPayload> findAllByIdOrder(Long idOrder) {
		// TODO Auto-generated method stub
		List<Object[]> records = itemRepo.findAllByIdOrder(idOrder);
		 List<ProductPayload> productPayloads = null;
		 if (records.size() > 0) {
			productPayloads = new ArrayList<ProductPayload>();
			for (Object[] record : records) {
				ProductPayload pp = new ProductPayload();
				pp.setIdProductCart((BigInteger) record[0]);
				pp.setQuantity((Integer) record[1]);
				pp.setTotalPrice((Double) record[2]);
				pp.setNameProduct((String) record[3]);
				pp.setPriceProduct((Double) record[4]);
				pp.setAvatarUrl((String) record[5]);
				pp.setIdProduct((BigInteger)record[6]);
				
				productPayloads.add(pp);
			}
		}
		return productPayloads;
	}

}
