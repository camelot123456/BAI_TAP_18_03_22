package com.itdragon.payload;

import java.util.Date;

import com.itdragon.entity.enums.EOrderIntent;
import com.itdragon.entity.enums.EOrderState;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreatePayload {

	private Long id;
	private String idOrder;
	private EOrderIntent intent;
	private EOrderState state;
	private Date createTime;
	
//	------------------------------- purchase_units -----------------------------------
	
	private String idCus;
	private String nameCus;
	private String addLine1Cus;
	private String addLine2Cus;
	private String adArea1;
	private String adArea2;
	private String posCode;
	private String couCode;
	
//	------------------------------- payment authorizations -----------------------------------
	
	private String payAuthStatus;
	private String payAuthId;
	private Double payAuthAmount;
	private Date payAuthExpTime;
	private Date payAuthCreTime;
	private Date payAuthUpdTime;
	
}
