package com.sht.common;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

public class RequestUtil {
	

	public static boolean isJson(HttpServletRequest request) {
		String accept = StringUtils.lowerCase(request.getHeader("accept"));
		String ajax = request.getHeader("X-Requested-With");

		return ( StringUtils.indexOf(accept, "json") > -1 || StringUtils.isNotEmpty(ajax));
	}
}
