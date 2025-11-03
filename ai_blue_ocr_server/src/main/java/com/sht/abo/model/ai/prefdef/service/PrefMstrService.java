package com.sht.abo.model.ai.prefdef.service;


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
 * WP2_PREF_MSTR
 * @author miyoungKim
 *
 */
@Service
public class PrefMstrService {

	private Logger logger = LoggerFactory.getLogger(PrefMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public ComResultVO selectListForStatsGrid(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListForPrefGrid", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;
	}
	
	@Transactional
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
	public ComResultVO update(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		Map<String, Object> prefParam = (Map<String, Object>) paramMap.get("pref");
		prefParam.put("case", "update");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListByPrefNm", prefParam);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Preference가 존재합니다.");
			
		} else {
			int hresult1 = (int) this.commonBaseDAO.update("PrefMstrDAO.update", prefParam);
			
			final Integer PREF_ID = (Integer) prefParam.get("PREF_ID");
			logger.debug("PREF_ID: {}", PREF_ID);
			
			if (hresult1 > 0) {
				this.commonBaseDAO.delete("PrefImpDAO.deleteByPrefId", prefParam);
				
				List<Map<String, Object>> prefImpList = (List<Map<String, Object>>) paramMap.get("prefImpList");
				if (null != prefImpList && 0 < prefImpList.size()) {
					for (int i=0; i<prefImpList.size(); i++) {
						final Map<String, Object> prefImp = prefImpList.get(i);
						
						prefImp.put("MANUAL_ID", PREF_ID);
						
						this.commonBaseDAO.insert("PrefImpDAO.insert", prefImp);
					}
				}
				
				comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
			} else {
				comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
			}
		}
		
		return comResultVO;
	}	
	
	@Transactional
	public ComResultVO delete(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		int hresult1 = (int) this.commonBaseDAO.update("PrefMstrDAO.delete", paramMap);
		
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
		ComResultVO comResultVO = new ComResultVO();
		
		Map<String, Object> pref = (Map<String, Object>) paramMap.get("pref");
		pref.put("case", "insert");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("PrefMstrDAO.selectListByPrefNm", pref);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Preference가 존재합니다.");
			
		} else {
			this.commonBaseDAO.insert("PrefMstrDAO.insert", pref);
			final Integer PREF_ID = (Integer) pref.get("PREF_ID");
			logger.debug("PREF_ID: {}", PREF_ID);
			
			//
			List<Map<String, Object>> prefImpList = (List<Map<String, Object>>) paramMap.get("prefImpList");
			if (null != prefImpList && 0 < prefImpList.size()) {
				for (int i=0; i<prefImpList.size(); i++) {
					final Map<String, Object> prefImp = prefImpList.get(i);
					
					prefImp.put("PREF_ID", PREF_ID);
					
					this.commonBaseDAO.insert("PrefImpDAO.insert", prefImp);
				}
			}
			
		   	Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("PREF_ID", PREF_ID);
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
			comResultVO.setData(dataMap);
		}
	   	
		return comResultVO;
	}

	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForPrefTree(Map<String, Object> paramMap)throws Exception{
		return this.commonBaseDAO.list("PrefMstrDAO.selectListForPrefTree", paramMap);
	}
}
