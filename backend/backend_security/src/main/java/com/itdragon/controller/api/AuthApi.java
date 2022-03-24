package com.itdragon.controller.api;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.config.AppProperties;
import com.itdragon.entity.UserEntity;
import com.itdragon.service.IAuthService;
import com.itdragon.service.IMailSenderService;

@RestController
@RequestMapping("/pub")
public class AuthApi {
	
	@Autowired
	private AppProperties appProperties;

	@Autowired
	private IAuthService authServ;
	
	@Autowired
	private IMailSenderService mailServ;
	
	@PostMapping("/login")
	public ResponseEntity<?> doLogin(@RequestBody UserEntity user) {
		Map<String , Object> res = new HashMap<String, Object>();
		res.put("keyAuth", "itdragon");
		res.put("accessToken", authServ.doLogin(user));
		return ResponseEntity.ok().body(res);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> doRegister(@RequestBody UserEntity user) throws FileNotFoundException, MessagingException {
		return ResponseEntity.ok().body(authServ.doRegister(appProperties, user, mailServ));
	}
	
	@GetMapping("/verifyUrl")
	public ResponseEntity<?> doVerifyEmail(@Param("otpCode") String otpCode) {
		return ResponseEntity.ok().body(authServ.doVerifyEmail(otpCode));
	}
	
}
