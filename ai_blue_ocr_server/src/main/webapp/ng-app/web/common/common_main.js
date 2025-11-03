'use strict';

var app = angular.module('sbAdminApp');

app.controller('CommonChartController', function ($scope, $http, $timeout, chartFactory) {
	
	var init = function() {
		$http.get("web/menu/" + $scope.prg_info.PRG_ID).then(function(res) {
			$scope.line_column_se_cd = res.data.LINE_COLUMN_SE_CD;
			$scope.subtitle = res.data.SCRN_NM;
	    });
		
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