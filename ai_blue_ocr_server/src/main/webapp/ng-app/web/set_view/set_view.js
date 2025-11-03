'use strict';

var app = angular.module('sbAdminApp', ['ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.exporter', 'ngResource', 'ui.grid.treeView']);

app.controller('SetViewCtrl', function ($scope, $http, $timeout, uiGridConstants, commonFactory, _, focus, $compile) {
	$scope.showModalMsg = false;
	
	var lazyLoadCombo = function() {
		// 데이터표시여부
		if (_.isEmpty($scope.data_indict_yn)) {
			commonFactory.getCombo($scope, "data_indict_yn", "C014");
		}
    	// 기본차트코드
		if (_.isEmpty($scope.bass_chart_cd)) {
			commonFactory.getCombo($scope, "bass_chart_cd", "C013");
		}
    };
	
	var paginationOptions = {
		pageNumber: 1,
		pageSize: 25,
		sort: null
	};
	
	var cls = function(grid, row, col, rowRenderIndex, colRenderIndex) {
		var prgTypeCd = $scope.gridOptions.data[rowRenderIndex].PRG_TYPE_CD;
        if (prgTypeCd === '20' || prgTypeCd === '30') {
            return 'red';
        }
    };
    
    var rowIndex = function(gridOptions, gridApi) {
    	return $scope[gridOptions].data.indexOf( $scope[gridApi].selection.getSelectedRows()[0] );
    };
    
    var getEntity = function(gridOptions, gridApi) {
    	var n = rowIndex(gridOptions, gridApi);
    	return $scope[gridOptions].data[n];
    };
    
    var State = function() {
    	this.state = false;
    	
    	this.setState = function(state) {
    		this.state = state;
    	};
    	this.getState = function() {
    		return this.state;
    	};
    };
    
    var clearData = function() {
    	$scope.selectedRow = "";
		$scope.selectedDtlRow = "";
		$scope.gridOptions2.data = [];
		$scope.dtl = {};
		$scope.list = [];
		stat.setState(false);
    };
    
    var stat = new State();
    
    $scope.selectedRow = function(gridOptions, gridApi) {
    	var row = $scope[gridOptions].data.indexOf( $scope[gridApi].selection.getSelectedRows()[0] );
    	console.log(row);
    	return row;
    };
        
    $scope.gridOptions = {
	    useExternalSorting: true,
	    enableRowHeaderSelection: false,
		multiSelect: false,
	    modifierKeysToMultiSelect: false,
		noUnselect: true,
	    enableColumnResizing: true,
	    columnDefs: [
	        { name: 'PRG_ID', displayName: '메뉴ID', enableColumnMenu: false, enableSorting: false, cellClass: cls },
	        { name: 'PRG_NM', displayName: '메뉴명', enableColumnMenu: false, enableSorting: false, cellClass: cls},
	    ],
	    onRegisterApi: function(gridApi) {
	    	
	    	$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
				clearData();
				
				if (rows.entity.PRG_TYPE_CD === '20' || rows.entity.PRG_TYPE_CD === '30') {
					$scope.selectedRow = "true";
					$scope.searchById(rows.entity.PRG_ID);
				}
		    });
	    }
	};
    
    $scope.search = function() {
    	
    	clearData();
    	
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
    };
    
    $scope.searchById = function(prg_id, chart_id) {
    	$scope.selectedDtlRow = "";
    	
    	$scope.list = [];
    	commonFactory.selectList(
        		'web/tbprgcmpstlist/', 
        		{id : prg_id}, 
        		function(res) {
        			console.log(res.data.data);
        			$scope.list = res.data.data;
        			
//        			console.log(res.data.count);
//        			console.log(res.data.data);
//        			
//        			$scope.gridOptions2.columnDefs = [];
//        			for (var i = 0; i < res.data.count; i++) {
//        				$scope.gridOptions2.columnDefs[i] = { name: 'ID' + i, displayName: 'TEST' + i, enableColumnMenu: false, enableSorting: false };
//        			}
//        			
//        			$scope.gridOptions2.columnDefs = [
//					  { name: 'CHART_ID', displayName: 'TEST1', enableColumnMenu: false, enableSorting: false },
//					  { name: 'CHART_NM', displayName: 'TEST2', enableColumnMenu: false, enableSorting: false },
//					];
        			
//        			$scope.gridOptions2.data = [];
//        			var d = res.data;
//            		$scope.gridOptions2.totalItems = d.count;
//            		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
//            		$scope.gridOptions2.data = d.data.slice(firstRow, firstRow + paginationOptions.pageSize);
            		
//            		$timeout(function() {
//            			if($scope.gridApi2.selection.selectRow){
//            				angular.forEach($scope.gridOptions2.data, function(value, key) {
//            					if (value.CHART_ID == chart_id) {
//            						$scope.gridApi2.selection.selectRow(value);
//            					}
//            				});
//            	        }
//            	    });
            	},
    	        function() {
    	        	
    	        });
    	
    	commonFactory.selectList(
        		'web/tbchart/', 
        		{id : prg_id}, 
        		function(res) {
//        			
//        			$scope.gridOptions2.columnDefs = [
//        			                      	        { name: 'CHART_ID', displayName: 'TEST1', enableColumnMenu: false, enableSorting: false },
//        			                    	        { name: 'CHART_NM', displayName: 'TEST2', enableColumnMenu: false, enableSorting: false },
//        			                    	    ];
        			
        			$scope.gridOptions2.data = [];
        			var d = res.data;
            		$scope.gridOptions2.totalItems = d.count;
            		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            		$scope.gridOptions2.data = d.data.slice(firstRow, firstRow + paginationOptions.pageSize);
            		
            		$timeout(function() {
            			if($scope.gridApi2.selection.selectRow){
            				angular.forEach($scope.gridOptions2.data, function(value, key) {
            					if (value.CHART_ID == chart_id) {
            						$scope.gridApi2.selection.selectRow(value);
            					}
            				});
            	        }
            	    });
            	},
    	        function() {
    	        	
    	        });
    }
    
    $scope.addRow = function() {
    	
    	if (stat.getState()) {
    		return;
    	} else {
    		stat.setState(true);
    	}
    	
    	var n = $scope.gridOptions2.data.length;
	    $scope.gridOptions2.data.push({
	    			"status": "I"
	              });
	    
	    $timeout(function() {
			if($scope.gridApi2.selection.selectRow){
				$scope.dtl = $scope.gridOptions2.data[n];
				$scope.gridApi2.selection.selectRow($scope.gridOptions2.data[n]);
	        }
	    });
	    
    };
    
    $scope.removeRow = function() {
    	if ($scope.gridApi2.selection.getSelectedRows().length > 0) {
    		var row = rowIndex('gridOptions2', 'gridApi2');
    		var entity = getEntity('gridOptions2', 'gridApi2');
    		if (entity.status == "I") {
    			
    			$scope.dtl = {};
    			$scope.gridOptions2.data.splice(row,1);
    			
    			var rowLength = $scope.gridOptions2.data.length - 1;
    			var selectedRowIndex = -1;
    			if (rowLength < row) {
    				selectedRowIndex = rowLength;
    			} else {
    				selectedRowIndex = row;
    			}
    			
    			$timeout(function() {
    				if($scope.gridApi2.selection.selectRow){
    					$scope.dtl = $scope.gridOptions2.data[selectedRowIndex];
    					$scope.gridApi2.selection.selectRow($scope.gridOptions2.data[selectedRowIndex]);
    		        }
    		    });
    			
    			$scope.selectedDtlRow = "";
    			$scope.dtl = {};
    			stat.setState(false);
    			
    		} else {
    			$scope.show_save_btn = false;
    			$scope.show_del_btn = true;
    			$scope.err_msg = null;
        		$scope.msg = '삭제하시겠습니까?';
            	$scope.showModalMsg = !$scope.showModalMsg;
    		}
    	} else {
    		$scope.show_save_btn = false;
    		$scope.show_del_btn = false;
    		$scope.err_msg = null;
    		$scope.msg = '항목을 선택하십시오.';
        	$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.del = function(){
    	commonFactory.remove(
        		'web/tbchart/', 
        		$scope.gridApi2.selection.getSelectedRows()[0],
        		function(res) { // success
        			
        			$scope.dtl = {};
        			stat.setState(false);
        			
        			$scope.showModalMsg = false;
            		$scope.searchById($scope.gridApi.selection.getSelectedRows()[0].PRG_ID);
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.gridOptions2 = {
    	    useExternalSorting: true,
    	    enableRowHeaderSelection: false,
    		multiSelect: false,
    	    modifierKeysToMultiSelect: false,
    		noUnselect: true,
    	    enableColumnResizing: true,
    	    columnDefs: [
    	        { name: 'CHART_ID', displayName: '차트ID', enableColumnMenu: false, enableSorting: false },
    	        { name: 'CHART_NM', displayName: '차트명', enableColumnMenu: false, enableSorting: false },
    	    ],
    	    onRegisterApi: function(gridApi) {
    	    	$scope.gridApi2 = gridApi;
    			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
    				$scope.selectedDtlRow = "true";
    				$scope.dtl = rows.entity;
    				$scope.dtl.PRG_ID = getEntity('gridOptions', 'gridApi').PRG_ID;
    				lazyLoadCombo();
    		    });
    	    }
    	};
    
    $scope.saveModal = function() {
    	$scope.show_save_btn = true;
    	$scope.show_del_btn = false;
    	$scope.err_msg = null;
		$scope.msg = '저장하시겠습니까?';
    	$scope.showModalMsg = !$scope.showModalMsg;
    };
    
    $scope.save = function() {
    	var entity = $scope.dtl;
    	if (entity.status === 'I') {
	    	commonFactory.add(
				'web/tbchart/', 
				entity,
				function(res) { // success
					
					stat.setState(false);
					
					$scope.showModalMsg = false;
					$scope.searchById($scope.gridApi.selection.getSelectedRows()[0].PRG_ID);
		    		
				}, 
				function(res) { // error
					$scope.err_msg = res.data.err_msg;
				}
			);
    	} else {
    		commonFactory.modify(
				'web/tbchart/', 
				entity,
				function(res) { // success
					
					stat.setState(false);
					
					$scope.showModalMsg = false;
					$scope.searchById($scope.gridApi.selection.getSelectedRows()[0].PRG_ID, entity.CHART_ID);
		    		
				}, 
				function(res) { // error
					$scope.err_msg = res.data.err_msg;
				}
			);
    	}
    };
    
    $scope.details = function(child) {
    	$scope.selectedDtlRow = "true";
		$scope.dtl = child;
		$scope.dtl.PRG_ID = getEntity('gridOptions', 'gridApi').PRG_ID;
		lazyLoadCombo();
    };
    
    $scope.testSQL = function(sql) {
    	commonFactory.selectList(
			'web/tbchart/' + $scope.dtl.PRG_ID + '/' + $scope.dtl.CHART_ID + '/' + sql, 
			null,
			function(res) { // success
				$scope.show_save_btn = false;
		    	$scope.show_del_btn = false;
				$scope.msg = res.data.resultNm;
				$scope.err_msg = '';
		    	$scope.showModalMsg = !$scope.showModalMsg;
			}, 
			function(res) { // error
				$scope.show_save_btn = false;
		    	$scope.show_del_btn = false;
		    	$scope.msg = '';
		    	$scope.err_msg = res.data.err_msg;
		    	$scope.showModalMsg = !$scope.showModalMsg;
			}
		);
    };

    $scope.search();
	
});