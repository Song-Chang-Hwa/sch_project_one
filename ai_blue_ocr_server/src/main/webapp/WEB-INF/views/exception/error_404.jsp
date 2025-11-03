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
*{	margin:0; padding:0; }

body{
	background:url('../../../resources/images/error/bg.png') no-repeat center center #1d1d1d;
	color:#eee;
	font-family:Corbel,Arial,Helvetica,sans-serif;
	font-size:13px;
}

#rocket{
	width:275px;
	height:375px;
	background:url('../../../resources/images/error/rocket.png') no-repeat;
	margin:140px auto 50px;
	position:relative;
}

/*	Two steam classes. */

.steam1,
.steam2{
	position:absolute;
	bottom:78px;
	left:50px;
	width:80px;
	height:80px;
	background:url('../../../resources/images/error/steam.png') no-repeat;
	opacity:0.8;
}

.steam2{

   /*	.steam2 shows the bottom part (dark version)
	*	of the background image.
	*/

	background-position:left bottom;
}

hgroup{

	/* Using the HTML4 hgroup element */

	display:block;
	margin:0 auto;
	width:850px;
	font-family:'Century Gothic',Calibri,'Myriad Pro',Arial,Helvetica,sans-serif;
	text-align:center;
}

h1{
	color:#76D7FB;
	font-size:60px;
	text-shadow:3px 3px 0 #3D606D;
	white-space:nowrap;
}

h2{
	color:#9FE3FC;
	font-size:18px;
	font-weight:normal;
	padding:25px 0;
}

/* Only Needed For The Demo Page */

p.createdBy{
	font-size:15px;
	font-weight:normal;
	margin:50px;
	text-align:center;
	text-shadow:none;
}

a, a:visited {
	text-decoration:none;
	outline:none;
	border-bottom:1px dotted #97cae6;
	color:#97cae6;
}

a:hover{
	border-bottom:1px dashed transparent;
}
</style>
</head>
<body>
<div id="rocket"></div>

<hgroup>
    <h1>Page Not Found</h1>
    <h2>We couldn't find what you were looking for.</h2>
</hgroup>

<script type="text/javascript">
$(function(){
	function animSteam(){
		$('<span>',{
			className:'steam'+Math.floor(Math.random()*2 + 1),
			css:{
				marginLeft	: -10 + Math.floor(Math.random()*20)
			}
		}).appendTo('#rocket').animate({
			left:'-=58',
			bottom:'-=100'
		}, 120,function(){
			
			$(this).remove();
			setTimeout(animSteam,10);
		});
	}
	
	function moveRocket(){
		$('#rocket').animate({'left':'+=100'},5000).delay(1000)
					.animate({'left':'-=100'},5000,function(){
				setTimeout(moveRocket,1000);
		});
	}

	moveRocket();
	animSteam();
});
</script>
</body>
</html>