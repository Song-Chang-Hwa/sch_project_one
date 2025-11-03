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
	initData();
	initEvent();
});

/*
 * Data 초기화
 */
function initData(){
	goMessageBoardList(1);
	goAppBoardList(1);
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
	 * 서브탭(메세지전송, 메세지 목록, APP 목록) 변경 이벤트
	 */
	$(".tree_stab > li > a").click(function(){
		$(".tree_stab > li > a").removeClass("tree_stab_select");
		$(this).addClass("tree_stab_select");
		
		$(".tree_contents").hide();
		$("div[id=" + $(this).attr("id") + "]").show();
	});
	
	/*
	 * 메세지 전송 버튼 이벤트
	 */
	$("#sendMsg").click(function(){
		
		if($.trim($("textarea#msg").val()) == ""){
			alert("메세지를 입력해 주세요.");
			$("textarea#msg").val("");
			return false;
		}
		
		if($("input:radio[name=sendGB]:checked").val() == "T" && $("#sendTargetFilePath").val() == ""){
			alert("메세지 전송 대상자 엑셀파일을 업로드해 주세요.");
			return;
		}
		
		var sendData = {
				sendType : 		$("#input[name=sendType]").val()
				, type:			"I"
				, msg : 		$.trim($("textarea#msg").val())
				, url:			$("input[name=url]").val()
				, sendGB :		$("input:radio[name=sendGB]:checked").val()
				, sendTargetFilePath: $("#sendTargetFilePath").val()
		};
		
		var returnData = ComHttpSync("/ios/sendMsg.do", sendData);
		
		if(returnData.result == "OK"){
			alert("전송 완료 되었습니다");
		}else{
			alert("전송 실패 되었습니다.");
		}
		
		// 메세지 목록을 재조회 한다.
		$("#reSearch").click();
		return false;
	});
	
	/*
	 * 메세지 목록 검색 조회
	 */
	$("#reSearch").click(function(){
		goMessageBoardList(1);
		return false;
	});
	
	/*
	 * 전송구분 설정 이벤트
	 */
	$("input[name=sendGB]").click(function(){
		if($(this).val() == "A"){
			$("#sendTargetFileTr").hide();
		}else{
			$("#sendTargetFileTr").show(); 
		}
	});
	
	/*
	 * 대상자 엑셀파일 변경 이벤트
	 */
	 $("#sendTargetFile").change(function(){
		 
		$("#sendTargetFilePath").val("");
		$("#targetUserCnt").html("0 명");
		
		if($(this).val() != ""){
			ComFileUpload("msgForm", "/ios/sendTargetFileUpload.do", null, function(fileObjs){
				$.each(fileObjs, function(index, item){
					$("#sendTargetFilePath").val(this.filePath);
					$("#targetUserCnt").html(this.targetUserCnt + " 명");
				});
			});
		}
     });
}

/*
 * APP 목록 조회
 */
function goAppBoardList(pageNo){
	var boardData = ComHttpSync("/ios/selectAppList.do", {pageNo: pageNo});
	var boardDataHTML = '';
	
	var boardPaggingData = boardData.paging;
	$.each(boardData.resultList, function(idx, boardData){
		boardDataHTML +='<tr>'
							 + '	<td>'+ (parseInt(boardPaggingData.totalCount) +1 - ((parseInt(boardPaggingData.pageNo)-1) * parseInt(boardPaggingData.pageSize) + (idx + 1))) + '</td>'
							 + '	<td style="vertical-align: middle;text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">'+ boardData.APP_ID +'</td>'
							 + '	<td style="vertical-align: middle;text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">'+ phone_format(boardData.HP_NO) +'</td>'
							 + '	<td>'+ boardData.REG_DT +'</td>'
							 + '</tr>';
	});
	
	var boardListHTML = createBoardHTML("APP 목록", ["10", "60", "15", "15"], ["순번", "APP ID", "전화번호", "등록일"], boardDataHTML, boardPaggingData, boardData.paging.pageNo, "goAppBoardList");
	$("#appBoardList").html(boardListHTML);
}

/*
 * Message 목록 조회
 */
function goMessageBoardList(pageNo){
	var messageData = ComHttpSync("/ios/selectMessageList.do", {pageNo: pageNo, searchType: "I", searchKeyword: $("#searchKeyword").val()});
	var messageDataHTML = '';
	
	var messagePaggingData = messageData.paging;
	$.each(messageData.resultList, function(idx, messageData){
		messageDataHTML 	 +='<tr>'
								 + '	<td>'
								 + '		<a href="javascript:showSendMsgCustList('+ messageData.SEQ +');" class="showSendMsgCustList txt_left" >'
								 + 			(parseInt(messagePaggingData.totalCount) +1 - ((parseInt(messagePaggingData.pageNo)-1) * parseInt(messagePaggingData.pageSize) + (idx + 1)))
								 + '        </a>'
								 + '	</td>'
								 + '	<td>'
								 + '		<a href="javascript:showMessageInfo('+ messageData.SEQ +');" class="ellipsis txt_left" >' + messageData.MSG + '</a>'
								 + '	</td>'
								 + '	<td>'+ messageData.SEND_CNT + ' / ' + messageData.SEND_TOT + '</td>'
								 + '	<td>'+ messageData.REG_DT +'</td>'
								 + '</tr>';
	});
	
	var messageListHTML = createBoardHTML("Message 목록", ["10", "55", "20", "15"], ["순번", "메세지 내용", "발송 개수 / 발송대상 개수", "등록일"], messageDataHTML, messagePaggingData, messageData.paging.pageNo, "goMessageBoardList");
	$("#messageBoardList").html(messageListHTML);
	
	// Message 상세정보 초기화
	initMessageInfo();
}

/*
 * Message 상세정보
 */
function showMessageInfo(messageSeq){
	var resultData = ComHttpSync("/ios/selectMessageInfo.do", {seq: messageSeq, type: "I"});
	
	ComSetBindJsonData(resultData.resultData);
}

/*
 * Message 상세정보 초기화
 */
function initMessageInfo(){
	$("#sendCntInfo").val("");
	$("#sendTotInfo").val("");
	$("#urlInfo").val("");
	$("#msgInfo").val("");
} 


/*
 * 인버터 화면 설정 변경
 */
function sendChageView(){
	 var returnData = ComHttpSync("/ios/changeView.do", $("#viewTypeForm").serialize());
	 
	 if(returnData.result == "OK"){
		 alert("변경 되었습니다.");
	 }
}

/*
 * Message를 전송한 고객 목록을 조회한다.
 */
function showSendMsgCustList(seq){
	var myWindow = window.open("/ios/sendedMsgCustList.do?seq="+ seq ,"MyTargetWindowName", "height=600, width=900, status=no, toolbar=no, menubar=no, resizable=yes, scrollbars=auto");
	myWindow.opener = self;
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
            	<li><a href="<c:url value='/ios/iosPage.do' />" class="gnb1_item01_select">iOS</a></li>
                <li class="gnb1_bg_img"><img src="${context}/resources/images/gnb1_dot.png" alt=""></li>
                <li><a href="<c:url value='/android/androidPage.do' />" class="gnb1_item01">Android</a></li>
                <li class="gnb1_bg_img"><img src="${context}/resources/images/gnb1_dot.png" alt=""></li>
                <li><a href="<c:url value='/admin/adminPage.do' />" class="gnb1_item01">Admin</a></li>
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
                        <li><a href="#" class="tree_stab_select" id="msgPush">메세지 전송</a></li>
                        <li><a href="#" class="" id="msgList">메세지 목록</a></li>
                        <li><a href="#" class="" id="appList">APP 목록</a></li>
                        <li><a href="#" class=""  id="viewMode">인버터</a></li>
                    </ul>
                </div>
                <!---------------------- 화면 서브메뉴 탭 영역 종료 ---------------------->
                
                <!---------------------- 메세지 전송 탭 영역 내용 시작 ---------------------->
                <div class="tree_contents" id="msgPush">
                	<div class="comm_bbswrite">
						<br>
                		<div class="comm_tit01"> Message</div>
                		<div class="comm_key_txt">
                			<strong>Message 입력은 250Byte 까지만 입력이 가능합니다.</strong>
                		</div>
                		<br>
                		<form method="post" target="resultFrame" id="msgForm" enctype="multipart/form-data">
                			<input type="hidden" name="type" value="I">				<!-- 메세지전송 Type 설정  -->
							<table cellspacing="0" border="0" summary="입력폼" class="comm_bbswrite_tb">
								<colgroup>
									<col width="20%">
									<col width="70%">
								</colgroup>
								<tbody>
									<tr>
										<th class="required">전송구분</th>
										<td>
											<input type="radio" id="sendGBAll" name="sendGB" value="A" checked="checked" >&nbsp;전체전송&nbsp;&nbsp;&nbsp;
											<input type="radio" id="sendGBTarget" name="sendGB" value="T" >&nbsp;대상자전송
										</td>
									</tr>
									<tr style="display: none;" id="sendTargetFileTr">
										<th class="required">대상자 목록</th>
										<td>
											<input type="hidden" id="sendTargetFilePath" name="sendTargetFilePath">
											<input type="file" id="sendTargetFile" name="sendTargetFile" style="width: 400px;">
											&nbsp;&nbsp;
											
											대상자 전송 수: <span id="targetUserCnt"> 0 명</span>
											
										</td>
									</tr>
									<tr>
										<th>URL</th>
										<td>
											<input type="text" id="url" name="url" maxlength="100" style="width: 400px;" >
										</td>
									</tr>
									<tr>
										<th class="required">내용</th>
										<td>
											<textarea id="msg" name="msg" accesskey="" class="text_box" rows="10" onKeyUp="javascript:fnChkByte(this,'250');" placeholder="메세지 입력은 250Byte 까지 입력 가능합니다."></textarea>
											<span id="byteInfo">0</span>/250Byte
										</td>
									</tr>
								</tbody>
							</table>
						</form>
					</div>
					
					<ul class="bbs_bt_list">
		            	<li><button class="bbs_bt" id="sendMsg">전송</button></li>
           			</ul>
                </div>
                <!---------------------- 메세지 전송 탭 영역 내용 종료 ---------------------->
                
                <!---------------------- 메세지 목록 탭 영역 내용 시작 ---------------------->
                <div class="tree_contents" id="msgList" style="display: none;">
                	<br>
                	<div class="list-box">
						<div class="bbs_search">
							<div class="bbs_search_input">
									<input type="text" id="searchKeyword" name="searchKeyword" size="40" title="검색어" value="">
									<button type="button" class="bbs_search_button" id="reSearch" name="reSearch">검색</button>  
								</div>
						</div>
						
						<div id="messageBoardList"></div>
                	</div>
                	
                	<div class="comm_bbswrite">
						<br>
                		<div class="comm_tit01"> Message 상세정보</div>
						<table cellspacing="0" border="0" summary="입력폼" class="comm_bbswrite_tb">
							<colgroup>
								<col width="15%">
								<col width="35%">
								<col width="15%">
								<col width="35%">
							</colgroup>
							<tbody>
								<tr>
									<th>발송개수</th>
									<td>
										<input type="text" id="sendCntInfo" name="sendCntInfo" maxlength="100" style="width: 200px;" disabled="disabled">
									</td>
									<th>발송대상자 개수</th>
									<td>
										<input type="text" id="sendTotInfo" name="sendTotInfo" maxlength="100" style="width: 200px;" disabled="disabled">
									</td>
								</tr>
								<tr>
									<th>URL</th>
									<td colspan="3">
										<input type="text" id="urlInfo" name="urlInfo" maxlength="100" style="width: 400px;" disabled="disabled">
									</td>
								</tr>
								<tr>
									<th>내용</th>
									<td colspan="3">
										<textarea id="msgInfo" name="msgInfo" accesskey="" class="text_box" rows="5" disabled="disabled" ></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
                </div>
                <!---------------------- 메세지 목록 탭 영역 내용 종료 ---------------------->
                
                <!---------------------- APP 목록 탭 영역 내용 시작 ---------------------->
                <div class="tree_contents" id="appList"  style="display: none;">
                	<br>
                	<div id="appBoardList"></div>
                </div>
                <!---------------------- APP 목록 탭 영역 내용 종료 ---------------------->
                
                <!---------------------- 탭 영역 시작 종료 ---------------------->
                <div class="tree_contents" id="viewMode" style="display: none;">
                	<form id="viewTypeForm" name="viewTypeForm" method="post">
                	<div class="comm_bbswrite">
						<br>
                		<div class="comm_tit01"> Change View</div>
                		<div class="comm_key_txt">
                			<strong>iOS 화면전환 옵션 입니다.</strong>
                		</div>
                		<br>
						<table cellspacing="0" border="0" summary="입력폼" class="comm_bbswrite_tb">
							<colgroup>
								<col width="20%">
								<col width="70%">
							</colgroup>
							<tbody>
								<tr>
									<th class="required">전송 방법</th>
									<td>
										<input type="radio" name="viewType" 
										<c:if test="${ 'H' eq viewType }">
											checked
										</c:if>
										 value="H">&nbsp;하이브리드&nbsp;&nbsp;&nbsp;
										 
										<input type="radio" name="viewType" 
										<c:if test="${ 'N' eq viewType }">
											checked
										</c:if>
										 value="N">&nbsp;네이티브
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					</form>
					<ul class="bbs_bt_list">
		            	<li><button class="bbs_bt" id="sendChageView" onclick="javascript:sendChageView(); return false;" >전송</button></li>
           			</ul>
                </div>
                <!---------------------- 탭 영역 내용 종료 ---------------------->
                
            </div>
        </div>
    </div>
    <!---------------------- 화면 영역 종료 ---------------------->
    
</div>

</body>
</html>

