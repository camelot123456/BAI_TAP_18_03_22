package com.itdragon.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailPayload {

	private String productName;
	private Double subTotal;
	private Double shipping;
	private Double tax;
	private Double total;

	
	
}
