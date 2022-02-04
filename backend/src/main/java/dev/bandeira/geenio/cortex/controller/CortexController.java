package dev.bandeira.geenio.cortex.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/cortex")
@Log4j2
public class CortexController {
	@GetMapping(path = "/endpoint")
	public String getSecured() {
		log.info("GET successfully called on /secured resource");
		return "test";
	}
}
