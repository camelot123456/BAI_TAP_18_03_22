package com.itdragon.controller.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping("/orders/detail")
	public ResponseEntity<?> showOrderDetail(
			@Param("token") String token, 
			@Param("PayerID") String PayerID) {
		System.out.println("token: "+ token+"; payerId: " + PayerID);
		Map<String, Object> map = new HashMap<String, Object>();
		OrderEntity order = orderServ.findByIdOrderAndIdPayer(token, PayerID);
		map.put("order", order);
		map.put("items", itemServ.findAllByIdOrder(order.getId()));
		return ResponseEntity.ok().body(map);
	}
	
}
