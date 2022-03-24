package com.itdragon.service;

import java.io.FileNotFoundException;

import javax.mail.MessagingException;

import org.springframework.http.HttpStatus;

import com.itdragon.config.AppProperties;
import com.itdragon.entity.UserEntity;

public interface IAuthService {

	public String doLogin(UserEntity payload);
	
	public UserEntity doRegister(AppProperties appProperties, UserEntity user, IMailSenderService mailServ) throws FileNotFoundException, MessagingException;
	
	public HttpStatus doVerifyEmail(String otpCode);
}
