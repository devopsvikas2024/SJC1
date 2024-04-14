package com.sjc.member.controller;

import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sjc.entity.Member;
import com.sjc.entity.MemberAgeGroup;
import com.sjc.entity.MemberBaptisedMonthWiseCount;
import com.sjc.entity.MemberConfirmationCountByMonth;
import com.sjc.entity.MemberDataAndCounts;
import com.sjc.entity.MemberLastPreDataRetrive;
import com.sjc.entity.MemberTypeMonthwiseCount;
import com.sjc.member.service.MemberService;

@RestController
@RequestMapping("com/sjc/member")
public class MemberController {
	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
	
	MemberService memberService;
	
	
	
	
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
    
	
	@GetMapping("/getMember")
	public List<Member> getMember(){
		LOGGER.info("Get Member From dataBase");
		return memberService.getMember();
	}
	
	/**
	 * Adds the member.
	 *
	 * @param member the member
	 * @return the member
	 */
	@PostMapping("/add")
	public Member addMember(@RequestBody Member member) {
		LOGGER.info("Entering addMember in MemberController");
		memberService.addMember(member);
		LOGGER.info("Existing addMember in MemberController");
		return member;
	}
   
	/**
	 * Delete the member.
	 *
	 * @param member the member
	 * @return the member
	 */
	@PostMapping("/delete")
	public Member deleteMember(@RequestBody Member member) {
		LOGGER.info("Entering deleteAsset in UserController");
		memberService.deleteMember(member);
		LOGGER.info("Existing deleteAsset in UserController");
		return member;
	}
	
	/**
	 * Update member.
	 *
	 * @param member the member
	 * @return the member
	 */
	@PostMapping("/Update")
	 public Member updateMember(@RequestBody Member member) {
		LOGGER.info("Entering addMember in MemberController");
		memberService.updateMember(member);
		LOGGER.info("Existing addMember in MemberController");
		return member;
	}

	/*Retrieve single id
	 * 
	 *  for member*/
	@GetMapping("/{id}")
	public Member getMemberById(@PathVariable int id) {
	return memberService.getMemberById(id);
	}

	/*Retrieve for member
	 * 
	 *  
	 *  count*/
	 @GetMapping("/membercounts")
	    public Long getMemberCount() {
	        return memberService.getMemberCount();
	    }
	 
	 /*Retrieve for member
	  * 
	  *  
	  *  baptized count*/
	 @GetMapping("/memberbaptizedcount")
	 public Long getMemberBaptisedCount() {
	        return memberService.getMemberBaptisedCount();
	    }
	 
	 /*Retrieve for member
	  * 
	  *  baptized confirmation count*/
	 
     @GetMapping("/memberbaptisedconfirmationCount")
	 public Long getBaptisedConfirmationCount() {
    	 return memberService.getBaptisedConfirmationCount();
     }
     
		/*  Service call for UI member 
		 * 
		 *  
		 *  count chart by roll  */
	 
	 @GetMapping("/memberdatacounts")
	 public List<MemberDataAndCounts> getMemberDataAndCounts() {
		 LOGGER.info("Get member data count From database");
	     List<MemberDataAndCounts> data = memberService.getMemberDataAndCounts();
	     return data;
	 }
	  /*  Service call for UI member data month wise
	   * 
	   *  
	   *  counts chart by roll  */
	 @GetMapping("/memberdatamonthwisecounts")
	 public List<MemberTypeMonthwiseCount> getMemberTypeMonthwiseCount() {
		 LOGGER.info("Get membertype based  count as month wise From dataBase");
	     List<MemberTypeMonthwiseCount> data = memberService.getMemberTypeMonthwiseCount();
	     return data;
	 }
	 
	  /*  Service call for UI member data of birth wise
	   * 
	   *  
	   *  counts chart by roll  */
	 @GetMapping("/membercountdateofbirthwise")
	 public List<MemberAgeGroup> getMemberDatofBirthWiseCount() {
		 LOGGER.info("Get member count date of birth wise From database");
	     List<MemberAgeGroup> data = memberService.getMemberDatofBirthWiseCount();
	     return data;
	 }
	 @GetMapping("/memberpercentagedateofbirthwise")
	 public List<MemberAgeGroup> getMemberDatofBirthWisePercentage() {
		 LOGGER.info("Get member percentage date of birth wise From database");
	     List<MemberAgeGroup> data = memberService.getMemberDatofBirthWisePercentage();
	     return data;
	 }

	 /*  Service call for UI member baptized month wise
	   * 
	   *  
	   *  counts chart by roll  */
	 @GetMapping("/memberbaptisedmonthwisecount")
		public List<MemberBaptisedMonthWiseCount> getMemberBaptisedMonthWise(){
			LOGGER.info("Get Member baptised count as month wise From dataBase");
			return memberService.getMemberBaptisedMonthWise();
		}
	 
	 /*  Service call for UI member baptized confirmation month wise
	   * 
	   *  
	   *  counts chart by roll  */
	 @GetMapping("/memberbaptisedconfirmationmonthwisecount")
	 public List<MemberConfirmationCountByMonth> getMemberConfirmationCountByMonthWise(){
			LOGGER.info("Get Member baptised confirmation count as month wise From dataBase");
			return memberService.getMemberConfirmationCountByMonthWise();
		}
	 
	 @GetMapping("/memberlastandpredataforcreatedby")
	 public List<MemberLastPreDataRetrive> getMemberLastPreDataRetrive(){
			LOGGER.info("Get Member Last & Previous Data Retrive  From dataBase");
			return memberService.getMemberLastPreDataRetrive();
		}
	
}
