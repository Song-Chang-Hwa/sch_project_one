'use strict';

var app = angular.module('sbAdminApp');

// 공통처리용 팩토리
app.factory('commonFactory', function($http, $rootScope, $parse, _) {
	var http = function(url, method, dataObject, successFunc, errorFunc) {
		var promise = $http({
			method: method,
			url: url,
			data: dataObject,
			params: method == 'GET' ? dataObject : null,
			headers: {'ajaxHeader': 'AJAX'}
		}).then(successFunc, errorFunc);
	    return promise;
	};
	var service = {
		// 목록을 조회한다.
		selectList: function(url, dataObject, successFunc, errorFunc) { 
	        return http(url, 'GET', dataObject, successFunc, errorFunc);
		},
		// 신규등록
		add: function(url, dataObject, successFunc, errorFunc) { 
	        return http(url, 'POST', dataObject, successFunc, errorFunc);
	    },
	    // 수정
	    modify: function(url, dataObject, successFunc, errorFunc) { 
	        return http(url, 'PUT', dataObject, successFunc, errorFunc);
	    },
	    // 삭제
	    remove: function(url, dataObject, successFunc, errorFunc) { 
	        return http(url, 'DELETE', dataObject, successFunc, errorFunc);
	    },
	    // 콤보박스를 생성한다.
	    getCombo: function(scope, name, id, afterProcessing) { 
	    	http('web/dtlcd/', 'GET', {id : id}, function(res) {
	    		// Get the model
	    		var model = $parse(name);
	    		// Assigns a value to it
	    		model.assign(scope, res.data.data);
	    		
	    		if (!_.isUndefined(afterProcessing)) {
	    			if (typeof afterProcessing == 'function') {
	    				afterProcessing(res.data.data);
	    			} else {
	    				// error
	    			}
	    		}
	    	}, function() {});
	    },
	    // 상단메뉴를 생성한다.
	    renderTopmenu: function() { 
			return $rootScope.$broadcast('renderTopmenu', {
                
            });
		},
		// ui grid에 트리뷰로 보여주기 위한 데이터구조를 만든다.
		TreeNode: function() {
			
			var external = {};
			
			var id = 0;
			
			external.generate = function( childArray, currentLevel, dataArray ) {
				childArray.forEach( function( childNode ){    
					childNode.$$treeLevel = currentLevel;
			        dataArray.push( childNode );
			        if (childNode.children != null) {
			        	external.generate( childNode.children, currentLevel + 1, dataArray );
			        }
				});
			};
			
			return external;
		}
	};
	return service;
});