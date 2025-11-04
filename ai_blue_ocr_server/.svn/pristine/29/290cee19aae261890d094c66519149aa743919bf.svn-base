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
 * 세그먼트 목록 팝업
 * @author miyoungKim
 *
 */
@Service
public class TypeSegMstrService {

	private Logger logger = LoggerFactory.getLogger(TypeSegMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForSegTree(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("TypeSegMstrDAO.selectListForSegTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForSegTreeUse(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("TypeSegMstrDAO.selectListForSegTreeUse", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForTypeSegTree(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("TypeSegMstrDAO.selectListForTypeSegTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
}
