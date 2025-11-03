/*
 * 공통팝업 컨셉
 *  - 공통팝업의 기본컨셉은 공통팝업을 오픈하기전 부모창에서 넘긴 파라미터와 조회된 데이터가 일치 할 경우
 *    팝업을 오픈하지 않고 부모창으로 결과값을 던저주는 컨셉으로 작업되어 있음.
 *    
 * 공통팝업 옵션설정값 종류
 *  1. POP_DEFAULT : 공통팝업 컨셉에 맞는 기본설정값(데이터 맵핑 후 동일한 데이터 1건이 존재 할경우 조회된 결과값을 JSON 데이터로 부모창으로 전달)
 *  2. POP_ALWAYS_SHOW : 공통팝업 오픈(데이터 조회 안함)
 *  3. POP_IFONE_SHOW - 조회된 결과값이 1건일 경우 공통팝업 오픈
 *  4. POP_IFZERO_HIDE - 조회된 결과값이 0건일 경우 공통팝업을 오픈하지 않는다.
 *  5. POP_IFGT2_HIDE - 조회된 결과값이 2건 이상일 경우 공통팝업을 오픈하지 않는다.
 * 
 */
var POP_DEFAULT     = 0; 
var POP_ALWAYS_SHOW = 1;
var POP_IFONE_SHOW  = 2;
var POP_IFZERO_HIDE = 4;
var POP_IFGT2_HIDE  = 8;
var POP_GUBUN_A = "A"; // 제1운전자
var POP_GUBUN_B = "B"; // 제2운전자

/**
 * 공통팝업을 ModalDialog로 오픈한다. 
 * @param callPopupName
 * @param paramData
 * @param popupOption
 * @param paramStr
 * @param etcModalOption
 * @returns
 */
function ComShowModalDialog(callPopupName, paramData, popupOption, paramStr, etcModalOption){
	
	var width = 700, height = 500, searchDataLength = 0;
	var viewUrl = "", searchUrl = "", etcOtp = "center:yes;resizable:yes;scroll:no;status:no";
	var returnData = null;
	var isShowPopup = true;
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 공통으로 사용될 팝업을 등록한다.
	//  - 공통팝업명, 팝업가로사이즈, 팝업세로사이즈, 팝업화면URL, 팝업화면데이터조회URL 을 명시한다.
	
	switch(callPopupName){
		case "popDeptCode" : 		// 부서검색 팝업
			width		= 700;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0120.aj";
			searchUrl 	= "/COMM0200/doDeptPopList.json";
			break;
		case "popDeptCodeByAuth":		// 사용자별 부서팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0125.aj";
			searchUrl 	= "";
			break;	
		case "popCarMstCode":		// 차명검색 팝업
			width		= 850;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0160.aj";
			searchUrl 	= "/COMM0100/getCarNameMST.json";
			break;
		case "popCarDraftDet":		// 구매품의차량검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1020.aj";
			searchUrl 	= "/COMM1000/getCarDraftDetList.json";
			break;
		case "popCustCode":			// 회원/고객검색 팝업
			width		= 850;
			height		= 550;
			viewUrl 	= "/cmn/pop/COMM0130.aj";
			searchUrl 	= "/COMM0100/doCustMemberSiteList.json";
			break;
		case "popOldCar":			// 장기구차검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2020.aj";
			searchUrl 	= "/COMM2000/getOldCarData.json";
			break;	
		case "COMM0131":			// 회원/고객검색 팝업
			width		= 850;
			height		= 550;
			viewUrl 	= "/cmn/pop/COMM0131.aj";
			searchUrl 	= "/COMM0100/doCustMemberSiteList.json";
			break;
		case "COMM0137":			// 회원/고객검색 팝업
			width		= 850;
			height		= 550;
			viewUrl 	= "/cmn/pop/COMM0137.aj";
			searchUrl 	= "/COMM0100/doCustMemberSiteList.json";
			break;	
		case "popZipCode":			// 신우편번호 팝업
			width		= 900;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0171.aj?gubun=1";
			searchUrl 	= "/COMM0000/getPostcodeList.json";
			break;
		case "popCustCode2":		// 회원/고객검색 팝업
			width		= 900;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0139.aj";
			searchUrl 	= "/COMM0100/doCustMemberSiteList2.json";
			break;
		case "popCustCode3":		// 회원/고객검색 팝업
			width		= 900;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0139.aj";
			searchUrl 	= "/COMM0100/doCustMemberSiteList3.json";
			break;
		case "COMM00170":			// 우편번호 팝업
			width		= 900;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0170.aj";
			searchUrl 	= "";
			break;
		case "COMM00192":		// 차명검색 팝업
			width		= 850;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0192.aj";
			searchUrl 	= "/COMM0100/getCarNameMST.json";
			break;
			
		case "popVrAccount":			// 가상계좌 조회  팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1078.aj";
			searchUrl 	= "/COMM1000/getCustVrAccount.json";
			break;	
			
		case "popCheckBus":			// 법인고객 중복여부 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1079.aj";
			searchUrl 	= "/COMM1000/getCustcoByBusinessno.json";
			break;	
			
		case "popNaviLEstatesno":	// 네비게이션 자산번호 검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2002.aj";
			searchUrl 	= "/COMM0200/getNaviLEstatesnoList.json";
			break;	
			
		case "popOfficeCode":	// 과태료 관할관청 검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2040.aj";
			searchUrl 	= "/COMM4000/getGoOfficeList.json";
			break;	
			
		case "popSearchSub":	// 보조기구 검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3200.aj";
			searchUrl 	= "/COMM1000/getSubList.json";
			break;	
			
		case "promotePopSearchSub":	// 보조기구 검색 팝업 ( 제주 제휴사 )
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3201.aj";
			searchUrl 	= "/COMM1000/getSubList_promote.json";
			break;	
			
		case "searchCust":	// 보조기구 검색 팝업 ( 제주 제휴사 )
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3509.aj";
			searchUrl 	= "/COMM0100/doCustCoList1.json";
			break;	
		case "COMM1030":	// 프로모션 검색 팝업
			width		= 830;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1030.aj";
			searchUrl 	= "/COMM1000/getPromotionList.json";
			break;	
		case "popupMakerCoList":	// 제작사 거래처조회 팝업
			width		= 850;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1110.aj";
			searchUrl 	= "/COMM1100/getMakerCoList.json";
			break;	
		case "popNavi":				// 네비게이션조회 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2003.aj";
			searchUrl 	= "/RENT4400/selectNavi.json";
			break;
		case "COMM2010":			// 장기신차검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2010.aj";
			searchUrl 	= "/COMM2000/getNewCarData.json";
			break;	
		case "popBankList":			// 은행검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2050.aj";
			searchUrl 	= "/COMM2050/doBankList.json";
			break;
		case "COMM2060":			// 은행계좌검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2060.aj";
			searchUrl 	= "/COMM2060/getBankDepoList.json";
			break;
		case "COMM2070":			// 은행계좌검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2070.aj";
			searchUrl 	= "/COMM2070/searchCoupon.json";
			break;
		case "CARM1135":			// SMS 전송 팝업
			width		= 460;
			height		= 380;
			viewUrl 	= "/cmn/pop/CARM1135.aj";
			searchUrl 	= "";
			break;
		case "CARM4065":			// SMS 전송 팝업
			width		= 550;
			height	= 570;
			viewUrl 	= "/carm/CARM4065.aj";
			searchUrl 	= "";
			break;	
		case "popLContractM2":		// 계약서조회 팝업
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2110.aj";
			searchUrl 	= "/COMM2000/searchLContractM2.json";
			break;	
		case "popAccountCode":		// 계약/청구 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/rent/RENT4008.aj";
			searchUrl 	= "/RENT4000/getContractAccount.json";
			break;
		case "CARM4066":			// SMS 전송 팝업
			width		= 1000;
			height		= 700;
			viewUrl 	= "/cmn/pop/CARM4066.aj";
			searchUrl 	= "";
			break;		
		case "COMM5001":		// 우편번호검색 팝업
			width		= 1000;
			height		= 800;
			viewUrl 	= "/cmn/pop/COMM5001.aj";
			searchUrl 	= "/";
			break;
		case "COMM5001_1":		// 우편번호검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM5001_1.aj";
			searchUrl 	= "";
			break;
		case "COMM1077":		// 중기견적 등록시 사용하는 차량번호 검색
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1077.aj";
			searchUrl 	= "";
			break;
		case "COMM1080":		// 차량번호검색 팝업
			width		= 1000;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1080.aj";
			searchUrl 	= "";
			break;	
		case "COMM1081":		// 차량번호검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1081.aj";
			searchUrl 	= "";
			break;	
		case "COMM1082":		// 가용 차량번호 검색팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1082.aj";
			searchUrl 	= "";
			break;	
		case "COMM1083":		// 차량번호검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1083.aj";
			searchUrl 	= "";
			break;	
		case "COMM1084":		// 차량번호 변경 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1084.aj";
			searchUrl 	= "";
			break;	
		case "COMM1085":		// 차량검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1085.aj";
			searchUrl 	= "";
			break;	
		case "COMM1086":		// 가용차량번호검색 (대차 수급시 사용) 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1086.aj";
			searchUrl 	= "";
			break;	
		case "COMM1090":		// 운전기사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1090.aj";
			searchUrl 	= "";
			break;	
		case "COMM1091":		// 운전기사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1091.aj";
			searchUrl 	= "";
			break;	
		case "COMM1092":		// 운전기사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1092.aj";
			searchUrl 	= "";
			break;	
		case "COMM1093":		// 운전자 회사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1093.aj";
			searchUrl 	= "";
			break;	
		case "COMM1094":		// 운전기사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1094.aj";
			searchUrl 	= "";
			break;	
		case "COMM1095":		// 운전기사검색 팝업
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1095.aj";
			searchUrl 	= "";
			break;	
		case "COMM0124":		// 미등록 사용자 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0124.aj";
			searchUrl 	= "";
			break;	
		case "COMM0125":		// 부서검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0125.aj";
			searchUrl 	= "";
			break;	
		case "COMM0126":		// 부서검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0126.aj";
			searchUrl 	= "";
			break;	
		case "COMM0127":		// 본부별 부서검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0127.aj";
			searchUrl 	= "";
			break;	
		case "popCustcolist":		// 고객/법인고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0133.aj";
			searchUrl 	= "";
			break;	
		case "COMM0134":		// 고객/법인고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0134.aj";
			searchUrl 	= "";
			break;	
		case "COMM0135":		// 고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0135.aj";
			searchUrl 	= "/COMM0100/doCustMemberList.json";
			break;	
		case "COMM0136":		// 고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0136.aj";
			searchUrl 	= "";
			break;	
		case "popUserCode":		// 사원 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0140.aj";
			searchUrl 	= "/COMM0100/doUserList.json";
			break;	
		case "popCustCoCode":		// 법인고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0150.aj";
			searchUrl 	= "/COMM0100/getCustCoList.json";
			break;	
		case "COMM0190":		// 고객 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0190.aj";
			searchUrl 	= "";
			break;	
		case "COMM0191":		// 업종조회
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0191.aj";
			searchUrl 	= "";
			break;	
		case "COMM0195":		// 고객검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0195.aj";
			searchUrl 	= "";
			break;	
		case "COMM0196":		// 고객검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0196.aj";
			searchUrl 	= "";
			break;	
		case "COMM1040":		// 업무제휴사회원검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1040.aj";
			searchUrl 	= "";
			break;	
		case "COMM1050":		// 구매품의차량검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1050.aj";
			searchUrl 	= "";
			break;
		case "COMM1060" : 		// 제휴사검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1060.aj";
			searchUrl 	= "";
			break;	
		case "popSearchCustcode":		// 고객관리
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1071.aj";
			searchUrl 	= "/COMM1000/doSearchcust.json";
			break;	
		case "COMM1096":		// 고객관리
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM1096.aj";
			searchUrl 	= "";
			break;	
		case "COMM2000":		// 네비게이션 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2000.aj";
			searchUrl 	= "";
			break;	
		case "COMM2001":		// 네비게이션 모델명 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM2001.aj";
			searchUrl 	= "";
			break;	
		case "COMM3100":		//  과태료 관할관청 검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3100.aj";
			searchUrl 	= "";
			break;	
		case "COMM4011":		//  사원검색(네비수리)
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM4011.aj";
			searchUrl 	= "";
			break;	
		case "COMM9000":		//  부서검색
			width		= 1100;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM9000.aj";
			searchUrl 	= "";
			break;
		case "RENT1125":		//  국제예약검색
			width		= 950;
			height		= 600;
			viewUrl 	= "/rent/RENT1125.aj";
			searchUrl 	= "";
			break;	
		case "RENT4453":		//  국제예약검색
			width		= 1000;
			height		= 600;
			viewUrl 	= "/rent/RENT4453.aj";
			searchUrl 	= "";
			break;	
		case "RENT4451":		//  대여가능 네비게이션
			width		= 1088;
			height		= 600;
			viewUrl 	= "/rent/RENT4451.aj";
			searchUrl 	= "";
			break;
		case "RENT0900":		//  회원검색
			width		= 930;
			height	= 450;
			viewUrl 	= "/rent/RENT0900.aj";
			searchUrl 	= "";
			break;
		case "RENT1015":		//  고객코드, 주민번호에 대해 예약건 조회
			width		= 1000;
			height	= 600;
			viewUrl 	= "/rent/RENT1015.aj";
			searchUrl = "";
			break;
		case "RENT1017":		//  고객코드에 대해 계약건 조회
			width		= 800;
			height	= 600;
			viewUrl 	= "/rent/RENT1017.aj";
			searchUrl = "";
			break;
		case "RENT4452":		//  대여중인 네비게이션팝업
			width		= 700;
			height	= 500;
			viewUrl 	= "/rent/RENT4452.aj";
			searchUrl = "";
			break;
		case "CUST1400":		// 법인조회 팝업
			width		= 700;
			height		= 600;
			viewUrl 	= "/cust/CUST1400.aj";
			searchUrl 	= "/CUST1400/doCorpList.json";
			break;
		case "RENT3251":		// 수정사유 선택
			width		= 350;
			height		= 180;
			viewUrl 	= "/rent/RENT3251.aj";
			break;
		case "RENT1111_1":		// 국내예약 상세 조회 조건
			width		= 1000;
			height		= 300;
			viewUrl 	= "/rent/RENT1111_1.aj";
			break;
		case "popSearchReserve":// 국내예약검색(RENT1030) 팝업
			width		= 980;
			height		= 700;
			viewUrl 	= "/rent/RENT1030.aj";
			searchUrl 	= "/RENT1000/getSearchReserveList.json";
			break;
		case "RENT3180_ECS":		// ECS 화면 오픈
			width		= 1100;
			height		= 700;
			viewUrl 	= "/rent/RENT3180_ECS.aj";
			break;
		case "RENT9410":// 주차장검색(RENT9410) 팝업
			width		= 700;
			height	= 600;
			viewUrl 	= "/rent/RENT9410.aj";
			searchUrl 	= "";
			break;	
		case "COMM1075" : 		//  차량번호검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1075.aj";
			searchUrl 	= "";
			break;
		case "COMM1070" : 		//  운전기사검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1070.aj";
			searchUrl 	= "/COMM1000/getDriverList.json";
			break;
		case "popCustCodeInfo" : 	// 파견업체 부서검색 팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0129.aj";
			break;
		case "popDeptCodeContract" : 		// 부서검색 팝업
			width		= 700;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM0120.aj";
			searchUrl 	= "/COMM0200/doDeptPopList.json";
			break;
		case "RENT3200_EMAIL" :  //전자세금계산서 이메일 재전송 입력창
			width		= 550;
			height		= 200;
			viewUrl 	= "/rent/RENT3200_EMAIL.aj";
			break;
		case "popZipCode_Scan":  // 스캔용 우편번호 검색  (이미지 있을 경우 )
			width		= 630;
			height		= 850;
			viewUrl 	= "/cmn/pop/COMM5001.aj";
			searchUrl 	= "/COMM0000/getPostcodeList.json";
			break;
		case "popZipCode_ScanOther":  // 스캔용 우편번호 검색 2 (이미지 없을 경우 기존의 우편번호검색 표시 )
			width		= 850;
			height		= 850;
			viewUrl 	= "/cmn/pop/COMM0170.aj";
			searchUrl 	= "/COMM0000/getPostcodeList.json";
			break;
		case "RENT9274":  // 입금내역
			width		= 980;
			height	= 600;
			viewUrl 	= "/rent/RENT9274.aj";
			searchUrl = "";
			break;
		case "COMM0121" : 		// 차고지 검색
			width		= 780;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0121.aj";
			searchUrl 	= "/COMM0200/doDeptList.json";			
			break;
		case "popCardApp":  // 카드승인내역
			width		= 980;
			height		= 600;
			viewUrl 	= "/rent/RENT4003.aj";
			searchUrl 	= "/RENT4000/getCardAppList2.json";
			break;
		case "RENT3210":  // 세금계산서조회
			width		= 1000;
			height	= 600;
			viewUrl 	= "/rent/RENT3210.aj";
			searchUrl = "";
			break;	
		case "popCogroupcode":  // 청구처조회
			width		= 1000;
			height	= 600;
			viewUrl 	= "/rent/RENT3001.aj";
			searchUrl 	= "/RENT3000/doCogroupcodeSearch.json";			
			break;	
		case "RENT3165":  // 청구스케쥴상세등록
			width		= 950;
			height	    = 650;
			viewUrl 	= "/rent/RENT3165.aj";
			searchUrl 	= "";			
			break;	
			
		default:
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 공통팝업 옵션에 따른 로직설계
	
	// 공통팝업 설정값이 파라미터로 넘어오지 않았을 경우 기본설정값 POP_DEFAULT 설정
	if(popupOption == null || popupOption == undefined){
		popupOption = POP_DEFAULT;
	}
	
	// 공통팝업에 대한 화면설정값이 없을 경우 위에 설정값으로 설정
	if(defaultString(etcModalOption) != ""){
		etcOtp = etcModalOption;
	}
	
	/*
	 * 옵션값이 데이터를 조회후 처리하기 위한 팝업옵션인 경우
	 *  - POP_ALWAYS_SHOW 제외인 모든 옵션값은 조건문에 해당함
	 */
	if( (popupOption & POP_ALWAYS_SHOW) != POP_ALWAYS_SHOW ){
		
		// 오픈할 공통팝업의 데이터를 조회한다.
		var searchData = ComHttpSync(searchUrl, paramData, "DATA");
		
		// 오픈할 공통팝업의 데이터가 존재할 경우
		if(searchData != null && searchData != undefined){
			searchDataLength = searchData.length;

			// 조회된 데이터 0건이며, 0건일 경우 팝업을 오픈하지 않는 팝업옵션 
			if(searchDataLength == 0 && (popupOption & POP_IFZERO_HIDE) == POP_IFZERO_HIDE){
				isShowPopup = false;
			}
			
			// 조회된 데이터 1건일때
			if(searchDataLength == 1){
				// 팝업옵션이 팝업을 오픈하는 옵션일 경우
				if ((popupOption & POP_IFONE_SHOW) == POP_IFONE_SHOW) {
					isShowPopup  = true;
	            }else{
	            // 팝업옵션이 팝업을 오픈하지 않는 옵션일 경우 조회된 데이터를 반환할 값으로 설정한다.
	            	isShowPopup = false;
	            	returnData = searchData[0];
	            }
			}
			
			// 조회된 데이터 2건 이상이고, 2건 이상일 경우 팝업을 오픈하지 않는 팝업옵션 
			if (searchDataLength >= 2 && (popupOption & POP_IFGT2_HIDE) == POP_IFGT2_HIDE) {
				isShowPopup = false;
	        }
			
		} else {
			// 조회된 데이터가 없고 팝업을 오픈하지 않는 팝업옵션 
			if ( (popupOption & POP_IFZERO_HIDE) == POP_IFZERO_HIDE ) {
				isShowPopup = false;
			}
		}
		
	} else {

		// 조회된 데이터가 없고 팝업을 오픈하지 않는 팝업옵션 
		if ( (popupOption & POP_IFZERO_HIDE) == POP_IFZERO_HIDE ) {
			isShowPopup = false;
		}
	}
	
	if (isShowPopup) {
		
		var url = viewUrl.split("?");
		
		if(defaultString(paramStr) == ""){
			viewUrl = url[0] + "?ispopup=Y";
		}else{
			viewUrl = url[0] + "?ispopup=Y&" + defaultString(paramStr);
		}
		
		if(url.length > 1){
			viewUrl = viewUrl + "&" + url[1];
		}
		
		returnData = window.showModalDialog(viewUrl, paramData, "dialogWidth:"+width+"px; dialogHeight:"+height+"px;" + etcOtp);
	}
	return returnData;
}

function ComShowDialog(callPopupName, paramData, featuresOpt, popupName){
	
	var width = 1088, height = 600;
	var viewUrl = "", etcOtp = "";
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 공통으로 사용될 팝업을 등록한다.
	//  - 공통팝업명, 팝업가로사이즈, 팝업세로사이즈, 팝업화면URL, 팝업화면데이터조회URL 을 명시한다.

	switch(callPopupName){
		case "jsPopOption" : 		// 부서검색 팝업
			width		= 500;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0110.aj";
			break;
		case "CUST1100":
			viewUrl 	= "/cust/CUST1100.aj";
			height		= 630;
			break;
		case "CUST1200":
			viewUrl 	= "/cust/CUST1200.aj";
			break;
		case "COMM0112" : 		// 차명선택옵션선택 팝업
			width		= 500;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0112.aj";
			break;
		case "boardRead" : 		// 게시판 상세보기
			width		= 950;
			height		= 720;
			viewUrl 	= "/board/boardRead.aj";
			break;

		case "COMM0121" : 		// 차명선택옵션선택 팝업
			width		= 640;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0121.aj";
			break;
		case "COMM0123" : 		// 파견업체 부서검색 팝업
			width		= 500;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0123.aj";
			break;
		case "COMM0129" : 		// 파견업체 부서검색 팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0129.aj";
			break;
		case "COMM0131" : 		// 파견업체 부서검색 팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0131.aj";
			break;
		case "COMM0111" : 		// 차명외주옵션 팝업
			width		= 500;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0111.aj";
			break;
		case "COMM0113" : 		// 차명기본옵션 팝업
			width		= 500;
			height		= 300;
			viewUrl 	= "/cmn/pop/COMM0113.aj";
			break;
		case "COMM0141" : 		// 파견업체 부서검색 팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0141.aj";
			break;
		case "RENT9750" : 		// 금일예약실적 팝업
			viewUrl 	= "/rent/RENT9750.aj";
			break;	
		case "COMM0180" : 		// 파견업체 부서검색 팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0180.aj";
			break;
		case "COMM0193" : 		// 원가등급 설명팝업(랜탈료산출표용)
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0193.aj";
			break;
		case "COMM0194" : 		// 중고차잔가등급 설명팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM0194.aj";
			break;
		case "COMM1060" : 		// 제휴사검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1060.aj";
			break;
		case "PURC5370" :		// 대폐대상 팝업
			viewUrl 	= "/purc/PURC5370.aj";
			break;
		case "RENT9760" : 		// 금일 계약상황
			viewUrl 	= "/rent/RENT9760.aj";
			break;
		case "RENT2040" :		// 계약상세조회 팝업
			viewUrl 	= "/rent/RENT2040.aj";
			width		= 950;
			height		= 600;
			break;
		case "RENT6230" :		// 특수채권 등록 팝업
			viewUrl 	= "/rent/RENT6230.aj";
			break;
		case "RENT6200" :		// 특수채권산신 상세조회 팝업
			viewUrl 	= "/rent/RENT6200.aj";
			break;
		case "RENT2010" :		// 금일입고상황 팝업
			viewUrl 	= "/rent/RENT2010.aj";
			break;
		case "RENT2151" :		// 장기계약 조회 팝업
			viewUrl 	= "/rent/RENT2151.aj";
			break;
		case "RENT9992" :		// 연체채권 현황 팝업
			viewUrl 	= "/rent/RENT9992.aj";
			break;
		case "RENT5600" :		// 고객별 외상매출금조회 팝업
			viewUrl 	= "/rent/RENT5600.aj";
		case "RENT9993" :		// 연체채권 현황 팝업
			viewUrl 	= "/rent/RENT9993.aj";
			break;
		case "RENT9999" :		// 중장기결제예정 팝업
			viewUrl 	= "/rent/RENT9999.aj";
			break;
		case "RENT2166" :		// 계약번호에 대한 청구내역조회
			width		= 1088;
			height		= 600;
			viewUrl 	= "/rent/RENT2166.aj";
			break;
		case "RENT9984" :		// 외상매출금이력조회 팝업
			width		= 800;
			height		= 450;
			viewUrl 	= "/rent/RENT9984.aj";
			break;
		case "PURC9106" :		// 차량번호 변경현황 팝업
			viewUrl 	= "/purc/PURC9106.aj";
			break;
		case "RENT9989" :		// 청구예정건 팝업
			viewUrl 	= "/rent/RENT9989.aj";
			break;
		case "RENT3158" :		// 스케줄 상세조회 팝업
			viewUrl 	= "/rent/RENT3158.aj";
			break;
		case "RENT3190" :		// 스케쥴 청구등록 팝업
			viewUrl 	= "/rent/RENT3190.aj";
			break;
		case "RENT3040" :		// 청구처청구등록 팝업
			viewUrl 	= "/rent/RENT3040.aj";
			break;
		case "RENT3051" :		// CMS정보 상세조회
			viewUrl 	= "/rent/RENT3051.aj";
			break;
		case "RENT3053" :		// 고객전용계좌상세조회
			viewUrl 	= "/rent/RENT3053.aj";
			break;
		case "RENT3022" :		// 청구처담당자상세조회
			viewUrl 	= "/rent/RENT3022.aj";
			break;
		case "COMM1061" : 		//  제주여행사 블럭관리 등록에서 사용하는 제휴사팝업
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1061.aj";
			break;
		case "COMM1070" : 		//  운전기사검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1070.aj";
			break;
		case "COMM1076" : 		// 보험담보변경 신청품의 등록에 사용하는 차량번호 검색
			width		= 850;
			height		= 590;
			viewUrl 	= "/cmn/pop/COMM1076.aj";
			break;
		case "RENT8063" : 		//  운행율 합계 차량상세조회
			viewUrl 	= "/rent/RENT8063.aj";
			break;
		case "COMM3610" : 		//  MT옵션 상세 팝업
			width		= 830;
			height		= 520;
			viewUrl 	= "/cmn/pop/COMM3610.aj";
			break;
		case "COMM3620":			// MT상품 Standard 1
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3620.aj";
			break;	
		case "COMM3630":			// MT상품 Standard 2
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3630.aj";
			break;	
		case "COMM3640":			// // MT상품 Standard 3
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3640.aj";
			break;	
		case "COMM3650":			// MT상품 프리미업
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM3650.aj";
			break;	
		case "COMM3660":			// FULL M/T 서비스 제외 사항
			width		= 570;
			height		= 480;
			viewUrl 	= "/cmn/pop/COMM3660.aj";
			break;	
		case "20130306_popup" :	// 팝업??
			width		= 768;
			height		= 740;
			viewUrl 	= "20130306_popup";
			break;
		case "RENT2160" :		// 장기계약상세조회
			viewUrl 	= "RENT2160";
			break;
		case "RENT2120" :		// 장기계약서 상세조회
			viewUrl 	= "RENT2120";
			break;
		case "CUST1910"	:		// 프로모션 상세화면
			width		= 950;
			height		= 600;
			viewUrl 	= "CUST1910";
			break;
		case "COMM8971":			// SMS전송현황 상세조회 팝업
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM8971.aj";
			break;
		case "COMM8971_1":			// SMS전송현황 상세조회 팝업
			width		= 950;
			height		= 600;
			viewUrl 	= "/cmn/pop/COMM8971_1.aj";
			break;	
		case "COMM9850":			// SMS전송현황 상세조회 팝업
			width		= 250;
			height		= 170;
			viewUrl 	= "/comm/COMM9850.aj";
			break;
		case "boardReadHis":		// 게시판 조회이력 팝업
			width		= 550;
			height		= 420;
			viewUrl 	= "/board/boardReadHis.aj";
			break;
		case "boardForm":
			width		= 950;
			height		= 600;
			viewUrl 	= "/board/boardForm.aj";
			break;
		case "CUST0303":		// 상담등록 팝업
			width		= 850;
			height		= 550;
			viewUrl 	= "/cust/CUST0303.aj";
			break;
		case "CUST0302":		// 상담상세보기 팝업
			width		= 850;
			height		= 550;
			viewUrl 	= "/cust/CUST0302.aj";
			break;
		case "CUST1203":		// 외상매출금 경과등록 팝업
			width		= 600;
			height		= 400;
			viewUrl 	= "/cust/CUST1203.aj";
			break;
		case "CUST0208":		// 쿠폰등록 팝업
			viewUrl 	= "/cust/CUST0208.aj";
			break;
		case "CUST0209":		// 쿠폰상세정보 팝업
			viewUrl 	= "/cust/CUST0209.aj";
			break;
		case "CUST0201":		// 회원등록
			width		= 1000;
			height		= 650;
			viewUrl 	= "/cust/CUST0201.aj";
			break;
		case "CUST0203":		// 회원관리
			width		= 1100;
			height		= 800;
			viewUrl 	= "/cust/CUST0203.aj";
			break;
		case "CUST2602":		// 법인멤버쉽 수정
			width		= 1000;
			height		= 650;
			viewUrl 	= "/cust/CUST2602.aj";
			break;
		case "CUST0205":		// 회원카드등록
			viewUrl 	= "/cust/CUST0205.aj";
			break;
		case "CUST0211":		// 회원카드상세조회
			viewUrl 	= "/cust/CUST0211.aj";
			break;
		case "CUST0212":		// 회원카드수정 팝업
			viewUrl 	= "/cust/CUST0212.aj";
			break;
		case "CUST1300":		// 법인등록 팝업
			viewUrl 	= "/cust/CUST1300.aj";
			width		= 900;
			height		= 280;
			break;
		case "CUST1500":		// 법인상세조회 팝업
			viewUrl 	= "/cust/CUST1500.aj";
			break;
		case "CUST1600":		// 법인고객등록 팝업
			viewUrl 	= "/cust/CUST1600.aj";
			break;
		case "CUST1700":		// 법인고객상세조회 팝업
			viewUrl 	= "/cust/CUST1700.aj";
			break;
		case "CUST1304":		// 법인고객 현장등록 팝업
			viewUrl 	= "/cust/CUST1304.aj";
			width		= 900;
			height		= 350;
			break;
		case "CUST1308":		// 법인고객 현장상세조회 팝업
			viewUrl 	= "/cust/CUST1308.aj";
			width		= 900;
			height		= 350;
			break;
		case "CUST1708":		// 법인고객 담당자등록 팝업
			viewUrl 	= "/cust/CUST1708.aj";
			width		= 950;
			height		= 600;
			break;
		case "CUST1703":		// 법인고객 담당자상세조회 팝업
			viewUrl 	= "/cust/CUST1703.aj";
			width		= 950;
			height		= 600;
			break;
		case "RENT2167":		//
			width		= 1100;
			height		= 800;
			viewUrl 	= "/rent/RENT2167.aj";
			searchUrl 	= "";
			break;
		case "PURC3507":		//차량내역 상세조회 팝업
			width		= 1100;
			height		= 800;
			viewUrl 	= "/purc/PURC3507.aj";
			searchUrl 	= "";
			break;
		case "CARM7811":		//대차차량조회
			width		= 1100;
			height		= 600;
			viewUrl 	= "/carm/CARM7811.aj";
			searchUrl 	= "";
			break;
		case "RENT3150":		//청구내역상세조회 팝업
			viewUrl 	= "/rent/RENT3150.aj";
			break;
		case "RENT3150_h":		//청구내역상세조회 팝업
			width		= 450;
			height		= 400;
			viewUrl 	= "/rent/RENT3150_h.aj";
			break;
		case "RENT3152":		//연체이자 탕감이력 팝업
			width		= 650;
			height		= 500;
			viewUrl 	= "/rent/RENT3152.aj";
			break;
		case "RENT3154":		//수금목록조회
			width		= 950;
			height		= 400;
			viewUrl 	= "/rent/RENT3154.aj";
			break;
		case "RENT4020":		//수금상세조회
			width		= 950;
			height		= 600;
			viewUrl 	= "/rent/RENT4020.aj";
			break;
		case "RENT5700":		//일자별 연체이자 조회상세
			width		= 950;
			height		= 450;
			viewUrl 	= "/rent/RENT5700.aj";
			break;
		case "RENT5705":		//일자별 연체시뮬레이션
			width		= 950;
			height		= 450;
			viewUrl 	= "/rent/RENT5705.aj";
			break;
		case "RENT5710":		//일자별 연체시뮬레이션
			width		= 950;
			height		= 350;
			viewUrl 	= "/rent/RENT5710.aj";
			break;
		case "COMM4102":		//자료수정의뢰서 상세
			width		= 900;
			height		= 700;
			viewUrl 	= "/comm/COMM4102.aj";
			break;
		case "CARM8008":		//차량정보 팝업호출
			width		= 1000;
			height		= 600;
			viewUrl 	= "/carm/CARM8008.aj";
			break;
		case "CARM8207_1":		//항목상세 팝업호출
			width		= 1000;
			height		= 600;
			viewUrl 	= "/carm/CARM8207_1.aj";
			break;
		case "RENT3181":		//이전청구내역조회
			viewUrl 	= "/rent/RENT3181.aj";
			break;
		case "RENT2180":
			viewUrl 	= "/rent/RENT2180.aj";
			break;
		default:
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 공통팝업 

	var left_point = (screen.width - width) / 2;
    var top_point = (screen.height - height) / 1.5;
    
	if(defaultString(featuresOpt) == ""){
		etcOtp = "width="+width+",height="+height+",left="+left_point+",top="+top_point+",status=yes,scrollbars=yes,resizable=yes";
	}else{
		etcOtp =  "width="+width+",height="+height+",left="+left_point+",top="+top_point+","+featuresOpt;
	}
	
	if(paramData != null){
		paramData.ispopup = "Y";
		viewUrl += "?" + $.param(paramData, true);
	}else{
		viewUrl += "?ispopup=Y";
	}
	
	if(defaultString(popupName) == ""){
		popupName = callPopupName;
	}
	
	return window.open(viewUrl, popupName, etcOtp);
}

/**
 * 페이지내에서 직접 팝업호출
 * @param callPopupName
 * @param viewUrl
 * @param paramData
 * @param featuresOpt
 * @param popupName
 * @returns
 */
function ComShowDialogPageCall(callPopupName, viewUrl, paramData, featuresOpt, popupName)
{
	var width = 1088, height = 600;
	var etcOtp = "";
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 공통팝업 

	var left_point = (screen.width - width) / 2;
    var top_point = (screen.height - height) / 1.5;
    
	if(defaultString(featuresOpt) == "")
	{
		etcOtp = "width="+width+",height="+height+",left="+left_point+",top="+top_point+",status=yes,scrollbars=yes,resizable=yes";
	}
	else
	{
		etcOtp =  featuresOpt;
	}
	
	if(paramData != null)
	{
		paramData.ispopup = "Y";
		viewUrl += "?" + $.param(paramData, true);
	}
	else
	{
		viewUrl += "?ispopup=Y";
	}
	
	if(defaultString(popupName) == "")
	{
		popupName = callPopupName;
	}
	
	return window.open(viewUrl, popupName, etcOtp);
}
