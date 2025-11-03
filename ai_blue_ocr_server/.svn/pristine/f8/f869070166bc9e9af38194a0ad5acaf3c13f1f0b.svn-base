package com.sht.abo.model.manual.controller;



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

import com.sht.abo.model.manual.service.ManualMstrService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * 추천모델 > 추천모델 선택  
 * @author miyoungKim
 *
 */
@RestController
public class ManualMstrController {

	private static final Logger logger = LoggerFactory.getLogger(ManualMstrController.class);
	
	@Autowired
	private ManualMstrService service;
	

	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/model/manualmstr/selectListForManualTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForManualTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForManualTree =====");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForManualTree(paramMap);
    }
    
    @RequestMapping(value="/model/manualmstr/selectListForManualCheckableTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForManualCheckableTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, String[] exceptItemId) throws Exception{
    	logger.debug("===== selectListForManualCheckableTree ==1===");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
    	
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
		if (0 < exceptItemId.length) {
			paramMap.put("exceptItemId", exceptItemId);
		}
		logger.debug("===== selectListForManualCheckableTree ==2=={}=", exceptItemId.length);
    	
    	return service.selectListForManualCheckableTree(paramMap);
    }
    
	@RequestMapping(value="/model/manualmstr/save", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO save(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.update(paramMap);
    }
    
    @RequestMapping(value="/model/manualmstr/save-as", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO saveAs(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
    
    @RequestMapping(value="/model/manualmstr/delete", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO delete(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.delete(paramMap);
    }
    
    @RequestMapping(value="/model/manualmstr/new", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO add(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	final String username = CommUtils.getUser();
    	logger.debug("username: {}", username);
    	paramMap.put("USER_NO", username);
    	
		return service.insert(paramMap);
    }
}
