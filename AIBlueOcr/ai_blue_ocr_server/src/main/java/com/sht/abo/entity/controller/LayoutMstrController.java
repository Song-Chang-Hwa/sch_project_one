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

import com.sht.abo.entity.service.LayoutMstrService;
import com.sht.abo.vo.ComResultVO;

/**
 * WP2_LAYOUT_MSTR
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("/entity/layoutmstr")
public class LayoutMstrController {

	private static final Logger logger = LoggerFactory.getLogger(LayoutMstrController.class);
	
	@Autowired
	private LayoutMstrService service;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/entity/layoutmstr/selectListForLayoutTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForLayoutTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("===== selectListForLayoutTree =====");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForLayoutTree(paramMap);
    }
    
    /**
     * 레이아웃 선택 팝업 
	 * @param request
     * @param paramMap
     * @param exceptItemId
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/entity/layoutmstr/selectListForLayoutCheckableTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public List<Map<String, Object>> selectListForLayoutCheckableTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, String[] exceptLayoutId) throws Exception{
    	logger.debug("selectListForLayoutCheckableTree{}", exceptLayoutId.length);
    	
    	if (0 < exceptLayoutId.length) {
			paramMap.put("exceptLayoutId", exceptLayoutId);
		}
    	
    	return service.selectListForLayoutCheckableTree(paramMap);
    }
}
