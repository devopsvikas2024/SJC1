package com.sjc.family.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sjc.common.CommonValidator;
import com.sjc.entity.Family;
import com.sjc.family.dao.FamilyDao;
/**
 * The Class familyServiceImpl.
 */
@Service
public class FamilyServiceImpl implements FamilyService {
	
	/** The family dao. */
	
	FamilyDao familydao;

	/**
	 * Instantiates a new family service impl.
	 *
	 */
	
	private final CommonValidator commonValidator;
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(FamilyServiceImpl.class);
	
	/**
	 * Instantiates a new family service impl.
	 
	 */
	@Autowired
	public FamilyServiceImpl(FamilyDao familydao) {
		this.familydao=familydao;
		this.commonValidator = new CommonValidator();
	}
	public List<Family> getFamily() {
		return familydao.getFamily();
	}
	
	/**
	 * Adds the family.
	 */
	@Override
	public void addFamily(Family fam) {
		//commonValidator.validatefamilyCode(fam.getFamilyCode());
		commonValidator. validatefamilyName(fam.getFamilyName());
		commonValidator.validatefamilyDescription(fam.getFamilyDescription());
		commonValidator.validatefamilyAddressLineOne(fam.getFamilyAddressLineOne());
		commonValidator.validatefamilyAddressLineTwo(fam.getFamilyAddressLineTwo());
		commonValidator.validatefamilyCity(fam.getFamilyCity());
		commonValidator.validatefamilyZipCode(fam.getFamilyZipCode());
		commonValidator.validatefamilyCountry(fam.getFamilyCountry());
		commonValidator.throwIfErrors();
		
		String newFamilyCode = generateFamilyCode();
		fam.setFamilyCode(newFamilyCode);
		
		familydao.addFamily(fam);
		
	}
	
     public String generateFamilyCode() {
    	 Family lastId= familydao.getLastFamilyCode();
    	 if (lastId != null) {
    		 String lastFamilyId = lastId.getLastID();
    		 if(lastFamilyId != null) {
    			 String[] parts = lastFamilyId.split("-");
 				int numericPart = Integer.parseInt(parts[1]);
 				numericPart++; 
 				String newFamilyId = String.format("%s-%06d", parts[0], numericPart);
 				LOGGER.info(newFamilyId);
 				return newFamilyId;
    		 }
    		 
    	 }
    	return "FAM-000001"; 
     
     }
     
     
	/**
	 * deletes the family.
	 */
	@Override
	public void deleteFamily(Family fam) {
		familydao.deleteFamily(fam);
		
	}
	
	
	/**
	 * updates the family.
	 */
	@Override
	public void updateFamily(Family fam) {
	    //	commonValidator.validatefamilyCode(fam.getFamilyCode());
		commonValidator. validatefamilyName(fam.getFamilyName());
		commonValidator.validatefamilyDescription(fam.getFamilyDescription());
		commonValidator.validatefamilyAddressLineOne(fam.getFamilyAddressLineOne());
		commonValidator.validatefamilyAddressLineTwo(fam.getFamilyAddressLineTwo());
		commonValidator.validatefamilyCity(fam.getFamilyCity());
		commonValidator.validatefamilyZipCode(fam.getFamilyZipCode());
		commonValidator.validatefamilyCountry(fam.getFamilyCountry());
		commonValidator.throwIfErrors();
		LOGGER.info("Entering updateuser AssetclassificationService Class");
		familydao.updateFamily(fam);
		LOGGER.info("Existing updateuser AssetclassificationService  Class");
		
	}
	
	/**
	 * Gets the user by id.
	 */
	@Override
	public Family getFamilyById(int id) {
		
		return familydao.getFamilyById(id);
	}
	@Override
	public Long getFamilyCount() {
		
		return familydao.getFamilyCount();

	}
    
	

}
