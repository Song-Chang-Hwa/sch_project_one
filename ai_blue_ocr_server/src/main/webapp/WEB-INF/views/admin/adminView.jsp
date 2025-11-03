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
<!--

$(document).ready(function(){
	
	$("#btnInsert").click(function(){
		eventViewMode("I");

		$("#userInfoForm").find("input").attr("disabled", false);
		$("#userInfoForm").find("input").val("");
		return false;
	});
	
	
	$("#btnUpdate").click(function(){
		eventViewMode("U");
		
		$("#PWD").attr("disabled", false);
		$("#NAME").attr("disabled", false);
		$("#EMAIL").attr("disabled", false);

		return false;
	});
	
	$("#btnSave").click(function(){
		
		if($.trim($("#ID").val()) == ""){
			alert("ID 를(을) 입력해 주세요.");
			return false;
		}
		if($.trim($("#PWD").val()) == ""){
			alert("PassWord 를(을) 입력해 주세요.");
			return false;
		}
		if($.trim($("#NAME").val()) == ""){
			alert("NAME 를(을) 입력해 주세요.");
			return false;
		}
		if($.trim($("#EMAIL").val()) == ""){
			alert("EMAIL 를(을) 입력해 주세요.");
			return false;
		}
		
		var saveData = {
				STATUS: ""
				, ID: 			$("#ID").val()
				, PWD: 		$("#PWD").val()
				, NAME: 		$("#NAME").val()
				, EMAIL: 		$("#EMAIL").val()
		};
		
		if($("#viewMode").val() == "I" && !$("#ID").attr("disabled")){
			saveData.STATUS 	= "I";
			
		}else if($("#viewMode").val() == "U" && $("#ID").attr("disabled")){
			saveData.STATUS 	= "U";
		}
		
		if(saveData.STATUS != ""){
			var resultData = ComHttpSync("/admin/saveUser.do", saveData);
			
			if(resultData.resultData == "OK"){
				alert("저장 되었습니다.");
				document.listForm.action = "<c:url value='/adminPage.do'/>";
			   	document.listForm.submit();
			}else if(resultData.resultData == "FAIL"){
				alert("동일한 ID가 존재합니다.\n다시 입력해 주세요.");
			}else{
				alert("저장 실패 하였습니다.\n다시 저장해 주세요.");			
			}
		}
		
		return false;
	});

});

function goPage(pageNo){
	document.listForm.pageNo.value = pageNo;
	document.listForm.action = "<c:url value='/adminPage.do'/>";
   	document.listForm.submit();
}

function showUserInfo(userId){
	var resultData = ComHttpSync("/admin/selecrUserInfo.do", {ID: userId});
	
	if(resultData != null){
		ComSetBindJsonData(resultData.resultData);
		eventViewMode("V");
	}
}

function eventViewMode(viewMode){
	$("#userInfoForm").find("input").attr("disabled", true); 
	$("#viewMode").val(viewMode);
	
	$("#btnInsert").hide();
	$("#btnUpdate").hide();
	$("#btnSave").hide();
	
	if(viewMode == "I"){
		$("#btnSave").show();
	}else if(viewMode == "U"){
		$("#btnSave").show();
	}else if(viewMode == "V"){
		$("#btnInsert").show();
		$("#btnUpdate").show();
	}
}

//-->
</script> 
</head>
<body> 
<div class="wrap">
    
    <!---------------------- 메인메뉴 영역 시작 ---------------------->
    <div class="gnb1">
    	<div class="gnb1_container">
            <ul class="gnb1_list">
            	<li><a href="<c:url value='/ios/iosPage.do' />" class="gnb1_item01">iOS</a></li>
                <li class="gnb1_bg_img"><img src="${context}/resources/images/gnb1_dot.png" alt=""></li>
                <li><a href="<c:url value='/android/androidPage.do' />" class="gnb1_item01">Android</a></li>
                <li class="gnb1_bg_img"><img src="${context}/resources/images/gnb1_dot.png" alt=""></li>
                <li><a href="<c:url value='/admin/adminPage.do' />" class="gnb1_item01_select">Admin</a></li>
            </ul>
        </div>
    </div>
    <!---------------------- 메인메뉴 영역 종료 ---------------------->
    
    <!---------------------- 화면 영역 시작 ---------------------->
    <div id="container" class="container">

        <div class="tree">
            <div class="tree_cont2">
            
            	<!---------------------- 화면 서브메뉴 탭 영역 시작 ---------------------->
                <div class="tree_stab_container">
                    <ul class="tree_stab">
                        <li><a href="#" class="tree_stab_select" id="msgPush">관리자 목록</a></li>
                    </ul>
                </div>
                <!---------------------- 화면 서브메뉴 탭 영역 종료 ---------------------->
                
                <!---------------------- 탭 영역 내용 시작 ---------------------->
                <div class="tree_contents" id="msgPush">
                	<form id="listForm" name="listForm" method="post">
                		<input type="hidden" id="viewMode" >
                		<input type="hidden" id="pageNo" name="pageNo" value="${paging.pageNo}">
                		<!---------------------- 목록 시작 ---------------------->
	                	<div class="comm_bbs">
	                		<br>
	                		<div class="comm_tit01"> Admin List </div>
				            <table cellspacing="0" border="0" summary="목록" class="comm_bbs_list">
					            <colgroup>
									<col width="10%">
									<col width="20%">
									<col width="20%">
									<col width="30%">
									<col width="20%">
								</colgroup>
								<tbody>
					          		<tr>
										<th>순번</th>
										<th>ID</th>
										<th>Name</th>
										<th>E-Mail</th>
										<th>등록일</th>
					          		</tr>
        			
				          		<c:forEach var="result" items="${resultList }" varStatus="status">
				          			<tr>
				          				<td><c:out value="${paging.totalCount+1 - ((paging.pageNo-1) * paging.pageSize + status.count)}"/></td>
				          				<td style="text-align: left;">
				          					<a href="javascript:showUserInfo('<c:out value="${result.ID }"></c:out>');" class="ellipsis txt_left" ><c:out value="${result.ID }"></c:out></a>
				          				</td>
				          				<td>
				          					<c:out value="${result.NAME }"></c:out>
				          				</td>
				          				<td>
				          					<c:out value="${result.EMAIL }"></c:out>
				          				</td>
				          				<td>
				          					<c:out value="${result.REG_DT }"></c:out>
				          				</td>
				          			</tr>	
				          		</c:forEach>	
							</table>
						</div>
						
						<jsp:include page="../common/paging.jsp" flush="true">
						    <jsp:param name="firstPageNo" value="${paging.firstPageNo}" />
						    <jsp:param name="prevPageNo" value="${paging.prevPageNo}" />
						    <jsp:param name="startPageNo" value="${paging.startPageNo}" />
						    <jsp:param name="pageNo" value="${paging.pageNo}" />
						    <jsp:param name="endPageNo" value="${paging.endPageNo}" />
						    <jsp:param name="nextPageNo" value="${paging.nextPageNo}" />
						    <jsp:param name="finalPageNo" value="${paging.finalPageNo}" />
						</jsp:include>
					</form>
		        	<!---------------------- 목록 종료 ---------------------->
                	<br>
                	<!---------------------- 메세지 전송 영역 시작 ---------------------->
					<div class="comm_bbswrite">
						<br>
                		<div class="comm_tit01"> User Info</div>
                		<form id="userInfoForm" name="userInfoForm" method="post">
							<table cellspacing="0" border="0" summary="입력폼" class="comm_bbswrite_tb">
								<colgroup>
									<col width="15%">
									<col width="70%">
								</colgroup>
								<tbody>
									<tr>
										<th class="required">ID</th>
										<td>
											<input type="text" id="ID" name="ID" maxlength="20" style="width: 200px;" disabled="disabled">
										</td>
									</tr>
									<tr>
										<th class="required">PassWord</th>
										<td>
											<input type="password" id="PWD" name="PWD" maxlength="20"  style="width: 200px;" disabled="disabled">
										</td>
									</tr>
									<tr>
										<th class="required">Name</th>
										<td>
											<input type="text" id="NAME" name="NAME" maxlength="20" style="width: 200px;" disabled="disabled">
										</td>
									</tr>
									<tr>
										<th class="required">E-Mail</th>
										<td>
											<input type="text" id="EMAIL" name="EMAIL" maxlength="50"  style="width: 400px;" disabled="disabled">
										</td>
									</tr>
								</tbody>
							</table>
						</form>
					</div>
					
					<ul class="bbs_bt_list">
						<li><button class="bbs_bt" id="btnInsert">신규</button></li>
						<li><button class="bbs_bt" id="btnUpdate" style="display: none;">수정</button></li>
		            	<li><button class="bbs_bt" id="btnSave" style="display: none;">저장</button></li>
           			</ul>
					<!---------------------- 메세지 전송 영역 종료 ---------------------->
                </div>
                <!---------------------- 탭 영역 내용 종료 ---------------------->
            </div>
        </div>
    </div>
    <!---------------------- 화면 영역 종료 ---------------------->
    
</div>

</body>
</html>

