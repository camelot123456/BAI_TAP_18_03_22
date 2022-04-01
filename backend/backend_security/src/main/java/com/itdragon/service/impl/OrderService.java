package com.itdragon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itdragon.entity.ItemsEntity;
import com.itdragon.entity.OrderEntity;
import com.itdragon.entity.ProductEntity;
import com.itdragon.entity.enums.EOrderState;
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
		orderNew.setCurrencyCode(order.getCurrencyCode());
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
		orderNew.setFinalCapture(false);
		orderNew.setReceived(false);
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

	@Override
	public OrderEntity updateOrderByIdOrderAndIdPayer(String idOrder, String idPayer, OrderEntity orderPayload) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setNameShippingCus(orderPayload.getNameShippingCus());
		order.setAddLine1Cus(orderPayload.getAddLine1Cus());
		order.setAddLine2Cus(orderPayload.getAddLine2Cus());
		order.setAdArea1(orderPayload.getAdArea1());
		order.setAdArea2(orderPayload.getAdArea2());
		order.setPosCode(orderPayload.getPosCode());
		order.setCouCode(orderPayload.getCouCode());
		return orderRepo.save(order);
	}

	@Override
	public List<OrderEntity> findAllByUsernameAndFinalCapture(String username, Boolean finalCapture) {
		// TODO Auto-generated method stub
		return orderRepo.findAllByUsernameAndFinalCapture(username, finalCapture);
	}

	@Transactional
	@Override
	public void deleteOrderByIdOrderAndIdPayer(String idOrder, String idPayer) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.getItems().stream().forEach(i -> itemRepo.deleteById(i.getId()));
		orderRepo.deleteById(order.getId());
	}

	@Transactional
	@Override
	public OrderEntity updateOrderAfterCaptureByIdOrderAndIdPayer(String idOrder, String idPayer,
			OrderEntity orderPayload) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setStatus(orderPayload.getStatus());
		order.setFinalCapture(orderPayload.getFinalCapture());
		order.setPayAuthStatus(orderPayload.getPayAuthStatus());
		order.setPayAuthId(orderPayload.getPayAuthId());
		order.setPayAuthAmount(orderPayload.getPayAuthAmount());
		order.setPayAuthGrossAmount(orderPayload.getPayAuthGrossAmount());
		order.setPayAuthPaypalFee(orderPayload.getPayAuthPaypalFee());
		order.setPayAuthNetAmount(orderPayload.getPayAuthNetAmount());
		order.setPayAuthCreTime(orderPayload.getPayAuthCreTime());
		order.setPayAuthUpdTime(orderPayload.getPayAuthUpdTime());
		return orderRepo.save(order); 
	}

	@Override
	public OrderEntity updateStatusReceivedOrderByIdOrderAndIdPayer(String idOrder, String idPayer) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setStatus(EOrderState.RECEIVED);
		return orderRepo.save(order);
	}

	@Override
	public List<OrderEntity> findAllOrderPaidByUsernameAndStatusNotReceived(String username) {
		// TODO Auto-generated method stub
		return orderRepo.findAllOrderPaidByUsernameAndStatusNotReceived(username);
	}

	@Transactional
	@Override
	public OrderEntity updateStatusRefundOrderByIdOrderAndIdPayer(String idOrder, String idPayer, OrderEntity orderPayload) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setStatus(EOrderState.REFUND);
		order.setNoteRefund(orderPayload.getNoteRefund());
		return orderRepo.save(order);
	}

	@Override
	public List<OrderEntity> findAllOrderStatusRefund() {
		// TODO Auto-generated method stub
		return orderRepo.findAllOrderStatusRefund();
	}

	@Override
	public OrderEntity updateStatusRefundSuccessOrderByIdOrderAndIdPayer(String idOrder, String idPayer) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setStatus(EOrderState.REFUND_SUCCESS);
		return orderRepo.save(order);
	}

	@Override
	public OrderEntity updateStatusRefundFailOrderByIdOrderAndIdPayer(String idOrder, String idPayer) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer);
		order.setStatus(EOrderState.REFUND_FAIL);
		return orderRepo.save(order);
	}

	@Transactional
	@Override
	public OrderEntity doRefundOrder(String idOrder, String idPayer, OrderEntity orderPayload) {
		// TODO Auto-generated method stub
		OrderEntity order = orderRepo.findByIdOrderAndIdPayer(idOrder, idPayer); 
		order.setStatus(EOrderState.REFUND_SUCCESS);
		order.setIdRefund(orderPayload.getIdRefund());
		order.setGrossAmountRefund(orderPayload.getGrossAmountRefund());
		order.setPaypalFeeRefund(orderPayload.getPaypalFeeRefund());
		order.setNetAmountRefund(orderPayload.getNetAmountRefund());
		order.setCreateTimeRefund(orderPayload.getCreateTimeRefund());
		order.setUpdateTimeRefund(orderPayload.getUpdateTimeRefund());
		order.setTotalRefundedAmount(orderPayload.getTotalRefundedAmount());
		order.setStatusRefund(orderPayload.getStatusRefund());
		return orderRepo.save(order);
	}

}
