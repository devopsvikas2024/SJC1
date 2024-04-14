package com.sjc.location.service;

import java.util.List;

import com.sjc.entity.Location;

/**
 * The Interface locationService.
 */
public interface LocationService {

	List<Location> getLocation();
	/**
	 * Adds the location.
	 
	 */
	void addLocation(Location location);
	/**
	 *updates the location.
	 
	 */
	void updateLocation(Location location);
	/**
	 * deletes the location.
	 
	 */
	void deletelocation(Location location);

	Location getLocationById(int id);
	/**
	 * counts the location.
	 
	 */
	Long getLocationCount();

}
