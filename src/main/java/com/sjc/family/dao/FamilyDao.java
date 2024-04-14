package com.sjc.family.dao;

import java.util.List;

import com.sjc.entity.Family;


public interface FamilyDao  {

	List<Family> getFamily();

	void addFamily(Family fam);

	void deleteFamily(Family fam);

	void updateFamily(Family fam);

	Family getFamilyById(int id);

	Long getFamilyCount();

	Family getLastFamilyCode();

}
