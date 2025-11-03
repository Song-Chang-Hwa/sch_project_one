'use strict';

var app = angular.module('sbAdminApp');

app.controller('DashController', function ($scope, $http, $timeout, $compile, _, chartFactory, $log) {
	
	$scope.prg_info = {};
	
	var init = function() {
		$http.get("web/dashboard/").then(function(res) {
			
			$log.debug(res);
			
			$scope.line_column_se_cd = res.data.LINE_COLUMN_SE_CD;
			$scope.subtitle = res.data.SCRN_NM;
			$scope.prg_info.PRG_ID = res.data.PRG_ID;
			
			$http.get("web/tbprgcmpstlist/", { params : { id : $scope.prg_info.PRG_ID }}).then(function(res) {
				$scope.list = res.data.data;
				
				$timeout(function() {
					angular.forEach($scope.list, function(parent) {
						angular.forEach(parent.child, function(child) {
							$scope.selectChart(child.BASS_CHART_CD, child.CHART_ID);
						});
					});
			    });
		    });
	    });
	};
	
	$scope.selectChart = function(chartType, chartId) {
		
		$http.get("web/tbchart/" + $scope.prg_info.PRG_ID + "/" + chartId).then(function(res) {
			var chart = chartFactory.newInstance();
			chart.setChartId(chartId);
			chart.setChartType(chartType);
			chart.setScope($scope);
			chart.setXaxsNm(res.data.XAXS_NM);
			chart.setYaxsNm(res.data.YAXS_NM);
			chart.configure(res.data.data, res.data.series);
			chart.perform();
		});
		
	};
	
	init();
});