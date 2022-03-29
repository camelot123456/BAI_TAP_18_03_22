package com.itdragon.payload;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPayload {
	
	private BigInteger idProductCart;
	private String nameProduct;
	private String avatarUrl;
	private Integer quantity;
	private Double priceProduct;
	private Double totalPrice;
	private BigInteger idProduct;
	
}
