/********************************************************************************************************************************************************
 ********************************************************************************************************************************************************
 * 공통 AJAX 통신 UTIL
 */

/**
 * HTTP AJAX 통신상에서 ERROR 발생시에 처리 함수
 */
var errorFunction = function(xhr, textStatus, errorThrown){
	$.unblockUI();
};

/**
 * HTTP 통신 Sync 방식
 * @param url
 * @param parameter
 * @param resultDataId
 * @param successMsg
 * @param errorMsg
 * @returns
 */
function ComHttpSync(url, parameter){
	
	var resultData = null;
	
	$.ajax({
		type: "post",
		url: url,
		async: false,
		cache: false,
		dataType: "json",
		data: parameter,
		beforeSend: function(xhr, settings){
			xhr.setRequestHeader("AJAX", true);
			$.blockUI({message: "응답 대기중입니다..."});
		},
		success: function(data, textStatus, xhr){
			resultData = data;
		},
		error: this.errorFunction,
		complete: function(xhr, textStatus){
			$.unblockUI();
			return resultData;
		}
	});
	
	return resultData;
}

/**
 * 파일 업로드
 * @param formNm
 * @param url
 * @param data
 * @returns
 */
function ComFileUpload(formNm, url, data, successFun){
	$("#" + formNm).ajaxForm({
		url: url,
		dataType: "json",
		type: "post",
		data: data,
		beforeSubmit: function(formData, jqForm, options){
			$.blockUI({message: "응답 대기중입니다."});
		},
		success: function(data){
			$.unblockUI();
			if(data.result == "OK"){
				if(successFun != undefined){
					successFun(data.resultData);
				}
			}
		},
		error: this.errorFunction
	});
	
	$("#" + formNm).submit();
}

/**
 * FormId에 해당하는 input Object Value 값을 JSON 데이터로 반환 
 * @param formId
 * @returns JSON Data Object
 */
function ComGetInputDataJson(formId){
	var obj = eval("$('#" + formId + " :input')");
	var jsonData = {};
	
	$.each(obj, function(index, inputObj){
		
		if(inputObj.type == "radio" || inputObj.type == "checkbox"){
			if(!$(inputObj).attr('checked')){
				return true;
			}
		}
		
		jsonData[$(inputObj).attr("name")] = $(inputObj).val();
	});
	return jsonData;
}


/**
 * 문자열 Byte 길이 체크
 * @param obj
 * @param maxByte
 */
function fnChkByte(obj, maxByte){
	var str = obj.value;
	var str_len = str.length;

	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";

	for(var i=0; i<str_len; i++){
	one_char = str.charAt(i);
	if(escape(one_char).length > 4){
	    rbyte += 2;                                         //한글2Byte
	}else{
	    rbyte++;                                            //영문 등 나머지 1Byte
	}

	if(rbyte <= maxByte){
	    rlen = i+1;                                          //return할 문자열 갯수
	}
	}

	if(rbyte > maxByte){
	    alert("250Byte를 초과 입력할 수 없습니다.");
	    str2 = str.substr(0,rlen);                                  //문자열 자르기
	    obj.value = str2;
	    fnChkByte(obj, maxByte);
	}else{
	   document.getElementById('byteInfo').innerText = rbyte;
	}
}


/**
 * objId에 객체를 찾아서 value를 셋팅해주는 메소드
 * @param objId: 객체의 ID 값
 * @param value: 대입하고자 하는 값
 */
function ComSetObjValue(objId, value){
	var obj = eval("$('#" + objId + "')");
	
	value = defaultString(value);
	
	if(obj.is("input")){
		
		if("radio" == obj.attr("type") || "checkbox" == obj.attr("type")){
			$("input[name='"+ objId +"'][value="+ value +"]").attr('checked', true);
		}else{
			obj.val(value);
		}
		
	}else if(obj.is("select")){
		$("select#"+objId+" > option[value="+value+"]").attr("selected", true);
		
	}else if(obj.is("textarea")){
		obj.val(value);
		
	}else{
		obj = eval("$('input[name=" + objId + "]')");
		if(obj.length > 0){
			obj.filter(function(){
				if($(this).val() == value){
					$(this).attr("checked", true);
				}else{
					$(this).attr("checked", false);
				}
			});
		}
	}
}

/**
 * JSON 데이타를 받아서 해당되는 KEY로 객체의 ID를 찾아서 VALUE를 셋팅해주는 메소드
 * @param jsonData: JSON 데이타
 * @param defaultValue: VALUE가 널인 경우에 기본적으로 입력할 값
 */
function ComSetBindJsonData(jsonData, defaultValue){
	var defaultStr = null;
	
	if(undefined != defaultValue && null != defaultValue){
		defaultStr = defaultValue;
	}
	$.each(jsonData, function(key, value){
		
		if(undefined == value || null == value || "" == String(value)){
			value = defaultStr;
		}
		
		ComSetObjValue(key, value);
	});
}

/**
 * obj 값이 NULL 또는 UNDEFINED이면 ""를 반환하고 아니면 strObj를 반환
 * @param obj
 * @returns
 */
function defaultString(obj){
	if(obj != null && obj != undefined){
		return obj;
	}
	return "";
}

/**
 * 문자열 공백제거 
 */
String.prototype.trim = function(){
   this.replace(/(^\s*)|(\s*$)/gi, "");
};

/**
 * 휴대폰번호에 하이픈 넣기
 * @param phoneStr
 */
function phone_format(phoneStr){
	
	if(phoneStr == undefined || phoneStr == null){
		return "";
	}
	
	if(phoneStr.length != 11){
		return "";
	}
	
	return phoneStr.replace(/(^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

/**
 * 휴대폰번호를 확인한다.
 * @param phoneStr
 * @returns {Boolean}
 */
function isPhoneNumberCheck(phoneStr){
	var regExp = /^01([0|1|6|7|8|9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

	if ( !regExp.test( phoneStr ) ) {
	      return false;
	}
	return true;
}

