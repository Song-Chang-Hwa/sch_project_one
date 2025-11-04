package com.sht.exception;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class GlobalDefaultExceptionHandler {
	
	private Logger logger = LoggerFactory.getLogger(GlobalDefaultExceptionHandler.class);
    
    @ExceptionHandler(value = Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody Map<String, String> defaultErrorHandler(HttpServletRequest req, Exception e, DataAccessException de) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("err_msg", e.getMessage());
        logger.error(e.getMessage());
        logger.error(de.getMessage());
        return map;
    }
}