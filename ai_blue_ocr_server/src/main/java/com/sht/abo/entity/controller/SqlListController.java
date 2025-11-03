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

import com.sht.abo.entity.service.SqlListService;
import com.sht.abo.vo.ComResultVO;

/**
 * 세그먼	트 목록 팝업
 * @author miyoungKim
 *
 */
@RestController
public class SqlListController {

	private static final Logger logger = LoggerFactory.getLogger(SqlListController.class);
	
	@Autowired
	private SqlListService service;

	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/entity/sqllist/selectListForSqlListTree", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> selectListForSqlListTree(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectListForSqlListTree");
    	
    	final String id = (String) paramMap.get("id");
    	int FLD_PARENT_ID = 0;
    	if (null != id && !"#".equals(id)) {
    		final String FLD_ID = id.substring(1);// 앞에 T 제거
    		FLD_PARENT_ID = Integer.parseInt(FLD_ID);
    	}
		paramMap.put("FLD_PARENT_ID", FLD_PARENT_ID);
    	
    	return service.selectListForSqlListTree(paramMap);
    }
    
    
    @RequestMapping(value="/entity/sqllist/select", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO select(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("select");
    	return service.select(paramMap);
    }
    
    @RequestMapping(value="/entity/sqllist/vaild", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO vaild(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("vaild");
    	return service.vaild(paramMap);
    }
    
    @RequestMapping(value="/entity/sqllist/vaild2", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO vaild2(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("vaild2");
    	return service.vaild2(paramMap);
    }
}
