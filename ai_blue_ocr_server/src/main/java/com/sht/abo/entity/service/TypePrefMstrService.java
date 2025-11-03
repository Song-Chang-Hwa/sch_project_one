package com.sht.abo.entity.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sht.abo.comm.dao.CommonBaseDAO;


/**
 * WP2_TYPE_PREF_MSTR
 * @author miyoungKim
 *
 */
@Service
public class TypePrefMstrService {

	private Logger logger = LoggerFactory.getLogger(TypePrefMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForTypePrefTree(Map<String, Object> paramMap)throws Exception{
		List<Map<String, Object>> list = this.commonBaseDAO.list("TypePrefMstrDAO.selectListForTypePrefTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		return list;
	}
}
