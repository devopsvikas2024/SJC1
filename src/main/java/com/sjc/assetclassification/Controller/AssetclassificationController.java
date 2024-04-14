package com.sjc.assetclassification.Controller;

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

import com.sjc.assetclassification.Service.AssetclassificationService;

import com.sjc.entity.AssetClassification;
/**
 * The Class FamilyController.
 */
@RestController
@RequestMapping("com/sjc/assetclassification")
public class AssetclassificationController {
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetclassificationController.class);
	
	/** The AssetclassificationController service. */
	AssetclassificationService assetclassification;
	

	/**
	 * Instantiates a new AssetclassificationController controller.
	
	 */ 
	@Autowired
	public AssetclassificationController(	AssetclassificationService assetclassification) {
		this.assetclassification=assetclassification;
	}
	@GetMapping("/getassetclassification")
	public List<AssetClassification>getAssetClassification(){
		return assetclassification.getAssetClassification();
		
	}
	/**
	 * Adds the AssetclassificationController 
	 */
	@PostMapping("/add")
	public AssetClassification addAssetClassification(@RequestBody AssetClassification ascla) {
		LOGGER.info	("Entering addFamily in AssetClassificationController");
		assetclassification.addAssetClassification(ascla);
		LOGGER.info("Existing addFamily in AssetClassificationController");
		return ascla;
	}
	/**
	 * deletes the AssetclassificationController 
	 */
	@PostMapping("/delete")
	public AssetClassification deleteAssetClassification(@RequestBody AssetClassification ascla) {
	LOGGER.info	("Entering deleteFamily in AssetClassificationController");
	assetclassification.deleteAssetClassification(ascla);
	LOGGER.info("Existing deleteFamily in AssetClassificationController");
	return ascla;
   }
	/**
	 * updates the AssetclassificationController 
	 */
	@PostMapping("/update")
	public AssetClassification updataAssetClassification(@RequestBody AssetClassification ascla) {
		LOGGER.info	("Entering deleteFamily in AssetClassificationController");
		assetclassification.updataAssetClassification(ascla);
		return ascla;
	}
	@GetMapping("/{id}")
	public AssetClassification getAssetClassificationById(@PathVariable int id){
		return assetclassification. getAssetClassificationById(id);
	}
	/**
	 * counts the AssetclassificationController 
	 */
	@GetMapping("counts")
	public Long getAssetClassificationCount() {
		return assetclassification.getAssetClassificationCount();
	}
}