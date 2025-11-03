<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html> 
<html> 
<head> 
<meta charset="utf-8"> 
<title></title> 
<meta name="description" content=""> 
<meta name="viewport" content="width=device-width"> 
<link rel="stylesheet" href="${context}/resources/bower_components/bootstrap/dist/css/bootstrap.min.css"> 
<link rel="stylesheet" href="${context}/resources/css/login/form-elements.css">
<link rel="stylesheet" href="${context}/resources/css/login/style.css">

</head>
<body> 
	
		<div class="top-content">
        	
            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>로그인</h3>
                        		</div>
                        		<div class="form-top-right">
                        			<i class="fa fa-lock"></i>
                        		</div>
                            </div>
                            <div class="form-bottom">
			                    <form role="form" action="<c:url value='login' />" method="post">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">Username</label>
			                        	<input type="text" name="username" placeholder="Username..." class="form-username form-control" id="form-username" autofocus required="">
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">Password</label>
			                        	<input type="password" name="password" placeholder="Password..." class="form-password form-control" id="form-password" required="">
			                        </div>
			                        <div class="checkbox">
		                                <label>
		                                    <input name="remember" type="checkbox" value="Remember Me">로그인 상태 유지
		                                </label>
		                            </div>
		                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			                        <button type="submit" class="btn">로그인</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <c:if test="${param.error ne null}">
			<div class="form-box" style="text-align: center;">
	            Your login attempt was not successful, try again.<br /> <b>Caused :
				${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</b>
	        </div>
		</c:if>
        
        <script src="${context}/resources/bower_components/jquery/dist/jquery.min.js"></script> 
		<script src="${context}/resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<script src="${context}/resources/js/jquery.backstretch.min.js"></script>
		<script src="${context}/resources/js/scripts.js"></script>
</body>

</html>