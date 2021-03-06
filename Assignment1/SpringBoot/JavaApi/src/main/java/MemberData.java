import java.util.*;

import org.springframework.stereotype.Repository;

//this class acts as data repository holding member details
@Repository
public class MemberData {

	private static Map<String, Member> MemberList;

	static {
		MemberList = new HashMap<String, Member>() {
			{
				put("John", new Member(1, "Gold", "John K", "user123"));
				put("Tom", new Member(2, "Silver", "Tom", "user123"));
				put("Sarah", new Member(3, "Platinum", "Sarah Mathew", "user123"));
				put("Nick", new Member(4, "Gold", "Nick", "user123"));
				put("Jane", new Member(5, "Silver", "Jane", "user123"));
				put("Ray", new Member(6, "Platinum", "Ray", "user123"));

			}
		};
	}

	// Send member object with details for a given user name
	public Member getMemberDetails(String name) {
		return MemberList.get(name);
	}

	// checks if username is present in the database
	public boolean memberIsPresent(String name) {
		return MemberList.containsKey(name);
	}

	// verify the user credentials and validate login
	public boolean loginCredentialsVerify(String username, String password) {
		return (MemberList.get(username).getPassword().equals(password));
	}

	public int getMemberId(String name) {
		return MemberList.get(name).getMemberId();
	}

}
