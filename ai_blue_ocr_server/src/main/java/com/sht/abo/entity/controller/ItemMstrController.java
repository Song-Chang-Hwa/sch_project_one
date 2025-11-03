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

import com.sht.abo.entity.service.ItemMstrService;

/**
 * WP2_ITEM_MSTR
 * @author miyoungKim
 *
 */
@RestController
@RequestMapping("/entity/itemmstr")
public class ItemMstrController {

	private static final Logger logger = LoggerFactory.getLogger(ItemMstrController.class);
	
	@Autowired
	private ItemMstrService service;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/selectListForItemTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForItemTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, String[] exceptItemId) throws Exception{
    	logger.debug("selectListForItemTree");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
		
//		String[] selectedItemIdList = {"1001"};
		if (0 < exceptItemId.length) {
			paramMap.put("exceptItemId", exceptItemId);
		}
		
		// 
		return service.selectListForItemTree(paramMap);
    }
}
