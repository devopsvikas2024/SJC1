package com.sjc.asset.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjc.asset.service.AssetService;
import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassficationCounts;
import com.sjc.entity.AssetClassificationCountValueMonth;
import com.sjc.entity.AssetPurchaseValue;

@RestController
@RequestMapping("com/sjc/asset")
public class AssetController {
	
	/** The Constant LOGGER. */
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetController.class);
    
	AssetService assetService;
	
	@Autowired
	public AssetController(AssetService assetService) {
		this.assetService = assetService;
	}


	@GetMapping("/getAsset")
	public List<Asset> getAsset() {
		LOGGER.info("Get Asset From dataBase");
		 return assetService.getAsset();
	}
	
	/**
	 * Adds the Asset.
	 *
	 * @param asset the asset
	 * @return the asset
	 */
	@PostMapping("/add")
	public Asset addAsset(@RequestBody Asset asset) {
		LOGGER.info("Entering addAsset in AssetController");
		assetService.addAsset(asset);
		LOGGER.info("Existing addAsset in AssetController");
		return asset;
	}
	/**
	 * Update asset.
	 *
	 * @param asset the asset
	 * @return the asset
	 */
	@PostMapping("/update")
	public Asset updateAsset(@RequestBody Asset asset) {
		LOGGER.info("Entering addAsset in AssetController");
		assetService.updateAsset(asset);
		LOGGER.info("Existing addAsset in AssetController");
		return asset;
	}
   
	/**
	 * delete asset.
	 *
	 * @param asset the asset
	 * @return the asset
	 */
	
	@PostMapping("/delete")
	public Asset deleteAsset(@RequestBody Asset asset) {
		LOGGER.info("Entering deleteAsset in AssetController");
		assetService.deleteUser(asset);
		LOGGER.info("Existing deleteAsset in AssetController");
		return asset;
		}
	    
	/**
	 * get asset by id
	 *
	 * @param asset the asset
	 * @return the asset
	 */  
	@GetMapping("/{id}")
	   public Asset getAssetById(@PathVariable int id){
		LOGGER.info("Entering get asset by id in AssetController");
		return assetService.getAssetById(id);
       }  
	
	
	/**
	 * get asset counts
	 *
	 * @param asset the asset
	 * @return the asset
	 */ 
	 @GetMapping("/assetcounts")
	    public Long getAssetCount() {
		 LOGGER.info("Entering get asset counts in AssetController");
	        return assetService.getAssetCount();
	    }
	 
	 /**
		 * get Asset classification counts From dataBase
		 *
		 * @param asset the asset
		 * @return the asset
		 */ 
	 @GetMapping("/assetclassificationcounts")
	 public List<AssetClassficationCounts> getAssetClassificationCount() {
			LOGGER.info("Get Asset classification counts From dataBase");
			 return assetService.getAssetClassificationCount();
		}
	 
	 /**
		 * get Asset values From dataBase
		 *
		 * @param asset the asset
		 * @return the asset
		 */ 
	 @GetMapping("/assetpurchasevalues")
	 public List<AssetPurchaseValue> getAssetPurchaseValues() {
		 LOGGER.info("Get Asset values From dataBase");
		 
		 return assetService.getAssetPurchaseValues();
	 }
	 
	 /**
		 * get Asset purchase by month wise values From dataBase
		 *
		 * @param asset the asset
		 * @return the asset
		 */  
	 @GetMapping("/assetclassificationvalueandcountbymonth")
	 public List<AssetClassificationCountValueMonth> getAssetClassificationCountValueMonth() {
		 LOGGER.info("Get Asset purchase by month wise values From dataBase");
		 
		 return assetService.getAssetClassificationCountValueMonth();
	 }
	 
	 /**
		 * get Asset purchase by month wise values From dataBase
		 *
		 * @param asset the asset
		 * @return the asset
		 */
	 @GetMapping("/assetcreatedbyactivitytimeline")
	 public List<AssetClassificationCountValueMonth> getAssetCreatedByActivityTimeline() {
		 LOGGER.info("Get Asset purchase by month wise values From dataBase");
		 
		 return assetService.getAssetCreatedByActivityTimeline();
	 }
   
}
