package com.login;

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
public class Login {
	MemberData member = new MemberData();

	// Controller method validating login and sending appropriate response to user
	@RequestMapping("/login")
	Member home(@RequestParam("username") String username, @RequestParam("password") String password,
			HttpServletResponse response) {

		if (member.memberIsPresent(username) && member.loginCredentialsVerify(username, password)) {
			
			//Rest call to find the current book issued by the user from the API with the inventory records
			RestTemplate restTemplate = new RestTemplate();
			String url = "http://localhost:3001/bookname";
			// send member Id as parameter
			UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
					.queryParam("memberId", member.getMemberId(username));
			String result = restTemplate.getForObject(builder.build().encode().toUriString(), String.class);

			Member memberResult = member.getMemberDetails(username);
			memberResult.setCurrentIssue(result);
			return memberResult;

		} else {
			// if invalid credentials send error response
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

	}

	public static void main(String args[]) throws Exception {
		SpringApplication.run(Login.class, args);
	}
}