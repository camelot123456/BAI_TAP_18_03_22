package com.itdragon.controller.api;

import java.io.IOException;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.payload.OrderDetailPayload;
import com.itdragon.service.impl.PaymentService;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.ShippingAddress;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.PayPalRESTException;

//https://bitshifted.co/blog/spring-boot-paypal-integration/

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
		
		return ResponseEntity.ok().body(approvalLink);
	}
	
	@PostMapping("/execute")
	public ResponseEntity<?> doExecution(@Param("paymentId") String paymentId, 
			@Param("PayerID") String payerID) throws PayPalRESTException, IOException {

		PaymentService paymentService = new PaymentService();
		Payment payment = paymentService.executePayment(paymentId, payerID);
		
		PayerInfo payerInfo = payment.getPayer().getPayerInfo();
		Transaction transaction = payment.getTransactions().get(0);
		
		Map<String, Object> res = new HashMap<String, Object>();
		res.put("payerInfo", payerInfo);
		res.put("transaction", transaction);
	
		return ResponseEntity.ok().body(res);
	}
	
	@GetMapping("/paypal/reviewPayment")
	public ResponseEntity<?> showPaymentInfo(
			@Param("paymentId") String paymentId, 
			@Param("PayerID") String payerID) throws PayPalRESTException{
		PaymentService paymentService = new PaymentService();
		Payment payment = paymentService.getPaymentDetails(paymentId);
		
		PayerInfo payerInfo = payment.getPayer().getPayerInfo();
		Transaction transaction = payment.getTransactions().get(0);
		ShippingAddress shippingAddress = transaction.getItemList().getShippingAddress();
		
		Map<String , Object> res = new HashMap<String, Object>();
		res.put("payerInfo", payerInfo);
		res.put("transaction", transaction);
		res.put("shippingAddress", shippingAddress);
		
		return ResponseEntity.ok().body(res);
	}
	
}
