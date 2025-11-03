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

import com.sht.abo.entity.service.TypeLayoutMstrService;

/**
 * WP2_TYPE_LAYOUT_MSTR
 * @author miyoungKim
 *
 */
@RestController
@RequestMapping("/entity/typelayoutmstr")
public class TypeLayoutMstrController {

	private static final Logger logger = LoggerFactory.getLogger(TypeLayoutMstrController.class);
	
	@Autowired
	private TypeLayoutMstrService service;
	

	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/selectListForTypeLayoutTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForTypeLayoutTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForTypeLayoutTree =====");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		FLD_PARENT_ID = Integer.parseInt(id);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForTypeLayoutTree(paramMap);
    }
}
