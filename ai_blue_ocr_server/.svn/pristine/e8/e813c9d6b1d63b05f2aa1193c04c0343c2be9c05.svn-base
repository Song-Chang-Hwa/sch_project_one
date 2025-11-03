package com.sht.abo.entity.controller;



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

import com.sht.abo.entity.service.PrefImpService;
import com.sht.abo.vo.ComResultVO;

/**
 * WP2_PREF_IMP
 * @author miyoungKim
 *
 */
@RestController
@RequestMapping("/entity/prefimp")
public class PrefImpController {

	private static final Logger logger = LoggerFactory.getLogger(PrefImpController.class);
	
	@Autowired
	private PrefImpService service;
	

    @RequestMapping(value="/selectListForPrefImpGrid", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectListForPrefImpGrid(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForPrefImpGrid =====");
    	
    	return service.selectListForPrefImpGrid(paramMap);
    }
    
//	@RequestMapping(value="/save", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
//	public ComResultVO save(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
//    	final String username = CommUtils.getUser();
//    	logger.debug("username: {}", username);
//    	paramMap.put("USER_NO", username);
//    	
//		return service.update(paramMap);
//    }
//    
//    @RequestMapping(value="/save-as", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
//	public ComResultVO saveAs(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
//    	final String username = CommUtils.getUser();
//    	logger.debug("username: {}", username);
//    	paramMap.put("USER_NO", username);
//    	
//		return service.insert(paramMap);
//    }
//    
//    @RequestMapping(value="/delete", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
//	public ComResultVO delete(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
//    	final String username = CommUtils.getUser();
//    	logger.debug("username: {}", username);
//    	paramMap.put("USER_NO", username);
//    	
//		return service.delete(paramMap);
//    }
//    
//    @RequestMapping(value="/new", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
//	public ComResultVO add(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
//    	final String username = CommUtils.getUser();
//    	logger.debug("username: {}", username);
//    	paramMap.put("USER_NO", username);
//    	
//		return service.insert(paramMap);
//    }
    
//    @RequestMapping(value="/selectListForStatsCheckableTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
//	public List<Map<String, Object>> selectListForStatsCheckableTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
//    	logger.debug("selectListForStatsCheckableTree");
//    	
//    	final String id = (String) paramMap.get("id");
//    	int FLD_PARENT_ID = 0;
//    	if (null != id && !"#".equals(id)) {
//    		final String FLD_ID = id.substring(1);// 앞에 T 제거
//    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
//    	}
//		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
//    	
//    	return service.selectListForStatsCheckableTree(paramMap);
//    }
}
