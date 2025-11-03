package com.sht.abo.model.ai.prefdef.controller;



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

import com.sht.abo.model.ai.prefdef.service.PrefMstrService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * WP2_PREF_MSTR
 * @author miyoungKim
 *
 */
@RestController
public class PrefMstrController {

	private static final Logger logger = LoggerFactory.getLogger(PrefMstrController.class);
	
	@Autowired
	private PrefMstrService service;
	

    @RequestMapping(value="/model/prefmstr/selectListForPrefGrid", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectListForPrefGrid(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForPrefGrid =====");
    	
    	return service.selectListForStatsGrid(paramMap);
    }
    
    @RequestMapping(value="/model/prefmstr/selectListForPrefTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForPrefTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectListForPrefTree");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForPrefTree(paramMap);
    }
    
	@RequestMapping(value="/model/prefmstr/save", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO save(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.update(paramMap);
    }
    
    @RequestMapping(value="/model/prefmstr/save-as", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO saveAs(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
    
    @RequestMapping(value="/model/prefmstr/delete", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO delete(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.delete(paramMap);
    }
    
    @RequestMapping(value="/model/prefmstr/new", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO add(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
}
