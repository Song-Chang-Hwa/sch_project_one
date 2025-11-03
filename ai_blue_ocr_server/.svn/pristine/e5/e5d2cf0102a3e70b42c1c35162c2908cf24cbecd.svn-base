'use strict';

var app = angular.module('sbAdminApp', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.exporter', 'ngResource']);

app.controller('UserCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory) {
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
	        { name: 'EMP_ID', displayName: '사원ID', enableColumnMenu: false, enableSorting: false },
	        { name: 'EMP_NM', displayName: '사원명', enableColumnMenu: false, enableSorting: false },
	        { name: 'WORK_DEP_NM', displayName: '근무부서', enableColumnMenu: false, enableSorting: false },
	        { name: 'POSI_NM', displayName: '직위명', enableColumnMenu: false, enableSorting: false },
	        { name: 'ENTR_DT', displayName: '입사일자', enableColumnMenu: false, enableSorting: false }
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
        		'web/tbempmst/', 
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
//    	$scope.catg = {};
//    	$scope.showModalMsg = !$scope.showModalMsg;
    	$scope.show_add_btn = true;
    	$scope.saveModalTitle = "사용자 등록";
    	$scope.inputData = {};
    	$scope.list = [
    		{ name: 'EMP_ID', displayName: '사원ID' },
    		{ name: 'EMP_NM', displayName: '사원명' },
    		{ name: 'PWD', displayName: '비밀번호', type: 'password' },
    		{ name: 'CORP_CD', displayName: '회사코드' },
    		{ name: 'WORK_DEP_NM', displayName: '근무부서명' },
    		{ name: 'POSI_NM', displayName: '직위명' },
    		{ name: 'ENTR_DT', displayName: '입사일자' },
    		{ name: 'POST_NO', displayName: '우편번호' },
    		{ name: 'BASS_ADDR', displayName: '기본주소' },
    		{ name: 'DETAIL_ADDR', displayName: '상세주소' },
    		{ name: 'TEL_NO', displayName: '전화번호' },
    		{ name: 'MNGR_YN', displayName: '관리자여부' }
    	];
    	
    	$scope.showSaveModalMsg = !$scope.showSaveModalMsg;
    };
    
    $scope.add = function() {
    	commonFactory.add(
        		'web/tbempmst/', 
        		$scope.inputData,
        		function(res) { // success
        			$scope.showSaveModalMsg = false;
        			$scope.search();
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    }
    
    $scope.modifyModal = function() {
//    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
//	    	$scope.catg = $scope.gridApi.selection.getSelectedRows()[0];
//	    	$scope.showModalModify = !$scope.showModalModify;
//    	} else {
//    		$scope.msg = '항목을 선택하십시오.';
//    		$scope.showModalMsg = !$scope.showModalMsg;
//    	}
    };
    
    $scope.modifyData = function() {
//    	catgFactory.modify($scope.catg).then(function(d) {
//    		$scope.showModalModify = false;
//    		$scope.search();
//    	});
    };
    
    $scope.removeModal = function(){
//    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
//    		$scope.showModalDel = !$scope.showModalDel;
//    	} else {
//    		$scope.msg = '항목을 선택하십시오.';
//    		$scope.showModalMsg = !$scope.showModalMsg;
//    	}
    };
    
    $scope.removeData = function(){
//        catgFactory.remove($scope.gridApi.selection.getSelectedRows()[0]).then(function(d) {
//        	$scope.showModalDel = false;
//    		$scope.search();
//    	});
    };
    
    $scope.$on("callDtlSearchByCatg", function(event, args) {
//    	dtlFactory.callDtlSearch($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    })
    
    $scope.search();
 });

//컨트롤러
app.controller('_AuthGroupCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory) {
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
        paginationPageSizes: [25, 50, 75],
	    paginationPageSize: 25,
	    useExternalPagination: true,
	    useExternalSorting: true,
	    enableRowSelection: true, 
	    enableRowHeaderSelection: true,
	    multiSelect: true,
	    modifierKeysToMultiSelect: false,
	    noUnselect: false,
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
    	    		
    	        },
    	        function() {
    	        	
    	        });
    }
    
    $scope.addModal = function() {
//    	$scope.catg = {};
//    	$scope.showModalAdd = !$scope.showModalAdd;
    };
    
    $scope.add = function() {
//    	catgFactory.add($scope.catg).then(function(d) {
//    		$scope.showModalAdd = false;
//    		$scope.search();
//    	});
    }
    
    $scope.modifyModal = function() {
//    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
//	    	$scope.catg = $scope.gridApi.selection.getSelectedRows()[0];
//	    	$scope.showModalModify = !$scope.showModalModify;
//    	} else {
//    		$scope.msg = '항목을 선택하십시오.';
//    		$scope.showModalMsg = !$scope.showModalMsg;
//    	}
    };
    
    $scope.modifyData = function() {
//    	catgFactory.modify($scope.catg).then(function(d) {
//    		$scope.showModalModify = false;
//    		$scope.search();
//    	});
    };
    
    $scope.removeModal = function(){
//    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
//    		$scope.showModalDel = !$scope.showModalDel;
//    	} else {
//    		$scope.msg = '항목을 선택하십시오.';
//    		$scope.showModalMsg = !$scope.showModalMsg;
//    	}
    };
    
    $scope.removeData = function(){
//        catgFactory.remove($scope.gridApi.selection.getSelectedRows()[0]).then(function(d) {
//        	$scope.showModalDel = false;
//    		$scope.search();
//    	});
    };
    
    $scope.$on("callDtlSearchByCatg", function(event, args) {
//    	dtlFactory.callDtlSearch($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    })
    
    $scope.search();
 });