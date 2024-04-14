package com.sjc.location.dao;

public class LocationSql {
   
	
	/**The Retrieve Retrieve_QRY.(Location) */
	public static final String Retrieve_QRY = "SELECT * FROM sjc_sec_location_db";
	
	
	/** The Constant INSERT_QRY.(Location) */
	public static final String INSERT_QRY = "INSERT INTO sjc_sec_location_db(id,location_code,location_name,location_acronym,created_dt)"+"VALUES(:id,:locationCode,:locationName,:locationAcronym ,now())";
    
	
	/** The Constant UPT_QRY.(Location) */
	public static final String UPT_QRY = "UPDATE sjc_sec_location_db SET  location_name = :locationName,location_acronym = :locationAcronym,last_updated_dt='now()'  WHERE id = :id";
   
	/** The Constant DEL_QRY. (Location) */
	public static final String DEL_QRY = "DELETE FROM SJC_SEC_location_DB WHERE id = :id";

	
	/** The Constant Single_Data_Retrieve. (Location) */
	public static final String Fetch_QRY = "SELECT * FROM sjc_sec_location_db WHERE id= :id";

	/** The Constant counts.(Location) */
	public static final String Count_QRY ="SELECT COUNT(*) FROM sjc_sec_location_db";


	public static String locationLastID_Qry="SELECT location_code AS LastID FROM sjc_sec_location_db ORDER BY location_code DESC LIMIT 1";


	

	
}
 