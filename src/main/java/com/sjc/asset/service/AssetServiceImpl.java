package com.sjc.asset.service;

import java.util.ArrayList;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.sjc.asset.dao.AssetDao;
import com.sjc.common.CommonValidator;
import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassficationCounts;
import com.sjc.entity.AssetClassificationCountValueMonth;
import com.sjc.entity.AssetPurchaseValue;



@Service
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class AssetServiceImpl implements AssetService{
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetServiceImpl.class);
    
	/** The asset dao. */
	AssetDao assetDao;
	
	private final CommonValidator commonValidator;
    
	@Autowired
	public AssetServiceImpl(AssetDao assetDao) {
		this.assetDao = assetDao;
		this.commonValidator = new CommonValidator();
	}
	 /** The errors. */
    private final List<String> errors = new ArrayList<>();

       
  
	/**
	 * Gets the asset.
	 *
	 * @return the asset
	 */
	@Override
	public List<Asset> getAsset() {
		return assetDao.getAsset();
	}

	  /**
		 * Adds the asset.
		 *
		 * @param asset the asset
		 */
	@Override
	public void addAsset(Asset asset) {
		LOGGER.info("Entering  Add Asset");
		commonValidator.validateString(asset.getName_of_asset(), "Assset Name");
		commonValidator.validateString(asset.getOwnership(), "Ownership");
//		commonValidator.validateassetId(asset.getAsset_id());
//		commonValidator.validatenameofAsset(asset.getName_of_asset());
//		commonValidator.validateownership(asset.getOwnership());
//		commonValidator.validateclassification(asset.getClassification());
//		commonValidator.validatelocation(asset.getLocation());
//		commonValidator.validatepurchasevalue(asset.getPurchase_value());
//		commonValidator.validatedateofpurchase(asset.getDate_of_purchase());
//		commonValidator.validatedepreciationtype(asset.getDepreciation_type());
//		commonValidator.validateassetStatus(asset.getAsset_status());
//		commonValidator.validatestatuseffectivedate(asset.getStatus_effective_date());
		commonValidator.throwIfErrors();
		String newAssetCode=generateAssetId(asset.getClassification());
		asset.setAsset_id(newAssetCode);
		assetDao.addAsset(asset);
		LOGGER.info("Existing  Add Asset");
	}
	
	
	 public  String generateAssetId(String classification ) {
		 Asset lastId = assetDao.getLastAssetId(classification);

			if (lastId != null) {
				 String lastAssetId =lastId.getLastID();
					LOGGER.info(lastAssetId);
					String[] parts = lastAssetId.split("-");
					int numericPart = Integer.parseInt(parts[1]);
					numericPart++; 
					String newAssetId = String.format("%s-%05d", parts[0], numericPart);
					LOGGER.info(newAssetId);
					return newAssetId;
					
			}else {
				return classification + "-00001";
			}   
	    }
	
	
	/**
	 * Update asset.
	 *
	 * @param asset the asset
	 */

	@Override
	public void updateAsset(Asset asset) {
	//	commonValidator.validateassetId(asset.getAsset_id());
		commonValidator.validatenameofAsset(asset.getName_of_asset());
		commonValidator.validateownership(asset.getOwnership());
		commonValidator.validateclassification(asset.getClassification());
		commonValidator.validatelocation(asset.getLocation());
		commonValidator.validatepurchasevalue(asset.getPurchase_value());
		commonValidator.validatedateofpurchase(asset.getDate_of_purchase());
		commonValidator.validatedepreciationtype(asset.getDepreciation_type());
		commonValidator.validateassetStatus(asset.getAsset_status());
		commonValidator.validatestatuseffectivedate(asset.getStatus_effective_date());
		commonValidator.throwIfErrors();
     	LOGGER.info("Entering updateuser AssetService Class");
		assetDao.updateAsset(asset);
		LOGGER.info("Existing updateuser AssetService Class");
	}
    
	/**
	 * Delete asset.
	 *
	 * @param asset the asset
	 */
	@Override
	public void deleteUser(Asset asset) {
		assetDao.deleteAsset(asset);
	}

	@Override
	public Asset getAssetById(int id) {
		return assetDao.getAssetById(id);
		
	}

	@Override
	public Long getAssetCount() {
		
		return assetDao.getAssetCount();

	}

	

	@Override
	public List<AssetClassficationCounts> getAssetClassificationCount() {
		
		return assetDao.getAssetClassificationCount();
	}

	@Override
	public List<AssetPurchaseValue> getAssetPurchaseValues() {
		
		return assetDao.getAssetPurchaseValues();
	}

	@Override
	public List<AssetClassificationCountValueMonth> getAssetClassificationCountValueMonth() {
		LOGGER.info("Entering getAssetClassificationCountValueMonth in AssetService");
		List<AssetClassificationCountValueMonth> assetClassCountValueByMonth=assetDao.getAssetClassificationCountValueMonth();
		
		return assetClassCountValueByMonth;
	}

	@Override
	public List<AssetClassificationCountValueMonth> getAssetCreatedByActivityTimeline() {
		LOGGER.info("Entering get Asset CreatedBy Activity Timeline in AssetService");
		List<AssetClassificationCountValueMonth> AssetActivityTimeline =assetDao.getAssetCreatedByActivityTimeline();
		return AssetActivityTimeline;
	}

	

}
