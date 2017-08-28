import java.util.*;

import org.springframework.stereotype.Repository;

@Repository
public class MemberData {
	
private static Map<String, Member>MemberList;
	
     static {
    	 
    	 MemberList = new HashMap<String, Member>() {
    		 {
    			 put("John",new Member(1, "Gold","John","user123"));
    			 put("Tom",new Member(2, "Silver","Tom","user123"));
    			 put("Sarah",new Member(3, "Platinum","Sarah","user123"));
    		 }
    		 
    	 };
     }
    	 
    	 public Member getMemberDetails(String name)
    	 {
    		 
    		 return MemberList.get(name);
    	 }
    	 
    	 public boolean memberIsPresent(String name) {
    		 
    		 return MemberList.containsKey(name);
    	 }
    	 
    	 public boolean loginCredentialsVerify(String username, String password) {
    		 System.out.println("vv un"+username);
    		 System.out.println("vv pw"+password);
    		 
    		 System.out.println((MemberList.get(username)).getPassword());
    		 
    		 return (MemberList.get(username).getPassword().equals(password));
    	 }
		
	}



