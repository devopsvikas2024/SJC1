package com.sjc.asset.dao;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sjc.common.DBUtil;
import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassficationCounts;
import com.sjc.entity.AssetClassificationCountValueMonth;
import com.sjc.entity.AssetPurchaseValue;



@Repository
public class AssetDaoImpl implements AssetDao{
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetDaoImpl.class);
	
	DBUtil dbUtil;
	
    @Autowired
	public AssetDaoImpl( DBUtil dbUtil) {
		super();
		this.dbUtil = dbUtil;
	
	}
    
	/**
	 *  get the all  Asset.
	 *   */ 

	@Override
	public List<Asset> getAsset() {
		LOGGER.info("Entering getAsset AssetDaoImpl Class");
		List<Asset> assetLs = dbUtil.fetchDatas(AssetSql.Retrieve_QRY, Asset.class, null);
		LOGGER.info("Exisiting getAsset AssetDaoImpl Class");
		return assetLs; 
	}

	/**
	 * Adds the asset.
	 *
	 * @param asset the asset
	 */ 
	@Override
	public void addAsset(Asset asset) {
		LOGGER.info("Entering addAsset AssetDaoImpl Class");
		dbUtil.CUDOperation(asset, AssetSql.INSERT_QRY);
		LOGGER.info("Exisiting addAsset AssetDaoImpl Class");
		}

     
	/**
	 * Update asset.
	 *
	 * @param asset the asset
	 */
	@Override
	public void updateAsset(Asset asset) {
		LOGGER.info("Entering updateAsset AssetDaoImpl class");
		dbUtil.CUDOperation(asset, AssetSql.UPT_QRY);
		LOGGER.info("Existing updateAsset AssetDaoImpl class");
	}

	/**
	 * Delete asset.
	 *
	 * @param asset the asset
	 */
	@Override
	public void deleteAsset(Asset asset) {
		LOGGER.info("Entering deleteAsset AssetDaoImpl class");
		dbUtil.CUDOperation(asset, AssetSql.DEL_QRY);
		LOGGER.info("Entering deleteAsset AssetDaoImpl class");
	}
    
	/**
	 *  get the Single Asset data by id.
	 *   */ 

	@Override
	public Asset getAssetById(int id) {
		LOGGER.info("Entering getAssetById AssetDaoImpl class");
		Map<String, Object> paramMap =new HashMap<>();
        paramMap.put("id", id);
        List<Asset>asset= dbUtil.fetchDatas(AssetSql.Fetch_QRY, Asset.class, paramMap);
        LOGGER.info("Existing getAssetById AssetDaoImpl class");
        return asset.isEmpty() ? null : asset.get(0);
	}


	@Override
	public Long getAssetCount() {
		  LOGGER.info("Entering getAssetCount AssetDaoImpl class");
		    return dbUtil.fetchCount(AssetSql.Count_QRY);
	}

	@Override
	public List<AssetClassficationCounts> getAssetClassificationCount() {
		
	    LOGGER.info("Entering getAssetClassificationCount AssetDaoImpl class");
	    
	    List<AssetClassficationCounts> assetClassCountLs = dbUtil.fetchDatas(AssetSql.assetClassificationCountRetrieve_QRY,AssetClassficationCounts.class, null);
	 
	    return assetClassCountLs;
	}

	@Override
	public List<AssetPurchaseValue> getAssetPurchaseValues() {
		 LOGGER.info("Entering get Asset value AssetDaoImpl class");
		 
		  List<AssetPurchaseValue> assetValuesLs = dbUtil.fetchDatas(AssetSql.assetValueRetrieve_QRY,AssetPurchaseValue.class, null);
		 
		return assetValuesLs;
	}


	@Override
	public List<AssetClassificationCountValueMonth> getAssetClassificationCountValueMonth() {
		LOGGER.info("Entering  getAssetClassificationCountValueMonth in AssetService");
		List<AssetClassificationCountValueMonth> assetClassValueAndCount=dbUtil.fetchDatas(AssetSql.AssetChartCountandValue_Qry, AssetClassificationCountValueMonth.class, null);
		LOGGER.info("Existing getAssetClassificationCountValueMonth in AssetService");
		return assetClassValueAndCount;
	}

	@Override
	public List<AssetClassificationCountValueMonth> getAssetCreatedByActivityTimeline() {
		LOGGER.info("Entering  get Asset CreatedBy Activity Timeline in AssetService");
		List<AssetClassificationCountValueMonth> AssetActivityTimeline=dbUtil.fetchDatas(AssetSql.AssetActivityTimeline_Qry,AssetClassificationCountValueMonth.class, null);
		return AssetActivityTimeline;
	}

	@Override
	public Asset getLastAssetId(String classification) {
		Map<String, Object> paramMap =new HashMap<>();
        paramMap.put("classification",classification );
		List<Asset> assetlastid=dbUtil.fetchDatas(AssetSql.AssetLastID_Qry,Asset.class,paramMap);
		return assetlastid.isEmpty() ? null:assetlastid.get(0);
	}


	
}
