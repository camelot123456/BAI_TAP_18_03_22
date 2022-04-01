package com.itdragon.service.impl;

import java.io.FileNotFoundException;
import java.util.NoSuchElementException;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.itdragon.config.AppProperties;
import com.itdragon.entity.UserEntity;
import com.itdragon.repository.IRoleRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.security.TokenProvider;
import com.itdragon.service.IAuthService;
import com.itdragon.service.IMailSenderService;
import com.itdragon.service.IUserRoleService;

import net.bytebuddy.utility.RandomString;

@Service
public class AuthService implements IAuthService{
	
	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private IRoleRepository roleRepo;
	
	@Autowired
	private IUserRoleService userRoleServ;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public String doLogin(UserEntity user) {
		// TODO Auto-generated method stub
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				user.getUsername(), user.getPassword());
		Authentication authentication = authenticationManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return TokenProvider.createToken(authentication);
	}

	@Transactional
	@Override
	public UserEntity doRegister(AppProperties appProperties, UserEntity user, IMailSenderService mailServ) throws FileNotFoundException, MessagingException {
		// TODO Auto-generated method stub
		if (!userRepo.existsByUsername(user.getUsername())) {
			String otpCode = "";
			do {
				otpCode = RandomString.make(64);
			} while (userRepo.existsByOtpCode(otpCode));
			
			user.setOtpCode(otpCode);
			user.setEnabled(false);
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			
			UserEntity userNew = userRepo.save(user);
			mailServ.sendFormVerifyAccount(appProperties, user);
			
			userRoleServ.addUserToRole(
					userNew.getId(), 
					new Long[]{roleRepo.findByCode("USER").getId()}
				);
			return userNew;
		}
		return null;
	}

	@Override
	public HttpStatus doVerifyEmail(String otpCode) {
		// TODO Auto-generated method stub
		try {
			UserEntity user = userRepo.findByOtpCode(otpCode).get();
			if (user != null) {
				user.setEnabled(true);
				user.setOtpCode(null);
				userRepo.save(user);
			}
			return HttpStatus.OK;
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			return HttpStatus.EXPECTATION_FAILED;
		}
	}

	@Transactional
	@Override
	public HttpStatus doSendMailResetPassword(AppProperties appProperties, UserEntity user, IMailSenderService mailServ) throws FileNotFoundException, MessagingException {
		// TODO Auto-generated method stub
		UserEntity userVerify = userRepo.findByEmail(user.getEmail());
		if (userVerify == null) {
			return HttpStatus.NOT_FOUND;
		}
		String otpCode = "";
		do {
			otpCode = RandomString.make(64);
		} while (userRepo.existsByOtpCode(otpCode));
		userVerify.setOtpCode(otpCode);
		userRepo.save(userVerify);
		mailServ.sendFormResetPassword(appProperties, userVerify);
		return HttpStatus.OK;
	}

	@Override
	public HttpStatus doChangePassword(UserEntity user) {
		// TODO Auto-generated method stub
		try {
			UserEntity userChangePassword = userRepo.findByOtpCode(user.getOtpCode()).get();
			if (userChangePassword != null) {
				userChangePassword.setOtpCode(null);
				userChangePassword.setPassword(passwordEncoder.encode(user.getPassword()));
				userRepo.save(userChangePassword);
			}
			throw new ResponseStatusException(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			// TODO: handle exception
			throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Request to reset password already used");
		}
	}

}
