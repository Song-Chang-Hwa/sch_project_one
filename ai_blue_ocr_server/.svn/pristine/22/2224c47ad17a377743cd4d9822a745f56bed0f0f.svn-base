package com.sht.abo.comm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sht.abo.comm.dao.CommonBaseDAO;
import com.sht.abo.vo.ComResultVO;
import com.sht.common.ABOConstant;
import com.sht.util.CommUtils;

import kr.co.stc.core.util.StringUtil;

@Service
public class CommService {

	private Logger logger = LoggerFactory.getLogger(CommService.class);

	@Autowired
	private CommonBaseDAO commonBaseDAO;
	
	/**
	 * 서버 접속 테스트.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO connectTest(HttpServletRequest request)throws Exception{
    	Map<String, Object> map = new HashMap<String, Object>();       
    	String ip = "";
    	ip =  CommUtils.getClientIP(request) ;
        map.put("ip", ip);
        ComResultVO comResultVO = new ComResultVO(map);
        comResultVO.setMsg(ABOConstant.RESULT_OK);
		return comResultVO;
	}
	
	/**
	 * 디비 접속 테스트.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO connectTestDb1(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		return new ComResultVO(this.commonBaseDAO.selectByPk("CommDAO.selectTest", paramMap));
	}
	
	
	/**
	 * 공통 화면 접근 로그 입력.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public ComResultVO insertCommonLog(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		return new ComResultVO(this.commonBaseDAO.update("CommDAO.insertCommonLog", paramMap));
	}
	
	/**
	 * 메뉴를 조회를 한다.
	 * @param vo
	 * @return List
	 * @throws Exception
	 */
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectGetMenuList(Map<String, String> paramMap) throws Exception{
		
		List<Map<String, Object>> selectGetMenuList = this.commonBaseDAO.list("CommDAO.selectGetMenuList", paramMap);
		
		return selectGetMenuList;
		
	}
	
	/**
	 * 현재 메뉴를 조회를 한다.
	 * @param vo
	 * @return List
	 * @throws Exception
	 */
	@Transactional(readOnly=true)
	public List<Map<String, Object>> selectGetMenuCurrent(Map<String, String> paramMap) throws Exception{
		
		List<Map<String, Object>> selectGetMenuCurrent = this.commonBaseDAO.list("CommDAO.selectGetMenuCurrent", paramMap);
		
		return selectGetMenuCurrent;
		
	}
	
	/**
	 * 병원아이디를 조회 한다.
	 * @param vo
	 * @return List
	 * @throws Exception
	 */
	@Transactional(readOnly=true)
	public String selectHsptId(String userId) throws Exception{
		return (String)this.commonBaseDAO.selectByPk("CommDAO.selectHsptId", userId);
		
	}
	
 
	/**
	 * 웹에 접근 가능한 키를 생성한다.
	 * @param vo
	 * @return List
	 * @throws Exception
	 */
	@Transactional(readOnly=true)
	public String selectWebAccKey() throws Exception{
		return (String)this.commonBaseDAO.selectByPk("CommDAO.selectWebAccKey", "");
		
	}

	@Transactional(readOnly=true)
	public ComResultVO selectCodelist(Map<String, Object> paramMap)throws Exception{
		
		ComResultVO comResultVO = new ComResultVO();

		List<Map<String, Object>> list = this.commonBaseDAO.list("CommDAO.selectCodeList", paramMap);
	   	Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("list", list);
		dataMap.put("dataCount", list.size());
		
		comResultVO.setCode(ABOConstant.HTTP_STATUS_OK);
		comResultVO.setData(dataMap);
		return comResultVO;

	}
	
}
