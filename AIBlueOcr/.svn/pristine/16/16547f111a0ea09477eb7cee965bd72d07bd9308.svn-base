package com.sht.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.codec.Hex;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class AuthenticationToken {
	private static final Logger logger = LoggerFactory.getLogger(AuthenticationToken.class);
	private static final String MAGIC_KEY = "SHT_MOMS_TOKEN";
	private static final long EXPIRES_TIME =  (((1000L * 60) * 60)  * 24) * 365;


	public static String create(UserDetails userDetails) {

		// 인증토크 유효시간.
		long expires = System.currentTimeMillis() + EXPIRES_TIME;
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		
		logger.debug("인증토큰 유효시간: (" + sdf.format(new Date(expires)) + ")");
		logger.debug("인증토큰 유효시간: (" + expires + ")");
		
		StringBuilder tokenBuilder = new StringBuilder();
		tokenBuilder.append(userDetails.getUsername());
		tokenBuilder.append(":");
		tokenBuilder.append(expires);
		tokenBuilder.append(":");
		tokenBuilder.append(AuthenticationToken.computeSignature(userDetails, expires));

		return tokenBuilder.toString();
	}


	public static String computeSignature(UserDetails userDetails, long expires) {
		StringBuilder signatureBuilder = new StringBuilder();
		signatureBuilder.append(userDetails.getUsername());
		signatureBuilder.append(":");
		signatureBuilder.append(expires);
		signatureBuilder.append(":");
		signatureBuilder.append(userDetails.getPassword());
		signatureBuilder.append(":");
		signatureBuilder.append(AuthenticationToken.MAGIC_KEY);

		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No MD5 algorithm available!");
		}

		return new String(Hex.encode(digest.digest(signatureBuilder.toString().getBytes())));
	}


	public static String getUserName(String authToken) {
		if (null == authToken) return null;

		String[] parts = authToken.split(":");
		return parts[0];
	}


	public static boolean validate(String authToken, UserDetails userDetails) {
		String[] parts = authToken.split(":");
		long now = System.currentTimeMillis();
		long expires = Long.parseLong(parts[1]);
		String signature = parts[2];

		if (logger.isDebugEnabled()) {
			logger.debug("인증토큰 유효시간: (" + expires + " / " + now + ")");
		}

		if (expires < now) {
			logger.error("인증토큰 유효시간이 만료되었습니다. (" + expires + " / " + now + ")");
			return false;
		}
		
		return signature.equals(AuthenticationToken.computeSignature(userDetails, expires));
	}
}
