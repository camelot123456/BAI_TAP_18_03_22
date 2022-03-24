package com.itdragon.service;

import java.io.FileNotFoundException;

import javax.mail.MessagingException;

import org.springframework.http.HttpStatus;

import com.itdragon.config.AppProperties;
import com.itdragon.entity.UserEntity;

public interface IMailSenderService {

	public HttpStatus sendFormVerifyAccount(AppProperties appProperties, UserEntity user) throws MessagingException, FileNotFoundException;
	
}
