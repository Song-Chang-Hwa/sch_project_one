<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  	uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 	uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:import url="/resources/import/common_script.jsp"/>
<style type="text/css">
button span{font-size: 12px; font-weight: bold;}
</style>
</head>
<body>
<div id="errorBox" title="ErrorPage - CODE: ${unitCode}" style="font-size: 12px; width: 50%;">
	<c:if test="${not empty parameter}"><p>REQUEST PARAMETER : ${parameter}</p></c:if>
	<p>ERRORMESSAGE : ${errorMessage}</p>
</div>
<script type="text/javascript">
$(function(){
	$("#errorBox").dialog({
		autoOpen: false,
		width: "50%",
		resizable: false,
		draggable: false,
		buttons:{
			BACK: function(){
				history.back(1);
			},
			CLOSE: function(){
				$(this).dialog("close");
			}
		},
		close: function(event, ui){
			location.href = "${context}/index.jsp";
		}
	});
	$("#errorBox").append("<p style='font-size: 12px; text-align: right;'>UnitCode[<font style='color:red;font-weight:bold;'>${unitCode}</font>]담당자에게 문의 바랍니다.</p>")
				  .append("<p style='font-size: 12px; text-align: right;'>&gt;&gt;&nbsp;Framework Ver. iBatis</p>");
	$("#errorBox").dialog("open");
});
</script>
</body>
</html>