package com.sht.abo.main.service;


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
import com.sht.util.DateUtils;

import kr.co.stc.core.util.StringUtil;


/**
 * 추천정의 > 추천유형 정의  
 * @author miyoungKim
 *
 */
@Service
public class MainService {

	private Logger logger = LoggerFactory.getLogger(MainService.class);
	
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	
	/**
	 * 전체 추천 유형별 전환율 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectTotalRecoRate(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		// 최근 10일 
		String START_DATE = CommUtils.addDate(paramMap.get("END_DATE").replaceAll("-", ""), "-", -10); 
		paramMap.put("START_DATE", START_DATE);
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("RecoReportDAO.selectTotalRecoRate", paramMap);
			
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}
	
	/** 일자별 현황 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectRecoRateByDate(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("RecoReportDAO.selectRecoRateByDate", paramMap);
			
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}

	/**
	 * 수강신청수 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectEnrollCount(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("RecoReportDAO.selectEnrollCount", paramMap);
			
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}
	


	/**
	 * 선생님별 전환율 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectRecoRateTop5ByTeacher(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("RecoReportDAO.selectRecoRateTop5ByTeacher", paramMap);
			
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}

	/**
	 * 영역별 전환율 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectRecoRateTop5ByArea(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		List<Map<String, Object>> list = this.commonBaseDAO.list("RecoReportDAO.selectRecoRateTop5ByArea", paramMap);
			
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}
	
	/**
	 * 최근 기준일자 조회 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectMaxDate(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		String END_DATE = DateUtils.getToday("YYYY-MM-DD");
		Map<String, Object> map = (Map<String, Object>) this.commonBaseDAO.selectByPk("RecoReportDAO.selectMaxDate", paramMap);
		if (map != null) {
			END_DATE = (String) map.get("DATE");
		}
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("END_DATE", END_DATE);
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}

	/**
	 * 건수조회 
	 * @param paramMap
	 * @return
	 */
	public ComResultVO selectTotalCount(Map<String, String> paramMap) {
		ComResultVO comResultVO = new ComResultVO();
		
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("totalDocCount", this.commonBaseDAO.selectByPk("MainDAO.selectTotalDocCount", null));
		dataMap.put("totalRecognitionCount", this.commonBaseDAO.selectByPk("MainDAO.selectTotalRecognitionCount", null));
		dataMap.put("totalLearningCount", this.commonBaseDAO.selectByPk("MainDAO.selectTotalLearningCount", null));
		dataMap.put("totalEtcCount", this.commonBaseDAO.selectByPk("MainDAO.selectTotalEtcCount", null));
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);

		return comResultVO;
	}
	
}
