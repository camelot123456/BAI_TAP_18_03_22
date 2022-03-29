package com.itdragon.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.payload.ProductCartPayload;
import com.itdragon.service.ICartService;
import com.itdragon.service.IProductCartService;

@RestController
public class CartController {
	
	@Autowired
	private IProductCartService productCartServ;
	
	@Autowired
	private ICartService cartServ;
	
	@PostMapping("/pri/cart/add_product")
	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doAddProductIntoCart(@RequestBody ProductCartPayload payload) {
		productCartServ.addProductIntoCart(payload);
		return ResponseEntity.ok().body(cartServ.countQuantityProduct(payload.getUsername()));
	}
	
	@GetMapping("/pri/cart/total_product/{username}")
	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doCountProduct(@PathVariable("username") String username) {
		return ResponseEntity.ok().body(cartServ.countQuantityProduct(username));
	}
	
	@GetMapping("/pri/cart/product_cart/{username}")
	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> showProductCart(@PathVariable("username") String username) {
		return ResponseEntity.ok().body(productCartServ.findAllByUsername(username));
	}
	
	@DeleteMapping("/pri/cart/delete_product_cart/{idProductCart}")
	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doDeleteProductCart(@PathVariable("idProductCart") Long idProductCart) {
		productCartServ.deleteById(idProductCart);
		return ResponseEntity.ok().body(HttpStatus.OK);
	}
	
	@PostMapping("/pri/cart/payment/{username}")
	public ResponseEntity<?> doPaymentOrder(@PathVariable("username") String username) {
		cartServ.paymentOrder(username);
		return ResponseEntity.ok().body("");
	}
	
}
