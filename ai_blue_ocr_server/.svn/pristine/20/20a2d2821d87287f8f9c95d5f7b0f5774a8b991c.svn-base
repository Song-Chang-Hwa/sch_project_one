package com.sht.abo.user.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sht.abo.comm.dao.CommonBaseDAO;
import com.sht.abo.vo.ComResultVO;

@Service
public class UserService {

	private Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private CommonBaseDAO commonBaseDAO;


	/**
	 * Login
	 * @param tbUser
	 * @return
	 * @throws Exception
	 */
	@Transactional(readOnly = true)
	public ComResultVO selectUserLogin(String userId) throws Exception {
		return new ComResultVO(this.commonBaseDAO.selectByPk("CommDAO.selectUserLogin", userId));
	}
	
	
	/**
	 * LoginErrCnt
	 * @param tbUser
	 * @return
	 * @throws Exception
	 */
	@Transactional(readOnly = true)
	public Map<String,Object> selectUserLoginErrCnt(Map<String, Object> paramMap) throws Exception {
		return (Map<String,Object>)(this.commonBaseDAO.selectByPk("CommDAO.selectUserLoginErrCnt", paramMap));
	}

	/**
	 * 사용자 정보 조회
	 * @param tbUser
	 * @return
	 * @throws Exception
	 */
	@Transactional(readOnly = true)
	public ComResultVO selectUserLoginInfo(String userId) throws Exception {
		return new ComResultVO(this.commonBaseDAO.selectByPk("CommDAO.selectUserLoginInfo", userId));
	}
	
	
	/**
	 * 공통 화면 접근 로그 입력.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void insertFailLoginLog(String userId)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.insertFailLoginLog", userId);
	}
	
	/**
	 * 공통 화면 접근 로그 입력.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void insertSuccessLoginLog(String userId)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.insertSuccessLoginLog", userId);
	}
	
	
	/**
	 * 공통 화면 접근 로그 입력.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void insertFailLoginLogDetail(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.insertFailLoginLogDetail", paramMap);
	}
	
	/**
	 * 공통 화면 접근 로그 입력.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void insertSuccessLoginLogDetail(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.insertSuccessLoginLogDetail", paramMap);
	}

	
	
	/**
	 *LOG OUT.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void logout(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.logout", paramMap);
	}
	
	
	/**
	 *LOG OUT.
	 * @param httpRequest
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public void login(Map<String, Object> paramMap)throws Exception{
		Map<String, Object> result = new HashMap();
		this.commonBaseDAO.update("CommDAO.loginLog", paramMap);
	}
	
	
	
	
	
	/**
	 * 사용자 정보 조회
	 * @param tbUser
	 * @return
	 * @throws Exception
	 */
	@Transactional(readOnly = true)
	public ComResultVO autologoinChk(Map<String, Object> paramMap) throws Exception {
		return new ComResultVO(this.commonBaseDAO.selectByPk("CommDAO.autologoinChk", paramMap));
	}
	@Transactional(readOnly = true)
	public ComResultVO logChk(Map<String, Object> paramMap) throws Exception {
		return new ComResultVO(this.commonBaseDAO.selectByPk("CommDAO.logChk", paramMap));
	}
	@Transactional(readOnly = true)
	public void logupd(Map<String, Object> paramMap) throws Exception {
		this.commonBaseDAO.update("CommDAO.logupd", paramMap);
	}
}
