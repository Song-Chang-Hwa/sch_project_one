

function createBoardHTML(boardTitle, boardColWidthArray, boardCoTitleArray, boardDataHTML, boardPaggingData, boardPageNo, paggingEventFunction){
	var html = createBoardListHTML(boardTitle, boardColWidthArray, boardCoTitleArray, boardDataHTML, boardPageNo);
	html += createBoardPaggingHTML(boardPaggingData, paggingEventFunction);
	
	return html;
}


function createBoardListHTML(boardTitle, boardColWidthArray, boardCoTitleArray, boardDataHTML, boardPageNo){
	var html = '<input type="hidden" id="pageNo" name="pageNo" value="'+ boardPageNo +'">'
				+ '<div class="append">'
				+ '		<div class="comm_tit01">' + boardTitle + '</div>'
				+ '			<table cellspacing="0" border="0" summary="목록" class="comm_bbs_list">'
				+ '				<colgroup>';
	
	if(boardColWidthArray){
		$.each(boardColWidthArray, function(){
			html += '				<col width="'+ this +'%">';
		});
	}
	
		html += '				</colgroup>'
				+ '				<tbody>';

	if(boardColWidthArray){
		html += '				<tr>';
		
		$.each(boardCoTitleArray, function(){
			html += '				<th>'+ this +'</th>';
		});
		
		html += '				</tr>';
	}
	
	if(boardDataHTML){
		html += boardDataHTML;
	}

		html += '				</tbody>'
				+ '			</table>'
				+ '		</div>'
				+ '</div>';
	return html;
}

function createBoardPaggingHTML(boardPaggingData, paggingEventFunction){
	
	if(boardPaggingData.startPageNo == 0 && boardPaggingData.endPageNo == 0){
		return "";
	}
	
	var html = '<div id="paging" class="paging">'
				+ '    <a href="javascript:'+ paggingEventFunction +'('+ boardPaggingData.firstPageNo +')" class="paging_bt"><img src="/resources/images/paging_pre10.png" border="0" title="처음 페이지"/></a>'
				+ '    <a href="javascript:'+ paggingEventFunction +'('+ boardPaggingData.prevPageNo +')" class="paging_bt"><img src="/resources/images/paging_pre1.png" border="0" title="이전 페이지"/></a>'
				+ '    <span>';
	
	for(var i = (boardPaggingData.startPageNo); i < (boardPaggingData.endPageNo + 1); i++){
		if(i == boardPaggingData.pageNo){
			html += '        <a href="javascript:'+ paggingEventFunction +'('+ i +')" class="paging_select">'+ i +'</a>';
		}else{
			html += '        <a href="javascript:'+ paggingEventFunction +'('+ i +')">'+ i +'</a>';
		}
	}
	
		html += '    </span>'
				+ '    <a href="javascript:'+ paggingEventFunction +'('+ boardPaggingData.nextPageNo +')" class="paging_bt"><img src="/resources/images/paging_next1.png" border="0" title="다음 페이지"/></a>'
				+ '    <a href="javascript:'+ paggingEventFunction +'('+ boardPaggingData.finalPageNo +')" class="paging_bt"><img src="/resources/images/paging_next10.png" border="0" title="마지막 페이지"/></a>'
				+ '</div>';
	
	return html;
	
}