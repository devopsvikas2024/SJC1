package com.sjc.asset.service;

import java.util.List;

import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassficationCounts;
import com.sjc.entity.AssetClassificationCountValueMonth;
import com.sjc.entity.AssetPurchaseValue;


public interface AssetService {

	List<Asset> getAsset();
    
	

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 */
	void addAsset(Asset asset);
     
	
	/**
	 * Update asset.
	 *
	 * @param asset the asset
	 */
    void updateAsset(Asset asset);

    /**
	 * Delete asset.
	 *
	 * @param asset the asset
	 */
    void deleteUser(Asset asset);


	Asset getAssetById(int id);



	Long getAssetCount();



	List<AssetClassficationCounts> getAssetClassificationCount();



	List<AssetPurchaseValue> getAssetPurchaseValues();



	/* get value by classification */

;



	List<AssetClassificationCountValueMonth> getAssetClassificationCountValueMonth();



	List<AssetClassificationCountValueMonth> getAssetCreatedByActivityTimeline();



	


}
