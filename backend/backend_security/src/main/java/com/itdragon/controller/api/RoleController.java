package com.itdragon.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itdragon.service.IRoleService;

@RestController
@RequestMapping("/pri/admin")
public class RoleController {

	@Autowired
	private IRoleService roleServ;
	
	@GetMapping("/roles")
	public ResponseEntity<?> showroleList(){
		return ResponseEntity.ok().body(roleServ.findAll());
	}
	
}
