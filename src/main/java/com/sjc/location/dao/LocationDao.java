package com.sjc.location.dao;

import java.util.List;

import com.sjc.entity.Location;


public interface LocationDao {

	List<Location> getLocation();

	void addlocation(Location location);

	void updatelocation(Location location);

	void deletelocation(Location location);

	Location getLocationById(int id);

	Long getLocationCount();

	Location getLastLocation();

}
