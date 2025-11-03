package com.sht.abo.main.controller;



import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.main.service.MainService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * 메인화면
 * @author miyoungKim
 *
 */
@RestController
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private MainService service;
	
	
	/**
	 * 전체 추천 유형별 전환율 (최근 10일)
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectTotalRecoRate", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectTotalRecoRate(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
		
		// 최근 열흘 
		String START_DATE = CommUtils.addDays(paramMap.get("END_DATE").replaceAll("-", ""), -10); 
		paramMap.put("START_DATE", START_DATE);
				
		return service.selectTotalRecoRate(paramMap);
		
	}
    
	/**
	 * 일자별 현황 (최근 1달)
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectRecoRateByDate", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectRecoRateByDate(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		// 최근 한달 
		String START_DATE = CommUtils.addMonths(paramMap.get("END_DATE").replaceAll("-", ""), -1); 
		paramMap.put("START_DATE", CommUtils.convertYyyymmddDate(START_DATE, "-"));
		
		return service.selectRecoRateByDate(paramMap);
		
	}
	
	/**
	 * 영역별 전환율 
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectRecoRateTop5ByArea", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectRecoRateTop5ByArea(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		return service.selectRecoRateTop5ByArea(paramMap);
		
	}
	
	/**
	 * 수강신청수
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectEnrollCount", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectEnrollCount(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		// 최근 열흘 
		String START_DATE = CommUtils.addDays(paramMap.get("END_DATE").replaceAll("-", ""), -10); 
		paramMap.put("START_DATE", CommUtils.convertYyyymmddDate(START_DATE, "-"));
				
		return service.selectEnrollCount(paramMap);
		
	}
	
	/**
	 * 선생님별 전환율 
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectRecoRateTop5ByTeacher", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectRecoRateTop5ByTeacher(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		return service.selectRecoRateTop5ByTeacher(paramMap);
		
	}
	
	/**
	 * 최근 기준일 조회 
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectMaxDate", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectMaxDate(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		return service.selectMaxDate(paramMap);
		
	}
	
	/**
	 * 건수 조회 
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/main/selectTotalCount", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectTotalCount(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		return service.selectTotalCount(paramMap);
		
	}
	
	// 추가 : 2022.09.27, 송창화 상무
	@RequestMapping(value="/main/selectTotalCountAutoml", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectTotalCountAutoml(HttpServletRequest request, HttpSession session, @RequestParam Map<String, String> paramMap) throws Exception{
				
		return service.selectTotalCountAutoml(paramMap);
		
	}
		
	
}
