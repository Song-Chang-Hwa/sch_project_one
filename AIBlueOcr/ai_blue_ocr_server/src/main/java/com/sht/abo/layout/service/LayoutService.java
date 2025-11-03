package com.sht.abo.layout.service;


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
 * 레이아웃
 * @author miyoungKim
 *
 */
@Service
public class LayoutService {

	private Logger logger = LoggerFactory.getLogger(LayoutService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
//	@Transactional(readOnly=true)
//	public List<Map<String, Object>> selectListForManualTree(Map<String, Object> paramMap)throws Exception{
//		
//		ComResultVO comResultVO = new ComResultVO();
//
//		List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListForManualTree", paramMap);
//	   	Map<String, Object> dataMap = new HashMap<String, Object>();
//		dataMap.put("list", list);
//		
//		comResultVO.setCode(EDUAIConstant.HTTP_STATUS_OK);
//		comResultVO.setData(dataMap);
//		return list;
//	}
	
	@Transactional
	public ComResultVO update(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		Map<String, Object> layoutParam = (Map<String, Object>) paramMap.get("layout");
		layoutParam.put("case", "update");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("LayoutMstrDAO.selectListByLayoutNm", layoutParam);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Layout이 존재합니다.");
			
		} else {
			int hresult1 = (int) this.commonBaseDAO.update("LayoutMstrDAO.update", layoutParam);
			
			final Integer LAYOUT_ID = (Integer) layoutParam.get("LAYOUT_ID");
			logger.debug("LAYOUT_ID: {}", LAYOUT_ID);
			
			if (hresult1 > 0) {
				this.commonBaseDAO.delete("LayoutRecoDAO.deleteByLayoutlId", layoutParam);
				
				List<Map<String, Object>> layoutRecoList = (List<Map<String, Object>>) paramMap.get("layoutRecoList");
				if (null != layoutRecoList && 0 < layoutRecoList.size()) {
					for (int i=0; i<layoutRecoList.size(); i++) {
						final Map<String, Object> layoutReco = layoutRecoList.get(i);
						
						layoutReco.put("LAYOUT_ID", LAYOUT_ID);
						
						this.commonBaseDAO.insert("LayoutRecoDAO.insert", layoutReco);
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
		
		int hresult1 = (int) this.commonBaseDAO.update("LayoutMstrDAO.delete", paramMap);
		
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
		
		Map<String, Object> layoutParam = (Map<String, Object>) paramMap.get("layout");
		layoutParam.put("case", "insert");
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("LayoutMstrDAO.selectListByLayoutNm", layoutParam);
		if (0 < list.size()) {
			final Map<String, Object> entity = (Map<String, Object>) list.get(0);
			
			final String FLD_NM = (String) entity.get("FLD_NM");
			comResultVO.setCode(ABOConstant.HTTP_STATUS_FAIL);
			comResultVO.setMsg(FLD_NM + "유형에 같은 이름의 Layout이 존재합니다.");
			
		} else {
			this.commonBaseDAO.insert("LayoutMstrDAO.insert", layoutParam);
			final Integer LAYOUT_ID = (Integer) layoutParam.get("LAYOUT_ID");
			logger.debug("LAYOUT_ID: {}", LAYOUT_ID);
			
			//
			List<Map<String, Object>> layoutRecoList = (List<Map<String, Object>>) paramMap.get("layoutRecoList");
			if (null != layoutRecoList && 0 < layoutRecoList.size()) {
				for (int i=0; i<layoutRecoList.size(); i++) {
					final Map<String, Object> layoutItem = layoutRecoList.get(i);
					
					layoutItem.put("LAYOUT_ID", LAYOUT_ID);
					
					this.commonBaseDAO.insert("LayoutRecoDAO.insert", layoutItem);
				}
			}
			
		   	Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put("LAYOUT_ID", LAYOUT_ID);
			
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
			comResultVO.setData(dataMap);
		}
	   	
		return comResultVO;
	}
	
//	@Transactional(readOnly=true)
//	public List<Map<String, Object>> selectListForManualCheckableTree(Map<String, Object> paramMap)throws Exception{
//		final List<Map<String, Object>> list = this.commonBaseDAO.list("ManualMstrDAO.selectListForManualCheckableTree", paramMap);
//		
//		for (Map<String, Object> item : list) {
//			final String type = (String) item.get("type");
//			
//			// parent node인 경우 체크박스가 나오지 않도록 처리
//			if ("typeManual".equals(type)) {
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
