package com.sjc.location.Controller;

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

import com.sjc.entity.Location;

import com.sjc.location.service.LocationService;
/**
* The Class locationController.
*/
@RestController
@RequestMapping("com/sjc/location")

public class LocationController {
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(LocationController.class);
	/**
	 * Instantiates a new location controller.
	
	 */ 
	@Autowired
	public LocationController(LocationService locationservice) {
	  this.locationservice=locationservice;
	}
	
	/** The location service. */
	
	LocationService locationservice;
	
	@GetMapping("/getlocation")
	public List<Location> getLocation(){
		return locationservice.getLocation();
	}
	

	/**
	 * Adds the location 
	 */
	@PostMapping("/add")
	public Location addLocation(@RequestBody Location location) {
		
		locationservice.addLocation(location);
		return location;
	}

	/**
	 * updates the location 
	 */
	@PostMapping("/update")
	 public  Location updateLocation (@RequestBody Location location) {
		 
		 locationservice.updateLocation(location);
		 return location;
	 }

	/**
	 * deletes the location 
	 */
	@PostMapping("/delete")
	public Location deletLocation (@RequestBody Location location) {
		
		locationservice.deletelocation(location);
		return location;
	}
	@GetMapping("/{id}")
	public Location getLocationById(@PathVariable int id) {
		return locationservice.getLocationById(id);
	}
	 @GetMapping("/locationcounts")
	 public Long getLocationCount() {
		 return locationservice.getLocationCount();
	 }
}
