package com.itdragon.controller.api;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.payload.OrderDetailPayload;
import com.itdragon.service.impl.PaymentService;
import com.paypal.base.rest.PayPalRESTException;

@RestController
@RequestMapping("/pub")
public class PaymentController {

	@PostMapping("/payment")
	public ResponseEntity<?> doHandlePayment(@RequestBody OrderDetailPayload payload, HttpServletResponse response) throws PayPalRESTException, IOException {
		OrderDetailPayload orderDetail = new OrderDetailPayload(
				payload.getProductName(), 
				payload.getSubTotal(), 
				payload.getShipping(), 
				payload.getTax(), 
				payload.getTotal());
		
		PaymentService paymentService = new PaymentService();
		
		String approvalLink = paymentService.authorizePayment(orderDetail);
		
		response.sendRedirect(approvalLink);
		
		return ResponseEntity.ok().body(orderDetail);
	}
	
}
