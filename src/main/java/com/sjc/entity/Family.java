package com.sjc.entity;

public class Family {
	private int id;
	private String familyCode;
	private String familyName;
	private String familyDescription;
	private String familyAddressLineOne;
	private String familyAddressLineTwo;
	private String familyCity;
	private String familyState;
	private String familyZipCode;
	private String familyCountry;
	
	private String LastID;
	
	
	
	public String getLastID() {
		return LastID;
	}
	
	public void setLastID(String lastID) {
		LastID = lastID;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFamilyCode() {
		return familyCode;
	}
	public void setFamilyCode(String familyCode) {
		this.familyCode = familyCode;
	}
	public String getFamilyName() {
		return familyName;
	}
	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}
	public String getFamilyDescription() {
		return familyDescription;
	}
	public void setFamilyDescription(String familyDescription) {
		this.familyDescription = familyDescription;
	}
	public String getFamilyAddressLineOne() {
		return familyAddressLineOne;
	}
	public void setFamilyAddressLineOne(String familyAddressLineOne) {
		this.familyAddressLineOne = familyAddressLineOne;
	}
	public String getFamilyAddressLineTwo() {
		return familyAddressLineTwo;
	}
	public void setFamilyAddressLineTwo(String familyAddressLineTwo) {
		this.familyAddressLineTwo = familyAddressLineTwo;
	}
	public String getFamilyCity() {
		return familyCity;
	}
	public void setFamilyCity(String familyCity) {
		this.familyCity = familyCity;
	}
	public String getFamilyState() {
		return familyState;
	}
	public void setFamilyState(String familyState) {
		this.familyState = familyState;
	}
	public String getFamilyZipCode() {
		
		return familyZipCode;
	}
	public void setFamilyZipCode(String familyZipCode) {
		this.familyZipCode = familyZipCode;
	}
	public String getFamilyCountry() {
		return familyCountry;
	}
	public void setFamilyCountry(String familyCountry) {
		this.familyCountry = familyCountry;
	}

}
