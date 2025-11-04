package com.sht.abo.user.controller;

import java.lang.management.ManagementFactory;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sht.abo.user.service.UserService;
import com.sht.abo.vo.ComResultVO;
import com.sht.util.BrowserURLEncoder;
import com.sht.util.CommUtils;



@RestController
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	

 
	@RequestMapping(value="/api/logout", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO logout(HttpServletRequest request,  HttpServletResponse response, @RequestParam Map<String, Object> paramMap
			) throws Exception{
		     String IP = CommUtils.getClientIP(request);
		     String userId = CommUtils.getUser();
 
		     paramMap.put("IP", IP);
		     paramMap.put("userId", userId);

			 userService.logout(paramMap);
			 
			 return new ComResultVO();
	}


	@RequestMapping(value="/api/autologoinChk", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO logoinChk(HttpServletRequest request,  HttpServletResponse response, @RequestParam Map<String, Object> paramMap
			) throws Exception{
		    String IP = CommUtils.getClientIP(request);
		    String userId = CommUtils.getUser();
 
		    paramMap.put("IP", IP);
		    paramMap.put("userId", userId);
		    paramMap.put("PID", ManagementFactory.getRuntimeMXBean().getName());
		     
		    ComResultVO rs = userService.autologoinChk(paramMap);
		    String EXP_YN = (String)((Map<String,Object>)rs.getData()).get("EXP_YN");
		    if("N".equals(EXP_YN)) {
				try {
					userService.login(paramMap);
					userService.insertSuccessLoginLog(userId);
					userService.insertSuccessLoginLogDetail(paramMap);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    }
		    return rs;
			 

	}
	@RequestMapping(value="/api/logchk", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO logchk(HttpServletRequest request,  HttpServletResponse response, @RequestParam Map<String, Object> paramMap
			) throws Exception{
		    String IP = CommUtils.getClientIP(request);
		    String userId = CommUtils.getUser();
		    System.out.println("ip : " + IP);
		    paramMap.put("IP", IP);
		    paramMap.put("userId", userId);
		    paramMap.put("PID", ManagementFactory.getRuntimeMXBean().getName());
		     
		    ComResultVO rs = userService.autologoinChk(paramMap);
		    String EXP_YN = (String)((Map<String,Object>)rs.getData()).get("EXP_YN");
		    if("N".equals(EXP_YN)) {
				try {
					userService.login(paramMap);
					userService.insertSuccessLoginLog(userId);
					userService.insertSuccessLoginLogDetail(paramMap);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    }
		    return rs;
			 

	}
	@RequestMapping(value="/api/logupd", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ComResultVO logupd(HttpServletRequest request,  HttpServletResponse response, @RequestParam Map<String, Object> paramMap
			) throws Exception{
		    String IP = CommUtils.getClientIP(request);
		    String userId = CommUtils.getUser();
		    paramMap.put("IP", IP);
		    paramMap.put("userId", userId);
		    paramMap.put("PID", ManagementFactory.getRuntimeMXBean().getName());
		    userService.logupd(paramMap);
		    return new ComResultVO();

	}
	
	
}
