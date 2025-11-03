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

import com.sht.abo.entity.service.TypeManualMstrService;

/**
 * 세그먼트 목록 팝업
 * @author miyoungKim
 *
 */
@RestController
@RequestMapping("/entity/typemanualmstr")
public class TypeManualMstrController {

	private static final Logger logger = LoggerFactory.getLogger(TypeManualMstrController.class);
	
	@Autowired
	private TypeManualMstrService service;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
//    @RequestMapping(value="/selectListForManualTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
//	public List<Map<String, Object>> selectListForManualTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
//    	logger.debug("selectListForManualTree");
//    	
//    	final String id = (String) paramMap.get("id");
//    	int FLD_PARENT_ID = 0;
//    	if (null != id && !"#".equals(id)) {
//    		FLD_PARENT_ID = Integer.parseInt(id);
//    	}
//		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
//    	
//    	return service.selectListForManualTree(paramMap);
//    }

	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/selectListForTypeManualTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForTypeManualTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectListForTypeManualTree");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		FLD_PARENT_ID = Integer.parseInt(id);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForTypeManualTree(paramMap);
    }
}
