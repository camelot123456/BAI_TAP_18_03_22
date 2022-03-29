package com.itdragon.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.entity.OrderEntity;
import com.itdragon.service.IOrderServie;

@RestController
@RequestMapping("/pri")
public class OrderController {

	@Autowired
	private IOrderServie orderServ;
	
	@PostMapping("/orders/create")
	public ResponseEntity<?> doCreateOrder(@RequestBody OrderEntity order) {
		System.out.println("call");
		return ResponseEntity.ok().body(order);
	}
	
}
