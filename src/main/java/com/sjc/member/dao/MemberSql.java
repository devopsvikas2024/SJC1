package com.sjc.member.dao;

public class MemberSql {

	public static final String Retrieve_QRY = "SELECT * FROM sjc_sec_member_db";
	
	public static final String INSERT_QRY = "INSERT INTO sjc_sec_member_db (id, member_id, mem_family_id, mem_first_name, mem_last_name, mem_familiar_name, " +
		    "mem_ic_number, mem_date_of_birth, mem_age, mem_gender, mem_marital_status, mem_date_of_wedding, " +
		    "mem_email, mem_contact_number, mem_address_line_1, mem_address_line_2, mem_city, mem_state, mem_zipcode, " +
		    "mem_country, mem_baptised, mem_date_of_baptism, mem_location_of_baptism, mem_baptised_by, mem_date_of_confirmation, " +
		    "mem_location_of_confirmation, mem_confirmed_by, membership_type, membership_status, membership_start_date, " +
		    "membership_end_date) VALUES (:id, :member_id, :mem_family_id, :mem_first_name, :mem_last_name, :mem_familiar_name, " +
		    ":mem_ic_number, :mem_date_of_birth, :mem_age, :mem_gender, :mem_marital_status, :mem_date_of_wedding, " +
		    ":mem_email, :mem_contact_number, :mem_address_line_1, :mem_address_line_2, :mem_city, :mem_state, :mem_zipcode, " +
		    ":mem_country, :mem_baptised, :mem_date_of_baptism, :mem_location_of_baptism, :mem_baptised_by, :mem_date_of_confirmation, " +
		    ":mem_location_of_confirmation, :mem_confirmed_by, :membership_type, :membership_status, :membership_start_date, " +
		    ":membership_end_date)";


	public static final String DEL_QRY = "DELETE FROM sjc_sec_member_db WHERE id = :id";

	public static final String UPT_QRY = "UPDATE sjc_sec_member_db SET "
			+ "mem_first_name = :mem_first_name,mem_last_name = :mem_last_name,"
			+ "mem_familiar_name = :mem_familiar_name,mem_ic_number = :mem_ic_number,"
			+ "mem_date_of_birth = :mem_date_of_birth,mem_age = :mem_age,mem_gender = :mem_gender,"
			+ "mem_marital_status = :mem_marital_status,mem_date_of_wedding = :mem_date_of_wedding,"
			+ "mem_email = :mem_email,mem_contact_number = :mem_contact_number,"
			+ "mem_address_line_1 = :mem_address_line_1,mem_address_line_2 = :mem_address_line_2,"
			+ "mem_city = :mem_city,mem_state = :mem_state,mem_zipcode = :mem_zipcode,mem_country = :mem_country,"
			+ "mem_baptised = :mem_baptised,mem_date_of_baptism = :mem_date_of_baptism,mem_location_of_baptism = :mem_location_of_baptism,"
			+ "mem_baptised_by = :mem_baptised_by,mem_date_of_confirmation = :mem_date_of_confirmation,"
			+ "mem_location_of_confirmation = :mem_location_of_confirmation,mem_confirmed_by = :mem_confirmed_by,"
			+ "membership_type = :membership_type,membership_status = :membership_status,"
			+ "membership_start_date = :membership_start_date,membership_end_date = :membership_end_date "
			+ "WHERE id = :id;";

	public static final String Fetch_QRY = "SELECT * FROM sjc_sec_member_db WHERE id = :id";

	public static final String Count_QRY = "SELECT COUNT(*) FROM sjc.sjc_sec_member_db";

	public static final String dateOfBirthCount_QRY = "SELECT\r\n"
			+ "    CASE\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 0 AND 10 THEN '0-10'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 11 AND 25 THEN '11-25'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 26 AND 40 THEN '26-40'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 41 AND 60 THEN '41-60'\r\n"
			+ "        ELSE '61+'\r\n"
			+ "    END AS  member_age,\r\n"
			+ "    COUNT(*) AS count\r\n"
			+ "FROM\r\n"
			+ "   sjc.sjc_sec_member_db\r\n"
			+ "GROUP BY\r\n"
			+ "    member_age;";

	public static final String dateOfBirthPercentage_QRY = "SELECT\r\n"
			+ "    CASE\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 0 AND 10 THEN '0-10'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 11 AND 25 THEN '11-25'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 26 AND 40 THEN '26-40'\r\n"
			+ "        WHEN TIMESTAMPDIFF(YEAR, mem_date_of_birth, CURDATE()) BETWEEN 41 AND 60 THEN '41-60'\r\n"
			+ "        ELSE '61+'\r\n"
			+ "    END AS  member_age,\r\n"
			+ "    CONCAT(FORMAT(COUNT(*) * 100.0 / (\r\n"
			+ "        SELECT COUNT(*)\r\n"
			+ "        FROM sjc_sec_member_db\r\n"
			+ "    ), 0)) AS percentage\r\n"
			+ "FROM\r\n"
			+ "   sjc.sjc_sec_member_db\r\n"
			+ "GROUP BY\r\n"
			+ "    member_age;\r\n"
			+ "";

	public static final String BaptisedCount_QRY = "SELECT COUNT(*)  FROM sjc_sec_member_db WHERE mem_baptised = 'Yes';";
	


	public static final String BaptisedMonthWiseCount_QRY = "SELECT YEAR(mem_date_of_baptism)as baptised_year, DATE_FORMAT(mem_date_of_baptism, '%b') AS baptism_month, COUNT(*) AS baptised_count FROM  sjc.sjc_sec_member_db WHERE mem_baptised = 'Yes' GROUP BY baptised_year,baptism_month ORDER BY FIELD(baptism_month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');\r\n"
			+ "";

	public static final String BaptisedConfirmationMonthWiseCount_QRY = "SELECT COUNT(*) AS confirmation_baptised_counts,DATE_FORMAT(mem_date_of_confirmation, '%b') AS confirmation_baptised_month, YEAR(mem_date_of_confirmation) AS confirmation_baptised_year FROM sjc.sjc_sec_member_db GROUP BY   YEAR(mem_date_of_confirmation),MONTH(mem_date_of_confirmation),  DATE_FORMAT(mem_date_of_confirmation, '%b') ORDER BY  confirmation_baptised_year DESC, MONTH(mem_date_of_confirmation) DESC;\r\n"
			+ "";

	public static final String bapisedConfirmationCount_QRY = "SELECT COUNT(*)  FROM sjc_sec_member_db WHERE mem_date_of_confirmation;";

	public static final String dataOfLastPreDataCreatedBy = "SELECT \r\n"
			+ "    last.created_by as la_created_by,\r\n"
			+ "    last.created_dt as la_created_dt,\r\n"
			+ "    last.mem_first_name as la_mem_first_name,\r\n"
			+ "    last.mem_last_name as la_mem_last_name,\r\n"
			+ "    prev.created_by as pre_created_by,\r\n"
			+ "    prev.created_dt as pre_created_dt,\r\n"
			+ "    prev.mem_first_name as pre_mem_first_name,\r\n"
			+ "	prev.mem_last_name as pre_mem_last_name\r\n"
			+ "    \r\n"
			+ "FROM \r\n"
			+ "    (SELECT \r\n"
			+ "        created_by, created_dt, mem_first_name, mem_last_name\r\n"
			+ "     FROM sjc_sec_member_db\r\n"
			+ "     ORDER BY created_dt DESC\r\n"
			+ "     LIMIT 1) as last\r\n"
			+ "LEFT JOIN\r\n"
			+ "    (SELECT \r\n"
			+ "        created_by, created_dt, mem_first_name, mem_last_name\r\n"
			+ "     FROM sjc_sec_member_db\r\n"
			+ "     ORDER BY created_dt DESC\r\n"
			+ "     LIMIT 1, 1) as prev\r\n"
			+ "ON 1=1;\r\n"
			+ "\r\n"
			+ "";

	public static final String MemberLastID_Qry = "SELECT member_id AS LastID FROM sjc_sec_member_db ORDER BY member_id DESC LIMIT 1";

		
	public static String dataCountMember_QRY="SELECT membership_type, COUNT(*) as count FROM sjc_sec_member_db GROUP BY membership_type;";

	public static String dataCountMemberMonthwise_QRY="SELECT COUNT(membership_type) AS members_count, membership_type, DATE_FORMAT(membership_start_date, '%b') AS members_month, YEAR(membership_start_date) AS members_year FROM sjc.sjc_sec_member_db GROUP BY membership_type, members_year,members_month ORDER BY YEAR(membership_start_date), FIELD(members_month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');\r\n"
			+ "";

	
	

}


 
  
 