package com.sht.abo.model.ai.aimodel.controller;



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

import com.sht.abo.model.ai.aimodel.service.AiModelService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * AI모델 저장   
 * @author miyoungKim
 *
 */
/**
 * @author miyoungKim
 *
 */
@RestController
public class AiModelController {

	private static final Logger logger = LoggerFactory.getLogger(AiModelController.class);
	
	@Autowired
	private AiModelService service;
	
	
	/**
	 * AI 모델정보 조회 
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/model/aimodel/detail", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO detail(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== detail =====");
    	
    	return service.detail(paramMap);
    }
	
	/**
	 * AI모델 저장  
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/model/aimodel/new", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO add(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
	
	@RequestMapping(value="/model/aimodel/save", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO save(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.update(paramMap);
    }
    
    @RequestMapping(value="/model/aimodel/save-as", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO saveAs(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
    
    @RequestMapping(value="/model/aimodel/delete", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO delete(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.delete(paramMap);
    }
    
    /**
	 * AI 모델별 학습 목록 조회 
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/model/aimodel/selectList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectList =====");
    	return service.selectList(paramMap);
    }
	    
	    
	/**
	 * AI모델 트리 조회 
	 * @param request
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/model/aimodel/selectListForAiModelTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectListForAiModelTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectListForAiModelTree");

    	return service.selectListForAiModelTree(paramMap);
    }
    
    
}
