'use strict';

var app = angular.module('sbAdminApp');

//분류코드 컨트롤러
app.controller('CatgCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory, catgFactory, dtlFactory) {
	
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
	    enableRowHeaderSelection: false,
	    multiSelect: false,
	    modifierKeysToMultiSelect: false,
	    noUnselect: true,
	    enableColumnResizing: true,
	    enableGridMenu: true,
	    columnDefs: [
	        { name: 'CATG_CD', displayName: '분류코드', enableColumnMenu: false, enableSorting: false },
	        { name: 'CATG_CD_NM', displayName: '분류코드명', enableColumnMenu: false, enableSorting: false },
	        { name: 'UP_CATG_CD', displayName: '상위분류코드', enableColumnMenu: false, enableSorting: false },
	        { name: 'CATG_CD_LVL', displayName: '분류코드레벨', enableColumnMenu: false, enableSorting: false },
	        { name: 'CATG_CD_DESC', displayName: '분류코드설명', enableColumnMenu: false, enableSorting: false }
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
				dtlFactory.callDtlSearch(rows.entity.CATG_CD);
		    });
	    }
	};
    
    $scope.search = function() {
    	
    	commonFactory.selectList(
    		'web/catgcd/', 
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
    	$scope.catg = {};
    	$scope.err_msg = null;
    	$scope.showModalAdd = !$scope.showModalAdd;
    };
    
    $scope.add = function() {
    	commonFactory.add(
        		'web/catgcd/', 
        		$scope.catg,
        		function(res) { // success
        			$scope.showModalAdd = false;
        			$scope.search();
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    }
    
    $scope.modifyModal = function() {
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
	    	$scope.catg = $scope.gridApi.selection.getSelectedRows()[0];
	    	$scope.showModalModify = !$scope.showModalModify;
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.modifyData = function() {
    	commonFactory.modify(
        		'web/catgcd/', 
        		$scope.catg,
        		function(res) { // success
        			$scope.showModalModify = false;
            		$scope.search();
        		}, 
        		function(res) { // error
//        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.removeModal = function(){
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
    		var arg = {id : $scope.gridApi.selection.getSelectedRows()[0].CATG_CD};
    		commonFactory.selectList(
    				'web/dtlcd/', 
    				arg,
    				function(res) {
		    			if (res.data.count > 0) {
		    				$scope.msg = '상세코드가 존재합니다.';
		    	    		$scope.showModalMsg = !$scope.showModalMsg;
		    			} else {
		    				$scope.showModalDel = !$scope.showModalDel;
		    			}
    				},
    				function(res) {
    					
    				}
        	);
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.removeData = function(){
        commonFactory.remove(
        		'web/catgcd/', 
        		$scope.gridApi.selection.getSelectedRows()[0],
        		function(res) { // success
        			$scope.showModalDel = false;
            		$scope.search();
        		}, 
        		function(res) { // error
//        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.$on("callDtlSearchByCatg", function(event, args) {
    	dtlFactory.callDtlSearch($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    });
    
    $scope.$on("callDtlAddModalByCatg", function(event, args) {
    	dtlFactory.callDtlAddModal($scope.gridApi.selection.getSelectedRows()[0].CATG_CD);
    });
    
    $scope.search();
 });

// 상세코드 컨트롤러
app.controller('DtlCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory, catgFactory, dtlFactory) {
	$scope.showModalAdd = false;
    $scope.showModalModify = false;
    $scope.showModalDel = false;
    $scope.showModalMsg = false;
    
    $scope.dtl = {};
    
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
	    enableGridMenu: true,
	    columnDefs: [
			{ name: 'DTL_CD', displayName: '상세코드', enableColumnMenu: false, enableSorting: false },
			{ name: 'DTL_CD_NM', displayName: '상세코드명', enableColumnMenu: false, enableSorting: false },
			{ name: 'DTL_CD_ORD', displayName: '상세코드 순서', enableColumnMenu: false, enableSorting: false },
			{ name: 'DTL_CD_DESC', displayName: '상세코드 설명', enableColumnMenu: false, enableSorting: false }
	    ],
	    onRegisterApi: function(gridApi) {
	    	
	    	$scope.gridApi = gridApi;
	    	$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		        if (sortColumns.length == 0) {
		        	paginationOptions.sort = null;
		        } else {
		        	paginationOptions.sort = sortColumns[0].sort.direction;
		        }
		        getPage();
	    	});
			gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				paginationOptions.pageNumber = newPage;
		        paginationOptions.pageSize = pageSize;
		        getPage();
			});
	    }
	};
    
    $scope.$on("callDtlSearch", function(event, args) {
    	$scope.searchById(args);
    });
    
    $scope.$on("callDtlAddModal", function(event, args) {
    	$scope.addModalById(args.data);
    });
    
    $scope.searchById = function(data) {
        
        commonFactory.selectList(
        		'web/dtlcd/', 
        		{id : data.data}, 
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
    };
    
    $scope.search = function() {
    	catgFactory.callDtlSearchByCatg();
    };
	
    $scope.addModal = function(data) {
    	catgFactory.callDtlAddModalByCatg();
    };
    
    $scope.addModalById = function(data) {
    	$scope.dtl = {CATG_CD : data};
    	$scope.showModalAdd = !$scope.showModalAdd;
    };
    
    $scope.add = function() {
    	commonFactory.add(
        		'web/dtlcd/', 
        		$scope.dtl, 
        		function(res) {
        			$scope.showModalAdd = false;
            		$scope.search();
            	},
    	        function() {
    	        	
    	        });
    }
    
    $scope.modifyModal = function() {
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
	    	$scope.dtl = $scope.gridApi.selection.getSelectedRows()[0];
	    	$scope.showModalModify = !$scope.showModalModify;
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.modifyData = function() {
    	commonFactory.modify(
        		'web/dtlcd/', 
        		$scope.dtl, 
        		function(res) {
        			$scope.showModalModify = false;
            		$scope.search();
            	},
    	        function() {
    	        	
    	        });
    };
    
    $scope.removeModal = function(){
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
    		$scope.title = '상세코드 삭제';
    		$scope.msg = '[상세코드 : ' + $scope.gridApi.selection.getSelectedRows()[0].DTL_CD + ']' + '을(를) 삭제하시겠습니까?';
    		$scope.showModalDel = !$scope.showModalDel;
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.removeData = function(){
    	commonFactory.remove(
        		'web/dtlcd/', 
        		$scope.gridApi.selection.getSelectedRows()[0], 
        		function(res) {
        			$scope.showModalDel = false;
            		$scope.search();
            	},
    	        function() {
    	        	
    	        });
    };
    
});