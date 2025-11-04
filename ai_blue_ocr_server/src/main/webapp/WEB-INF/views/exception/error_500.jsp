<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  	uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 	uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:import url="/resources/import/common_script.jsp"/>
<style type="text/css">
table.tableList { table-layout:fixed; border-top:2px #EA0000 solid; border-bottom:1px #CFCFCF solid; }
table.tableList tr.even { background:#FFFFEA } /* CSS2 나 CSS3 에 even 은 없다 */
table.tableList tr:hover { background:#E3F2FF } /* 마우스 커서가 올려진 경우라서 모바일에선 무용. :focus 가 아님에 유의 */
table.tableList th, table.tableList td { padding:7px 3px 3px 3px; text-align:center; font-size:9pt; }
table.tableList th { border-right:1px #F3D7D7 solid; border-bottom:1px #CFCFCF solid; color:#E04C4C; background:#FCEFEF; }
table.tableList th.end, table.tableList td.end { border-right:none }
table.tableList td { border-right:1px #F0F0F0 solid; border-bottom:1px #CFCFCF dotted; vertical-align:center; }
table.tableList td.dot { text-overflow:ellipsis; overflow:hidden; white-space:nowrap; } /* 말줄임 */
table.tableList td.bold { font-weight: bold;}
table.tableList td.left { text-align:left; }
table.tableList td.right { text-align:right; }
table.tableList td img { vertical-align:middle; }
</style>
</head>
<body>
<div style="text-align: center; display: block; width: 50%; margin: 0 auto;">
	<h1>Error 500 Page</h1>
</div>
<table class="tableList">
	<thead>
		<tr>
			<th>표시방법</th>
			<th>값</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.status_code']</td>
			<td class="left">${requestScope['javax.servlet.error.status_code']}</td>
		</tr>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.exception_type']</td>
			<td class="left">${requestScope['javax.servlet.error.exception_type']}</td>
		</tr>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.message']</td>
			<td class="left">${requestScope['javax.servlet.error.message']}</td>
		</tr>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.exception']</td>
			<td class="left">${requestScope['javax.servlet.error.exception']}</td>
		</tr>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.request_uri']</td>
			<td class="left">${requestScope['javax.servlet.error.request_uri']}</td>
		</tr>
		<tr>
			<td class="left bold">requestScope['javax.servlet.error.servlet_name']</td>
			<td class="left">${requestScope['javax.servlet.error.servlet_name']}</td>
		</tr>
	</tbody>
</table>
</body>
</html>