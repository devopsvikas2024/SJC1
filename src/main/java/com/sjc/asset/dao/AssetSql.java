package com.sjc.asset.dao;

public class AssetSql {
	
	/**The Retrieve Retrieve_QRY. */
	public static final String Retrieve_QRY = "SELECT * FROM sjc_sec_asset_db";

	public static final String INSERT_QRY = "INSERT INTO sjc_sec_asset_db(id,asset_id,name_of_asset,ownership,classification,location,purchase_value,date_of_purchase,depreciation_type,asset_status,status_effective_date)"
			+ " VALUES(:id,:asset_id,:name_of_asset,:Ownership,:Classification,:location,:purchase_value,:date_of_purchase,:depreciation_type,:asset_status,:status_effective_date)";

	public static final String UPT_QRY = "UPDATE sjc_sec_asset_db SET  name_of_asset = :name_of_asset,"
			+ " ownership = :Ownership, classification = :Classification, location = :location,"
			+ " purchase_value = :purchase_value, date_of_purchase = :date_of_purchase, depreciation_type = :depreciation_type,"
			+ " asset_status = :asset_status, status_effective_date = :status_effective_date WHERE id = :id;";

	public static final String DEL_QRY = "DELETE FROM sjc_sec_asset_db WHERE id = :id";

	public static final String Fetch_QRY = "SELECT * FROM sjc_sec_asset_db WHERE id = :id";

	public static final String Count_QRY = "SELECT COUNT(*) FROM sjc_sec_asset_db";

	public static final String AssetActivityTimeline_Qry = "select created_by as asset_created_by,created_dt as asset_created_dt,name_of_asset as asset_name from sjc_sec_asset_db order by asset_created_dt desc limit 1;";

	public static final String AssetLastID_Qry = "SELECT asset_id AS LastID FROM sjc.sjc_sec_asset_db WHERE classification= :classification ORDER BY asset_id DESC LIMIT 1";

	public static String assetClassificationCountRetrieve_QRY  = "SELECT classification, COUNT(*) as count FROM sjc_sec_asset_db GROUP BY classification";

	public static String assetValueRetrieve_QRY ="SELECT classification, SUM(purchase_value) as value FROM sjc_sec_asset_db GROUP BY classification";

	public static String assetPurchaseCountMonth_QRY ="SELECT MONTHNAME(date_of_purchase) AS month, COUNT(purchase_value) AS asset FROM sjc.sjc_sec_asset_db GROUP BY MONTH(date_of_purchase), classification, date_of_purchase;";

	public static String assetPurchaseValueMonth_QRY ="SELECT MONTHNAME(date_of_purchase) AS month, SUM(purchase_value) AS asset FROM sjc_sec_asset_db GROUP BY MONTH(date_of_purchase), date_of_purchase;"
			+ "";



	public static String AssetChartCountandValue_Qry = "SELECT  COUNT(classification)  AS classification_count, \r\n"
			+ "    SUM(purchase_value) AS purchase_value, \r\n"
			+ "    classification AS asset_classification, \r\n"
			+ "    DATE_FORMAT(date_of_purchase, '%b') AS asset_purchase_month,\r\n"
			+ "    CAST(YEAR(date_of_purchase) AS SIGNED) AS asset_purchase_year	\r\n"
			+ "    FROM sjc_sec_asset_db \r\n"
			+ "    GROUP BY 	classification,asset_purchase_year, asset_purchase_month \r\n"
			+ "    ORDER BY asset_purchase_year, FIELD(asset_purchase_month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');";
	
	
}
