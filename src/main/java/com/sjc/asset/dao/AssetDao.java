package com.sjc.asset.dao;

import java.util.List;


import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassficationCounts;
import com.sjc.entity.AssetClassificationCountValueMonth;
import com.sjc.entity.AssetPurchaseValue;


public interface AssetDao {

	List<Asset> getAsset();

	
	/**
	 * Adds the asset.
	 *
	 * @param asset the asset
	 */
	void addAsset(Asset asset);

   
	/**
	 * Update asset.
	 *
	 * @param asset the asset
	 */
	void updateAsset(Asset asset);

	void deleteAsset(Asset asset);

	Asset getAssetById(int id);

	Long getAssetCount();

	List<AssetClassficationCounts> getAssetClassificationCount();

    List<AssetPurchaseValue> getAssetPurchaseValues();

    List<AssetClassificationCountValueMonth> getAssetClassificationCountValueMonth();

    List<AssetClassificationCountValueMonth> getAssetCreatedByActivityTimeline();

    Asset getLastAssetId(String classification);
 
}
