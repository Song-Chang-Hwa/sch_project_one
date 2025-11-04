'use strict';

var app = angular.module('sbAdminApp');

// 메뉴관리 팩토리
app.factory('menuFactory', function($http, $rootScope, $resource) {
	var service = {
		selectList: function() { // 분류코드를 조회한다.
			var dataObject = {};
			var promise = $http({
	    		method: 'GET',
	    		url: 'web/menu/',
	    		data: dataObject
	    	}).then(function (response) {
	            return response;
	        }, function(data) {
	        	console.log('error1');
	        	return data;
	        });
	        return promise;
		},
		add: function(dataObject) { // 분류코드를 생성한다.
	        var promise = $http({
	    		method: 'POST',
	    		url: 'web/menu/',
	    		data: dataObject
	    	}).then(function (response) {
	            return response;
	        }, function(data) {
	        	console.log('error1');
	        	return data;
	        });
	        return promise;
	    },
	    modify: function(dataObject) { // 분류코드를 수정한다.
	        var promise = $http({
	    		method: 'PUT',
	    		url: 'web/menu/',
	    		data: dataObject
	    	}).then(function (response) {
	            return response.data;
	        });
	        return promise;
	    },
	    remove: function(data) { // 분류코드를 삭제한다.
	        var promise = $http({
	    		method: 'DELETE',
	    		url: 'web/menu/',
	    		data: {CATG_CD : data.CATG_CD}
	    	}).then(function (response) {
	            return response.data;
	        });
	        return promise;
	    },
	    callDtlSearchByCatg: function() { // CatgCtrl 컨트롤러 함수를 호출한다.
			return $rootScope.$broadcast('callDtlSearchByCatg', {
                
            });
		},
		callDtlAddModalByCatg: function() { // CatgCtrl 컨트롤러 함수를 호출한다.
			return $rootScope.$broadcast('callDtlAddModalByCatg', {
                
            });
		}
	};
	return service;
});