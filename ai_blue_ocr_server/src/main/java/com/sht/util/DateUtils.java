package com.sht.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
	
	public static final String FORMAT_DATE = "yyyyMMdd";
	
	/**
	 * 오늘 일자 반환
	 * @param type
	 * @return
	 */
	public static String getToday(String type) {
		return getDate(Calendar.getInstance(), type);
	}
	
	
	/**
	 * 특정 일자 반환
	 * @param cal
	 * @param type
	 * @return
	 */
	public static String getDate(Calendar cal, String type) {
		return getDateFormatter(type).format(cal.getTime());
	}


	/**
	 * SimpleDateFormat 반환
	 * @param type
	 * @return
	 */
	public static SimpleDateFormat getDateFormatter(String type) {
		SimpleDateFormat sdf = new SimpleDateFormat(type);
		return sdf;
	}
	
	/**
	 * 오늘 일자 가져오기
	 * @param tbCust
	 * @return
	 * @throws Exception
	 */
	  public static String addDate(int adddate) {
		  SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		  /*2일전 일자 가져오기*/
		  Calendar cal = Calendar.getInstance();
		  cal.setTime(new Date());
		  cal.add(Calendar.DATE, adddate);
	  return dateFormat.format(cal.getTime());
	  }
}