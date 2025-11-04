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
import com.sht.abo.vo.ComResultVO;
import com.sht.common.ABOConstant;


/**
 * WP2_TYPE_LAYOUT_MSTR
 * @author miyoungKim
 *
 */
@Service
public class TypeLayoutMstrService {

	private Logger logger = LoggerFactory.getLogger(TypeLayoutMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForTypeLayoutTree(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("TypeLayoutMstrDAO.selectListForTypeLayoutTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
}
