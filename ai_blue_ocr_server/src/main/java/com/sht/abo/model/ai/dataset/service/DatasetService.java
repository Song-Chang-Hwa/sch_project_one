package com.sht.abo.model.ai.dataset.service;


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
import com.sht.util.CommUtils;


/**
 * WP2_PREF_MSTR
 * @author miyoungKim
 *
 */
@Service
public class DatasetService {

	private Logger logger = LoggerFactory.getLogger(DatasetService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public ComResultVO selectList(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("DatasetDAO.selectList", paramMap);
		Map<String, Object> total = (Map<String, Object>) this.commonBaseDAO.selectByPk("DatasetDAO.selectTotalValue", paramMap);
	   	
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("total", total);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;
	}
	
	/**
	 * 저장 
	 * @param listParamMap
	 * @return
	 */
	@Transactional
	public ComResultVO update(List<Map<String, Object>> listParamMap) {
		ComResultVO comResultVO = new ComResultVO();
		//final String username = CommUtils.getUser();
		
		int cnt = 0;
		
		for(Map<String, Object> map : listParamMap) {
			//map.put("USER_NO", username);
	    	cnt += (int) this.commonBaseDAO.update("DatasetDAO.update", map);
		}
		if (cnt == listParamMap.size()) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
			comResultVO.setMsg(listParamMap.size() + "건 중 " + cnt + "건을 처리하였습니다. 처리결과를 확인하십시오.");
		}
		return comResultVO;
	}
}
