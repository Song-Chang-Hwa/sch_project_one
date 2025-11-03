package com.sht.security;

import java.util.Map;

public class RestResultData {
	
	
	private String message;
	private int RequestCode;
	private Map<String, ?> resultData;
	
	
	public RestResultData(){}
	
	public RestResultData(String message, int RequestCode){
		this.message = message;
		this.RequestCode = RequestCode;
	}

	public RestResultData(String message, int RequestCode, Map<String, ?> resultData){
		this.message = message;
		this.RequestCode = RequestCode;
		this.resultData = resultData;
	}

	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getRequestCode() {
		return RequestCode;
	}
	public void setRequestCode(int RequestCode) {
		this.RequestCode = RequestCode;
	}
	public Map<String, ?> getResultData() {
		return resultData;
	}
	public void setResultData(Map<String, ?> resultData) {
		this.resultData = resultData;
	}
	
	
}
