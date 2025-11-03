
/**
 * Common Calendar
 *  - 년월일을 선택할 수 있는 기본달력
 * @param inputId
 * @param format
 */
function ComCalendar(inputId, format){
	
	if(format == null || format == undefined){
		format = "yy/mm/dd";
	}
	
	$("#" +  inputId).datepicker({
		minDate: new Date(1900, 0, 1),
		showOn: "both",
		buttonImage: "/resources/images/ui/btn_calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat : format
	},$.datepicker.regional['ko']);
}

/**
 * Common Calendar
 *  - 시작일자와 종료일자를 설정할 수 있는 비교달력
 * @param startDateInputId
 * @param endDateInputId
 * @param format
 */
function ComCalendarFromTo(startDateInputId, endDateInputId, format){
	
	if(format == null || format == undefined){
		format = "yy/mm/dd";
	}
	
	$("#" + startDateInputId).datepicker({
		showOn: "both",
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		dateFormat : format,
		buttonImage: "/resources/images/ui/btn_calendar.gif",
		buttonImageOnly: true,
		onSelect: function( selectedDate ) {
			$("#" +endDateInputId).datepicker( "option", "minDate", selectedDate );
		}
	});
	
	$("#" + endDateInputId).datepicker({
		showOn: "both",
		defaultDate: "+1w",
		changeMonth: true,
		changeYear: true,
		dateFormat : format,
		buttonImage: "/resources/images/ui/btn_calendar.gif",
		buttonImageOnly: true,
		onSelect: function( selectedDate ) {
			$("#" + startDateInputId).datepicker( "option", "maxDate", selectedDate );
		}
	});
}


/**
 * Common Calendar
 *  - 년월만 선택할 수 있는 달력
 * @param startDate
 * @param value
 */
function ComCalenderMonth(inputId, value){
	if(value == undefined){
		value = $("#" + inputId).val()+"/01";
	}
	
	$("#" + inputId).datepicker({ 
		minDate: new Date(1900, 0, 1),
		defaultDate:new Date(value),
		showOn: "both",
        dateFormat: 'yyyy/mm',
        changeMonth: true,
        changeYear: true,
        buttonImage: "/resources/images/ui/btn_calendar.gif",
		buttonImageOnly: true,
		showButtonPanel: true,
        onClose: function(dateText, inst) {  
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 
            $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
        }
    });

    $("#" + inputId).focus(function () {
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });    
    });
}

