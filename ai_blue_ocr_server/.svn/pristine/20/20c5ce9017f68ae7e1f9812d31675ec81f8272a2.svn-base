<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="paging" class="paging">
    <a href="javascript:goPage(${param.firstPageNo})" class="paging_bt"><img src="${context}/resources/images/paging_pre10.png" border="0" title="처음 페이지"/></a>
    <a href="javascript:goPage(${param.prevPageNo})" class="paging_bt"><img src="${context}/resources/images/paging_pre1.png" border="0" title="이전 페이지"/></a>
    <span>
        <c:forEach var="i" begin="${param.startPageNo}" end="${param.endPageNo}" step="1">
            <c:choose>
                <c:when test="${i eq param.pageNo}"><a href="javascript:goPage(${i})" class="paging_select">${i}</a></c:when>
                <c:otherwise><a href="javascript:goPage(${i})">${i}</a></c:otherwise>
            </c:choose>
        </c:forEach>
    </span>
    <a href="javascript:goPage(${param.nextPageNo})" class="paging_bt"><img src="${context}/resources/images/paging_next1.png" border="0" title="다음 페이지"/></a>
    <a href="javascript:goPage(${param.finalPageNo})" class="paging_bt"><img src="${context}/resources/images/paging_next10.png" border="0" title="마지막 페이지"/></a>
</div>
