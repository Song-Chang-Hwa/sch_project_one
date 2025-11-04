package com.sht.util;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;

import com.xroshot.openapi.sdk.ApiClient;
import com.xroshot.openapi.sdk.MessageRequest.FmsMessageRequest;
import com.xroshot.openapi.sdk.MessageRequest.MmsMessageRequest;
import com.xroshot.openapi.sdk.MessageRequest.SmsMessageRequest;
import com.xroshot.openapi.sdk.MessageRequest.VmsMessageRequest;
import com.xroshot.openapi.sdk.ReportRequest;
import com.xroshot.openapi.sdk.ReserveRequest;
import com.xroshot.openapi.sdk.Response;

public class OpenApiJavaSdkUtil {
//	@Value("${kt.apiKey}")
//	private static String apiKey;
//	
//	@Value("${kt.passwd}")
//	private static String passwd;
	
//	private static final String id = "dev0017";

	/*
	 * 1센터: https://openapi1.xroshot.com/V1
	 * 2센터: https://openapi2.xroshot.com/V1
	 * 차세대: https://openapis.xroshot.com/V1
	 */
/************** 개발**************************/
	private static final String apiKey = "";
	private static final String passwd = "";
	private static final String apiServer = "";
/********************************************/
/************** 운영**************************/
//	private static final String apiKey = "";
//	private static final String passwd = "";
//	private static final String apiServer = "";
/********************************************/

	private ApiClient client = null;

	// ApiClient 객체는 재사용이 가능하며 thread-safe 합니다.
	private ApiClient getClient() {
		if (client == null) {
			client = new ApiClient(apiKey, passwd, apiServer);
		}
		return client;
	}
	
	/*단건용*/
	public JSONObject sendSms(String CALL_TEL_NO,Map<String, Object> sendMap) {
		List<Map<String, Object>> sendList =  new ArrayList<Map<String, Object>>();
		sendList.add(sendMap);
		return this.sendSms(CALL_TEL_NO,sendList);
	}
	
	/*다건용*/
	public JSONObject sendSms(String CALL_TEL_NO,List<Map<String, Object>> sendList) {
		
//		Map sendMap = new HashMap<String, String>();
		String TARGET_TEL_NO = "";
		String MESSAGE = "";

		JSONParser parser = new JSONParser(); 
		JSONObject json  = new JSONObject();
		JSONObject rs  = new JSONObject();
		SmsMessageRequest req = new SmsMessageRequest();
		
		if(sendList.size() == 1) {
			/*단건 전송용*/
			for(Map<String, Object> sendMap : sendList) 
			{
				TARGET_TEL_NO = "";
				MESSAGE = "";
				TARGET_TEL_NO =  (String)sendMap.get("TARGET_TEL_NO");
				MESSAGE = (String)sendMap.get("MESSAGE");
				req.setSingleMessage(TARGET_TEL_NO, MESSAGE);
			}
		} else if(sendList.size() > 1) {
            /*다건 전송용*/
			int idx = 0;
			for(Map<String, Object> sendMap : sendList) 
			{
				TARGET_TEL_NO = "";
				MESSAGE = "";
				
				idx++;
				TARGET_TEL_NO =  (String)sendMap.get("TARGET_TEL_NO");
				MESSAGE = (String)sendMap.get("MESSAGE");
				req.addMultiMessage(idx, TARGET_TEL_NO, MESSAGE);
			}
		}
		

		req.setCallbackNumber(CALL_TEL_NO);
		
		ApiClient client = getClient();
		Response res = client.sendMessage(req);
		Integer httpCode = res.getHttpResponseCode();



		Exception error=null;
		String bodyString="";
		try {
			if(httpCode!=null) {
				error = res.getError();
				bodyString = res.getBodyString();
				json = (JSONObject) parser.parse(bodyString);
			}
			else {
				error = null;
				httpCode = 0;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}

 

		rs.put("httpCode", httpCode);
		rs.put("error", error);
		rs.put("json", json);
		return rs;
	}
	
	public JSONObject sendSms2_back(String targetNo,String CallNo,String message) throws Exception {
		JSONParser parser = new JSONParser(); 
		JSONObject json  = new JSONObject();
		JSONObject rs  = new JSONObject();
		
		
		SmsMessageRequest req = new SmsMessageRequest();
		{
			req.setSingleMessage(targetNo, message);
		}
		req.setCallbackNumber(CallNo);
		
		ApiClient client = getClient();
		Response res = client.sendMessage(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();


		json = (JSONObject) parser.parse(bodyString);
		

		rs.put("httpCode", httpCode);
		rs.put("error", error);
		rs.put("json", json);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + jsonObj);
		return rs;
	}
	/*
	 * 메시지 전송 - SMS
	 */
	public void sendSmsbackup() throws Exception {
		SmsMessageRequest req = new SmsMessageRequest();
		

		// '단건'/'동보'/'대량' 전송에 따라 구분하여 설정합니다. (이하 모든 발송에서 동일합니다.)

		// # 단건 발송 경우.
		{
			req.setSingleMessage("01099990001", "SMS 단건 본문입니다.");
		}
		// 단건, Callback Url 사용할 경우.
		{
			req.setSingleMessage("01099990001", "SMS 단건 본문입니다.", "http://www.xroshot.com/"); // callbackUrl을 사용할 경우
		}

		// # 동보 발송 경우.
		{
			req.setBroadMessage("SMS 동보 본문입니다.");

			// 첫 번째 파라미터(seq) : 1, 2, 3, ...
			req.addBroadReceiver(1, "01099990001");
			req.addBroadReceiver(2, "01099990002");
			req.addBroadReceiver(3, "01099990003");
		}

		// # 대량 발송 경우.
		{
			// 첫 번째 파라미터(seq) : 1, 2, 3, ...
			req.addMultiMessage(1, "01099990001", "SMS 대량-1 본문입니다.");
			req.addMultiMessage(2, "01099990002", "SMS 대량-2 본문입니다.");
			req.addMultiMessage(3, "01099990003", "SMS 대량-3 본문입니다.");
		}

		req.setCallbackNumber("01012345678");

/*
 * Option 설정 (문서 참고) (이하 모든 발송에서 동일합니다.)
 *
		req.setSendNumber("01098765432");
		req.setReserveTime("20200101000000"); // 예약시간을 설정할 경우, ReserveType=2 로 설정됩니다.
		req.setReserveDTime("20200101235900");
		req.setCustomMessageId("mysend");
		req.setCdrId("test_id_2");
		req.setCdrTime("20200101000000");
*/

		ApiClient client = getClient();
		Response res = client.sendMessage(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();

//		JSONObject json = parseJson(bodyString);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);

	}

	/*
	 * 메시지 전송 - LMS / MMS
	 */
	public void sendMms() throws Exception {

		MmsMessageRequest req = new MmsMessageRequest();

		// # 장문(LMS) 발송 경우.
		{
			req.setSingleMessage("01099990001", "LMS 단건 본문입니다.", "제목"); // 동보/대량 형식은 sendSms() 참고

			req.setMessageSubType(1);
		}

		// # 파일 첨부 발송 경우.
		{
			req.setSingleMessage("01099990001", "MMS 단건 본문입니다.", "제목");

			// 파일은 최대 3개 까지 가능합니다.
			req.addAttachFile(new File("D:\\attachment\\attach-1.jpg"));
			req.addAttachFile(new File("D:\\attachment\\attach-2.jpg"));
			req.setMessageSubType(3); // 이미지=3, 오디오=4, 비디오=5
		}

		req.setCallbackNumber("01012345678");

		ApiClient client = getClient();
		Response res = client.sendMessage(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();

//		JSONObject json = parseJson(bodyString);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);

	}

	/*
	 * 메시지 전송 - VMS
	 */
	public void sendVms() throws Exception {

		VmsMessageRequest req = new VmsMessageRequest();

		// # 텍스트(TTS 변환) 발송 경우.
		{
			req.setSingleMessage("01099990001", "VMS 단건 본문입니다.", "제목");

			req.setConvertType("TTS_CONV_F");
			req.setMessageSubType(1);
		}

		// # txt 파일(TTS 변환) 발송 경우.
		{
			req.setSingleMessage("01099990001", null, "제목"); // 본문을 설정하면 첨부 재생 후 이어서 재생됩니다.

			req.addAttachFile(new File("D:\\attachment\\attach.txt"));
			req.setConvertType("TTS_CONV_F");
			req.setMessageSubType(1);
		}

		// # *.pcm 음성 파일 발송 경우.
		{
			req.setSingleMessage("01099990001", null, "제목");

			req.addAttachFile(new File("D:\\attachment\\attach.pcm"));
			req.setMessageSubType(1);
		}

		// # 서버에 등록된 컨텐츠(url) 발송 경우.
		{
			List<String> paths = Arrays.asList("/TCSMSG/a/b/c/file.pcm");
			req.setSingleMessage("01099990001", null, "제목", paths);
			req.setMessageSubType(2); // URL(2)로 설정
		}

		req.setCallbackNumber("01012345678");

		ApiClient client = getClient();
		Response res = client.sendMessage(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();

//		JSONObject json = parseJson(bodyString);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);

	}

	/*
	 * 메시지 전송 - FMS
	 */
	public void sendFms() throws Exception {

		FmsMessageRequest req = new FmsMessageRequest();

		// # 텍스트(TTF 변환) 발송 경우.
		{
			req.setSingleMessage("01099990001", "FMS 단건 본문입니다.", "제목");

			req.setMessageSubType(1);
		}

		// # 일반 파일(TTF 변환) 발송 경우.
		{
			req.setSingleMessage("01099990001", null, "제목");

			req.addAttachFile(new File("D:\\attachment\\attach.doc"));
			req.setMessageSubType(3); // Image(3)로 설정
		}

		// # *.tif 팩스 파일 발송 경우.
		{
			req.setSingleMessage("01099990001", null, "제목");

			req.addAttachFile(new File("D:\\attachment\\attach.tif"));
			req.setMessageSubType(3); // Image(3)로 설정
		}

		// # 서버에 등록된 컨텐츠(url) 발송 경우.
		{
			List<String> paths = Arrays.asList("/TCSMSG/a/b/c/file.tif");
			req.setSingleMessage("01099990001", null, "제목", paths);

			req.setMessageSubType(2); // URL(2)로 설정
		}

		req.setCallbackNumber("01012345678");

		ApiClient client = getClient();
		Response res = client.sendMessage(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();

//		JSONObject json = parseJson(bodyString);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);

	}

	/*
	 * 메시지 전송결과 조회 (Report)
	 * (sendDay : 해당 jobId(들)의 발송건이 발송된 날짜. (YYYYMMDD 형식))
	 */
	public void inquiryReport(List<Long> jobIds, String sendDay) throws Exception {

		ReportRequest req = new ReportRequest();

		// 단수/복수 설정 가능.
		//req.setJobId(12345L, sendDay); // 단수 설정
		req.setJobIds(jobIds, sendDay); // 복수 설정

		ApiClient client = getClient();
		Response res = client.inquireReport(req);

		Integer httpCode = res.getHttpResponseCode();
		Exception error = res.getError();
		String bodyString = res.getBodyString();

//		JSONObject json = parseJson(bodyString);
//		System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);

	}

	/*
	 * 예약발송 취소/조회
	 */
	public void inquiryReserve(List<Long> jobIds) throws Exception {

		ReserveRequest req = new ReserveRequest();

		req.setType(0); // 취소 시 0 으로 설정.
		req.addJobIds(jobIds);

		ApiClient client = getClient();
		Response res = client.inquireReserve(req);

		if (res.isHttpOk()) { // httpCode == 200 OK
			req.setType(1); // 조회 시  1 로 설정.

			Response res2 = client.inquireReserve(req);

			Integer httpCode = res2.getHttpResponseCode();
			Exception error = res2.getError();
			String bodyString = res2.getBodyString();

//			JSONObject json = parseJson(bodyString);
//			System.out.println("httpCode=" + httpCode + ", error=" + error + ", json=" + json);
		}

	}

	/*
	 * OpenAPI SDK에서는 응답으로 JSON 문자열을 반환하며, JSON 객체로 변환하여 사용하려면  JSON 라이브러리가 필요합니다.
	 * ('http://json.org/json-ko.html' 하단의 라이브러리 목록 참고)
	 *
	 * (본 sample은 'JSON-java' 라이브러리를 사용한 예입니다.)
	 */
	private org.json.JSONObject parseJson(String jsonString) throws org.json.JSONException {
		org.json.JSONObject jsonObject = null;
		if (jsonString != null && !jsonString.isEmpty()) {
			jsonObject = new org.json.JSONObject(jsonString);
		}
    	return jsonObject;
	}

}
