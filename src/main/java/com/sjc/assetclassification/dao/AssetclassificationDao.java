package com.sjc.assetclassification.dao;

import java.util.List;

import com.sjc.entity.AssetClassification;

public interface AssetclassificationDao {

	List<AssetClassification> getAssetClassification();

	void addAssetClassification(AssetClassification ascla);

	void deleteAssetClassification(AssetClassification ascla);

	void updataAssetClassification(AssetClassification ascla);

	AssetClassification getAssetClassificationById(int id);

	Long getAssetClassificationCount();

	AssetClassification getLastClassificationId();

}
