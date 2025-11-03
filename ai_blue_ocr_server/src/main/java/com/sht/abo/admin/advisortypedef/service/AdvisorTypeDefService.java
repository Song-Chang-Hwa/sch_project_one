package com.sht.abo.admin.advisortypedef.service;


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
public class AdvisorTypeDefService {

	private Logger logger = LoggerFactory.getLogger(AdvisorTypeDefService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	@Transactional(readOnly=true)
	public ComResultVO selectTreeList(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		paramMap.put("TABLE_NAME", this.getTypeTableName((String)paramMap.get("TYPE_KEY")));
		List<Map<String, Object>> list = this.commonBaseDAO.list("AdvisorTypeDefDAO.selectTreeList", paramMap);
//		List<Map<String, Object>> treeList = new ArrayList<Map<String, Object>>();	// 파일정보를 담는 List
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
//		dataMap.put("listData", list);
//		for (Map<String, Object> map : list ) {
//			Map<String, Object> treeMap = map;
//			treeMap.put("id", map.get("FLD_ID"));
//			treeMap.put("parent", 0 == (int)map.get("FLD_PARENT_ID") ? "#" : map.get("FLD_PARENT_ID"));
//			treeMap.put("text", map.get("FLD_NM"));
//			treeList.add(treeMap);
//		}
//		TreeStructure ts = new TreeStructure();
		dataMap.put("list", list);
//		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;

	}
	
	
	/**
	 * 위치 수정 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO updatePos(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		paramMap.put("TABLE_NAME", this.getTypeTableName((String)paramMap.get("TYPE_KEY")));
		
		// 후순위 뒤로 
		int cnt = (int) this.commonBaseDAO.update("AdvisorTypeDefDAO.updateSrtOrdEx", paramMap);
		cnt = (int) this.commonBaseDAO.update("AdvisorTypeDefDAO.updatePos", paramMap);
		
		if (cnt > 0) {
			// 전체 재정렬 
			cnt = (int) this.commonBaseDAO.update("AdvisorTypeDefDAO.updateSrtOrdAll", paramMap);
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
		}
		return comResultVO;
	}
	
	/**
	 * 유형명 수정
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO updateName(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		paramMap.put("TABLE_NAME", this.getTypeTableName((String)paramMap.get("TYPE_KEY")));
		int hresult1 = (int) this.commonBaseDAO.update("AdvisorTypeDefDAO.updateName", paramMap);
		
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
		Map<String, Object> dataMap = new HashMap<String, Object>();
		Map<String, Object> infoMap = new HashMap<String, Object>();
	   	
		paramMap.put("TABLE_NAME", this.getTypeTableName((String)paramMap.get("TYPE_KEY")));
		Object fldId = this.commonBaseDAO.insert("AdvisorTypeDefDAO.insert", paramMap);
	   	
		if (fldId != null) {
			infoMap = paramMap;
			infoMap.put("id", fldId);
			infoMap.put("text", fldId+":"+paramMap.get("FLD_NM"));
			infoMap.put("FLD_ID", fldId);
			dataMap.put("typeinfo", infoMap);
			comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
			comResultVO.setData(dataMap);
		} else {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
		}
		return comResultVO;
	}
	
	/**
	 * 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO delete(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();
		
		paramMap.put("TABLE_NAME", this.getTypeTableName((String)paramMap.get("TYPE_KEY")));
		
		// 1. 하위폴더 확인 
		int hresult1 = (int) this.commonBaseDAO.selectByPk("AdvisorTypeDefDAO.selectChildCount", paramMap);
		
		if (hresult1 > 0) {
			comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
			comResultVO.setMsg("하위 항목이 있습니다.");
		}
		else {
			// 2. 관련데이터 없을경우에만 삭제 
			paramMap.put("MSTR_TABLE_NAME", this.getMstrTableName((String)paramMap.get("TYPE_KEY")));
			hresult1 = (int) this.commonBaseDAO.selectByPk("AdvisorTypeDefDAO.selectMstrCount", paramMap);
			
			if (hresult1 > 0) {
				comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
				comResultVO.setMsg("관련된 추천 데이터가 있습니다.\n삭제할 수 없습니다.");
			} else {
				hresult1 = (int) this.commonBaseDAO.delete("AdvisorTypeDefDAO.delete", paramMap);
				
				if (hresult1 > 0) {
					comResultVO.setCode(ABOConstant.HTTP_STATUS_CREATE_OK);
				} else {
					comResultVO.setCode(ABOConstant.HTTP_STATUS_SERVER_ERROR);
				}
			}
		}
		return comResultVO;
	}
	
	/**
	 * 대상테이블
	 * @param typeKey
	 * @return
	 */
	public String getTypeTableName(String typeKey) {
		String tableName = "WP2_TYPE_SEG_MSTR";
    	switch (typeKey) {
	    	case "SEGMENT":
	    		tableName = "WP2_TYPE_SEG_MSTR";
	    		break;
	    	case "STAT":
	    		tableName = "WP2_TYPE_STATS_MSTR";
	    		break;
	    	case "AI":
	    		tableName = "WP2_TYPE_AI_MSTR";
	    		break;
	    	case "MANUAL":
	    		tableName = "WP2_TYPE_MANUAL_MSTR";
	    		break;
	    	case "PREF":
	    		tableName = "WP2_TYPE_PREF_MSTR";
	    		break;
	    	case "LAYOUT":
	    		tableName = "WP2_TYPE_LAYOUT_MSTR";
	    		break;
	    	case "ITEM":
	    		tableName = "WP2_TYPE_ITEM_MSTR";
	    		break;
	    	case "ABTEST":
	    		tableName = "WP2_TYPE_ABTEST_MSTR";
	    		break;
	    	case "DATASET":
	    		tableName = "WP2_TYPE_DATASET_MSTR";
	    		break;
    	}
    	return tableName;
	}
	
	/**
	 * 관련데이터 테이블
	 * @param typeKey
	 * @return
	 */
	public String getMstrTableName(String typeKey) {
		String tableName = "WP2_SEG_MSTR";
    	switch (typeKey) {
	    	case "SEGMENT":
	    		tableName = "WP2_SEG_MSTR";
	    		break;
	    	case "STAT":
	    		tableName = "WP2_STATS_MSTR";
	    		break;
	    	case "AI":
	    		tableName = "WP2_AI_MSTR";
	    		break;
	    	case "MANUAL":
	    		tableName = "WP2_MANUAL_MSTR";
	    		break;
	    	case "PREF":
	    		tableName = "WP2_PREF_MSTR";
	    		break;
	    	case "LAYOUT":
	    		tableName = "WP2_LAYOUT_MSTR";
	    		break;
	    	case "ITEM":
	    		tableName = "WP2_ITEM_MSTR";
	    		break;
	    	case "ABTEST":
	    		tableName = "WP2_ABTEST_MSTR";
	    		break;
	    	case "DATASET":
	    		tableName = "WP2_SQL_LIST";
	    		break;
    	}
    	return tableName;
	}
}
