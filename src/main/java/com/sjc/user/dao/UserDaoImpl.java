
package com.sjc.user.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sjc.common.DBUtil;
import com.sjc.entity.User;

/**
 * The Class UserDaoImpl.
 */


@Repository
public class UserDaoImpl implements UserDao {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

	/** The db util. */
	DBUtil dbUtil;

	/**
	 * Instantiates a new user dao impl.
	 *
	 * @param dbUtil the db util
	 */
	@Autowired
	public UserDaoImpl(DBUtil dbUtil) {
		this.dbUtil = dbUtil;
	}

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 */
	@Override
	public void addUser(User user) {
		LOGGER.info("Entering addUser UserDaoImpl class");
		dbUtil.CUDOperation(user, UserSql.INSERT_QRY);
		LOGGER.info("Existing addUser UserDaoImpl class");

	}

	/**
	 * Gets the auth dao.
	 *
	 * @param user the user
	 * @return the auth dao
	 */
	@Override
	public List<User> getAuthDao(User user) {

		LOGGER.info("Entering getAuthDao UserDaoImpl class");
		

		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("userName", user.getUserName());
		paramMap.put("passWord", user.getPassWord());
		List<User> userLs = dbUtil.fetchDatas(UserSql.LOGIN_AUTH, User.class, paramMap);
		LOGGER.info("Existing getAuthDao UserDaoImpl class");
		return userLs;
	}

	/**
	 * Update user.
	 *
	 * @param user the user
	 */
	@Override
	public void updateUser(User user) {
		LOGGER.info("Entering updateUser UserDaoImpl class");
		dbUtil.CUDOperation(user, UserSql.UPT_QRY);
		LOGGER.info("Existing updateUser UserDaoImpl class");

	}

	@Override
	public User getUserById(int id) {
		LOGGER.info("Entering getUserById UserDaoImpl class");
		Map<String, Object> paramMap =new HashMap<>();
        paramMap.put("id", id);
        List<User> userLs= dbUtil.fetchDatas(UserSql.Fetch_QRY,User.class, paramMap);
        return userLs.isEmpty() ? null :userLs.get(0);
	}

	@Override
	public void deleteUser(User user) {
		LOGGER.info("Entering deleteUser UserDaoImpl class");
		dbUtil.CUDOperation(user, UserSql.DEL_QRY);
		LOGGER.info("Entering deleteUser UserDaoImpl class");
	}
    
	/**
	 *  get the all  User.
	 *   */
	
	@Override
	public List<User> getUser() {
		LOGGER.info("Entering getUser UserDaoImpl Class");
		Map<String, String> paramMap = new HashMap<>();
		List<User> userLs = dbUtil.fetchDatas(UserSql.Retrieve_QRY ,User.class,paramMap);
		LOGGER.info("Existing getUser UserDaoImpl class");
	   return userLs;
	}


}
