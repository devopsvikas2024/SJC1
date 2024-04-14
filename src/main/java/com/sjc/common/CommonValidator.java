package com.sjc.common;

import java.util.ArrayList;
import java.util.List;

public class CommonValidator {

    private final List<String> errors = new ArrayList<>();

    // validation for user Data
    
    public void validateString(String field,String fieldName) {
        if (field == null || field.trim().isEmpty()) {
            errors.add(fieldName+" cannot be empty");
        }

        // Add other username validation logic
    }
    
    public void validateUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            errors.add("Username cannot be empty");
        }

        // Add other username validation logic
    }

    public void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            errors.add("Email cannot be empty");
        }

        // Add other email validation logic
    }
    
    public void validatePassword(String passWord) {
        if (passWord == null || passWord.trim().isEmpty()) {
            errors.add("password cannot be empty");
        }
    }
    
    public void validateFirstname(String firstName) {
        if (firstName == null || firstName.trim().isEmpty()) {
            errors.add("Firstname cannot be empty");
        }
    }
    
    public void validateLastname(String lastName) {
        if (lastName == null || lastName.trim().isEmpty()) {
            errors.add("Lastname cannot be empty");
        }
    }
    
    
    public void validateMobileNo(String mobileNo) {
        if (mobileNo == null || mobileNo.trim().isEmpty()) {
            errors.add("Mobile.no cannot be empty");
        }
    }
    
    public void validateusertype(String userType) {
        if (userType == null || userType.trim().isEmpty()) {
            errors.add("user type cannot be empty");
        }
    }
    
    // validation for asset
    
    
    // validation for AssetId
    public void validateassetId(String assetId) {
    	if (assetId == null || assetId.trim().isEmpty()) {
            errors.add("assetId cannot be empty");
        }
    } 
    
 // validation for Name of Asset 
    public void validatenameofAsset(String nameofAsset) {
    	if (nameofAsset == null || nameofAsset.trim().isEmpty()) {
            errors.add("Name of asset cannot be empty");
        }
    }
    
 // validation for Ownership 
    public void validateownership(String ownership) {
    	if (ownership == null || ownership.trim().isEmpty()) {
            errors.add("Ownership cannot be empty");
        }
    } 
    
    // validation for Classification 
    public void validateclassification(String classification) {
    	if (classification == null || classification.trim().isEmpty()) {
            errors.add("Classification cannot be empty");
        }
    } 
    
    // validation for location 
    public void validatelocation(String location) {
    	if (location == null || location.trim().isEmpty()) {
            errors.add("location cannot be empty");
        }
    } 
    
    // validation for  purchase value 
    public void validatepurchasevalue(Integer purchasevalue) {
    	if (purchasevalue == null || purchasevalue.toString().isEmpty()) {
            errors.add("Purchasevalue cannot be empty");
        }
    }
    
 // validation for  Date of Purchase
    public void validatedateofpurchase(String dateofPurchase) {
    	if (dateofPurchase == null || dateofPurchase.trim().isEmpty()) {
            errors.add("Date of Purchase cannot be empty");
        }
    }
    
 // validation for  depreciation Type
    public void validatedepreciationtype(String depreciationtype) {
    	if (depreciationtype == null || depreciationtype.trim().isEmpty()) {
            errors.add("Depreciation Type cannot be empty");
        }
    }
    
    
 // validation for asset_status 
    public void validateassetStatus(String assetStatus) {
    	if (assetStatus == null || assetStatus.trim().isEmpty()) {
            errors.add("Asset Status cannot be empty");
        }
    }
    
 // validation for status effective date
    public void validatestatuseffectivedate(String statuseffectivedate) {
    	if (statuseffectivedate == null || statuseffectivedate.trim().isEmpty()) {
            errors.add("status effectivedate value cannot be empty");
        }
    }
    
    
    
  
    
                    // validation for asset classification
    
    // validation  for assetclassification code
    
    public void validateassetclassificationcode(String assetclassificationcode) {
        if (assetclassificationcode == null||assetclassificationcode.trim().isEmpty()) {
           errors.add("Asset classification code cannot be empty");
        }
    }
    // validation  for assetclassification name
    
    public void validateassetclassificationname(String assetclassificationname) {
        if (assetclassificationname == null||assetclassificationname.trim().isEmpty()) {
           errors.add("Asset classification Name cannot be empty");
        }
    }
    // validation  for assetclassification acronym
    
    public void validateassetclassificationacronym(String assetclassificationnameacronym) {
        if (assetclassificationnameacronym == null||assetclassificationnameacronym.trim().isEmpty()) {
           errors.add("Asset classification Acronym cannot be empty");
        }
    }
    
              // validation for family
    
    
    public void validatefamilyCode(String familyCode) {
    	if (familyCode==null||familyCode.trim().isEmpty()) {
    		errors.add("familycode  cannot be empty");	
    	}
    }
    
    public void validatefamilyName(String familyName) {
    	if (familyName==null||familyName.trim().isEmpty()) {
    		errors.add("familyName cannot be empty");	
    	}
    }
    

    public void validatefamilyDescription(String familyDescription) {
    	if (familyDescription==null||familyDescription.trim().isEmpty()) {
    		errors.add("familyDescription cannot be empty");	
    	}
    }

    public void validatefamilyAddressLineOne(String familyAddressLineOne) {
    	if (familyAddressLineOne==null||familyAddressLineOne.trim().isEmpty()) {
    		errors.add("familyAddressLineOne cannot be empty");	
    	}
 
   }
    public void validatefamilyAddressLineTwo(String familyAddressLineTwo) {
    	if (familyAddressLineTwo==null||familyAddressLineTwo.trim().isEmpty()) {
    		errors.add("familyAddressLineTwo cannot be empty");	
    	}
    }
    public void validatefamilyCity(String familyCity) {
    	if (familyCity==null||familyCity.trim().isEmpty()) {
    		errors.add("familyCity cannot be empty");	
    	}
    }
    public void validatefamilyState(String familyState) {
    	if (familyState==null||familyState.trim().isEmpty()) {
    		errors.add("familyState cannot be empty");	
    	}
    }
    public void validatefamilyZipCode(String familyZipCode) {
    	if (familyZipCode==null||familyZipCode.trim().isEmpty()) {
    		errors.add("familyZipCode cannot be empty");	
    	}
    }
    public void validatefamilyCountry(String familyCountry) {
    	if (familyCountry==null||familyCountry.trim().isEmpty()) {
    		errors.add("familyCountry cannot be empty");	
    	}
    }
                 // validation for location
    
    public void validatelocationCode(String locationCode) {
    	if (locationCode==null||locationCode.trim().isEmpty()) {
    		errors.add("locationCode cannot be empty");
    	}
    }
    
    public void validatelocationName(String locationName) {
    	if (locationName==null||locationName.trim().isEmpty()) {
    		errors.add("locationName cannot be empty");
    	}
    }
    public void validatelocationAcronym(String locationAcronym) {
    	if (locationAcronym==null||locationAcronym.trim().isEmpty()) {
    		errors.add("locationAcronym cannot be empty");
    	}
    }
               // validation for Member
    
    public void validatememfamilyid(String mem_family_id){
    	if (mem_family_id==null||mem_family_id.trim().isEmpty()) {
    		errors.add( "familyid cannot be empty");
    	}
    }
    public void validatememfirstname(String mem_first_name){
    	if (mem_first_name==null||mem_first_name.trim().isEmpty()) {
    		errors.add( "firstname cannot be empty");
    	}
    }
    public void validatememlastname(String mem_last_name){
    	if (mem_last_name==null||mem_last_name.trim().isEmpty()) {
    		errors.add( "lastname cannot be empty");
    	}
    }
    public void validatememfamiliarname(String mem_familiar_name){
    	if (mem_familiar_name==null||mem_familiar_name.trim().isEmpty()) {
    		errors.add( "familiarname cannot be empty");
    	}
    }
    public void validatememicnumber(String mem_ic_number){
    	if (mem_ic_number==null||mem_ic_number.trim().isEmpty()) {
    		errors.add( "icnumber cannot be empty");
    	}
    }
    public void validatememdateofbirth(String mem_date_of_birth){
    	if (mem_date_of_birth==null||mem_date_of_birth.trim().isEmpty()) {
    		errors.add( "dateofbirth cannot be empty");
    	}
    }
    public void validatememgender(String mem_gender){
    	if (mem_gender==null||mem_gender.trim().isEmpty()) {
    		errors.add( "gender cannot be empty");
    	}
    }
    public void validatememmaritalstatus(String mem_marital_status){
    	if (mem_marital_status==null||mem_marital_status.trim().isEmpty()) {
    		errors.add( "maritalstatus cannot be empty");
    	}
    }
    public void validatememdateofwedding(String mem_date_of_wedding){
    	if (mem_date_of_wedding==null||mem_date_of_wedding.trim().isEmpty()) {
    		errors.add( "dateofwedding cannot be empty");
    	}
    }
    public void validatemememail(String mem_email){
    	if (mem_email==null||mem_email.trim().isEmpty()) {
    		errors.add( "email cannot be empty");
    	}
    }
    public void validatememcontactnumber(String mem_contact_number){
    	if (mem_contact_number==null||mem_contact_number.trim().isEmpty()) {
    		errors.add( "contactnumber cannot be empty");
    	}
    }
    public void validatememaddressline1(String mem_address_line_1){
    	if (mem_address_line_1==null||mem_address_line_1.trim().isEmpty()) {
    		errors.add( "addressline1 cannot be empty");
    	}
    }
    public void validatememaddressline2(String mem_address_line_2){
    	if (mem_address_line_2==null||mem_address_line_2.trim().isEmpty()) {
    		errors.add( "addressline2 cannot be empty");
    	}
    }
    public void validatememcity(String mem_city){
    	if (mem_city==null||mem_city.trim().isEmpty()) {
    		errors.add( "city cannot be empty");
    	}
    }
    public void validatememstate(String mem_state){
    	if (mem_state==null||mem_state.trim().isEmpty()) {
    		errors.add( "state cannot be empty");
    	}
    }
    public void validatememzipcode(String mem_zipcode){
    	if (mem_zipcode==null||mem_zipcode.trim().isEmpty()) {
    		errors.add( "zipcode cannot be empty");
    	}
    }
    public void validatememcountry(String mem_country){
    	if (mem_country==null||mem_country.trim().isEmpty()) {
    		errors.add( "country cannot be empty");
    	}
    }
    public void validatemembaptised(String mem_baptised){
    	if (mem_baptised==null||mem_baptised.trim().isEmpty()) {
    		errors.add( "baptism cannot be empty");
    	}
    }
    public void validatememdateof_baptism(String mem_date_of_baptism){
    	if (mem_date_of_baptism==null||mem_date_of_baptism.trim().isEmpty()) {
    		errors.add( "dateofbaptism cannot be empty");
    	}
    }
    public void validatememlocationofbaptism(String mem_location_of_baptism){
    	if (mem_location_of_baptism==null||mem_location_of_baptism.trim().isEmpty()) {
    		errors.add( "locationofbaptism cannot be empty");
    	}
    }
    public void validatemembaptisedby(String mem_baptised_by){
    	if (mem_baptised_by==null||mem_baptised_by.trim().isEmpty()) {
    		errors.add( "baptisedby cannot be empty");
    	}
    }
    public void validatememdateofconfirmation(String mem_date_of_confirmation){
    	if (mem_date_of_confirmation==null||mem_date_of_confirmation.trim().isEmpty()) {
    		errors.add( "country cannot be empty");
    	}
    }
    public void validatememlocationofconfirmation(String mem_location_of_confirmation){
    	if (mem_location_of_confirmation==null||mem_location_of_confirmation.trim().isEmpty()) {
    		errors.add( "locationofconfirmation cannot be empty");
    	}
    }
    public void validatememconfirmedby(String mem_confirmed_by){
    	if (mem_confirmed_by==null||mem_confirmed_by.trim().isEmpty()) {
    		errors.add( "confirmedby cannot be empty");
    	}
    }
    public void validatemembershiptype(String membership_type){
    	if (membership_type==null||membership_type.trim().isEmpty()) {
    		errors.add( "membershiptype cannot be empty");
    	}
    }
    public void validatemembershipstatus(String membership_status){
    	if (membership_status==null||membership_status.trim().isEmpty()) {
    		errors.add( "membershipstatus cannot be empty");
    	}
    }
    
    // validation  for other fields

    public void throwIfErrors() {
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }
}
