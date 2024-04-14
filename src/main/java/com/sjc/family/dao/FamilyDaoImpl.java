package com.sjc.family.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sjc.common.DBUtil;
import com.sjc.entity.Family;

@Repository
public class FamilyDaoImpl implements FamilyDao {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FamilyDaoImpl .class);
	
	DBUtil  dbUtil;
	
	
	@Autowired
	public FamilyDaoImpl(DBUtil dbUtil) {
	  this.dbUtil=dbUtil;
	 
	}
	
	/**
	 *  get the all  Family.
	 *   */ 
	@Override
	public List<Family> getFamily() {
		LOGGER.info	("Entering getFamily in FamilyDaoImpl class");
		List<Family> familyLs=dbUtil.fetchDatas(FamilySql.Retrieve_QRY,Family.class,null);
		LOGGER.info	("Existing getFamily in FamilyDaoImpl class");
		return familyLs;	
	}
	
	
	/**
	 * Adds the Family.
	 *
	 * @param family the family
	 */
	@Override
	public void addFamily(Family fam) {
		LOGGER.info	("Entering addFamily in FamilyDaoImpl class");
		dbUtil.CUDOperation(fam,FamilySql.INSERT_QRY);
		LOGGER.info("Existing  addFamily in FamilyDaoImpl class");
	}
	
	/**
	 * Delete the Family.
	 *
	 * @param family the family
	 */
	@Override
	public void deleteFamily(Family fam) {
		LOGGER.info	("Entering deleteFamily in FamilyDaoImpl class");
		dbUtil.CUDOperation(fam,FamilySql.DEL_QRY);
		LOGGER.info("Existing  deleteFamily in FamilyDaoImpl class");
	}
	
	/**
	 * Update the Family.
	 *
	 * @param family the family
	 */
	@Override
	public void updateFamily(Family fam) {
		LOGGER.info	("Entering updateFamily in FamilyDaoImpl class");
		dbUtil.CUDOperation(fam,FamilySql.UPT_QRY);
		LOGGER.info("Existing  updateFamily in FamilyDaoImpl class");
	}
	
	/**
	 * Get Family by id.
	
	 */
	@Override
	public Family getFamilyById(int id) {
		LOGGER.info("Entering getAssetClassificationById UserDaoImpl class");
		Map<String, Object> paramMap =new HashMap<>();
		 paramMap.put("id", id);
		 List<Family> familyLs=dbUtil.fetchDatas(FamilySql.Fetch_QRY,Family.class, paramMap);
		 LOGGER.info("Existing  getFamilyById in FamilyDaoImpl class");
		 return familyLs.isEmpty() ? null :familyLs.get(0);
	}
	
	
	@Override
	public Long getFamilyCount() {
		   LOGGER.info("Entering getFamilyCount FamilyDaoImpl class");
		    return dbUtil.fetchCount(FamilySql.Count_QRY);
		    }

	@Override
	public Family getLastFamilyCode() {
		List<Family> uniqueid = dbUtil.fetchDatas(FamilySql.FamilyLastID_Qry,Family.class, null);
		return uniqueid.isEmpty() ? null :uniqueid.get(0);
	}
	}


