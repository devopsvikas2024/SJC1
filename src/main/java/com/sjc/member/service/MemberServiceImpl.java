package com.sjc.member.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import com.sjc.common.CommonValidator;
import com.sjc.entity.Member;
import com.sjc.entity.MemberAgeGroup;
import com.sjc.entity.MemberBaptisedMonthWiseCount;
import com.sjc.entity.MemberConfirmationCountByMonth;
import com.sjc.entity.MemberDataAndCounts;
import com.sjc.entity.MemberLastPreDataRetrive;
import com.sjc.entity.MemberTypeMonthwiseCount;

import com.sjc.member.dao.MemberDao;

@Service
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MemberServiceImpl implements MemberService {
    
	/** The member dao. */
	MemberDao memberDao;
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	private final CommonValidator commonValidator;

	
	public MemberServiceImpl(MemberDao memberDao) {
		super();
		this.memberDao = memberDao;
		this.commonValidator = new CommonValidator();
	}


	private final List<String> errors = new ArrayList<>();
	
	@Override
	public List<Member> getMember() {
	     return memberDao.getMember();
	}



	@Override
	public void addMember(Member member) {
		//commonValidator.validatememfamilyid(member.mem_family_id);
		commonValidator.validatememfirstname(member.mem_first_name);
		commonValidator.validatememlastname(member.mem_last_name);
		commonValidator.validatememfamiliarname(member.mem_familiar_name);
		commonValidator.validatememicnumber(member.mem_ic_number);
		commonValidator.validatememdateofbirth(member.mem_date_of_birth);
		commonValidator.validatememgender(member.mem_gender);
		commonValidator.validatememmaritalstatus(member.mem_marital_status);
		commonValidator.validatemememail(member.mem_email);
		commonValidator.validatememcontactnumber(member.mem_contact_number);
		commonValidator.validatememaddressline1(member.mem_address_line_1);
		commonValidator.validatememcity(member.mem_city);
		commonValidator.validatememstate(member.mem_state);
		commonValidator.validatememzipcode(member.mem_zipcode);
		commonValidator.validatememcountry(member.mem_country);
		commonValidator.validatemembaptised(member.mem_baptised);
		commonValidator.validatemembershiptype(member.membership_type);
		commonValidator.validatemembershipstatus(member.membership_status);
		commonValidator.throwIfErrors();
		
		 if (member.getMem_date_of_wedding() == null || member.getMem_date_of_wedding().isEmpty()) {
	            member.setMem_date_of_wedding("NULL"); // Set the value to NULL
	        }
		
		//member Id
		member.setMember_id(generatememberId());
	    // member age Calculation 
		String DOB =member.mem_date_of_birth;
		member.mem_age =ageCalculation(DOB);
		
		
		memberDao.addMember(member);
	}
	
	public int ageCalculation(String indob ) {
		    LocalDate dob = LocalDate.parse(indob, DateTimeFormatter.ISO_DATE);
	        LocalDate currentDate = LocalDate.now();
	        Period age = Period.between(dob, currentDate);
	        LOGGER.info("Age: " + age.getYears() + " years ");
			return age.getYears();		
	}
    
	public String generatememberId() {
		Member lastID = memberDao.getLastMemberID();
		 LocalDate currentDate = LocalDate.now();
	      String yearMonth = currentDate.format(DateTimeFormatter.ofPattern("yyyyMM"));
		 if (lastID != null) {
			 String lastMemberId = lastID.getLastID();
			 String lastSixDigits = lastMemberId.substring(lastMemberId.length() - 6);
            // Convert the last six digits to an integer
			int lastSixDigitsInt = Integer.parseInt(lastSixDigits);
            // Increment by 1
			lastSixDigitsInt++;
            // Format the incremented last six digits to have leading zeros if necessary
			String newMemberId = String.format("%06d", lastSixDigitsInt);
             return yearMonth+newMemberId;
		 }else {
		return yearMonth+"000001";
		 }
	}
	

	/*delete member*/
	@Override
	public void deleteMember(Member member) {
		memberDao.deleteMember(member);
		}


	/*update member*/
	@Override
	public void updateMember(Member member) {
		commonValidator.validatememfamilyid(member.mem_family_id);
		commonValidator.validatememfirstname(member.mem_first_name);
		commonValidator.validatememlastname(member.mem_last_name);
		commonValidator.validatememfamiliarname(member.mem_familiar_name);
		commonValidator.validatememicnumber(member.mem_ic_number);
		commonValidator.validatememdateofbirth(member.mem_date_of_birth);
		commonValidator.validatememgender(member.mem_gender);
		commonValidator.validatememmaritalstatus(member.mem_marital_status);
	//	commonValidator.validatememdateofwedding(member.mem_date_of_wedding);
		commonValidator.validatemememail(member.mem_email);
		commonValidator.validatememcontactnumber(member.mem_contact_number);
		commonValidator.validatememaddressline1(member.mem_address_line_1);
		commonValidator.validatememaddressline2(member.mem_address_line_2);
		commonValidator.validatememcity(member.mem_city);
		commonValidator.validatememstate(member.mem_state);
		commonValidator.validatememzipcode(member.mem_zipcode);
		commonValidator.validatememcountry(member.mem_country);
		commonValidator.validatemembaptised(member.mem_baptised);
		commonValidator.validatememdateof_baptism(member.mem_date_of_baptism);
		commonValidator.validatememlocationofbaptism(member.mem_location_of_baptism);
		commonValidator.validatemembaptisedby(member.mem_baptised_by);
		commonValidator.validatememdateofconfirmation(member.mem_date_of_confirmation);
		commonValidator.validatememlocationofconfirmation(member.mem_location_of_confirmation);
		commonValidator.validatememconfirmedby(member.mem_confirmed_by);
		commonValidator.validatemembershiptype(member.membership_type);
		commonValidator.validatemembershipstatus(member.membership_status);
		commonValidator.throwIfErrors();
		LOGGER.info("Entering updateuser MemberService Class");
		 memberDao.updateMember(member);
		 LOGGER.info("Existing updateuser MemberService  Class");
		}


	/*Retrieve single id for member*/
	@Override
	public Member getMemberById(int id) {
		LOGGER.info("Get  MemberById From dataBase");
		return memberDao.getMemberById(id);
	}
   
	@Override
	public Long getMemberCount() {
		
		LOGGER.info("Get MemberCount From dataBase");
		
		return memberDao.getMemberCount();
}



	@Override
	public List<MemberDataAndCounts> getMemberDataAndCounts() {
		LOGGER.info("GetMemberDataAndCounts From dataBase");
		return memberDao.getMemberDataAndCounts();
	}



	@Override
	public List<MemberAgeGroup> getMemberDatofBirthWiseCount() {
		LOGGER.info("Get Member Date of Birth Wise Count From dataBase");
		return memberDao.getMemberDatofBirthWiseCount();
	}



	@Override
	public List<MemberAgeGroup> getMemberDatofBirthWisePercentage() {
		LOGGER.info("Get Member Date of Birth Wise Percentage From dataBase");
		return memberDao.getMemberDatofBirthWisePercentage();
	}



	@Override
	public Long getMemberBaptisedCount() {
		LOGGER.info("Get Member baptised count as month wise From dataBase");
		return memberDao.getMemberBaptisedCount() ;
	}

	@Override
	public Long getBaptisedConfirmationCount() {
		LOGGER.info("Get Member Confirmation count as month wise From database");
		return memberDao.getBaptisedConfirmationCount() ;
	}

	@Override
	public List<MemberBaptisedMonthWiseCount> getMemberBaptisedMonthWise() {
		LOGGER.info("Get Member baptised count as month wise From dataBase");
		return memberDao.getMemberBaptisedMonthWise();
	}



	@Override
	public List<MemberConfirmationCountByMonth> getMemberConfirmationCountByMonthWise() {
		LOGGER.info("Get Member baptised Confirmation count as month wise From dataBase");
		return memberDao.getMemberConfirmationCountByMonthWise();
	}



	@Override
	public List<MemberTypeMonthwiseCount> getMemberTypeMonthwiseCount() {
		LOGGER.info("Get MemberType Month wise Count From dataBase");
		return memberDao.getMemberTypeMonthwiseCount();
	}



	@Override
	public List<MemberLastPreDataRetrive> getMemberLastPreDataRetrive() {
		LOGGER.info("Get Member Last & Previous Data Retrive from database");
		return memberDao.getMemberLastPreDataRetrive();
	}



	

}
