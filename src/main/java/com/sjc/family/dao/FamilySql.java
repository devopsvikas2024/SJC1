package com.sjc.family.dao;

public class FamilySql {
	
	/**The Retrieve Retrieve_QRY. */
	public static final String Retrieve_QRY = "SELECT * FROM sjc.sjc_sec_family_db";
	
	/** The Constant INSERT_QRY. */
	
	public static final String INSERT_QRY = "INSERT INTO sjc.sjc_sec_family_db(id,family_code,family_name,family_description,family_address_line_one,family_address_line_two,family_city,family_state,family_zip_code,family_country) "
			+ "VALUES(:id,:familyCode,:familyName,:familyDescription,:familyAddressLineOne,:familyAddressLineTwo,:familyCity,:familyState,:familyZipCode,:familyCountry)";
	
	/** The Constant DEL_QRY. */
	
	public static final String DEL_QRY = "DELETE FROM SJC.SJC_SEC_FAMILY_DB  WHERE id = :id ";
	
	/** The Constant UPT_QRY. */
	
	public static final String UPT_QRY ="UPDATE sjc.sjc_sec_family_db SET  family_name = :familyName, family_description = :familyDescription, family_address_line_one = :familyAddressLineOne, family_address_line_two = :familyAddressLineTwo, family_city = :familyCity, family_state = :familyState, family_zip_code = :familyZipCode, family_country = :familyCountry WHERE id = :id";
	
	/** The Constant FETCH_QRT. */
	
	public static final String Fetch_QRY = "SELECT * FROM SJC.SJC_SEC_FAMILY_DB  WHERE id = :id ";
	
	/** The Constant COUNTS_QRY*/
	public static final String Count_QRY = "SELECT COUNT(*) FROM sjc_sec_family_db";

	public static final String FamilyLastID_Qry =  "SELECT family_code AS LastID FROM sjc_sec_family_db ORDER BY family_code DESC LIMIT 1";

}
