package com.sht.security;

import java.util.List;
import java.util.Map;

public class RestResultListData {
	
	
	private String message;
	private int RequestCode;
	private List<Map<String, Object>> resultData;
	
	
	public RestResultListData(){}
	
	public RestResultListData(String message, int RequestCode){
		this.message = message;
		this.RequestCode = RequestCode;
	}

	public RestResultListData(String message, int RequestCode, List<Map<String, Object>> resultData){
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
	public List<Map<String, Object>> getResultData() {
		return resultData;
	}
	public void setResultData(List<Map<String, Object>> resultData) {
		this.resultData = resultData;
	}
	
	
}
