package com.itdragon.service;

import java.util.List;

import com.itdragon.entity.OrderEntity;

public interface IOrderServie {

	public OrderEntity createOrder(OrderEntity order);
	
	public OrderEntity findByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	public OrderEntity updateOrderByIdOrderAndIdPayer(String idOrder, String idPayer, OrderEntity orderPayload);
	
	public OrderEntity updateOrderAfterCaptureByIdOrderAndIdPayer(String idOrder, String idPayer, OrderEntity orderPayload);
	
	public List<OrderEntity> findAllByUsernameAndFinalCapture(String username, Boolean finalCapture);
	
	public void deleteOrderByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	public OrderEntity updateStatusReceivedOrderByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	public OrderEntity updateStatusRefundOrderByIdOrderAndIdPayer(String idOrder, String idPayer, OrderEntity orderPayload);
	
	public OrderEntity updateStatusRefundSuccessOrderByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	public OrderEntity updateStatusRefundFailOrderByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	public OrderEntity doRefundOrder(String idOrder, String idPayer, OrderEntity orderPayload);
	
	public List<OrderEntity> findAllOrderStatusRefund();
	
	public List<OrderEntity> findAllOrderPaidByUsernameAndStatusNotReceived(String username);
}
