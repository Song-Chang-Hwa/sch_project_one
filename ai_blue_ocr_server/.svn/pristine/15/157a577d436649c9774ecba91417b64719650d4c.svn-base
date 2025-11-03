package com.sht.abo.simulation.individual.controller;



import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.simulation.individual.service.IndividualService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * 추천세그먼트 > 추천세그먼트 분석  
 * @author miyoungKim
 *
 */
@RestController
public class IndividualController {

	private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);
	
	@Autowired
	private IndividualService service;
	
	/**
	 * 분석실행 
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/simulation/individual/selectList", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.selectList(paramMap);
    }
    
}
