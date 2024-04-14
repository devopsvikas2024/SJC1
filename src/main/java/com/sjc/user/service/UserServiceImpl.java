package com.sjc.user.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sjc.common.CommonValidator;
import com.sjc.entity.User;
import com.sjc.user.dao.UserDao;
import org.springframework.context.annotation.ScopedProxyMode;



/**
 * The Class UserServiceImpl.
 */
@Service
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserServiceImpl implements UserService {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	/** The user dao. */
	UserDao userDao;

	/**
	 * Instantiates a new user service impl.
	 *
	 */
	
	private final CommonValidator commonValidator;
	
	/**
	 * Instantiates a new user service impl.
	 *
	 * @param userDao the user dao
	 */
	@Autowired
	public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
		this.commonValidator = new CommonValidator();
	}

	
    /** The errors. */
    private final List<String> errors = new ArrayList<>();

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 */
	@Override
	public void addUser(User user) {
         
		 commonValidator.validateUsername(user.getUserName());
		 commonValidator.validatePassword(user.getPassWord());
		 commonValidator.validateFirstname(user.getFirstName());
		 commonValidator.validateLastname(user.getLastName());
		 commonValidator.validateMobileNo(user.getMobileNo());
		 commonValidator.throwIfErrors();
		 
		userDao.addUser(user);
	}
	
	

	/**
	 * Gets the auth service.
	 *
	 * @param user the user
	 * @return the auth service
	 */
	@Override
	public List<User> getAuthService(User user) {
		LOGGER.info("Entering getAuthService UserServiceImpl");
		
			commonValidator.validateUsername(user.getUserName());
			 commonValidator.validatePassword(user.getPassWord());
			 commonValidator.throwIfErrors();
			 
			 String usname =user.getUserName();
			 String propassword =user.getPassWord();
			 LOGGER.info(propassword + usname);
		final List<User> getLogin = userDao.getAuthDao(user);
		LOGGER.info("Existing getAuthService UserServiceImpl");
		    
		 		
		return getLogin;
}

	/**
	 * Update user.
	 *
	 * @param user the user
	 */
	@Override
	public void updateUser(User user) {
		LOGGER.info("Entering updateuser UserService Class");
		 commonValidator.validateUsername(user.getUserName());
		 commonValidator.validatePassword(user.getPassWord());
		 commonValidator.validateFirstname(user.getFirstName());
		 commonValidator.validateLastname(user.getLastName());
		 commonValidator.validateMobileNo(user.getMobileNo());
		 commonValidator.validateusertype(user.getUserType());
		 commonValidator.throwIfErrors();
		
		userDao.updateUser(user);
		LOGGER.info("Existing updateuser UserService Class");

	}



	/**
	 * Gets the user by id.
	 *
	 * @param id the id
	 * @return the user by id
	 */
	@Override
	public User getUserById(int id) {
		return userDao.getUserById(id);
	}



	/**
	 * Delete user.
	 *
	 * @param user the user
	 */
	@Override
	public void deleteUser(User user) {
		
		userDao.deleteUser(user);
	}



	@Override
	public List<User> getUser() {
		return userDao.getUser() ;
	}
   
	@Override
	public String uploadProfileImage(MultipartFile file, String userId) throws IOException {
        if (file == null || file.isEmpty()) {
            return null; 
        }
       
        String uploadDirectory = "D:/sjc/imageUploadSjc/";
        
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs();
        }
       
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + System.currentTimeMillis() + fileExtension;
      
        String filePath = uploadDirectory + uniqueFilename;
       
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
        return filePath;
    } 

}
