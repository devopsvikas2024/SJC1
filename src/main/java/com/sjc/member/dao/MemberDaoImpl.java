package com.sjc.member.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.sjc.common.DBUtil;
import com.sjc.entity.Member;
import com.sjc.entity.MemberAgeGroup;
import com.sjc.entity.MemberBaptisedMonthWiseCount;
import com.sjc.entity.MemberConfirmationCountByMonth;
import com.sjc.entity.MemberDataAndCounts;
import com.sjc.entity.MemberLastPreDataRetrive;
import com.sjc.entity.MemberTypeMonthwiseCount;



@Repository
public class MemberDaoImpl implements MemberDao {
    
	
	/** The db util. */
	DBUtil  dbUtil;
	/**
	 * Instantiates a new user dao impl.
	 *
	 * @param dbUtil the db util
	 */
	@Autowired
	public MemberDaoImpl(DBUtil dbUtil ) {
	    this.dbUtil = dbUtil;
	  
	}

	
	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberDaoImpl.class);
     
	
	/**
	 *  get the all  Member.
	 *   */ 
	@Override
	public List<Member> getMember() {
		LOGGER.info("Entering addMember MemberDaoImpl Class");
		List<Member> memberLs=dbUtil.fetchDatas(MemberSql.Retrieve_QRY ,Member.class,null);
	    return memberLs;
	}


	/**
	 * Adds the Member.
	 *
	 * @param member the member
	 */ 
	@Override
	public void addMember(Member member) {
		LOGGER.info("Entering addMember MemberDaoImpl Class");
		dbUtil.CUDOperation(member, MemberSql.INSERT_QRY);
		LOGGER.info("Exisiting addMember MemberDaoImpl Class");
	}
	
	/**
	 * Delete the member.
	 *
	 * @param member the member
	 */
    @Override
	public void deleteMember(Member member) {
		LOGGER.info("Entering deleteMember MemberDaoImpl class");
		dbUtil.CUDOperation(member, MemberSql.DEL_QRY);
		LOGGER.info("Entering deleteMember MemberDaoImpl class");
	}
    
    
    /**
	 * update the member.
	 *
	 * @param member the member
	 */
    @Override
	public void updateMember(Member member) {
		LOGGER.info("Entering updateMember MemberDaoImpl class");
		dbUtil.CUDOperation(member, MemberSql.UPT_QRY);
		LOGGER.info("Existing updateMember MemberDaoImpl class");
		}

	/**
	 * get single member by memberId.
	 *
	 * @param member the member
	 */
	@Override
	public Member getMemberById(int id) {
		LOGGER.info("Entering getMemberById memberDaoImpl class");
		Map<String, Object> paramMap =new HashMap<>();
        paramMap.put("id", id);
        List<Member> memberLs =dbUtil.fetchDatas(MemberSql.Fetch_QRY, Member.class, paramMap);
        LOGGER.info("Existing getMemberById MemberDaoImpl class");
        return memberLs.isEmpty() ? null:memberLs.get(0);
	}

	@Override
	public Long getMemberCount() {
	    LOGGER.info("Entering getMemberCount MemberDaoImpl class");
	    return dbUtil.fetchCount(MemberSql.Count_QRY);
	}
    
	@Override
	public List<MemberDataAndCounts> getMemberDataAndCounts() {
		return dbUtil.fetchDatas(MemberSql.dataCountMember_QRY,MemberDataAndCounts.class, null);
	}




	@Override
	public List<MemberAgeGroup> getMemberDatofBirthWiseCount() {
		LOGGER.info("Entering getMember date of birth wise Count MemberDaoImpl class");
		return dbUtil.fetchDatas(MemberSql.dateOfBirthCount_QRY,MemberAgeGroup.class, null);
	}


	@Override
	public List<MemberAgeGroup> getMemberDatofBirthWisePercentage() {
		LOGGER.info("Entering getMember date of birth wise percentage MemberDaoImpl class");
		return dbUtil.fetchDatas(MemberSql.dateOfBirthPercentage_QRY,MemberAgeGroup.class, null);
	}


	

	@Override
	public Long getMemberBaptisedCount() {
		LOGGER.info("Entering getMember baptised counts MemberDaoImpl class");
		return dbUtil.fetchCount(MemberSql.BaptisedCount_QRY);
	}
	
	@Override
	public Long getBaptisedConfirmationCount() {
		LOGGER.info("Entering getMember Confirmation counts MemberDaoImpl class");
		return dbUtil.fetchCount(MemberSql.bapisedConfirmationCount_QRY);
	}


	@Override
	public List<MemberBaptisedMonthWiseCount> getMemberBaptisedMonthWise() {
		LOGGER.info("Entering getMember baptised month wise counts MemberDaoImpl class");
		List<MemberBaptisedMonthWiseCount> memberbsptisedCountmonth=dbUtil.fetchDatas(MemberSql.BaptisedMonthWiseCount_QRY,MemberBaptisedMonthWiseCount.class, null);
		return memberbsptisedCountmonth;
	}


	@Override
	public List<MemberConfirmationCountByMonth> getMemberConfirmationCountByMonthWise() {
		LOGGER.info("Entering getMember baptised Confirmation month wise counts MemberDaoImpl class");
		List<MemberConfirmationCountByMonth> memberbaptisedConfirmationCountmonth=dbUtil.fetchDatas(MemberSql.BaptisedConfirmationMonthWiseCount_QRY,MemberConfirmationCountByMonth.class, null);
		return memberbaptisedConfirmationCountmonth;
	}

	

	@Override
	public List<MemberTypeMonthwiseCount> getMemberTypeMonthwiseCount() {
		LOGGER.info("Entering get Member Month wise Count Member DaoImpl class");
		List<MemberTypeMonthwiseCount> MemberTypeMonthwiseCount = dbUtil.fetchDatas(MemberSql.dataCountMemberMonthwise_QRY, MemberTypeMonthwiseCount.class, null);
		return MemberTypeMonthwiseCount;
	}


	@Override
	public List<MemberLastPreDataRetrive> getMemberLastPreDataRetrive() {
		LOGGER.info("Entering Member Last& Previous Data Retrive DaoImpl class");
		List<MemberLastPreDataRetrive> memLastPreDataRerive = dbUtil.fetchDatas(MemberSql.dataOfLastPreDataCreatedBy,MemberLastPreDataRetrive.class,null);
		return memLastPreDataRerive;
	}


	@Override
	public Member getLastMemberID() {
		List<Member> uniqueid =dbUtil.fetchDatas(MemberSql.MemberLastID_Qry, Member.class, null);
		return uniqueid.isEmpty()? null:uniqueid.get(0);
	}


	


	


	
}
