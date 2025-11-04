'use strict';

var app = angular.module('sbAdminApp');

// 분류코드 팩토리
app.factory('catgFactory', function($http, $rootScope, $resource) {
	var service = {
	    callDtlSearchByCatg: function() {
			return $rootScope.$broadcast('callDtlSearchByCatg', {
                
            });
		},
		callDtlAddModalByCatg: function() {
			return $rootScope.$broadcast('callDtlAddModalByCatg', {
                
            });
		}
	};
	return service;
});

// 상세코드 팩토리
app.factory('dtlFactory', function($http, $rootScope) {
	var service = {
		callDtlSearch: function(data) { // DtlCtrl 컨트롤러에서 search를 호출한다.
			$rootScope.$broadcast('callDtlSearch', {
                data: data
            });
		},
		callDtlAddModal: function(data) { // DtlCtrl 컨트롤러에서 addModal함수를 호출한다.
			$rootScope.$broadcast('callDtlAddModal', {
                data: data
            });
		}
	};
	return service;
});
