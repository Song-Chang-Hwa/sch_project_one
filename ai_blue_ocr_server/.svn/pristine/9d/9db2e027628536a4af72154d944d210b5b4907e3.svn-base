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
 * WP2_PREF_IMP
 * @author miyoungKim
 *
 */
@Service
public class PrefImpService {

	private Logger logger = LoggerFactory.getLogger(PrefImpService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public ComResultVO selectListForPrefImpGrid(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefImpDAO.selectListForPrefImpGrid", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;
	}
	
//	@Transactional
//	public ComResultVO update(Map<String, Object> paramMap)throws Exception{
//		
//		ComResultVO comResultVO = new ComResultVO();
//		
//		paramMap.put("case", "update");
//		
//		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListByPrefNm", paramMap);
//		if (0 < list.size()) {
//			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
//			
//			final String FLD_NM = (String) entity.get("FLD_NM");
//			comResultVO.setCode(EDUAIConstant.HTTP_STATUS_FAIL);
//			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Preference가 존재합니다.");
//			
//		} else {
//			int hresult1 = (int) this.commonBaseDAO.update("PrefMstrDAO.update", paramMap);
//			
//			if (hresult1 > 0) {
//				comResultVO.setCode(EDUAIConstant.HTTP_STATUS_OK);
//			} else {
//				comResultVO.setCode(EDUAIConstant.HTTP_STATUS_SERVER_ERROR);
//			}
//		}
//		
//		return comResultVO;
//	}
//	
//	@Transactional
//	public ComResultVO delete(Map<String, Object> paramMap)throws Exception{
//		
//		ComResultVO comResultVO = new ComResultVO();
//		
//		int hresult1 = (int) this.commonBaseDAO.update("PrefMstrDAO.delete", paramMap);
//		
//		if (hresult1 > 0) {
//			comResultVO.setCode(EDUAIConstant.HTTP_STATUS_CREATE_OK);
//		} else {
//			comResultVO.setCode(EDUAIConstant.HTTP_STATUS_SERVER_ERROR);
//		}
//		return comResultVO;
//	}
//	
//	/**
//	 * 생성
//	 * @param paramMap
//	 * @return
//	 * @throws Exception
//	 */
//	@Transactional
//	public ComResultVO insert(Map<String, Object> paramMap)throws Exception{
//		
//		ComResultVO comResultVO = new ComResultVO();
//		
//		paramMap.put("case", "insert");
//		
//		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListByPrefNm", paramMap);
//		if (0 < list.size()) {
//			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
//			
//			final String FLD_NM = (String) entity.get("FLD_NM");
//			comResultVO.setCode(EDUAIConstant.HTTP_STATUS_FAIL);
//			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Preference가 존재합니다.");
//			
//		} else {
//			this.commonBaseDAO.insert("PrefMstrDAO.insert", paramMap);
//			final Integer PREF_ID = (Integer) paramMap.get("PREF_ID");
//			logger.debug("PREF_ID: {}", PREF_ID);
//			
//		   	Map<String, Object> dataMap = new HashMap<String, Object>();
//			dataMap.put("PREF_ID", PREF_ID);
//			
//			comResultVO.setCode(EDUAIConstant.HTTP_STATUS_CREATE_OK);
//			comResultVO.setData(dataMap);
//		}
//	   	
//		return comResultVO;
//	}

//	@Transactional(readOnly=true)
//	public List<Map<String, Object>> selectListForPrefCheckableTree(Map<String, Object> paramMap)throws Exception{
//		final List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListForPrefCheckableTree", paramMap);
//		
//		for (Map<String, Object> item : list) {
//			final String type = (String) item.get("type");
//			
//			// parent node인 경우 체크박스가 나오지 않도록 처리
//			if ("typePref".equals(type)) {
//				Map<String, Object> aAttr = new HashMap<>();
//				aAttr.put("class", "no_checkbox");
//				
//				item.put("a_attr", aAttr);
//			}
//		}
//
//		return list;
//	}
}
