package com.itdragon.entity;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String idTransaction;
	
	private String currencyCode;
	
	private Double amountValue;
	
	private Boolean finalCapture;
	
	private String disbursementMode;
	
	private Double grossAmount;
	
	private Double paypalFee;
	
	private Double netAmount;
	
	private String invoiceId;
	
	private String status;
	
	private String orderId;
	
	private String authId;
	
	private Date createTime;
	
	private Date updateTime;
	
}
