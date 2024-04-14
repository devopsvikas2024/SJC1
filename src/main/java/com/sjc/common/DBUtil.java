package com.sjc.common;

import java.util.List;
import java.util.Map;

import com.sjc.entity.Asset;
import com.sjc.entity.AssetClassification;
import com.sjc.entity.Family;
import com.sjc.entity.Location;
import com.sjc.entity.Member;
import com.sjc.entity.User;


/**
 * The Interface DBUtil.
 *
 * @param <T> the generic type
 */
public interface DBUtil<T> {

	/**
	 * Cud operation.
	 *
	 * @param entity  the entity
	 * @param dbQuery the db query
	 */
	void CUDOperation(T entity, String dbQuery);

	/**
	 * Fetch datas.
	 *
	 * @param dbQuery the db query
	 * @param cls  the cls
	 * @param params  the params
	 * @return the list
	 */
     List<T> fetchDatas(String dbQuery, Class<T> cls, Map<String, String> params);

	
	Long fetchCount(String countQry);

	
}
