package com.sjc.family.Controller;

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

import com.sjc.entity.Family;
import com.sjc.family.service.FamilyService;

/**
 * The Class FamilyController.
 */

@RestController
@RequestMapping("com/sjc/family")
public class FamilyController {
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(FamilyController.class);
	
	/** The family service. */
	FamilyService familyservice;
	
	/**
	 * Instantiates a new family controller.
	
	 */ 
	
	
	@Autowired
	public FamilyController(FamilyService familyservice) {
		this.familyservice=familyservice;
	}
	
	@GetMapping("/getfamily")
	public List<Family>getFamily(){
	return familyservice.getFamily();
	}
	
	/**
	 * Adds the family 
	 */
	
	@PostMapping("/add")
	public  Family addFamily(@RequestBody Family fam) {
	LOGGER.info	("Entering addFamily in FamilyController");
	familyservice.addFamily(fam);
	LOGGER.info("Existing addFamily in FamilyController");
	return fam;
	}
	
	/**
	 * deletes the family 
	 */
	
	@PostMapping("/delete")
	public Family deleteFamily(@RequestBody Family  fam) {
		LOGGER.info	("Entering deleteFamily in FamilyController");
		familyservice.deleteFamily(fam);
		LOGGER.info("Existing deleteFamily in FamilyController");
		return fam;
	}
	/**
	 * updates the family 
	 */
	
	@PostMapping("/update")
	public Family updateFamily(@RequestBody Family  fam) {
		LOGGER.info	("Entering updateFamily in FamilyController");
		familyservice.updateFamily(fam);
		LOGGER.info("Existing updateFamily in FamilyController");
		return fam;
	}
	@GetMapping("/{id}")
	public Family getFamilyById(@PathVariable int id){
		return familyservice. getFamilyById(id);
		
	}
	 @GetMapping("/familycounts")
	    public Long getFamilyCount() {
	        return familyservice.getFamilyCount();
	    }

}
