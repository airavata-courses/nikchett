package com.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin()
@RestController
@EnableAutoConfiguration
public class Main {

	// Controller method validating login and sending appropriate response to user
	@RequestMapping("/login")
	String Hello() {
		return "Hello";

	}

	public static void main(String args[]) throws Exception {
		System.getProperties().put( "server.port", 8181 ); 
		SpringApplication.run(Main.class, args);
	}
}