package com.sjc.common;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


// TODO: Auto-generated Javadoc
/**
 * The Class DBUtilImpl.
 *
 * @param <T> the generic type
 */
@Component
@Transactional
public  class DBUtilImpl<T> extends JdbcDaoSupport implements DBUtil {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(DBUtilImpl.class);

	/** The named parameter jdbc template. */
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	
	
	
	/* inits the data source
	 * 
	 *  
	 *  @param dataSource the dataSource */
	
	@Autowired
    protected void initDataSource(DataSource dataSource) {
        setDataSource(dataSource);
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

	
	/**
	 * Fetch data.
	 *
	 * @param dbQuery the db query
	 * @param cls     the cls
	 * @param params  the params
	 * @return the list
	 */

	@Override
	public List<T> fetchDatas(String dbQuery, Class cls, Map params) {
		LOGGER.info("Entering fetchData method of DBUtil class");
		List<T> returnVO = new ArrayList<>();

		try {
			returnVO = namedParameterJdbcTemplate.query(dbQuery, params, BeanPropertyRowMapper.newInstance(cls));
		} catch (final Exception e) {
			LOGGER.error("Exception occured in fetchData method of DBUtil class ", e);

		}
		LOGGER.info("Exiting fetchData method of DBUtil class");
		return returnVO;
	}
	

	@Override
	public void CUDOperation(Object entity, String dbQuery) {
		MapSqlParameterSource parameters = new MapSqlParameterSource();

		// Extract field values from the entity
		Class<?> clazz = entity.getClass();
		for (java.lang.reflect.Field field : clazz.getDeclaredFields()) {
			field.setAccessible(true);
			String fieldName = field.getName();
			Object value;

			try {
				value = field.get(entity);
			} catch (IllegalAccessException e) {
				throw new RuntimeException("Error accessing field: " + fieldName, e);
			}

			if (value != null) {
				parameters.addValue(fieldName, value);
			}
		}

		// Execute the SQL query with named parameters
		namedParameterJdbcTemplate.update(dbQuery, parameters);
		
	}

	@Override
	public Long fetchCount(String countQry) {
	    LOGGER.info("Entering fetchCount method of DBUtil class");
	    Long count = 0L;

	    try {
	        count = namedParameterJdbcTemplate.queryForObject(countQry, new MapSqlParameterSource(), Long.class);
	    } catch (final Exception e) {
	        LOGGER.error("Exception occurred in fetchCount method of DBUtil class ", e);
	    }

	    LOGGER.info("Exiting fetchCount method of DBUtil class");
	    return count;
	}

}

