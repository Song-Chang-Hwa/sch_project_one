package com.sht.abo.recognition.controller;



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
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sht.abo.recognition.service.RecognitionService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.CommUtils;

/**
 * OCR 인식/추출 관리
 * 
 * @author
 *
 */
@RestController
@RequestMapping("/recognition")
public class RecognitionController {

	private static final Logger logger = LoggerFactory.getLogger(RecognitionController.class);
	
	@Autowired
	private RecognitionService recognitionService;
	
	@RequestMapping(value="/selectOcrDocMstList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocMstList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return recognitionService.selectOcrDocMstList(paramMap);
    }
	
	@RequestMapping(value="/ocrDocFileUpload", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public ComResultVO ocrFileUpload(MultipartHttpServletRequest multipartHttpServletRequest) throws Exception{
    	
    	ComResultVO rs = this.recognitionService.ocrDocFileUpload(multipartHttpServletRequest);
    	
    	
    	if(rs.getCode() == 200) {
    		rs = this.recognitionService.pythinExec((Map)rs.getData());
    	}

    	return new ComResultVO();
    }
	
	@RequestMapping(value="/deleteOcrDocMst", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public ComResultVO deleteOcrDocMst(@RequestBody Map<String, Object> paramMap) throws Exception{
    	return this.recognitionService.deleteOcrDocMst(paramMap);
    }
	
	@RequestMapping(value="/selectOcrDocDetailList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocDetailList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return recognitionService.selectOcrDocDetailList(paramMap);
    }
	
	@RequestMapping(value="/selectOcrDocTextList", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocTextList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	String userId = CommUtils.getUser();

    	// paramMap의 pageNo PAGESIZE 페이지 세팅을 해준다
    	paramMap.put("userId", userId);
    	CommUtils.setPageMap(paramMap);
    	
    	return recognitionService.selectOcrDocTextList(paramMap);
    }
	
	@RequestMapping(value="/updateOcrDocTextByTextUpdtNmList", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
    public ComResultVO updateOcrDocTextByTextUpdtNmList(@RequestBody List<Map<String, Object>> listParamMap) throws Exception{
    	return this.recognitionService.updateOcrDocTextByTextUpdtNmList(listParamMap);
    }
	
	@RequestMapping(value="/selectOcrDocTextAverageScore", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO selectOcrDocTextAverageScore(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
    	return recognitionService.selectOcrDocTextAverageScore(paramMap);
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
}
