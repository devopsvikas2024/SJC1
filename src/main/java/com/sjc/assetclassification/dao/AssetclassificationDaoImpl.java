package com.sjc.assetclassification.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.sjc.common.DBUtil;
import com.sjc.entity.AssetClassification;


@Repository
public class AssetclassificationDaoImpl implements AssetclassificationDao {
	
	DBUtil  dbUtil;
	

	
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetclassificationDaoImpl.class);
	
	@Autowired
	public AssetclassificationDaoImpl  (DBUtil dbUtil) {
	this.dbUtil= dbUtil;

	}
	
	
	/**
	 *  get the all  AssetClassification.
	 *   */ 
	@Override
	public List<AssetClassification> getAssetClassification() {
		LOGGER.info	("Entering getAssetClassification in getAssetClassification class");
		List<AssetClassification> asclaLs = dbUtil.fetchDatas(AssetclassificationSql.Retrieve_QRY ,AssetClassification.class,null);
		LOGGER.info	("Existing getAssetClassification in getAssetClassification class");
		return asclaLs;
	}
    
	/**
	 * add the AssetClassification.
	 *
	 */
	@Override
	public void addAssetClassification(AssetClassification ascla) {
		LOGGER.info	("Entering addAssetClassification in AssetClassificationDaoImpl class");
		dbUtil.CUDOperation(ascla,AssetclassificationSql.INSERT_QRY);
		LOGGER.info("Existing  addAssetClassification in AssetClassificationDaoImpl class");
	}

	/**
	 * Delete the AssetClassification.
	 *
	 */
	@Override
	public void deleteAssetClassification(AssetClassification ascla) {
		LOGGER.info	("Entering deleteAssetClassification in AssetClassificationDaoImpl class");
		dbUtil.CUDOperation(ascla,AssetclassificationSql.DEL_QRY);
		LOGGER.info("Existing  deleteAssetClassification in AssetClassificationDaoImpl class");
	}
	
	
	/**
	 * Update the AssetClassification.
	 *
	 */
	@Override
	public void updataAssetClassification(AssetClassification ascla) {
		LOGGER.info	("Entering updataAssetClassification in AssetClassificationDaoImpl class");
		dbUtil.CUDOperation(ascla,AssetclassificationSql.UPT_QRY);
		LOGGER.info("Existing  updataAssetClassification in AssetClassificationDaoImpl class");
	}
    
	/**
	 *  get the AssetClassification by id.
	 *
	 */
	@Override
	public AssetClassification getAssetClassificationById(int id) {
		LOGGER.info("Entering getAssetClassificationById AssetClassificationDaoImpl class"); 
		Map<String, Object> paramMap =new HashMap<>();
		 paramMap.put("id", id);
		 List<AssetClassification> asclaLs = dbUtil.fetchDatas(AssetclassificationSql.Fetch_QRY,AssetClassification.class, paramMap);
		 LOGGER.info("Existing getAssetClassificationById in AssetClassificationDaoImpl class");
		 return asclaLs.isEmpty()? null:asclaLs.get(0);
	}

	@Override
	public Long getAssetClassificationCount() {
		LOGGER.info("Entering getFamilyCount AssetclassificationDaoImpl class");
		return dbUtil.fetchCount(AssetclassificationSql.Count_QRY);
	}



	@Override
	public AssetClassification getLastClassificationId() {
		List<AssetClassification> asclaLs  =dbUtil.fetchDatas(AssetclassificationSql.AssetclassificationLastID_Qry,AssetClassification.class,null);
		return asclaLs.isEmpty()? null:asclaLs.get(0);
	}


	

}
