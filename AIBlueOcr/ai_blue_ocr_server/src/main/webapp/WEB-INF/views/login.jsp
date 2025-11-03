<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html lang="ko">
<head>
<c:import url="/resources/import/common_script.jsp"/>
<title>Message</title>
<script type="text/javaScript">
        
$(document).ready(function(){
	initEvent();
});

function initEvent(){
	
	// intpu Enter 이벤트
	$("input").keypress(function(e) {
		if(e.which == 13) {
			$("#btnLogin").click();
			return false;
		}
	});
	
	// 로그인 버튼 클릭 이벤트
	$("#btnLogin").click(function(){
		var rtnData = ComHttpSync("<c:url value='/loginExec'/>", $("#loginForm").serialize());
		
		if(rtnData.resultData.MSG == "OK"){
			location.href = "<c:url value='"+ rtnData.resultData.URL +"'/>";
		}else{
			alert("아이디 / 패스워드를 다시 입력해 주세요.");
			$("form")[0].reset();
		}
		
		return false;
	});
}

</script> 
</head>
<body> 
    
<div class="wrap">
    <div id="container" class="container">
    	<br><br><br><br>
       	<div class="mber_tit01">관리자 로그인</div>
      	<div class="mber_login">
        	<div class="mber_login_container">
        		<form name="loginForm" id="loginForm" method="post"> 
	            	<div><img src="${context}/resources/images/mber_login_tit.png" alt="member login"></div>
	                <div class="mber_login_input"><input type="text" title="아이디" placeholder="아이디" id="userId" name="userId" ></div>
	                <div class="mber_login_input"><input type="password" title="패스워드" placeholder="패스워드" id="pwd" name="pwd" ></div>
                </form>
				<div class="mber_login_bt"><button id="btnLogin">로그인</button></div>
            </div>
        </div>
    </div>
</div>

</body>
</html>

