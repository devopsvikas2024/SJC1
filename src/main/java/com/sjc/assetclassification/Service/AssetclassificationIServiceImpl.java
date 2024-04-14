package com.sjc.assetclassification.Service;

import java.util.ArrayList;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import com.sjc.assetclassification.dao.AssetclassificationDao;
import com.sjc.common.CommonValidator;
import com.sjc.entity.AssetClassification;
/**
 * The Class AssetclassificationIServiceImpl.
 */
@Service
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)

public class AssetclassificationIServiceImpl  implements AssetclassificationService {
	
	/** The AssetclassificationIServiceImpl dao. */
	AssetclassificationDao assetclassificationdao;
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(AssetclassificationIServiceImpl.class);
	
	private final CommonValidator commonValidator;
	
	/**
	 * Instantiates a new AssetclassificationIServiceImpl service impl.
	 
	 */
	@Autowired
	public AssetclassificationIServiceImpl(AssetclassificationDao assetclassificationdao) {
		this. assetclassificationdao=assetclassificationdao;
		this.commonValidator = new CommonValidator();
	}
	 private final List<String> errors = new ArrayList<>();

	@Override
	public List <AssetClassification> getAssetClassification() {
	
		return assetclassificationdao.getAssetClassification() ;
	}

	/**
	 * adds the AssetclassificationIServiceImpl.
	
	 */
	@Override
	public void addAssetClassification(AssetClassification ascla) {
//		commonValidator.validateassetclassificationcode(ascla.getAssetClassificationCode());
		commonValidator.validateassetclassificationname(ascla.getAssetClassificationName());
		commonValidator.validateassetclassificationacronym(ascla.getAssetClassificationAcronym());
		commonValidator.throwIfErrors();
		
		String newAssetClassificationCode = generateAssetClassificationId();
		ascla.setAssetClassificationCode(newAssetClassificationCode);
		assetclassificationdao.addAssetClassification(ascla);
	}
	/**
	 * generate Asset Classification Id in AssetclassificationIServiceImpl.
	
	 */
	 public  String generateAssetClassificationId() {
		 AssetClassification lastclasssificationId =assetclassificationdao.getLastClassificationId();
		 if (lastclasssificationId != null) {
			 String lastAssetclasssificationId =(lastclasssificationId).getExistingId();
				LOGGER.info(lastAssetclasssificationId);
				String[] parts = lastAssetclasssificationId.split("-");
				int numericPart = Integer.parseInt(parts[1]);
				numericPart++; 
				String newAssetClassificationId = String.format("%s-%03d", parts[0], numericPart);
				LOGGER.info(newAssetClassificationId);
				return newAssetClassificationId;
			}else {
		return "CLASS-001";
		}
	 }

	/**
	 * deletes the AssetclassificationIServiceImpl.
	
	 */
	@Override
	public void deleteAssetClassification(AssetClassification ascla) {
		
		assetclassificationdao.deleteAssetClassification(ascla);
		
	}

	/**
	 * updates the AssetclassificationIServiceImpl.
	
	 */
	@Override
	public void updataAssetClassification(AssetClassification ascla) {
	//	commonValidator.validateassetclassificationcode(ascla.getAssetClassificationCode());
		commonValidator.validateassetclassificationname(ascla.getAssetClassificationName());
		commonValidator.validateassetclassificationacronym(ascla.getAssetClassificationAcronym());
		commonValidator.throwIfErrors();
		LOGGER.info("Entering updateuser AssetclassificationService Class");
		assetclassificationdao.updataAssetClassification(ascla);
		LOGGER.info("Existing updateuser AssetclassificationService  Class");
		
	}

	@Override
	public AssetClassification getAssetClassificationById(int id) {
		
		return assetclassificationdao.getAssetClassificationById(id) ;
	}

	/**
	 * counts the AssetclassificationIServiceImpl.
	
	 */
	@Override
	public Long getAssetClassificationCount() {
		
		return assetclassificationdao.getAssetClassificationCount();
	}

}
