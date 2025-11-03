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
public class SqlListService {

	private Logger logger = LoggerFactory.getLogger(SqlListService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForSqlListTree(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("SqlListDAO.selectListForSqlListTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
	
	public ComResultVO select(Map<String, Object> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		System.out.println("SQL_ID : " + paramMap.get("SQL_ID"));
		List<Map<String, Object>> list = this.commonBaseDAO.list("SqlListDAO.select", paramMap);
		Map<String, Object> dataMap = new HashMap<String, Object>();
		if (null != list && list.size() > 0) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
			dataMap.put("info", list.get(0));
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg("SQL 데이터가 없습니다.");
		}
		
		comResultVO.setData(dataMap);
		return comResultVO;
	}
	
	public ComResultVO vaild(Map<String, Object> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		System.out.println("SQL : " + paramMap.get("SQL"));
		Map<String, Object> dataMap = new HashMap<String, Object>();
		try {
			List<Map<String, Object>> list =this.commonBaseDAO.list("SqlListDAO.vaild",paramMap);
			comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		} catch (Exception e) {
			e.printStackTrace();
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg("SQL이 유효하지 않습니다.");
		}
		comResultVO.setData(dataMap);
		return comResultVO;
	}

	public ComResultVO vaild2(Map<String, Object> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		try {
			List<Map<String, Object>> list =this.commonBaseDAO.list("SqlListDAO.vaild2",paramMap);
			comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		} catch (Exception e) {
			e.printStackTrace();
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg("롤백이 실패하였습니다.");
		}
		comResultVO.setData(dataMap);
		return comResultVO;
	}
}
