package com.sht.abo.admin.advisortypedef.controller;



import java.util.ArrayList;
import java.util.HashMap;
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

import com.sht.abo.admin.advisortypedef.service.AdvisorTypeDefService;
import com.sht.abo.api.service.ApiService;
import com.sht.abo.comm.service.CommService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

import kr.co.stc.core.util.StringUtil;

/**
 * 추천정의 > 추천유형 정의  
 * @author miyoungKim
 *
 */
@RestController
//@RequestMapping("api")
public class AdvisorTypeDefController {

	private static final Logger logger = LoggerFactory.getLogger(AdvisorTypeDefController.class);
	
	@Autowired
	private AdvisorTypeDefService service;
	@Autowired
	private CommService commService;
	
	/**
	 * 조회.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	                                   
    @RequestMapping(value="/admin/typedef/selectTreeList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	logger.debug("selectList");
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
    	return service.selectTreeList(paramMap);
    }
    

    
    
    /**
	 * 위치 수정
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value="/admin/typedef/updatePos", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO updatePos(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
//    	paramMap.put("webAccKey",commService.selectWebAccKey());
		return service.updatePos(paramMap);
    }
    
    /**
     * 유형명 수정 
     * @param request
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/admin/typedef/updateName", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO updateName(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
//    	paramMap.put("webAccKey",commService.selectWebAccKey());
		return service.updateName(paramMap);
    }
    
    /**
     * 생성 
     * @param request
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/admin/typedef/insert", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO insert(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
//    	paramMap.put("webAccKey",commService.selectWebAccKey());
		return service.insert(paramMap);
    }
    
    /**
     * 삭제 
     * @param request
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/admin/typedef/delete", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO delete(HttpServletRequest request, @RequestBody Map<String, Object> paramMap) throws Exception{
    	paramMap.put("userId", CommUtils.getUser());
//    	paramMap.put("hsptId",commService.selectHsptId(CommUtils.getUser()));
//    	paramMap.put("webAccKey",commService.selectWebAccKey());
		return service.delete(paramMap);
    }
}
