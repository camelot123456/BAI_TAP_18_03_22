package com.itdragon.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.itdragon.payload.OrderDetailPayload;
import com.itdragon.utils.FormatValueUtil;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Details;
import com.paypal.api.payments.Item;
import com.paypal.api.payments.ItemList;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.PayerInfo;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

public class PaymentService {
	
	public static final String MODE = "sandbox";
    public static final String CLIENT_ID = "AdL3P3CLxR_9A586FOvg5272xN5NMGpNvVDE6CZY_MXjjuPuCHvnr0PM5WhuY0SSvIR2Yxw9yijq3rCt";
    public static final String SECRET = "EDNGp3bTO1GNOcrkQSLvJQ0YlPK8MYwuJM80uwe8FWjw9_ILtBHPNGw90xz8T9aoZR66lGLOd66FWS1u";
	
	public String authorizePayment(OrderDetailPayload payload) throws PayPalRESTException {
		Payer payer = getPayerInformation();
		RedirectUrls redirectUrls = getRedirectUrls();
		List<Transaction> listTransactions = getTransactionInformation(payload);
		
		Payment requestPayment = new Payment();
		requestPayment.setTransactions(listTransactions)
			.setRedirectUrls(redirectUrls)
			.setPayer(payer)
			.setIntent("authorize");
		APIContext apiContext = new APIContext(CLIENT_ID, SECRET, MODE);
		Payment approvedPayment = requestPayment.create(apiContext);
		
		System.out.println(approvedPayment);
		
		return getApprovalLink(approvedPayment);
	}
	
	private String getApprovalLink(Payment approvedPayment) {
		List<Links> links = approvedPayment.getLinks();
		String approvalLink = null;
		
		for (Links link : links) {
			if (link.getRel().equalsIgnoreCase("approval_url")) {
				approvalLink = link.getHref();
			}
		}
		return approvalLink;
	}
	
	private List<Transaction> getTransactionInformation(OrderDetailPayload payload) {
		Details details = new Details();
		details.setShipping(FormatValueUtil.format(payload.getShipping()));
		details.setSubtotal(FormatValueUtil.format(payload.getSubTotal()));
		details.setTax(FormatValueUtil.format(payload.getTax()));
		
		Amount amount = new Amount();
		amount.setCurrency("USD");
		amount.setTotal(FormatValueUtil.format(payload.getTotal()));
		amount.setDetails(details);
		
		Transaction transaction = new Transaction();
		transaction.setAmount(amount);
		transaction.setDescription(payload.getProductName());
		
		ItemList itemList = new ItemList();
		List<Item> items = new ArrayList<Item>();
		
		Item item = new Item();
		item.setCurrency("USD")
			.setName(payload.getProductName())
			.setPrice(FormatValueUtil.format(payload.getSubTotal()))
			.setTax(FormatValueUtil.format(payload.getTax()))
			.setQuantity("1");
		
		items.add(item);
		itemList.setItems(items);
		transaction.setItemList(itemList);
		
		List<Transaction> listTransaction = new ArrayList<Transaction>();
		listTransaction.add(transaction);
		
		return listTransaction;
	}

	private RedirectUrls getRedirectUrls() {
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl("http://localhost:3000/paypal/cancel");
		redirectUrls.setReturnUrl("http://localhost:3000/paypal/reviewPayment");
		
		return redirectUrls;
	}

	private Payer getPayerInformation() {
		Payer payer = new Payer();
		payer.setPaymentMethod("paypal");
		
		PayerInfo payerInfo = new PayerInfo();
		payerInfo.setFirstName("Bao")
			.setLastName("Nguyen")
			.setEmail("nguyensybao1403@gmail.com");
		
		payer.setPayerInfo(payerInfo);
		
		return payer;
	}
	
}
