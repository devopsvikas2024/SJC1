package com.sjc.assetclassification.Service;

import java.util.List;

import com.sjc.entity.AssetClassification;
/**
 * The Interface AssetclassificationService.
 */
public interface AssetclassificationService {

	List<AssetClassification> getAssetClassification();

	/**
	 * Adds the AssetclassificationService.
	  */
	void addAssetClassification(AssetClassification ascla);
	
	/**
	 * deletes the AssetclassificationService.
	  */
	
	void deleteAssetClassification(AssetClassification ascla);
	
	/**
	 * updates the AssetclassificationService.
	  */
	void updataAssetClassification(AssetClassification ascla);

	AssetClassification getAssetClassificationById(int id);

	Long getAssetClassificationCount();

}
