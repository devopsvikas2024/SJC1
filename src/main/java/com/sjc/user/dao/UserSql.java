package com.sjc.user.dao;

// TODO: Auto-generated Javadoc
/**
 * The Class UserSql.
 */
public class UserSql {

	/** The Constant LOGIN_AUTH. */
	public static final String LOGIN_AUTH = "SELECT * FROM sjc_sec_user_db WHERE user_name = :userName AND pass_word = :passWord";

	/** The Constant INSERT_QRY. */
	public static final String INSERT_QRY = "INSERT INTO sjc_sec_user_db(id,user_name,pass_word,first_name,last_name,mobile_no,user_type,rec_status) 	"
			+ "VALUES (:id,:userName,:passWord,:firstName,:lastName,:mobileNo,:userType,'A')";

	/** The Constant UPT_QRY. */
	public static final String UPT_QRY = "UPDATE sjc_sec_user_db SET user_name = :userName, pass_word = :passWord,"
		          	+ "first_name = :firstName, last_name = :lastName,"
	             		 + "mobile_no = :mobileNo, user_type = :userType,"
			                 + " rec_status = 'A' WHERE id = :id";
   
	/** The Constant LOGIN_AUTH. */
	public static final String Fetch_QRY = "SELECT * FROM sjc_sec_user_db WHERE id = :id";
	
	
	/** The Constant UPT_QRY. */
	public static final String DEL_QRY = "DELETE FROM SJC_SEC_USER_DB WHERE id = :id";
	
	/**The Retrieve Retrieve_QRY. */
	public static final String Retrieve_QRY = "SELECT * FROM sjc_sec_user_db";

	


	
}
