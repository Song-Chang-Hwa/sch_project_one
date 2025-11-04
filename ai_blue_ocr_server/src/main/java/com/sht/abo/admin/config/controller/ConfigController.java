package com.sht.abo.admin.config.controller;



import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.admin.config.service.ConfigService;
import com.sht.abo.comm.service.CommService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * 추천정의 > 추천유형 정의  
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("api")
public class ConfigController {

	private static final Logger logger = LoggerFactory.getLogger(ConfigController.class);
	
	@Autowired
	private ConfigService service;
	@Autowired
	private CommService commService;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	                                   
    @RequestMapping(value="/admin/config/selectViewList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectViewList");
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
    	return service.selectViewList(paramMap);
    }
    
    @RequestMapping(value="/admin/config/selectCofigMstr", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectCofigMstr(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectCofigMstr");
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
    	return service.selectCofigMstr(paramMap);
    }
    
    
    
}
