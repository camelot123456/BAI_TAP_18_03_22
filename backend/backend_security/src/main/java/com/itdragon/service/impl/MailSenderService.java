package com.itdragon.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.itdragon.config.AppProperties;
import com.itdragon.entity.UserEntity;
import com.itdragon.service.IMailSenderService;

@Service
public class MailSenderService implements IMailSenderService{

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public HttpStatus sendFormVerifyAccount(AppProperties appProperties, UserEntity user) throws MessagingException, FileNotFoundException {
		// TODO Auto-generated method stub
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		Scanner sc = new Scanner(new File(appProperties.getGmail().getPathHtmlFormVerify() + "/verify-email.html"));
		
		try {
			helper.setSubject("Itdragons Verify Email");
			helper.setFrom(appProperties.getGmail().getEmailSystem());
			helper.setTo(user.getEmail());
			
			
			String htmlContent = "";
			
			while (sc.hasNext()) {
				htmlContent += sc.nextLine();
			}
			
			String verifyUrl = appProperties.getGmail().getVerifyUrl() + user.getOtpCode();
			
			htmlContent = htmlContent.replace("[[${nameUser}]]", user.getName());
			htmlContent = htmlContent.replace("[[${verifyUrl}]]", verifyUrl);
			message.setContent(htmlContent, "text/html; charset=UTF-8");
			
			mailSender.send(message);
			
			return HttpStatus.OK;
			
		} catch (Exception e) {
			// TODO: handle exception
			return HttpStatus.INTERNAL_SERVER_ERROR;
		} finally {
			sc.close();
		}
	}

	@Override
	public HttpStatus sendFormResetPassword(AppProperties appProperties, UserEntity user)
			throws MessagingException, FileNotFoundException {
		// TODO Auto-generated method stub
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		Scanner sc = new Scanner(new File(appProperties.getGmail().getPathHtmlFormVerify() + "/reset-password.html"));
		
		try {
			helper.setSubject("Itdragons Reset Password");
			helper.setFrom(appProperties.getGmail().getEmailSystem());
			helper.setTo(user.getEmail());
			
			
			String htmlContent = "";
			
			while (sc.hasNext()) {
				htmlContent += sc.nextLine();
			}
			
			String resetPasswordUrl = appProperties.getGmail().getResetPasswordUrl() + user.getOtpCode();
			
			htmlContent = htmlContent.replace("[[${nameUser}]]", user.getName());
			htmlContent = htmlContent.replace("[[${resetPasswordUrl}]]", resetPasswordUrl);
			message.setContent(htmlContent, "text/html; charset=UTF-8");
			
			mailSender.send(message);
			
			return HttpStatus.OK;
			
		} catch (Exception e) {
			// TODO: handle exception
			return HttpStatus.INTERNAL_SERVER_ERROR;
		} finally {
			sc.close();
		}
	}

}
