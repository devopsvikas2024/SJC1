package com.sjc.location.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sjc.common.CommonValidator;


import com.sjc.entity.Location;

import com.sjc.location.dao.LocationDao;

/**
 * The Class locationServiceImpl.
 */
@Service
public class LocationServiceImpl implements LocationService {
	
	/** The location dao. */
	
	LocationDao locationdao;
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(LocationServiceImpl.class);
	
	private final CommonValidator commonValidator;
	

	/**
	 * Instantiates a new location service impl.
	 
	 */
	@Autowired
	public LocationServiceImpl(LocationDao locationdao){
		this.locationdao=locationdao;
		this.commonValidator = new CommonValidator();
	}
	
	private final List<String> errors = new ArrayList<>();

	public List<Location> getLocation() {
		 return locationdao.getLocation();
		}
	/**
	 * locations the location.
	
	 */
	@Override
	public void addLocation(Location location) {
	    // Validate location fields
	    commonValidator.validatelocationName(location.getLocationName());
	    commonValidator.validatelocationAcronym(location.getLocationAcronym());
	    commonValidator.throwIfErrors();
	    
	    // Generate location ID
	    String newLocationCode = generateLocationId();
	    location.setLocationCode(newLocationCode);
	    
	    // Add location to the database
	    locationdao.addlocation(location);
	}

	
	/**
	 * generate Asset Classification Id in AssetclassificationIServiceImpl.
	
	 */
	public String generateLocationId() {
	    Location lastLocation = locationdao.getLastLocation();
	    if (lastLocation != null) {
	        String lastLocationId = lastLocation.getLastID();
	        LOGGER.info(lastLocationId);
	        if (lastLocationId != null) {
	            String[] parts = lastLocationId.split("-");
	            int numericPart = Integer.parseInt(parts[1]);
	            numericPart++; 
	            String newLocationId = String.format("%s-%03d", parts[0], numericPart);
	            LOGGER.info(newLocationId);
	            return newLocationId;
	        }
	    }
	    return "LOC-001";
	}



	/**
	 * locations the location.
	
	 */
	@Override
	public void updateLocation(Location location) {
	//	commonValidator.validatelocationCode(location.getLocationCode());
		commonValidator.validatelocationName(location.getLocationName());
		commonValidator.validatelocationAcronym(location.getLocationAcronym());
		commonValidator.throwIfErrors();
		LOGGER.info("Entering updateuser LocationService Class");
		locationdao.updatelocation(location);
		LOGGER.info("Existing updateuser LocationService  Class");
		
	}
	/**
	 * locations the location.
	
	 */
	@Override
	public void deletelocation(Location location) {
		
		locationdao.deletelocation(location);
		
	}
	@Override
	public Location getLocationById(int id) {
		
		return locationdao.getLocationById(id);
	}
	@Override
	public Long getLocationCount() {
		
		return locationdao.getLocationCount();
	}
	}
	


