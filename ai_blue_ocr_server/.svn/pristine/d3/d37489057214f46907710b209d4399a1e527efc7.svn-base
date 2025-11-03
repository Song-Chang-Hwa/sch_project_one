package com.sht.abo.segment.segdef.service;


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
 * 추천정의 > 추천유형 정의  
 * @author miyoungKim
 *
 */
@Service
public class SegDefService {

	private Logger logger = LoggerFactory.getLogger(SegDefService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public ComResultVO selectList(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("SegMstrDAO.selectList", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;
	}
	
	@Transactional
	public ComResultVO update(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		int hresult1 = (int) this.commonBaseDAO.update("SegMstrDAO.update", paramMap);
		
		if (hresult1 > 0) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
		}
		return comResultVO;
	}
	
	@Transactional
	public ComResultVO delete(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		int hresult1 = (int) this.commonBaseDAO.update("SegMstrDAO.delete", paramMap);
		
		if (hresult1 > 0) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
		}
		return comResultVO;
	}
	
	/**
	 * 생성
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO insert(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
//		Map<String, Object> dataMap = new HashMap<String, Object>();
//		Map<String, Object> infoMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("SegMstrDAO.selectListBySegNm", paramMap);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
//		@SuppressWarnings("unchecked")
//		final Map<String, Object> entity = (Map<String, Object>) this.commonBaseDAO.selectByPk("SegMstrDAO.selectBySegNm", paramMap);
//		if (null != entity) {
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 세그먼트가 존재합니다.");
			
		} else {
			this.commonBaseDAO.insert("SegMstrDAO.insert", paramMap);
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		}
	   	
		return comResultVO;
	}

	/**
	 * 선택여부 수정 
	 * @param paramMap
	 * @return
	 */
	@Transactional
	public ComResultVO updateUseYn(List<Map<String, Object>> listParamMap) {
		ComResultVO comResultVO = new ComResultVO();
		final String username = CommUtils.getUser();
		
		int cnt = 0;
		
		for(Map<String, Object> map : listParamMap) {
			map.put("USER_NO", username);
	    	cnt += (int) this.commonBaseDAO.update("SegMstrDAO.updateUseYn", map);
		}
		if (cnt == listParamMap.size()) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
			comResultVO.setMsg(listParamMap.size() + "건 중 " + cnt + "건을 처리하였습니다. 처리결과를 확인하십시오.");
		}
		return comResultVO;
	}
	
//	@Transactional(readOnly=true)
//	public ComResultVO selectBySegIdAndSegNm(Map<String, Object> paramMap)throws Exception{
//		
//		ComResultVO comResultVO = new ComResultVO();
//
//		@SuppressWarnings("unchecked")
//		Map<String, Object> row = (Map<String, Object>) this.commonBaseDAO.selectByPk("SegMstrDAO.selectListBySegNm", paramMap);
//	   	Map<String, Object> dataMap = new HashMap<String, Object>();
//		dataMap.put("row", row);
//		
//		comResultVO.setCode(EDUAIConstant.HTTP_STATUS_OK);
//		comResultVO.setData(dataMap);
//		return comResultVO;
//	}
	
}
