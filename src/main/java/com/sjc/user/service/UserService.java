package com.sjc.user.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sjc.entity.User;

// TODO: Auto-generated Javadoc
/**
 * The Interface UserService.
 */
public interface UserService {

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 */
	void addUser(User user);

	/**
	 * Gets the auth service.
	 *
	 * @param user the user
	 * @return the auth service
	 */
	List<User> getAuthService(User user);

	/**
	 * Update user.
	 *
	 * @param user the user
	 */
	void updateUser(User user);
	
	/**
	 * Delete user.
	 *
	 * @param user the user
	 */
	void deleteUser(User user);


	User getUserById(int id);

	List<User> getUser();

	String uploadProfileImage(MultipartFile file, String userId) throws IOException;



}
