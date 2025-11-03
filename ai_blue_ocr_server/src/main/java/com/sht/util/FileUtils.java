package com.sht.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class FileUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(FileUtils.class);
	
	private static String DEFAULT_URL = "";
	/**
	 * 파일 크기 체크
	 * @param tbCust
	 * @return
	 * @throws Exception
	 */
	  public static boolean fileSizeChk(String text, int size) {
		  boolean rs = true;
		  if(text.length()>0) {
			  if(text.getBytes().length /1024/1024 <  size) {
				  rs = true;
			  }else {
				  rs = false;
			  }
		  }
		  return rs;
	  }
	  
	  
	   //리네임
	   public static void renameFile(String filename, String newFilename) {
	 	    File file = new File( filename );
	 	    File fileNew = new File( newFilename );
	 	    if(fileNew.exists()) {
	 	    	if(fileNew.delete()) { // 기존파일 존재 시 삭제
	 	    		if( file.exists() ) file.renameTo( fileNew );
	 	    		logger.info("down file rename: {} rename to {} ...",filename,newFilename + " ...");
	 	    	}else{
	 	    		try {

	 	    			/// 강제로 예외 발생
	 	    			throw new Exception();
	 	    			} catch(Exception e) {
//	 	    				e.printStackTrace();
	 	    				logger.error("error fail rename {} rename to {} ..\n", filename,newFilename + "error : " + e.toString());
	 	    	            return;
	 	    			}

	 	    	}
	 	    }else {
	 	    	if( file.exists() ) file.renameTo( fileNew );
	 	    	logger.info("down file {} rename to {} ...\n", filename,newFilename);
	 	    }
	 	    
	 	  }
	   /*delete file*/	
	   public static boolean deleteFiles(String FileDownPath, String fileName) throws IOException{
		   boolean rs = false;
		   File file = new File(FileDownPath + File.separator + fileName);
		   if(file.exists()){
			   file.delete();
			   logger.info("delete file End {} ",FileDownPath + "/" + fileName);
		   }
		   rs = true;
		   return rs;

	  }
	   
	   
		/**
		 * Html 파일 불러오기
		 * @param request
		 * @param response
		 * @param userId
		 * @param custNo
		 * @param photoPath
		 * @throws Exception
		 */
		public static String htmlFileLoad(String filePath,String fileNm) throws Exception {
			
			String fileDir = filePath + File.separator + fileNm;
			StringBuffer lines =  new StringBuffer();
			
//			try {
//				FileReader fr = new FileReader(fileDir);
				BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(fileDir),"UTF-8"));
//				BufferedReader br = new BufferedReader(fr);// 한 줄 단위로 읽어주는 클래스
				String line;
				String htmlreadYn = "N";
				while ((line=br.readLine())!=null) {// 무한반복
//					System.out.println("line=> "+line);
					if(line.contains("<!--------------------htmlbodyreadstart-------------------->")) {
						htmlreadYn = "Y";
					} else if(line.contains("<!--------------------htmlbodyreadend-------------------->")) {
						htmlreadYn = "N";
					} 
					
					if("Y".equals(htmlreadYn)) {
						if(line.contains("<!--------------------htmlbodyreadstart-------------------->")) {
						} else if(line.contains("<!--------------------htmlbodyreadend-------------------->")) {
						} else {
							lines.append(line);
						}
					}
					
					
					
					
				}
//			} catch (FileNotFoundException e) {
//				System.out.println("ERR readTextLine File 입출력 오류" + e.getMessage());
//				comResultVO.setCode(EmrConstant.HTTP_STATUS_SERVER_ERROR);
//			} catch (IOException e) {
//				System.out.println("ERR readTextLine 내부 br.readLine();오류" + e.getMessage());
//				comResultVO.setCode(EmrConstant.HTTP_STATUS_SERVER_ERROR);
//			}
//			comResultVO.setCode(EmrConstant.HTTP_STATUS_OK);
//			comResultVO.setData(lines.toString());
			return lines.toString();
			

		}
		
		
		/**
		 * FullHtml Contents 조회
		 * @param String
		 * @return
		 * @throws Exception
		 */
		 public static String getFullHtml(String HeaderHtml,String bodyHtml,String footerHtml) throws Exception {

			return HeaderHtml + bodyHtml + footerHtml;
			
		 }
		/**
		 * Html Header
		 * @param request
		 * @param String
		 * @return
		 * @throws Exception
		 */
		 public static String getHtmlHeader(String title, String image, String description) {
			 String version = DateUtils.getToday("YYYYMMDDHHmmss");
			 return getHtmlHeader(title, image, description, DEFAULT_URL, version);
		 }

		/**
		 * Html Header
		 * @param request
		 * @param String
		 * @return
		 * @throws Exception
		 */
		 public static String getHtmlHeader(String title, String image, String description, String url) {
			 String version = DateUtils.getToday("YYYYMMDDHHmmss");
			 return getHtmlHeader(title, image, description, url, version);
		 }
		 
		/**
		 * Html Header
		 * @param request
		 * @param String
		 * @return
		 * @throws Exception
		 */
		 public static String getHtmlHeader(String title, String image, String description, String url, String version) {
			 String rs = 
					"<!doctype html>\r\n" + 
			 		"    <html lang=\"ko\">\r\n" + 
			 		"    <head>\r\n" + 
			 		"        <title>DOCTOR KEEPER</title>\r\n" + 
			 		"        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\r\n" + 
			 		"        <meta name=\"title\" content=\""+ title +"\"/>\r\n" + 
			 		"        <meta name=\"Author\" content=\"KEEPER\"/>\r\n" + 
			 		"        <meta name=\"description\" content=\"" + description + "\"/>\r\n" + 
			 		"        <meta name=\"keywords\" content=\"KEEPER\"/>\r\n" + 
			 		"        <meta property=\"og:type\" content=\"website\">\r\n" + 
			 		"        <meta property=\"og:title\" content=\""+ title +"\">\r\n" + 
			 		"        <meta property=\"og:image\" content=\"" + image +"\">\r\n" + 
			 		"        <meta property=\"og:description\" content=\"" + description + "\">\r\n" + 
			 		"        <meta property=\"og:url\" content=\""+url+"\">\r\n" + 
			 		"        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\"/>\r\n" + 
			        "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"/>\r\n" + 
			 		"        <link rel=\"shortcut icon\" href=\"/assets/resources/img_app/favicon.ico\">\r\n" + 
			 		"        <link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/contentshtml/css/ckedit_css.css?v=" + version + "\">\r\n" + 
			 		"        <link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/contentshtml/css/extra_ckedit_css.css?v=" + version + "\">\r\n" + 
//			 		"        <link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/resources/css/layout.css?v=" + version + "\">\r\n" + 
			 		
			 		
			 		"        <script type=\"text/javascript\" language=\"javascript\" src=\"/assets/contentshtml/js/contents.js?v=" + version + "\"></script>\r\n" + 
			 		"        <script type=\"text/javascript\" language=\"javascript\" src=\"/assets/contentshtml/js/platform.js?v=" + version + "\"></script>\r\n" + 
			 		"    </head>\r\n" + 
			 		"    <body id=\"ckcontenthtml\"class=\"ck-content\">" +
			 		"\r\n" + 
			 		"<!--------------------htmlbodyreadstart-------------------->" + 
			 		"\r\n";
			 return rs;
		 }
		 
		/**
		 * Html Footer
		 * @param request
		 * @param String
		 * @return
		 * @throws Exception
		 */
		 public static String getHtmlFooter() {
			 String rs = 
					"\r\n" + 
					"<!--------------------htmlbodyreadend-------------------->" + 
					"\r\n" +
					"    </body>\r\n" + 
			 		"</html>";
			 return rs;
		 }
}