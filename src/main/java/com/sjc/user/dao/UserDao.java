package com.sjc.user.dao;

import java.util.List;

import com.sjc.entity.User;

// TODO: Auto-generated Javadoc
/**
 * The Interface UserDao.
 */
public interface UserDao {

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 */
	void addUser(User user);

	/**
	 * Gets the auth dao.
	 *
	 * @param user the user
	 * @return the auth dao
	 */
	List<User> getAuthDao(User user);

	/**
	 * Update user.
	 *
	 * @param user the user
	 */
	void updateUser(User user);

	User getUserById(int id);
	
	void deleteUser(User user);

	List<User> getUser();




}
