'use strict';

var app = angular.module('sbAdminApp');

app.controller('navCtrl', function ($scope, $http, runtimeStates, $compile, $state,  _, $log) {
	
	var init = function() {
		renderTopmenu();
		$scope.moveHome();
	};
	
	var renderTopmenu = function() {
		$http.get("web/topmenu/").then(function(res) {
			$scope.list = res.data;
	    });
	};
	
	var registerState = function(pId) {
		$http.get("web/usermenuData/", {params: { id : pId }}).then(function(res) {
			register(res.data);
	    });
	};
	
	var register = function(list) {
		angular.forEach(list, function(value, key) {
			if (!_.isEmpty(value.PRG_PATH)) {
				var stateName = 'eis.' + value.PRG_ID;
				var automaticState = {
					url : "/" + value.PRG_PATH,
					templateUrl : function($stateParams, $http) {
						return "ng-app/web/common/common_main.html";
					},
					controller: function($scope, $stateParams) {
						$scope.prg_info = value;
					},
					resolve: {                                                      
			    		loadMyFile:function($ocLazyLoad) {                          
			    	        return $ocLazyLoad.load({                               
			    	        	serie: true,                                        
			    	            name:'sbAdminApp',                                  
			    	            files:['ng-app/web/common/common_main.js']
			    	        })                                                      
			    		}                                                         
			    	}       
				};
				var manualState = {
					url : "/" + value.PRG_PATH,
					templateUrl : value.PRG_PATH + '/' + value.PRG_FILE_NM,
					resolve: {                                                      
						loadMyFile:function($ocLazyLoad) {                          
			    	        return $ocLazyLoad.load({                               
			    	        	serie: true,                                        
			    	            name:'sbAdminApp',                                  
			    	            files:[value.PRG_PATH + '/' + (value.PRG_FILE_NM.substring(0, value.PRG_FILE_NM.lastIndexOf("."))) + '.js']
			    	        })                                                      
			    	    }                                                         
			    	}                                                               
				};
				
				if (_.isEmpty($state.get(stateName))) {
					if (_.isEqual( value.CHART_ATMC_SETUP_YN, 'Y' )) {
						runtimeStates.addState(stateName, automaticState);
					} else {
						runtimeStates.addState(stateName, manualState);
					}
					$log.info(stateName + " has been registered");
				} else {
					var state = $state.get(stateName);
					if (_.isEqual( value.CHART_ATMC_SETUP_YN, 'Y' )) {
						state.views.main.url = automaticState.url;
						state.views.main.templateUrl = automaticState.templateUrl;
						state.views.main.controller = automaticState.controller;
						state.views.main.resolve = automaticState.resolve;
					} else {
						state.views.main.url = manualState.url;
						state.views.main.templateUrl = manualState.templateUrl;
						state.views.main.resolve = manualState.resolve;
					}
				}
			}
			
			if (!_.isEmpty(value.children)) {
				register(value.children);
			}
		});
	}
	
	$scope.$on("renderTopmenu", function(event, args) {
		renderTopmenu();
    });
	
	var full = {
		"margin" : "0 0 0 0px",
	    "padding" : "0 30px",
	    "background-color" : "#fff"
	};
	
	var split = {
		"margin" : "0 0 0 250px",
	    "padding" : "0 30px",
	    "border-left" : "1px solid #e7e7e7",
	    "background-color" : "#fff"
	};
	
	$scope.renderSidemenu = function(pId) {
		$scope.myObj = split;
		$scope.collapseVar = [];
		registerState(pId);
		$state.transitionTo('eis.intro');
		$http.get("web/usermenu/", {params: { id : pId }}).then(function(res) {
			$("#side-menu").html($compile(res.data)($scope));
	    });
	};
	
	$scope.renderAdminmenu = function() {
		$scope.myObj = split;
		$state.transitionTo('eis.intro');
		$http.get("web/adminmenu/").then(function(res) {
			$("#side-menu").html($compile(res.data)($scope));
	    });
	};
	
	$scope.moveHome = function() {
		$scope.myObj = full;
		$("#side-menu").html($compile("")($scope));
		$state.transitionTo('eis.home');
	};
	
	$scope.collapseVar = [];
    
    $scope.check = function(x, idx){
    	if (x == $scope.collapseVar[idx]) {
    		$scope.collapseVar[idx] = 0;
    	} else {
    		$scope.collapseVar[idx] = x;
    	}
    };
	
    init();
    
});