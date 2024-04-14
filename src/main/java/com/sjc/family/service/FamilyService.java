package com.sjc.family.service;

import java.util.List;

import com.sjc.entity.Family;

/**
 * The Interface familyService.
 */
public interface FamilyService {

	List<Family> getFamily();
	/**
	 * Adds the family.
	 
	
	 */

	void addFamily(Family fam);

	
	/**
	 * deletes the family.
	 
	
	 */
	void deleteFamily(Family fam);
	/**
	 * updates the family.
	
	 */
	void updateFamily(Family fam);

	Family getFamilyById(int id);

	Long getFamilyCount();

}
