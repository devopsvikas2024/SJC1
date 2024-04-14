package com.sjc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// TODO: Auto-generated Javadoc
/**
 * The Class HomeCarousel.
 */
@Entity
public class HomeCarousel {

	/** The id homecarousel. */
	@Id
	private int id_homecarousel;

	/** The imgpath homecarousel. */
	private String imgpath_homecarousel;

	/** The content homecarousel. */
	private String content_homecarousel;

	/** The link homecarousel. */
	private String link_homecarousel;

	/**
	 * Gets the content homecarousel.
	 *
	 * @return the content homecarousel
	 */
	public String getContent_homecarousel() {
		return content_homecarousel;
	}

	/**
	 * Gets the id homecarousel.
	 *
	 * @return the id homecarousel
	 */
	public int getId_homecarousel() {
		return id_homecarousel;
	}

	/**
	 * Gets the imgpath homecarousel.
	 *
	 * @return the imgpath homecarousel
	 */
	public String getImgpath_homecarousel() {
		return imgpath_homecarousel;
	}

	/**
	 * Gets the link homecarousel.
	 *
	 * @return the link homecarousel
	 */
	public String getLink_homecarousel() {
		return link_homecarousel;
	}

	/**
	 * Sets the content homecarousel.
	 *
	 * @param content_homecarousel the new content homecarousel
	 */
	public void setContent_homecarousel(String content_homecarousel) {
		this.content_homecarousel = content_homecarousel;
	}

	/**
	 * Sets the id homecarousel.
	 *
	 * @param id_homecarousel the new id homecarousel
	 */
	public void setId_homecarousel(int id_homecarousel) {
		this.id_homecarousel = id_homecarousel;
	}

	/**
	 * Sets the imgpath homecarousel.
	 *
	 * @param imgpath_homecarousel the new imgpath homecarousel
	 */
	public void setImgpath_homecarousel(String imgpath_homecarousel) {
		this.imgpath_homecarousel = imgpath_homecarousel;
	}

	/**
	 * Sets the link homecarousel.
	 *
	 * @param link_homecarousel the new link homecarousel
	 */
	public void setLink_homecarousel(String link_homecarousel) {
		this.link_homecarousel = link_homecarousel;
	}

}
