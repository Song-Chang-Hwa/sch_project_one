package com.sht.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sht.common.AuthenticationToken;
import com.sht.security.service.UserDetailsServiceImpl;


public class PassWordShv {
	
	private static final Logger logger = LoggerFactory.getLogger(PassWordShv.class);
	 
    /**
     * 비밀번호를 암호화하는 기능(복호화가 되면 안되므로 SHA-256 인코딩 방식 적용)
     *
     * @param String data 암호화할 비밀번호
     * @return String result 암호화된 비밀번호
     * @exception Exception
     */
	public PassWordShv() {}
//	@Autowired
//	private PassWordShv passWordShv;
	
    public static String encode(String data) {

	if (data == null) {
	    return "";
	}

	byte[] plainText = null; // 평문
	byte[] hashValue = null; // 해쉬값
	plainText = data.getBytes();
    
	MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	hashValue = md.digest(plainText);
	
	/*
	BASE64Encoder encoder = new BASE64Encoder();
	return encoder.encode(hashValue);
	*/
	return new String(Base64.encodeBase64(hashValue));
    }
    
    public boolean matches(String data1,String data2){
    	boolean rs = false;
    	if(data1.equals(data2)){
    		rs = true;
    	}
    	return rs;
    }
	

	
	
}