package com.sjc.entity;

public class AssetClassificationCountValueMonth {
	
	public int classificationCount;
	public String asset_purchase_month;
	public int asset_purchase_year;
	public String asset_classification;
	public int purchase_value;
	
	
	public int getClassificationCount() {
		return classificationCount;
	}
	public void setClassificationCount(int classificationCount) {
		this.classificationCount = classificationCount;
	}
	public String getAsset_purchase_month() {
		return asset_purchase_month;
	}
	public void setAsset_purchase_month(String asset_purchase_month) {
		this.asset_purchase_month = asset_purchase_month;
	}
	public int getAsset_purchase_year() {
		return asset_purchase_year;
	}
	public void setAsset_purchase_year(int asset_purchase_year) {
		this.asset_purchase_year = asset_purchase_year;
	}
	public String getAsset_classification() {
		return asset_classification;
	}
	public void setAsset_classification(String asset_classification) {
		this.asset_classification = asset_classification;
	}
	public int getPurchase_value() {
		return purchase_value;
	}
	public void setPurchase_value(int purchase_value) {
		this.purchase_value = purchase_value;
	}
	
	/* Activity time line 
	 * 
	 * 
	 * retrieve Data's*/
	
	public String assetCreatedBy;
	public String assetCreatedDt;
	public String assetName;


	public String getAssetCreatedBy() {
		return assetCreatedBy;
	}
	public void setAssetCreatedBy(String assetCreatedBy) {
		this.assetCreatedBy = assetCreatedBy;
	}
	public String getAssetCreatedDt() {
		return assetCreatedDt;
	}
	public void setAssetCreatedDt(String assetCreatedDt) {
		this.assetCreatedDt = assetCreatedDt;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}
	
	
	
	
}
