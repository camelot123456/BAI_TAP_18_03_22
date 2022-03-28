package com.itdragon.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.service.IProductService;

@RestController
@RequestMapping("/pub")
public class ProductController {

	@Autowired
	private IProductService productServ;
	
	@GetMapping("/products/list")
	public ResponseEntity<?> showProductList() {
		return ResponseEntity.ok().body(productServ.findAll());
	}
	
}
