package com.sht.abo.admin.config.service;


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
 * 추천정의 > 추천유형 정의  
 * @author miyoungKim
 *
 */
@Service
public class ConfigService {

	private Logger logger = LoggerFactory.getLogger(ConfigService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	public ComResultVO selectViewList(Map<String, Object> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		
		try {	
		
			List<Map<String, Object>> list = this.commonBaseDAO.list("ViewMstrDAO.selectViewList", paramMap);
			
			Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("list", list);
			dataMap.put("dataCount", list.size());
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
			comResultVO.setData(dataMap);
		} catch(Exception e) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(e.getMessage());
		}

		return comResultVO;
	}
	
	public ComResultVO selectCofigMstr(Map<String, Object> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		
		try {	
		
			Map<String, Object> info = (Map<String, Object>) this.commonBaseDAO.selectByPk("ConfigMstrDAO.selectCofigMstr", paramMap);
			
			Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("info", info);
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
			comResultVO.setData(dataMap);
		} catch(Exception e) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(e.getMessage());
		}

		return comResultVO;
	}
}
