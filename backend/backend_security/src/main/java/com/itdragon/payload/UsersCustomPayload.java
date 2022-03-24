package com.itdragon.payload;

import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersCustomPayload {

	private BigInteger idUser;
	private String name;
	private String username;
	private BigInteger idRole;
	private String code;
	private String password;
	
}
