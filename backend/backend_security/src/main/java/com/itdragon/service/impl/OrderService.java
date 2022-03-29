package com.itdragon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itdragon.entity.ItemsEntity;
import com.itdragon.entity.OrderEntity;
import com.itdragon.entity.ProductEntity;
import com.itdragon.repository.IItemRepository;
import com.itdragon.repository.IOrderRepository;
import com.itdragon.repository.IProductRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.service.IOrderServie;

@Service
public class OrderService implements IOrderServie{

	@Autowired
	private IOrderRepository orderRepo;
	
	@Autowired
	private IProductRepository productRepo;
	
	@Autowired
	private IItemRepository itemRepo;
	
	@Autowired
	private IUserRepository userRepo;
	
	@Transactional
	@Override
	public OrderEntity createOrder(OrderEntity order) {
		// TODO Auto-generated method stub
		OrderEntity orderNew = new OrderEntity();
		orderNew.setAdArea1(order.getAdArea1());
		orderNew.setAdArea2(order.getAdArea2());
		orderNew.setAddLine1Cus(order.getAddLine1Cus());
		orderNew.setAddLine2Cus(order.getAddLine2Cus());
		orderNew.setCouCode(order.getCouCode());
		orderNew.setCouCodePayer(order.getCouCodePayer());
		orderNew.setCreateTime(order.getCreateTime());
		orderNew.setEmailPayer(order.getEmailPayer());
		orderNew.setGivenNamePayer(order.getGivenNamePayer());
		orderNew.setIdOrder(order.getIdOrder());
		orderNew.setIdPayer(order.getIdPayer());
		orderNew.setIntent(order.getIntent());
		orderNew.setNameShippingCus(order.getNameShippingCus());
		orderNew.setPosCode(order.getPosCode());
		orderNew.setReferenceId(order.getReferenceId());
		orderNew.setStatus(order.getStatus());
		orderNew.setSurnamePayer(order.getSurnamePayer());
		orderNew.setTotal(order.getTotal());
		orderNew.setUser(userRepo.findByUsername(order.getUser().getUsername()));
		
		OrderEntity orderFinish = orderRepo.save(orderNew);
		
		for (ItemsEntity i : order.getItems()) {
			ItemsEntity item = new ItemsEntity();
			ProductEntity product = productRepo.findById(i.getIdProduct()).get();
			item.setQuantity(i.getQuantity());
			item.setOrder(orderFinish);
			item.setProduct(product);
			item.setPrice(i.getQuantity() * product.getPrice());
			itemRepo.save(item);
		}
		
		return orderFinish;
	}

	@Override
	public OrderEntity findByIdOrderAndIdPayer(String idOrder, String idPayer) {
		// TODO Auto-generated method stub
		return orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
	}

}
