'use strict';

var app = angular.module('sbAdminApp', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.exporter', 'ngResource', 'ui.grid.treeView']);


// 컨트롤러
app.controller('AuthGroupCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory) {
	$scope.showModalMsg = false;
    $scope.showSaveModalMsg = false;
    $scope.show_add_btn = false;
    
//    $scope.catg = {};
    
    var paginationOptions = {
		pageNumber: 1,
		pageSize: 25,
		sort: null
	};
    
    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
	    paginationPageSize: 25,
	    useExternalPagination: true,
	    useExternalSorting: true,
	    enableRowSelection: true, 
	    enableRowHeaderSelection: false,
	    multiSelect: false,
	    modifierKeysToMultiSelect: false,
	    noUnselect: true,
	    enableColumnResizing: true,
	    columnDefs: [
	        { name: 'AUTH_GRP_ID', displayName: '권한그룹ID', enableColumnMenu: false, enableSorting: false },
	        { name: 'AUTH_GRP_NM', displayName: '권한그룹명', enableColumnMenu: false, enableSorting: false }
	    ],
	    onRegisterApi: function(gridApi) {
	    	
	    	$scope.gridApi = gridApi;
	    	$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		        if (sortColumns.length == 0) {
		        	paginationOptions.sort = null;
		        } else {
		        	paginationOptions.sort = sortColumns[0].sort.direction;
		        }
		        $scope.search();
	    	});
			gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				paginationOptions.pageNumber = newPage;
		        paginationOptions.pageSize = pageSize;
		        $scope.search();
			});
			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
//				dtlFactory.callDtlSearch(rows.entity.CATG_CD);
		    });
	    }
	};
    
    $scope.search = function() {
    	commonFactory.selectList(
        		'web/tbauthgrp/', 
        		null, 
    	    	function(res) {
    	    		var d = res.data;
    	    		$scope.gridOptions.totalItems = d.count;
    	    		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
    	    		$scope.gridOptions.data = d.data.slice(firstRow, firstRow + paginationOptions.pageSize);
    	    		
    	    		$timeout(function() {
    	    			if($scope.gridApi.selection.selectRow){
    	    				$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
    	    	        }
    	    	    });
    	        },
    	        function() {
    	        	
    	        });
    }
    
    $scope.addModal = function() {
    	$scope.show_del_btn = false;
    	$scope.show_btn = true;
    	$scope.saveModalTitle = "권한 등록";
    	$scope.mod = {
        		func : function() {
        			commonFactory.add(
        	        		'web/tbauthgrp/', 
        	        		$scope.inputData,
        	        		function(res) { // success
        	        			$scope.showSaveModalMsg = false;
        	        			$scope.search();
        	        		}, 
        	        		function(res) { // error
        	        			$scope.err_msg = res.data.err_msg;
        	        		});
        		},
        		btn_name : '생성'
        	};
    	$scope.inputData = {};
    	$scope.list = [
    		{ name: 'AUTH_GRP_ID', displayName: '권한그룹ID' },
    		{ name: 'AUTH_GRP_NM', displayName: '권한그룹명' }
    	];
    	
    	$scope.showSaveModalMsg = !$scope.showSaveModalMsg;
    };
    
    $scope.add = function() {
    	
    }
    
    $scope.modifyModal = function() {
    	$scope.show_del_btn = false;
    	$scope.show_btn = true;
    	$scope.saveModalTitle = "권한 수정";
    	$scope.mod = {
    		func : function() {
    			console.log('test');
    		},
    		btn_name : '수정'
    	};
    	$scope.inputData = {};
    	$scope.list = [
    		{ name: 'AUTH_GRP_ID', displayName: '권한그룹ID' },
    		{ name: 'AUTH_GRP_NM', displayName: '권한그룹명' }
    	];
    	
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
	    	$scope.inputData = $scope.gridApi.selection.getSelectedRows()[0];
	    	$scope.showSaveModalMsg = !$scope.showSaveModalMsg;
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.modifyData = function() {
    	commonFactory.modify(
        		'web/tbauthgrp/', 
        		$scope.gridApi.selection.getSelectedRows()[0],
        		function(res) { // success
        			$scope.showSaveModalMsg = false;
            		$scope.search();
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.removeModal = function(){
    	$scope.show_del_btn = true;
		$scope.msg = '삭제하시겠습니까?';
    	$scope.showModalMsg = !$scope.showModalMsg;
    };
    
    $scope.del = function(){
    	commonFactory.remove(
        		'web/tbauthgrp/', 
        		$scope.gridApi.selection.getSelectedRows()[0],
        		function(res) { // success
        			$scope.showModalMsg = false;
            		$scope.search();
        		}, 
        		function(res) { // error
//        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.$on("callDtlSearchByCatg", function(event, args) {
//    	dtlFactory.callDtlSearch($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    })
    
    $scope.search();
 });

//컨트롤러
app.controller('AuthMenuCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory, uiGridTreeViewConstants) {
    $scope.showModalAdd = false;
    $scope.showModalModify = false;
    $scope.showModalDel = false;
    $scope.showModalMsg = false;
    
    $scope.catg = {};
    
    var paginationOptions = {
		pageNumber: 1,
		pageSize: 25,
		sort: null
	};
        
    $scope.gridOptions = {
	    useExternalSorting: true,
//	    enableRowSelection: false, 
	    enableRowHeaderSelection: false,
//	    multiSelect: false,
	    modifierKeysToMultiSelect: false,
//	    noUnselect: true,
	    enableColumnResizing: true,
	    columnDefs: [
	        { name: 'isActive', displayName: '', type: 'boolean',cellTemplate:'<input type="checkbox" ng-model="row.entity.isActive">', enableColumnMenu: false, enableSorting: false, width: 30},
	        { name: 'PRG_ID', displayName: '메뉴ID', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_NM', displayName: '메뉴명', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_FILE_NM', displayName: '프로그램파일명', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_TYPE_CD', displayName: '프로그램유형', enableColumnMenu: false, enableSorting: false },
	    ],
	    onRegisterApi: function(gridApi) {
	    	
	    	$scope.gridApi = gridApi;
	    	$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		        if (sortColumns.length == 0) {
		        	paginationOptions.sort = null;
		        } else {
		        	paginationOptions.sort = sortColumns[0].sort.direction;
		        }
		        $scope.search();
	    	});
			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
//				dtlFactory.callDtlSearch(rows.entity.CATG_CD);
		    });
	    }
	};
    
    $scope.search = function() {
    	commonFactory.selectList(
        		'web/menu/', 
        		null, 
    	    	function(res) {
        			$scope.gridOptions.totalItems = res.data.count;
            		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            		$scope.gridOptions.data = [];
            		$timeout(function() {
            			if($scope.gridApi.selection.selectRow){
            				$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
            	        }
            			commonFactory.TreeNode().generate(res.data.data.slice(firstRow, firstRow + paginationOptions.pageSize), 0, $scope.gridOptions.data);
            	    });
            		$timeout($scope.gridApi.treeBase.expandAllRows);
    	        },
    	        function() {
    	        	
    	        });
    }
    
    $scope.save = function() {
    	$scope.gridOptions.data[0].isActive = false;
    	console.log($scope.gridOptions.data[0].isActive);
    };
    
    $scope.$on("callDtlSearchByCatg", function(event, args) {
//    	dtlFactory.callDtlSearch($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    })
    
    $scope.search();
 });