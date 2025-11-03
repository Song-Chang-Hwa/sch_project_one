package com.sht.abo.training.controller;



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

import com.sht.abo.training.service.TrainingService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * OCR AI 학습
 * 
 * @author
 *
 */
@RestController
@RequestMapping("/training")
public class TrainingController {

	private static final Logger logger = LoggerFactory.getLogger(TrainingController.class);
	
	@Autowired
	private TrainingService trainingService;
	
	@RequestMapping(value="/selectOcrDocMstList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocMstList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return trainingService.selectOcrDocMstList(paramMap);
    }
	
	@RequestMapping(value="/selectOcrDocDetailList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocDetailList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return trainingService.selectOcrDocDetailList(paramMap);
    }
	
	@RequestMapping(value="/selectOcrDocTextList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocTextList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return trainingService.selectOcrDocTextList(paramMap);
    }

	@RequestMapping(value="/selectOcrDocTextAverageScore", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocTextAverageScore(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	return trainingService.selectOcrDocTextAverageScore(paramMap);
    }

	@RequestMapping(value="/updateOcrDocText", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public ComResultVO updateOcrDocText(@RequestBody List<Map<String, Object>> listParamMap) throws Exception{
    	return trainingService.updateOcrDocText(listParamMap);
    }
}
