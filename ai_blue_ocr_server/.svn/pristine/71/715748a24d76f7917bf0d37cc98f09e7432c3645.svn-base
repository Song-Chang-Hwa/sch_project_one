package com.sht.abo.segment.seganal.controller;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.comm.service.CommService;
import com.sht.abo.segment.seganal.service.SegAnalService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * 추천세그먼트 > 추천세그먼트 분석  
 * @author miyoungKim
 *
 */
@RestController
public class SegAnalController {

	private static final Logger logger = LoggerFactory.getLogger(SegAnalController.class);
	
	@Autowired
	private SegAnalService service;
	
	/**
	 * 세그먼트분석 데이터항목 조회 
	 * @param request
	 * @param session
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/segment/seganal/selectClustVarList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectClustVarList(HttpServletRequest request, HttpSession session, @RequestParam Map<String, Object> paramMap) throws Exception{
		System.out.println("sddd : "+ service.selectClustVarList(paramMap).getData().toString());
		return service.selectClustVarList(paramMap);
		
	}
    
	
	/**
	 * 분석실행 
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/segment/seganal/execute", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO execute(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.execute(paramMap);
    }
	
	/**
	 * 세그먼트 저장  
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/segment/seganal/save", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO save(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.save(paramMap);
    }
    
}
