package com.login;

import org.springframework.stereotype.Component;

@Component
public class Member {

	private int memberId;
	private String membershipType;
	private String name;
	private String password;
	private String currentIssue;
	
	public String getCurrentIssue() {
		return currentIssue;
	}

	public void setCurrentIssue(String currentIssue) {
		this.currentIssue = currentIssue;
	}

	public Member(int memberId, String membershipType, String name, String password) {
		this.memberId = memberId;
		this.membershipType = membershipType; 
		this.password = password;
		this.name = name;
	}

	public int getMemberId() {
		return memberId;
	}

	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	public String getMembershipType() {
		return membershipType;
	}

	public void setMembershipType(String membershipType) {
		this.membershipType = membershipType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {                    
  	return password;                             
    }                                                
                                                     
    public void setPassword(String password) {       
    		this.password = password;                    
    }
    
    public String toString() {
    		StringBuilder sb = new StringBuilder();
		
		sb.append("{ \"memberId\": \"").append(memberId);
		sb.append("\", \"membershipType\": \"").append(membershipType);
		sb.append("\", \"name\": \"").append(name);
		sb.append("\", \"currentIssue\": \"").append(currentIssue);
		sb.append("\"}");
		
		System.out.println(sb.toString());
		
		return sb.toString();
    }
}