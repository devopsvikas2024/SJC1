package com.sjc.user.controller;


import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sjc.entity.User;
import com.sjc.user.service.UserService;

// TODO: Auto-generated Javadoc
/**
 * The Class UserController.
 */
@RestController
@RequestMapping("com/sjc/user")
public class UserController {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	/** The user service. */
	UserService userService;

	/**
	 * Instantiates a new user controller.
	 *
	 * @param userService the user service
	 */
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	/**
	 * Adds the user.
	 *
	 * @param user the user
	 * @return the user
	 */
	@PostMapping("/add")
	public User addUser(@RequestBody User user) {
		LOGGER.info("Entering addUser in UserController");

		userService.addUser(user);
		LOGGER.info("Existing addUser in UserController");
		return user;

	}

	/**
	 * Authenticate user.
	 *
	 * @param user the user
	 * @return the list
	 */
	@PostMapping("/login")
	public List<User> authenticateUser(@Validated @RequestBody User user) {
		LOGGER.info("Entering authenticateUser in UserController");
        System.out.println(user);
		List<User> userLs = userService.getAuthService(user);
		LOGGER.info("Existing authenticateUser in UserController");
		return userLs;

	}

	/**
	 * Update user.
	 *
	 * @param user the user
	 * @return the user
	 */
	@PostMapping("/update")
	public User updateUser(@RequestBody User user) {
		LOGGER.info("Entering updateUser in UserController");
		userService.updateUser(user);
		LOGGER.info("Existing updateUser in UserController");
		return user;

	}
	
	/**
	 * delete user.
	 *
	 * @param user the user
	 * @return the user
	 */
	@PostMapping("/delete")
	public User deleteUser(@RequestBody User user) {
		LOGGER.info("Entering deleteUser in UserController");
		userService.deleteUser(user);
		LOGGER.info("Existing deleteUser in UserController");
		return user;

	}
	
	@GetMapping("/{id}")
	   public User getUserById(@PathVariable int id){
		return userService.getUserById(id);
          }
	
	@GetMapping("/getusers")
	public List<User> getUser() {
		 return userService.getUser();
	}
	
	 @PostMapping("/getProfileImage")
	  public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId) throws IOException {
		        String filePath = userService.uploadProfileImage(file, userId);
				if (filePath != null) {
				    return ResponseEntity.ok("File uploaded successfully. File path: " + filePath);
				} else {
				    return ResponseEntity.badRequest().body("Failed to upload file.");
				}

	 } 
}
