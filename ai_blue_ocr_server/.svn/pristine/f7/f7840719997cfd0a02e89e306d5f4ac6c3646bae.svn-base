package com.sht.abo.model.manual.service;


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
 * 편성기반 - manual
 * @author miyoungKim
 *
 */
@Service
public class ManualMstrService {

	private Logger logger = LoggerFactory.getLogger(ManualMstrService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForManualTree(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListForManualTree", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return list;
	}
	
	@Transactional
	public ComResultVO update(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		Map<String, Object> manualParam = (Map<String, Object>) paramMap.get("manual");
		manualParam.put("case", "update");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListByManualNm", manualParam);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Manual이 존재합니다.");
			
		} else {
			int hresult1 = (int) this.commonBaseDAO.update("ManualMstrDAO.update", manualParam);
			
			final Integer MANUAL_ID = (Integer) manualParam.get("MANUAL_ID");
			logger.debug("MANUAL_ID: {}", MANUAL_ID);
			
			if (hresult1 > 0) {
				this.commonBaseDAO.delete("ManualItemDAO.deleteByManualId", manualParam);
				
				List<Map<String, Object>> manualItemListParam = (List<Map<String, Object>>) paramMap.get("manualItemList");
				if (null != manualItemListParam && 0 < manualItemListParam.size()) {
					for (int i=0; i<manualItemListParam.size(); i++) {
						final Map<String, Object> manualItem = manualItemListParam.get(i);
						
						manualItem.put("MANUAL_ID", MANUAL_ID);
						
						this.commonBaseDAO.insert("ManualItemDAO.insert", manualItem);
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
		
		int hresult1 = (int) this.commonBaseDAO.update("ManualMstrDAO.delete", paramMap);
		
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
		
		Map<String, Object> manualParam = (Map<String, Object>) paramMap.get("manual");
		manualParam.put("case", "insert");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListByManualNm", manualParam);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Manual이 존재합니다.");
			
		} else {
			this.commonBaseDAO.insert("ManualMstrDAO.insert", manualParam);
			final Integer MANUAL_ID = (Integer) manualParam.get("MANUAL_ID");
			logger.debug("MANUAL_ID: {}", MANUAL_ID);
			
			//
			List<Map<String, Object>> manualItemListParam = (List<Map<String, Object>>) paramMap.get("manualItemList");
			if (null != manualItemListParam && 0 < manualItemListParam.size()) {
				for (int i=0; i<manualItemListParam.size(); i++) {
					final Map<String, Object> manualItem = manualItemListParam.get(i);
					
					manualItem.put("MANUAL_ID", MANUAL_ID);
					
					this.commonBaseDAO.insert("ManualItemDAO.insert", manualItem);
				}
			}
			
		   	Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("MANUAL_ID", MANUAL_ID);
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
			comResultVO.setData(dataMap);
		}
	   	
		return comResultVO;
	}
	
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectListForManualCheckableTree(Map<String, Object> paramMap)throws Exception{
		final List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListForManualCheckableTree", paramMap);
		
		for (Map<String, Object> item : list) {
			final String type = (String) item.get("type");
			
			// parent node인 경우 체크박스가 나오지 않도록 처리
			if ("typeManual".equals(type)) {
				Map<String, Object> aAttr = new HashMap<>();
				aAttr.put("class", "no_checkbox");
				
				item.put("a_attr", aAttr);
			}
		}

		return list;
	}
}
