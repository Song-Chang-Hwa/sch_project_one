<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn"  	uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" 	uri="http://java.sun.com/jsp/jstl/fmt" %>
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<script type="text/javascript" src="${context}/resources/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery-ui-1.9.2.custom.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.form.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.blockUI.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.ui.datepicker-ko.js"></script>
<script type="text/javascript" src="${context}/resources/js/jquery.maskedinput.js"></script>
<script type="text/javascript" src="${context}/resources/js/commFun.js"></script>

<link rel="stylesheet" href="${context}/resources/css/certify/connect.css" type="text/css" media="all" />

<title>인슈랩 - 개인정보동의 시작</title>
<script type="text/javaScript">

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
	
	
$(document).ready(function(){
	$(".mask").css("height", $(window).height());
	
	initEvent();
});

function requestFromObjc(functionName, objcResult, callback){    
    if (!objcResult){
        window.location = "myapp://objcRequest?function=" + functionName + "&callback=" + arguments.callee.name + "&callbackFunc=" + arguments.callee.caller.name;
    }else{
        window[callback](objcResult);
    }
}

function setAppId(objcResult){
	if(!objcResult){
		requestFromObjc("getAppId");
	}else{
		$("#appId").val(objcResult);
	}
}

function initEvent(){
	
	/*
	 * iOS 앱에서 AppId 추출
	 */
	<c:if test="${viewType eq 'I' }">
	$("#hpNo").keydown(function(){
		
		if($("#appId").val() == ""){
			setAppId(undefined);
		}
	});
	</c:if>
	
	/*
	 * 개인정보처리방침 팝업 열기 버튼 이벤트
	 */
	$(".open_btn001").click(function(){
		$(".policy_pop").css("display","block");
		$(".mask").css("display", "block");
	});
	
	/*
	 * 개인정보처리방침 팝업 닫기 버튼 이벤트
	 */
	$(".close_popup").click(function(){
		$(".policy_pop").css("display","none");
		$(".mask").css("display", "none");
	});
	
	/*
	 * 인증번호 버튼 이벤트
	 */
	$("#btnSendHpCetfNo").click(function(){
		<c:if test="${viewType eq 'I' }">
		if($("#appId").val() == ""){
			setAppId(undefined);
		}
		</c:if>
		
		if($.trim($("#hpNo").val()) == ""){
			alert("휴대폰 번호를 입력해 주세요.");
			return false;
		}
		
		// 휴대폰번호 체크		
		if(!isPhoneNumberCheck( $("#hpNo").val() )){
			alert("휴대폰 번호를 다시 입력해 주세요.");
			return false;
		}
		
		var sendData = {
				appId : 		$("#appId").val()
				, hpNo : 		$("#hpNo").val()
		};
		
		var returnData = ComHttpSync("/certify/createCertifyNumber.do", sendData);
		
		if(returnData.result > 0){
			$("#phone").val($("#hpNo").val());
			$("#send_msg").val("["+ returnData.resultData +"] 인슈랩에서 전송한 인증번호 입니다.");
			$("#smsCetfForm").attr("action", "http://insulab.co.kr/common_include/act/sms_send_ok.asp");
			$("#smsCetfForm").submit();
			
			alert("인증번호가 발송 되었습니다.");
			
		}
		
		return false;
	});
	
	/*
	 * 인증 버튼 이벤트
	 */
	$("#btnCetf").click(function(){
		
		if(!$("input:checkbox[id='certifyChk']").is(":checked")){
			alert("개인정보수집 및 이용동의를 체크해 주세요.");
			return false;
		}
		
		<c:if test="${viewType eq 'I' }">
		
			if($.trim($("#hpNo").val()) == ""){
				alert("휴대폰 번호를 입력해 주세요.");
				return false;
			}
			
			if($.trim($("#hpCetfNo").val()) == ""){
				alert("인증번호를 입력해 주세요.");
				return false;
			}
			
			var sendData = {
					appId : 		$("#appId").val()
					, hpNo : 		$("#hpNo").val()
					, hpCetfNo : 	$("#hpCetfNo").val()
			};
			
			var returnData = ComHttpSync("/certify/checkCertify.do", sendData);
			
			if(returnData.result > 0){
				
				var sendCode = ComHttpSync("/ios/sendAppId.do", sendData);
				
				window.location="call://isSendAppId//" + sendCode;
			}else{
				alert("인증번호를 정확히 입력해 주세요.");			
				return false;
			}
		</c:if>
		
		<c:if test="${viewType eq 'A' }">
			var sendData = {
					appId : 		$("#appId").val()
					, hpNo : 		$("#hpNo").val()
			};
			var sendCode = ComHttpSync("/android/sendAppId.do", sendData);
	
			window.AndroidInterface.isSendAppId(sendCode);	
		</c:if>
	});
}

</script> 
</head>
<body>
<c:if test="${viewType eq 'I' }">
	<div class="mask"></div>
	<div class="pi_wrap">
		<header class="pi_head">
			<h1><img src="${context}/resources/images/certify/pi_logo.png" alt="내 아이의 첫 태아보험 인슈랩" /></h1>
		</header>
		<div class="container">
			<section class="apple common_section">
				<h3>휴대폰 인증하기</h3>
				<div class="certification">
					<!-- SMS 발송 Form Start -->
					<div id="smsForm" style="display: none;">
						<form name="smsCetfForm" id="smsCetfForm" method="post" target="sendCetfTarget" accept-charset="EUC-KR"> 
			                <input type="hidden" id="site_code" name="site_code" value="insulab_app"><br>
			                <input type="hidden" id="site_tel" name="site_tel" value="1544-2398"><br>
			                <input type="hidden" id="phone" name="phone" value=""><br>
			                <input type="hidden" id="send_msg" name="send_msg" value=""><br>
		                </form>
	                </div>
                	<!-- SMS 발송 Form End -->
                	<!-- 개인인증 Form Start -->
					<form name="cetfForm" id="cetfForm" method="post">
						<input type="hidden" id="appId" name="appId" value="${appId}"><br>
						<input type="tel" id="hpNo" name="hpNo" placeholder="휴대폰번호 ex)01012345678" />
						<button id="btnSendHpCetfNo">인증번호발송</button>
						<input type="tel" id="hpCetfNo" name="hpCetfNo" placeholder="인증번호 입력 ex)123456" />
						<div class="chk_box">
							<input type="checkbox" id="certifyChk" class="chk002" checked />
							<label for="certifyChk">&nbsp;개인정보수집/이용동의</label>
							<a href="javascript:;" class="open_btn001"><span>보기</span></a>
						</div>
						<div class="start_btn">
							<a href="#" id="btnCetf">인증하기</a>
						</div>
						<!-- //.start_btn -->
					</form>
					<!-- 개인인증 Form End -->
				</div>
				<!-- //.certification -->
				<div class="policy_pop" id="draggable" style="display:none;">
					<div class="policy_heading cle">
						<h5>개인정보처리방침</h5>
						<a href="javascript:;" class="close_popup">닫기</a>
					</div>
					<div class="policy_cont">
						<dl>
							<dt>개인(신용)정보의 수집,이용에 관한사항</dt>
							<dd>
								<p>[개인정보보호법] 및 [신용정보의 이용및 보호에 관한 법률]에 따라 아래와 같은 내용으로 본인의 개인(신용)정보의 수집,이용하는것에 동의합니다.</p>
							</dd>
							<dt>1. 개인정보의 수집 및 이용목적</dt>
							<dd>
								<p>정확한 보험료의 계산 보험상품 및 보험가입안내, 유익한 정보및 서비스의 제공, 사은판촉행사안내 (sms,이메일,우편 발송업무,등) 증권/카드 등 배송업무, 회원유치, 상품 권유 업무, 전화상담 업무, 인터넷 관련 서비스 업무등</p>
							</dd>
							<dt>2. 수집이용할 개인(신용)정보의 내용</dt>
							<dd>
								<p>개인식별정보(연락처)</p>
							</dd>
							<dt>3. 개인(신용)정보의 보유,이용기간</dt>
							<dd>
								<p>수집,이용 동의일로부터 고객님의 동의 철회시까지 보관하며, 1544-2398로 전화 주시면 철회가능(단, 최대 3년)</p>
							</dd>
							<dt>4. 수집자 : (주)웰스라이프</dt>
							<dd>
								<p>* 정보 동의시 계약상담및 가입설계를 위해 최소한의 정보만 수집,이용 조회하게 되며, 본동의를 거부하시는 경우 보험계약 상담등 정상적인 서비스 제공이 불가능할수 있습니다. 기타내용은 개인정보 취급방침에서 확인하시기 바랍니다.</p>
								<p>* 이동의서는 계약의 갱신등으로 변경되는 경우에도 유효합니다.</p>
								<p>* 상품권유 중지청구(Do-Not Call) 개인(신용)정보 제공 및 이용에 동의한 이후에도 전화[1544-2398], 서면 등을 통해 언제든지 마케팅활동에 대한 중지를 요청할 수 있습니다.</p>
								<p style="padding-top:20px">기타내용은 웰스라이프 개인정보취급방침에서 확인 가능합니다</p>
							</dd>
						</dl>
					</div>
				</div>
				<!-- //.priv_policy -->
			</section>
		</div>
		<!-- //.container -->
	</div>
</c:if>
<c:if test="${viewType eq 'A' }">
	<div class="pi_wrap">
		<header class="pi_head">
			<h1><img src="${context}/resources/images/certify/pi_logo.png" alt="내 아이의 첫 태아보험 인슈랩" /></h1>
		</header>

		<input type="hidden" id="appId" name="appId" value="${appId}">
		<input type="hidden" id="hpNo" name="hpNo" value="${hpNo}" >
            
		<div class="container">
			<section class="android common_section">
				<h3>개인(신용)정보의 수집,이용에 관한사항</h3>
				<div class="policy_cont">
					<div class="priv_page">
						<dl>
							<dt class="hide">개인(신용)정보의 수집,이용에 관한사항</dt>
							<dd>
								<p>[개인정보보호법] 및 [신용정보의 이용및 보호에 관한 법률]에 따라 아래와 같은 내용으로 본인의 개인(신용)정보의 수집,이용하는것에 동의합니다.</p>
							</dd>
							<dt>1. 개인정보의 수집 및 이용목적</dt>
							<dd>
								<p>정확한 보험료의 계산 보험상품 및 보험가입안내, 유익한 정보및 서비스의 제공, 사은판촉행사안내 (sms,이메일,우편 발송업무,등) 증권/카드 등 배송업무, 회원유치, 상품 권유 업무, 전화상담 업무, 인터넷 관련 서비스 업무등</p>
							</dd>
							<dt>2. 수집이용할 개인(신용)정보의 내용</dt>
							<dd>
								<p>개인식별정보(연락처)</p>
							</dd>
							<dt>3. 개인(신용)정보의 보유,이용기간</dt>
							<dd>
								<p>수집,이용 동의일로부터 고객님의 동의 철회시까지 보관하며, 1544-2398로 전화 주시면 철회가능(단, 최대 3년)</p>
							</dd>
							<dt>4. 수집자 : (주)웰스라이프</dt>
							<dd>
								<p>* 정보 동의시 계약상담및 가입설계를 위해 최소한의 정보만 수집,이용 조회하게 되며, 본동의를 거부하시는 경우 보험계약 상담등 정상적인 서비스 제공이 불가능할수 있습니다. 기타내용은 개인정보 취급방침에서 확인하시기 바랍니다.</p>
								<p>* 이동의서는 계약의 갱신등으로 변경되는 경우에도 유효합니다.</p>
								<p>* 상품권유 중지청구(Do-Not Call) 개인(신용)정보 제공 및 이용에 동의한 이후에도 전화[1544-2398], 서면 등을 통해 언제든지 마케팅활동에 대한 중지를 요청할 수 있습니다.</p>
								<p style="padding-top:20px">기타내용은 웰스라이프 개인정보취급방침에서 확인 가능합니다</p>
							</dd>
						</dl>
					</div>
					<!-- //.priv_waper -->
				</div>
				<div class="chk_box">
					<input type="checkbox" id="certifyChk" class="chk002" />
					<label for="certifyChk">&nbsp;동의합니다.</label>
					<a href="#" class="open_btn001"><span>보기</span></a>
				</div>
				<div class="start_btn">
					<a href="#" id="btnCetf" >시작하기</a>
				</div>
				<!-- //.start_btn -->
			</section>
		</div>
		<!-- //.container -->
	</div>
</c:if>

<!--SMS 전송 IFrame Start --> 
<iframe id="sendCetfTarget"name="sendCetfTarget" style="display: none;" ></iframe>
<!--SMS 전송 IFrame End --> 

</body>
</html>

