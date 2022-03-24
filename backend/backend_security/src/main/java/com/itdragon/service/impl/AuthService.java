package com.itdragon.service.impl;

import java.io.FileNotFoundException;

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
		UserEntity user = userRepo.findByOtpCode(otpCode).get();
		if (user == null) {
			return HttpStatus.EXPECTATION_FAILED;
		}
		user.setEnabled(true);
		user.setOtpCode(null);
		userRepo.save(user);
		return HttpStatus.OK;
	}

}
