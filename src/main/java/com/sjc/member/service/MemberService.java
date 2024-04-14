package com.sjc.member.service;

import java.util.List;

import com.sjc.entity.Member;
import com.sjc.entity.MemberAgeGroup;
import com.sjc.entity.MemberBaptisedMonthWiseCount;
import com.sjc.entity.MemberConfirmationCountByMonth;
import com.sjc.entity.MemberDataAndCounts;
import com.sjc.entity.MemberLastPreDataRetrive;
import com.sjc.entity.MemberTypeMonthwiseCount;

public interface MemberService {

	List<Member> getMember();

	void addMember(Member member);

	void deleteMember(Member member);

	void updateMember(Member member);

	Member getMemberById(int id);

	Long getMemberCount();
	
	Long getBaptisedConfirmationCount();


	List<MemberDataAndCounts> getMemberDataAndCounts();


	List<MemberAgeGroup> getMemberDatofBirthWiseCount();

	List<MemberAgeGroup> getMemberDatofBirthWisePercentage();

	

	Long getMemberBaptisedCount();

	List<MemberBaptisedMonthWiseCount> getMemberBaptisedMonthWise();

	List<MemberConfirmationCountByMonth> getMemberConfirmationCountByMonthWise();

	List<MemberTypeMonthwiseCount> getMemberTypeMonthwiseCount();

	List<MemberLastPreDataRetrive> getMemberLastPreDataRetrive();

	

	

	


}
