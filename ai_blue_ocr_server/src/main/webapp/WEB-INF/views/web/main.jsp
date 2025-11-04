<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<div id="wrapper" ng-controller="navCtrl">
	<!-- Navigation -->
	<nav class="navbar navbar-default navbar-static-top"
		role="navigation" style="margin-bottom: 0px;">
		<div class="navbar-header">
			<button class="navbar-toggle" type="button" data-toggle="collapse"
				data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="" ng-click='moveHome()'>Executive Information System</a>
		</div>
          
        <ul id='topmenu' class='nav navbar-nav'>
        	<li data-ng-repeat='row in list'><a href='' ng-click='renderSidemenu(row.PRG_ID)'>{{row.PRG_NM}}</a></li>
        </ul>
        
		<!-- /.navbar-header -->
		<ul class="nav navbar-top-links navbar-right" >
			<li class="dropdown"><a class="dropdown-toggle"
				data-toggle="dropdown"> <i class="fa fa-user fa-fw"></i> <i
					class="fa fa-caret-down"></i>
			</a>
				<ul class="dropdown-menu dropdown-user">
					<li><a href=""><i class="fa fa-user fa-fw"></i> User
							Profile</a></li>
					<li><a href=""><i class="fa fa-gear fa-fw"></i>
							Settings</a></li>
					<sec:authorize access="hasAuthority('USER')">
						<li><a href="" ng-click="renderAdminmenu()"><i class="fa fa-gear fa-fw"></i>
							Admin</a></li>
					</sec:authorize>
					<li class="divider"></li>
					<li><a href="${context}/logout" ><i
							class="fa fa-sign-out fa-fw"></i> Logout</a></li>
				</ul> <!-- /.dropdown-user --></li>
			<!-- /.dropdown -->
		</ul>
		
		<div class="navbar-default sidebar" role="navigation">
			<div class="sidebar-nav navbar-collapse" id="side-menu"></div>
		</div>
	</nav>
	<div ng-style="myObj">
		<div id="mainPage" ui-view="main">
			
		</div>
	</div>
</div>