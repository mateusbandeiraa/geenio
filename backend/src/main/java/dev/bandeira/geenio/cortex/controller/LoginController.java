package dev.bandeira.geenio.cortex.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cortex")
public class LoginController {
	@GetMapping("/login")
	public String login() {
		// Since this endpoint is secured by WebSecurityConfig, if we got to this point
		// then the request is authenticated.
		return "Login successful.";
	}
}
