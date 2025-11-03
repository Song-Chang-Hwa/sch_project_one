<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html lang="ko">
<head>
<c:import url="/resources/import/common_script.jsp"/>
<title>Message</title>
<%

	String seq = request.getParameter("seq");

%>
<script type="text/javaScript">
<!--
$(document).ready(function(){
	initData();
	initEvent();
});

/*
 * Data 초기화
 */
function initData(){
	goMessageBoardList(1);
}

/*
 * Event 초기화
 */
function initEvent(){

	// intpu Enter 이벤트
	$("input[name=searchKeyword]").keypress(function(e) {
		if(e.which == 13) {
			$("#reSearch").click();
			return false;
		}
	});
	
	
	/*
	 * 메세지 목록 검색 조회
	 */
	$("#reSearch").click(function(){
		goMessageBoardList(1);
		return false;
	});
	
	/*
	 * 윈도우 팝업창 닫기 
	 */
	$("#closeWindow").click(function(){
		window.close();
		return false;
	});
	
	
}


/*
 * Message 목록 조회
 */
function goMessageBoardList(pageNo){
	var messageData = ComHttpSync("/ios/selectSendedMsgCustList.do", {pageNo: pageNo, searchCondition: "<%=seq%>", searchKeyword: $("#searchKeyword").val()});
	
	var messageDataHTML = '';
	
	var messagePaggingData = messageData.paging;
	$.each(messageData.resultList, function(idx, messageData){
		messageDataHTML 	 +='<tr>'
								 + '	<td>'+ (parseInt(messagePaggingData.totalCount) +1 - ((parseInt(messagePaggingData.pageNo)-1) * parseInt(messagePaggingData.pageSize) + (idx + 1))) + '</td>'
								 + '	<td>' + messageData.APP_ID + '</td>'
								 + '	<td>'+ messageData.HP_NO + '</td>'
								 + '</tr>';
	});
	
	var messageListHTML = createBoardHTML("Message 전송 고객 목록", ["10", "55", "20"], ["순번", "APP_ID", "핸드폰 번호"], messageDataHTML, messagePaggingData, messageData.paging.pageNo, "goMessageBoardList");
	
	$("#messageBoardList").html(messageListHTML);
	
}

//-->
</script> 
</head>
<body> 
<div class="wrap">
    
    
    <!---------------------- 화면 영역 시작 ---------------------->
    <div id="container" class="container">
        <div class="tree">
            <div class="tree_cont2">
            	<!---------------------- 화면 서브메뉴 탭 영역 시작 ---------------------->
                <div class="tree_stab_container">
                    <ul class="tree_stab">
                        <li><a href="#" class="tree_stab_select" id="msgList">메세지 전송 고객 목록</a></li>
                    </ul>
                </div>
                <!---------------------- 화면 서브메뉴 탭 영역 종료 ---------------------->
                
               
                
                <!---------------------- 메세지 목록 탭 영역 내용 시작 ---------------------->
                <div class="tree_contents" id="msgList">
                	<br>
                	<div class="list-box">
						<div class="bbs_search">
							<div class="bbs_search_input">
									<input type="text" id="searchKeyword" name="searchKeyword" size="40" title="검색어" value="">
									<button type="button" class="bbs_search_button" id="reSearch" name="reSearch">검색</button> 
									<button type="button" class="bbs_search_button" id="closeWindow" name="closeWindow">닫기</button>   
								</div>
						</div>
						
						<div id="messageBoardList"></div>
                	</div>
                	
                	
                </div>
                <!---------------------- 메세지 목록 탭 영역 내용 종료 ---------------------->
                
                
                <!---------------------- 탭 영역 내용 종료 ---------------------->
                
            </div>
        </div>
    </div>
    <!---------------------- 화면 영역 종료 ---------------------->
    
</div>

</body>
</html>

