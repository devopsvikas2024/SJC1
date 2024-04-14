package com.sjc.entity;

public class Asset {
	
	/* id */
	private int id;
	
	/* Asset id */
	private String asset_id;
	
	/* name_of_asset */
	private String name_of_asset;
	
	/* Ownership */
	private String Ownership;
	
	/* Classification */
	private String Classification;
	
	/* location */
	private String location;
	
	/* purchase_value */
	private int purchase_value;
	
	/* date_of_purchase */
	private String date_of_purchase;
	
	/* depreciation_type */
	private String depreciation_type;
	
	/* asset_status */
	private String asset_status;
	
	public void setAsset_status(String asset_status) {
		this.asset_status = asset_status;
	}

	/* status_effective_date */
	private String status_effective_date;
	
	/* rec_status */
	private String rec_status;
	
	/* created_by */
	private String created_by;
	
	/* last_updated_by */
	private String last_updated_by;
	
	/* created_dt */
	private String created_dt;
	
	/* last_updated_dt */
	private String last_updated_dt;
	
	/* LastID*/
	private String LastID;
	
	
	
	
	public String getLastID() {
		return LastID;
	}

	public void setLastID(String lastID) {
		LastID = lastID;
	}

	/* Get the Asset-id
	 * 
	 * @return the Asset-id
	 * 
	 * */
	public int getId() {
		return id;
	}
	
	/* Get the Asset-Asset_id
	 * 
	 * @return the Asset-Asset_id
	 * 
	 * */
	public String getAsset_id() {
		return asset_id;
	}
	
	/* Get the Asset-Name_of_asset
	 * 
	 * @return the Asset-Name_of_asset
	 * 
	 * */	
	public String getName_of_asset() {
		return name_of_asset;
	}
	
	/* Get the Asset-Ownership
	 * 
	 * @return the Asset-Ownership
	 * 
	 * */	
	public String getOwnership() {
		return Ownership;
	}
	
	/* Get the Asset-Classification
	 * 
	 * @return the Asset-Classification
	 * 
	 * */
	public String getClassification() {
		return Classification;
	}
	
	/* Get the Asset-Location
	 * 
	 * @return the Asset-Location
	 * 
	 * */
	public String getLocation() {
		return location;
	}
	
	/* Get the Asset-Purchase_value
	 * 
	 * @return the Asset-Purchase_value
	 * 
	 * */
	public int getPurchase_value() {
		return purchase_value;
	}
	
	/* Get the Asset-Date_of_purchase
	 * 
	 * @return the Asset-Date_of_purchase
	 * 
	 * */
	public String getDate_of_purchase() {
		return date_of_purchase;
	}
	
	/* Get the Asset-Depreciation_type
	 * 
	 * @return the Asset-Depreciation_type
	 * 
	 * */
	public String getDepreciation_type() {
		return depreciation_type;
	}
	
	/* Get the Asset-Asset_status
	 * 
	 * @return the Asset-Asset_status
	 * 
	 * */
	public String getAsset_status() {
		return asset_status;
	}
	
	/* Get the Asset-Status_effective_date
	 * 
	 * @return the Asset-Status_effective_date
	 * 
	 * */
	public String getStatus_effective_date() {
		return status_effective_date;
	}
	
	/* Get the Asset-Rec_status
	 * 
	 * @return the Asset-Rec_status
	 * 
	 * */
	public String getRec_status() {
		return rec_status;
	}
	
	/* Get the Asset-Created_by
	 * 
	 * @return the Asset-Created_by
	 * 
	 * */
	public String getCreated_by() {
		return created_by;
	}
	
	/* Get the Asset-Last_updated_by
	 * 
	 * @return the Asset-Last_updated_by
	 * 
	 * */
	public String getLast_updated_by() {
		return last_updated_by;
	}
	
	/* Get the Asset-Created_dt
	 * 
	 * @return the Asset-Created_dt
	 * 
	 * */
	public String getCreated_dt() {
		return created_dt;
	}
	
	/* Get the Asset-Last_updated_dt
	 * 
	 * @return the Asset-Last_updated_dt
	 * 
	 * */
	public String getLast_updated_dt() {
		return last_updated_dt;
	}
	
	/* Set the Asset-Id
	 * 
	 * @param the Asset-Id
	 * 
	 * */
	public void setId(int id) {
		this.id = id;
	}
	
	/* Set the Asset-Asset-Id
	 * 
	 * @param the Asset-Asset-Id
	 * 
	 * */
	public void setAsset_id(String asset_id) {
	    this.asset_id = asset_id;
	}
	
	/* Set the Asset-Name_of_asset
	 * 
	 * @param the Asset-Name_of_asset
	 * 
	 * */
	public void setName_of_asset(String name_of_asset) {
		this.name_of_asset = name_of_asset;
	}
	
	/* Set the Asset-Ownership
	 * 
	 * @param the Asset-Ownership
	 * 
	 * */
	public void setOwnership(String ownership) {
		Ownership = ownership;
	}
	
	/* Set the Asset-Classification
	 * 
	 * @return the Asset-Classification
	 * 
	 * */
	public void setClassification(String classification) {
		Classification = classification;
	}
	
	/* Set the Asset-Location
	 * 
	 * @param the Asset-Location
	 * 
	 * */
	public void setLocation(String location) {
		this.location = location;
	}
	
	/* Set the Asset-Purchase_value
	 * 
	 * @param the Asset-Purchase_value
	 * 
	 * */
	public void setPurchase_value(int purchase_value) {
		this.purchase_value = purchase_value;
	}
	
	/* Set the Asset-Date_of_purchase
	 * 
	 * @param the Asset-Date_of_purchase
	 * 
	 * */
	public void setDate_of_purchase(String date_of_purchase) {
		this.date_of_purchase = date_of_purchase;
	}
	
	/* Set the Asset-Depreciation_type
	 * 
	 * @param the Asset-Depreciation_type
	 * 
	 * */
	public void setDepreciation_type(String depreciation_type) {
		this.depreciation_type = depreciation_type;
	}
	
	/* Set the Asset-Status_effective_date
	 * 
	 * @param the Asset-Status_effective_date
	 * 
	 * */
	public void setStatus_effective_date(String status_effective_date) {
		this.status_effective_date = status_effective_date;
	}
	
	/* Set the Asset-Rec_status
	 * 
	 * @param the Asset-Rec_status
	 * 
	 * */
	public void setRec_status(String rec_status) {
		this.rec_status = rec_status;
	}
	
	/* Set the Asset-Created_by
	 * 
	 * @param the Asset-Created_by
	 * 
	 * */
	public void setCreated_by(String created_by) {
		this.created_by = created_by;
	}
	
	/* Set the Asset-Last_updated_by
	 * 
	 * @param the Asset-Last_updated_by
	 * 
	 * */
	public void setLast_updated_by(String last_updated_by) {
		this.last_updated_by = last_updated_by;
	}
	
	/* Set the Asset-Created_dt
	 * 
	 * @param the Asset-Created_dt
	 * 
	 * */
	public void setCreated_dt(String created_dt) {
		this.created_dt = created_dt;
	}
	
	/* Set the Asset-Last_updated_dt
	 * 
	 * @param the Asset-Last_updated_dt
	 * 
	 * */
	public void setLast_updated_dt(String last_updated_dt) {
		this.last_updated_dt = last_updated_dt;
	}
	
	
}
