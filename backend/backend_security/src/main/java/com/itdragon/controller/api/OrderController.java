package com.itdragon.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.entity.OrderEntity;
import com.itdragon.service.IItemService;
import com.itdragon.service.IOrderServie;

@RestController
@RequestMapping("/pri")
public class OrderController {

	@Autowired
	private IOrderServie orderServ;
	
	@Autowired
	private IItemService itemServ;
	
	@PostMapping("/orders/create")
	public ResponseEntity<?> doCreateOrder(@RequestBody OrderEntity order) {
		return ResponseEntity.ok().body(orderServ.createOrder(order));
	}
	
	@PatchMapping("/orders/patch")
	public ResponseEntity<?> doPatchOrder(
			@RequestBody OrderEntity order,
			@Param("token") String token, 
			@Param("PayerID") String PayerID) {
		return ResponseEntity.ok().body(orderServ.updateOrderByIdOrderAndIdPayer(token, PayerID, order));
	}
	
	@GetMapping("/orders/detail")
	public ResponseEntity<?> showOrderDetail(
			@Param("token") String token, 
			@Param("PayerID") String PayerID) {
		Map<String, Object> map = new HashMap<String, Object>();
		OrderEntity order = orderServ.findByIdOrderAndIdPayer(token, PayerID);
		map.put("order", order);
		map.put("items", itemServ.findAllByIdOrder(order.getId()));
		return ResponseEntity.ok().body(map);
	}
	
	@GetMapping("/orders/list/unpaid")
	public ResponseEntity<?> showUnpaidOrderList(@Param("username") String username) {
		return ResponseEntity.ok().body(orderServ.findAllByUsernameAndFinalCapture(username, false));
	}
	
	@GetMapping("/orders/list/paid")
	public ResponseEntity<?> showPaidOrderList(@Param("username") String username) {
		return ResponseEntity.ok().body(orderServ.findAllByUsernameAndFinalCapture(username, true));
	}
	
	@GetMapping("/orders/list/unReceive")
	public ResponseEntity<?> showPaidOrderUnReceivedList(@Param("username") String username) {
		return ResponseEntity.ok().body(orderServ.findAllOrderPaidByUsernameAndStatusNotReceived(username));
	}
	
	@DeleteMapping("/orders/delete")
	public ResponseEntity<?> doDeleteOrder(
			@Param("token") String token, 
			@Param("PayerID") String PayerID) {
		orderServ.deleteOrderByIdOrderAndIdPayer(token, PayerID);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/orders/update")
	public ResponseEntity<?> doUpdateAfterCapture(
			@Param("token") String token, 
			@Param("PayerID") String PayerID,
			@RequestBody OrderEntity payload) {
		return ResponseEntity.ok().body(orderServ.updateOrderAfterCaptureByIdOrderAndIdPayer(token, PayerID, payload));
	}
	
	@PatchMapping("/orders/update/status/receive")
	public ResponseEntity<?> doUpdateStatusReceived(
			@Param("token") String token, 
			@Param("PayerID") String PayerID) {
		return ResponseEntity.ok().body(orderServ.updateStatusReceivedOrderByIdOrderAndIdPayer(token, PayerID));
	}

}