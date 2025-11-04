package com.sht.abo.entity.controller;



import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.entity.service.AlgParamService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * WP2_ITEM_MSTR
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("/entity/aialgmstr")
public class AlgParamController {

	private static final Logger logger = LoggerFactory.getLogger(AlgParamController.class);
	
	@Autowired
	private AlgParamService service;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/entity/algParam/selectList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectList");
    	return service.selectList(paramMap);
    }
    
    
    /**
     * 저장 
     * @param request
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/entity/algParam/update", method=RequestMethod.POST )
    public ComResultVO update(HttpServletRequest request, @RequestBody List<Map<String, Object>> listParamMap) throws Exception{
    	logger.debug("update: {}", listParamMap);
    	
    	return service.update(listParamMap);
    	
    }
}
