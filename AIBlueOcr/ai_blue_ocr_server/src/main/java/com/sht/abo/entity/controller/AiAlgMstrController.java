package com.sht.abo.entity.controller;



import java.util.HashMap;
import java.util.List;
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

import com.sht.abo.entity.service.AiAlgMstrService;
import com.sht.abo.entity.service.ItemMstrService;
import com.sht.abo.vo.ComResultVO;

/**
 * WP2_ITEM_MSTR
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("/entity/aialgmstr")
public class AiAlgMstrController {

	private static final Logger logger = LoggerFactory.getLogger(AiAlgMstrController.class);
	
	@Autowired
	private AiAlgMstrService service;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/entity/aialgmstr/selectList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectList");
    	return service.selectList(paramMap);
    }
}
