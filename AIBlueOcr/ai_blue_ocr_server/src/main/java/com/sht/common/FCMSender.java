package com.sht.common;

import java.io.IOException;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;



/**
 * FCM Sender Class
 * @author baboototo 2016. 11. 11.
 */
public class FCMSender {

	private static final Logger logger = LoggerFactory.getLogger(FCMSender.class);
	
	private static final String FCM_SERVER_KEY = "AIzaSyBpWCpmKPMeb_nXzT_-U41h01CauquQPuI";
		
    private static FCMSender instance = null;

    /**
     * 구글 전송 FCM URL
     */
    private static final String URL_SEND = "https://fcm.googleapis.com/fcm/send";

    public static final String TYPE_TO = "to";  						// 대상자 APP ID 또는 그룹 ID 또는 주제 ID
    public static final String TYPE_CONDITION = "condition"; 	// 주제 대상 전송시 조건식 사용

    /**
     * FCMSender 생성
     * @return
     */
    public static FCMSender getInstance() {
        if (instance == null) instance = new FCMSender();
        return instance;
    }

    private FCMSender() {}

    /**
     * FCM Notification 전송
     * @param type
     * @param typeParameter
     * @param notificationObject
     * @return
     * @throws IOException
     */
    public String sendNotification(String type, String typeParameter, JSONObject notificationObject) throws IOException {
        return sendNotifictaionAndData(type, typeParameter, notificationObject, null);
    }

    /**
     * FCM Data 전송
     * @param type
     * @param typeParameter
     * @param dataObject
     * @return
     * @throws IOException
     */
    public String sendData(String type, String typeParameter, JSONObject dataObject) throws IOException {
        return sendNotifictaionAndData(type, typeParameter, null, dataObject);
    }

    /**
     * FCM Notification, Data 전송
     * @param type
     * @param typeParameter
     * @param notificationObject
     * @param dataObject
     * @return
     * @throws IOException
     */
    public String sendNotifictaionAndData(String type, String typeParameter, JSONObject notificationObject, JSONObject dataObject) throws IOException {
        String result = null;
        if (type.equals(TYPE_TO) || type.equals(TYPE_CONDITION)) {
            JSONObject sendObject = new JSONObject();
            sendObject.put(type, typeParameter);
            result = sendFcmMessage(sendObject, notificationObject, dataObject);
        }
        return result;
    }

    /**
     * FCM 주제로 Data 전송
     * @param topic
     * @param dataObject
     * @return
     * @throws IOException
     */
    public String sendTopicData(String topic, JSONObject dataObject) throws IOException{
        return sendData(TYPE_TO, "/topics/" + topic, dataObject);
    }

    /**
     * FCM 주제로 Notification 전송
     * @param topic
     * @param notificationObject
     * @return
     * @throws IOException
     */
    public String sendTopicNotification(String topic, JSONObject notificationObject) throws IOException{
        return sendNotification(TYPE_TO, "/topics/" + topic, notificationObject);
    }

    /**
     * FCM 주제로 Notification, Data 전송
     * @param topic
     * @param notificationObject
     * @param dataObject
     * @return
     * @throws IOException
     */
    public String sendTopicNotificationAndData(String topic, JSONObject notificationObject, JSONObject dataObject) throws IOException{
        return sendNotifictaionAndData(TYPE_TO, "/topics/" + topic, notificationObject, dataObject);
    }

    /**
     * FCM 서버 전송
     * @param sendObject - Contains to or condition
     * @param notificationObject - Notification Data
     * @param dataObject - Data
     * @return
     * @throws IOException
     */
    private String sendFcmMessage(JSONObject sendObject, JSONObject notificationObject, JSONObject dataObject) throws IOException {
    	
        HttpPost httpPost = new HttpPost(URL_SEND);

        // 헤더 설정
        httpPost.setHeader("Content-Type", "application/json");
        httpPost.setHeader("Authorization", "key=" + FCM_SERVER_KEY);

        if (notificationObject != null) sendObject.put("notification", notificationObject);
        if (dataObject != null) sendObject.put("data", dataObject);

        String data = sendObject.toString();
        StringEntity entity = new StringEntity(data, "utf-8");
        

        httpPost.setEntity(entity);

        HttpClient httpClient = HttpClientBuilder.create().build();

        BasicResponseHandler responseHandler = new BasicResponseHandler();
        String response = (String) httpClient.execute(httpPost, responseHandler);
    	
        
        return response;
    }

}