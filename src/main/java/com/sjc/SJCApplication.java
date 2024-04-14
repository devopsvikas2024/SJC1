package com.sjc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

// TODO: Auto-generated Javadoc
/**
 * The Class SJCApplication.
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.sjc")
public class SJCApplication {

	/**
	 * The main method.
	 *
	 * @param args the arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(SJCApplication.class, args);
	}

}
