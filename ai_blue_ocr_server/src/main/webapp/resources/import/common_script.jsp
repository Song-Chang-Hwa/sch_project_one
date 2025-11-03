<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  	uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 	uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- meta name="viewport" content="width=device-width, initial-scale=1.0"-->

<%
	// 캐쉬를 못하게 한다.
	response.setHeader("Cache-control","no-cache");
	response.setHeader("Pragma","no-cache");
	response.setIntHeader("Expires",0);
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="user-scalable=yes, maximum-scale=1.0, width=1280">


<!-------------------------------- CSS 설정 시작 -------------------------------->
<link rel='stylesheet' href='${context}/resources/css/bjqs.css' type='text/css' media='all' />
<link rel="stylesheet" href="${context}/resources/css/design.css" type="text/css" media="all" />
<!-------------------------------- CSS 설정 종료 -------------------------------->

<script type="text/javascript" src="${context}/resources/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery-ui-1.9.2.custom.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.form.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.blockUI.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.ui.datepicker-ko.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.maskedinput.js"></script>

<script type="text/javascript" src="${context}/resources/js/commFun.js"></script>
<script type="text/javascript" src="${context}/resources/js/commonCalendar.js"></script>
<script type="text/javascript" src="${context}/resources/js/board.js"></script>

<script type="text/javascript">
<!--
	var context = "${context}";
	var resourcePath = "${context}/resources";
	
	$.blockUI.defaults.css = {
			border: 	"none",
			padding: 	"10px",
			margin: 	0,
			width: 		"40%",
			top:		"40%",
			left:		"35%",
			textAlign:	"center",
			color: "#FFF",
			backgroundColor: "#000",
			"-webkit-border-radius" : "10px",
			"-moz-border_radius" : "10px",
			opacity: .5,
			cursor: "wait"
		};
//-->
</script>
	
<c:if test="!empty UserInfo">
	<c:redirect url="/login.do"/>
</c:if>
