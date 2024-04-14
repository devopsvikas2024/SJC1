package com.sjc.assetclassification.dao;

public class AssetclassificationSql {

	/**The Retrieve Retrieve_QRY. */
	public static final String Retrieve_QRY =" SELECT * FROM sjc.sjc_sec_asset_classification_db";
	
	/** The Constant INSERT_QRY. */
	public static final String INSERT_QRY ="INSERT INTO sjc.sjc_sec_asset_classification_db(id,asset_classification_code,asset_classification_name,asset_classification_acronym,rec_status)"
			+ " VALUES(:id,:assetClassificationCode,:assetClassificationName,:assetClassificationAcronym,'A')";
	
	/**The Retrieve Delete_QRY. */
	public static final String DEL_QRY = "DELETE FROM sjc.sjc_sec_asset_classification_db WHERE id = :id";
	
	

	/** The Constant UPT_QRY. */
	public static final String UPT_QRY = "UPDATE sjc_sec_asset_classification_db SET "
			+ "asset_classification_name=:assetClassificationName,asset_classification_acronym=:assetClassificationAcronym WHERE id = :id";
			
			
	
	/**The Retrieve Fetch_QRY. */
	public static final String Fetch_QRY = "SELECT * FROM sjc.sjc_sec_asset_classification_db  WHERE id = :id";
	
	/**The Retrieve Count_QRY. */
	public static final String Count_QRY = "SELECT COUNT(*) FROM sjc.sjc_sec_asset_classification_db";

	public static final String AssetclassificationLastID_Qry = "SELECT asset_classification_code AS existingId "
			                             + " FROM sjc.sjc_sec_asset_classification_db  "
			                             + " WHERE id = (SELECT MAX(id) FROM sjc.sjc_sec_asset_classification_db)";
	

}
