package com.sjc.location.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.sjc.common.DBUtil;
import com.sjc.entity.Location;




@Repository
public class LocationDaoImpl implements LocationDao {
	
	DBUtil dbUtil;
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LocationDaoImpl.class);
	
	@Autowired
	public LocationDaoImpl(DBUtil dbUtil) {
		this.dbUtil=dbUtil;
		
		}
	
	
	/**
	 *  get the all  Location.
	 *   */ 
	@Override
	public List<Location> getLocation() {
		LOGGER.info	("Entering getLocation in LocationDaoImpl class");
		List<Location> locationLs = dbUtil.fetchDatas(LocationSql.Retrieve_QRY,Location.class,null);
		LOGGER.info("Exisiting addLocation LocationDaoImpl Class");
		return locationLs;
	   }
	
	/**
	 * Adds the Location.
	 *
	 * @param location the location
	 */ 
	@Override
	public void addlocation(Location location) {
		LOGGER.info("Entering addLocation LocationDaoImpl Class");
		dbUtil.CUDOperation(location, LocationSql.INSERT_QRY);
		LOGGER.info("Exisiting addLocation LocationDaoImpl Class");
	}
	
	/**
	 * update the Location.
	 *
	 * @param location the location
	 */
	@Override
	public void updatelocation(Location location) {
		LOGGER.info("Entering UpdateLocation LocationDaoImpl Class");
		dbUtil.CUDOperation(location, LocationSql.UPT_QRY);
		LOGGER.info("Exisiting UpdateLocation LocationDaoImpl Class");
	}
	

	/**
	 * Delete the Location.
	 *
	 * @param location the location
	 */
	@Override
	public void deletelocation(Location location) {
		LOGGER.info("Entering DeleteLocation LocationDaoImpl Class");
		dbUtil.CUDOperation(location, LocationSql.DEL_QRY);
		LOGGER.info("Exisiting DeleteLocation LocationDaoImpl Class");
	}
	

	/**
	 * get single Location by LocationId.
	 *
	 * @param location the location
	 */
	@Override
	public Location getLocationById(int id) {
		LOGGER.info("Entering getLocationById LocationDaoImpl class");
		Map<String, Object> paramMap =new HashMap<>();
		paramMap.put("id", id);
		List<Location> locationLs = dbUtil.fetchDatas(LocationSql.Fetch_QRY,Location.class,paramMap);
		LOGGER.info("Exisiting getLocationById LocationDaoImpl Class");
		return locationLs.isEmpty()? null:locationLs.get(0);
	}
	
	@Override
	public Long getLocationCount() {
		LOGGER.info("Entering getFamilyCount FamilyDaoImpl class");
		return dbUtil.fetchCount(LocationSql.Count_QRY);
	}

	


	@Override
	public Location getLastLocation() {
	    List<Location> locationLs = dbUtil.fetchDatas(LocationSql.locationLastID_Qry, Location.class, null);
	    
	    return locationLs.isEmpty()? null:locationLs.get(0);
	  
	}


}
