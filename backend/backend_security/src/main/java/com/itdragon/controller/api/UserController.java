package com.itdragon.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.entity.UserEntity;
import com.itdragon.service.IUserService;

@RestController
@RequestMapping("/pri/admin")
public class UserController {

	@Autowired
	private IUserService userServ;
	
	@GetMapping("/users")
	@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> showUsers(Authentication authentication) {
		return ResponseEntity.ok().body(userServ.findAll(authentication));
	}
	
	@GetMapping("/users/{idUser}")
	@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> showUsers(@PathVariable("idUser") Long idUser) {
		return ResponseEntity.ok().body(userServ.findUserAndRolesByIdUser(idUser));
	}
	
	@PostMapping("/users/create")
	@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doCreate(@RequestBody UserEntity user) {
		return ResponseEntity.ok().body(userServ.save(user));
	}
	
	@PutMapping("/users/update")
	@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doUpdate(@RequestBody UserEntity user) {
		return ResponseEntity.ok().body(userServ.update(user));
	}
	
	@DeleteMapping("/users/delete")
	@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
	public ResponseEntity<?> doDelete(@RequestBody UserEntity user, Authentication authentication) {
		return ResponseEntity.ok().body(userServ.deleteById(user.getId(), authentication));
	}
}
