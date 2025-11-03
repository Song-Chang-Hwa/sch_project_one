package com.sht.abo.entity.controller;



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

import com.sht.abo.entity.service.AiMstrService;
import com.sht.abo.vo.ComResultVO;

/**
 * 세그먼트 목록 팝업
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("/entity/aimstr")
public class AiMstrController {

	private static final Logger logger = LoggerFactory.getLogger(AiMstrController.class);
	
	@Autowired
	private AiMstrService service;
	

    @RequestMapping(value="/entity/aimstr/selectListForAiCheckableTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForAiCheckableTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, String[] exceptItemId) throws Exception{
    	logger.debug("===== selectListForAiCheckableTree =====");
    	
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
    	return service.selectListForAiCheckableTree(paramMap);
    }
    
    @RequestMapping(value="/entity/aimstr/selectListForAiTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForAiTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForAiTree =====");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForAiTree(paramMap);
    }
}
