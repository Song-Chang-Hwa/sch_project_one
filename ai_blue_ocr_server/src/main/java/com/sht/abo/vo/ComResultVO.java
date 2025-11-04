package com.sht.abo.vo;

import java.util.List;

import com.sht.common.ABOConstant;


public class ComResultVO {

	private int code;
	private String msg = "";
	private String dataCount = "";
	private Object data;
	
	
	public ComResultVO(){
		this.code = ABOConstant.HTTP_STATUS_OK;
		this.msg 	= ABOConstant.RESULT_OK;
	}
	
	public ComResultVO(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}
	
	public ComResultVO(int code, String msg, Object data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}
	
	public ComResultVO(int code, String msg, Object data, String dataCount) {
		this.code = code;
		this.msg = msg;
		this.data = data;
		this.dataCount = dataCount;
	}

	public ComResultVO(Object data) {
		this.code 	= ABOConstant.HTTP_STATUS_OK;
		this.msg 	= ABOConstant.RESULT_OK;
		this.data = data;
	}
	
	public ComResultVO(List data) {
		this.code 	= ABOConstant.HTTP_STATUS_OK;
		this.msg 	= ABOConstant.RESULT_OK;
		this.dataCount = String.valueOf(data.size());
		this.data = data;
	}
	
	public ComResultVO(Object data, String dataCount) {
		this.code 	= ABOConstant.HTTP_STATUS_OK;
		this.msg 	= ABOConstant.RESULT_OK;
		this.data = data;
		this.dataCount = dataCount;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}	
	

	public void setDataCount(String dataCount) {
		this.dataCount = dataCount;
	}	
	
	public String getDataCount() {
		return dataCount;
	}	
	

}