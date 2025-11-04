package com.sht.security.handler;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sht.common.RequestUtil;
import com.sht.common.ABOConstant;
import com.sht.security.RestResultData;

/**
 * 인증(비로그인)이 되지 않았을 경우 발생하는 핸들러
 * @author baboototo 2016. 6. 8.
 */
@Component
public class AuthenticationEntryPointHandler implements AuthenticationEntryPoint {
	private static final Logger logger = LoggerFactory.getLogger(AuthenticationEntryPointHandler.class);

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
		
		if(RequestUtil.isJson(request)) {
			response.setHeader("Content-Type", "application/json; charset=UTF-8");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

			ObjectMapper objectMapper = new ObjectMapper();
			String json = objectMapper.writeValueAsString(new RestResultData("인증 정보가 없습니다.", ABOConstant.HTTP_STATUS_UNAUTHENTICATION));

			PrintWriter out = response.getWriter();
			out.print(json);
			out.flush();
			out.close();
		} else {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
		}
		
	}

}