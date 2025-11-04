'use strict';

var app = angular.module('sbAdminApp')

//리스트 컨트롤러
app.controller('MenuCtrl', function ($scope, $http, $timeout, uiGridConstants, menuFactory, commonFactory, uiGridTreeViewConstants, _, focus, $compile) {
    $scope.showModalMsg = false;
    $scope.showModalImage = false;
    
    $scope.originalData = {};
    $scope.dtl = {};
    
    var init = function() {
    	commonFactory.getCombo($scope, "list", "C011");
    	commonFactory.getCombo($scope, "use_yn_list", "C012");
    	commonFactory.getCombo($scope, "chart_atmc_setup_yn", "C015");
    	commonFactory.getCombo($scope, "line_column_se_cd", "C016");
    };
    
    var initData = function() {
    	$scope.selectedRow = "";
    	$scope.validData = "";
    	$scope.dtl = {};
    };
    
    var paginationOptions = {
		pageNumber: 1,
		pageSize: 25,
		sort: null
	};
        
    var toEmptyString = function(obj) {
    	return obj == "" || obj == null ? null : obj;
    }
    
    $scope.$watch('gridOptions.data', function (foo) {
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
    		
    		var cRow = $scope.gridOptions.data.indexOf( $scope.gridApi.selection.getSelectedRows()[0] );
    		
    		var rowData = $scope.gridApi.selection.getSelectedRows()[0];
    		if (rowData.status == "I") return;
    		
    		var array = $scope.originalData.data;
    		
    		for (var i = 0; i < array.length; i++) {
    			
    			
    			if ($scope.originalData.data[i].PRG_ID == rowData.PRG_ID) {
    				
    				
    				// 변경 체크
    				var isChanged = false;
    				if ($scope.originalData.data[i].PRG_ID != toEmptyString(rowData.PRG_ID)) {
    					isChanged = true;
    				}
    				if ($scope.originalData.data[i].PRG_NM != toEmptyString(rowData.PRG_NM)) {
    					isChanged = true;
    				}
    				if ($scope.originalData.data[i].UP_PRG_ID != toEmptyString(rowData.UP_PRG_ID)) {
    					isChanged = true;
    				}
    				if ($scope.originalData.data[i].PRG_TYPE_CD != toEmptyString(rowData.PRG_TYPE_CD)) {
    					isChanged = true;
    				}
    				if ($scope.originalData.data[i].PRG_LVL != toEmptyString(rowData.PRG_LVL)) {
    					isChanged = true;
    				}
    				if ($scope.originalData.data[i].PRG_ORD != toEmptyString(rowData.PRG_ORD)) {
    					isChanged = true;
    				}
					if ($scope.originalData.data[i].PRG_PATH != toEmptyString(rowData.PRG_PATH)) {
						isChanged = true;
					}
					if ($scope.originalData.data[i].PRG_FILE_NM != toEmptyString(rowData.PRG_FILE_NM)) {
						isChanged = true;
					}
					if (isChanged) {
						if (rowData.status != "I") {
							rowData.status = "U";
						}
					} else {
						if (rowData.status != "I") {
							rowData.status = "";
						}
					}
    			}
    		}
    	}
    	
    }, true);
    
    $scope.gridOptions = {
	    useExternalSorting: true,
	    enableRowSelection: true, 
	    enableRowHeaderSelection: false,
	    multiSelect: false,
	    modifierKeysToMultiSelect: false,
	    noUnselect: true,
	    enableColumnResizing: true,
	    showTreeExpandNoChildren: true,
	    columnDefs: [
//            { name: 'status', displayName: '상태' },
//	        { name: '1', displayName: '위치보기', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_ID', displayName: '메뉴ID', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_NM', displayName: '메뉴명', enableColumnMenu: false, enableSorting: false },
	        { name: 'UP_PRG_ID', displayName: '상위메뉴ID', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_TYPE_NM', displayName: '유형', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_LVL', displayName: '레벨', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_ORD', displayName: '순위', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_PATH', displayName: '프로그램경로', enableColumnMenu: false, enableSorting: false },
	        { name: 'PRG_FILE_NM', displayName: '프로그램파일명', enableColumnMenu: false, enableSorting: false }
	    ],
	    onRegisterApi: function(gridApi) {
	    	
	    	$scope.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
				var n = $scope.gridOptions.data.indexOf( $scope.gridApi.selection.getSelectedRows()[0] );
				if ($scope.gridOptions.data[n].status != "I") {
					$scope.id_disabled = true;
				} else {
					$scope.id_disabled = false;
				}
				
				$scope.dtl = rows.entity;
				
				$scope.selectedRow = "true";
				
				$scope.searchById($scope.dtl.PRG_ID);
		    });
			
			$scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
				
			});
	    }
	};
        
    $scope.search = function(prg_id) {
    	
    	initData();
    	
    	commonFactory.selectList(
        		'web/menu/', 
        		{}, 
        		function(d) {
        			
        			$scope.originalData = angular.copy(d.data);
        			
        			$scope.gridOptions.totalItems = d.data.count;
            		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            		$scope.gridOptions.data = [];
            		$timeout(function() {
            			commonFactory.TreeNode().generate(d.data.data.slice(firstRow, firstRow + paginationOptions.pageSize), 0, $scope.gridOptions.data);
            	    });
            		$timeout($scope.gridApi.treeBase.expandAllRows);
            		$timeout(function() {
            			if($scope.gridApi.selection.selectRow){
            				angular.forEach($scope.gridOptions.data, function(value, key) {
            					if (value.PRG_ID == prg_id) {
            						$scope.gridApi.selection.selectRow(value);
            					}
            				});
            	        }
            		});
            	},
    	        function() {
    	        	
    	        });
    	
    }
    
    $scope.addRow = function() {
//    	console.log("addRow");
//    	
//    	console.log($scope.gridOptions.data);
    	
//    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
//    		var dtl = $scope.gridApi.selection.getSelectedRows()[0];
//    		if (dtl.status == "I") {
//    			return;
//    		}
//    	}
    	
    	var n = $scope.gridOptions.data.length;
	    $scope.gridOptions.data.push({
	    			"status": "I"
	              });
	    
	    $timeout(function() {
			if($scope.gridApi.selection.selectRow){
				$scope.dtl = $scope.gridOptions.data[n];
				$scope.gridApi.selection.selectRow($scope.gridOptions.data[n]);
	        }
	    });
	    
    };
    
    $scope.saveModal = function() {
    	$scope.show_save_btn = false;
    	$scope.show_del_btn = false;
    	$scope.err_msg = null;
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
    		
    		// TODO : 유효성 체크 -> angular에서 제공하는 기능을 사용할 것
    		if (_.isEmpty($scope.dtl.PRG_ID)) {
    			$scope.msg = '메뉴ID를 선택하십시오.';
        		$scope.showModalMsg = !$scope.showModalMsg;
        		return;
    		}
    		if (_.isEmpty($scope.dtl.PRG_NM)) {
    			$scope.msg = '메뉴명을 선택하십시오.';
        		$scope.showModalMsg = !$scope.showModalMsg;
        		return;
    		}
    		if (_.isEmpty($scope.dtl.PRG_TYPE_CD)) {
    			$scope.msg = '유형을 선택하십시오.';
        		$scope.showModalMsg = !$scope.showModalMsg;
        		return;
    		}
    		
    		$scope.show_save_btn = true;
    		$scope.msg = '저장하시겠습니까?';
        	$scope.showModalMsg = !$scope.showModalMsg;
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.save = function() {
    	
    	var data = $scope.gridApi.selection.getSelectedRows()[0];
    	data.cmpstlist = $scope.gridOptions2.data;
    	
//    	var row = $scope.gridOptions.data.indexOf( $scope.gridApi.selection.getSelectedRows()[0] );
//    	console.log($scope.gridOptions.data[row]);
    	
    	commonFactory.modify(
        		'web/menu/', 
//        		$scope.gridOptions.data,
        		data,
        		function(res) { // success
        			$scope.showModalMsg = false;
            		$scope.search(data.PRG_ID);
            		
            		commonFactory.renderTopmenu();
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.removeRow = function(){
    	$scope.show_save_btn = false;
    	$scope.show_del_btn = false;
    	$scope.err_msg = null;
    	if ($scope.gridApi.selection.getSelectedRows().length > 0) {
    		var row = $scope.gridOptions.data.indexOf( $scope.gridApi.selection.getSelectedRows()[0] );
    		var dtl = $scope.gridOptions.data[row];
    		if (dtl.status == "I") {
    			$scope.dtl = {};
    			$scope.gridOptions.data.splice(row,1);
    			
    			var rowLength = $scope.gridOptions.data.length - 1;
    			var selectedRowIndex = -1;
    			if (rowLength < row) {
    				selectedRowIndex = rowLength;
    			} else {
    				selectedRowIndex = row;
    			}
    			
    			$timeout(function() {
    				if($scope.gridApi.selection.selectRow){
    					$scope.dtl = $scope.gridOptions.data[selectedRowIndex];
    					$scope.gridApi.selection.selectRow($scope.gridOptions.data[selectedRowIndex]);
    		        }
    		    });
    			
    		} else {
    			$scope.show_del_btn = true;
        		$scope.msg = '삭제하시겠습니까?';
            	$scope.showModalMsg = !$scope.showModalMsg;
    		}
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.del = function(){
    	
    	// TODO : 하위목록이 있으면 삭제안됨
    	
    	commonFactory.remove(
        		'web/menu/', 
        		$scope.gridApi.selection.getSelectedRows()[0],
        		function(res) { // success
        			$scope.showModalMsg = false;
            		$scope.search();
            		
            		commonFactory.getTopmenu();
        		}, 
        		function(res) { // error
        			$scope.err_msg = res.data.err_msg;
        		});
    };
    
    $scope.selectImage = function() {
    	$scope.showModalImage = !$scope.showModalImage;
    };
    
    $scope.selectImg = function(iconname) {
    	$scope.dtl.PRG_IMG_NM = iconname;
    	$scope.showModalImage = false;
    };
    
    $scope.gridOptions2 = {
    	    useExternalSorting: true,
    	    enableRowSelection: true, 
    	    enableRowHeaderSelection: false,
    	    multiSelect: false,
    	    modifierKeysToMultiSelect: false,
    	    noUnselect: true,
    	    enableColumnResizing: true,
    	    enableCellEditOnFocus: true,
    	    columnDefs: [
//                { name: 'status', displayName: '상태' },
//    	        { name: '1', displayName: '위치보기', enableColumnMenu: false, enableSorting: false },
    	        { name: 'PRG_ID', displayName: '메뉴ID', enableColumnMenu: false, enableSorting: false, enableCellEdit: false },
    	        { name: 'LINE_NO', displayName: '라인번호', enableColumnMenu: false, enableSorting: false, enableCellEdit: true },
    	        { name: 'CHART_CO', displayName: '차트갯수', enableColumnMenu: false, enableSorting: false, enableCellEdit: true }
    	    ],
    	    onRegisterApi: function(gridApi) {
    	    	
    	    	$scope.gridApi2 = gridApi;
    			gridApi.selection.on.rowSelectionChanged($scope,function(rows){
    		    });
    	    }
    	};
    
    $scope.addCmpstList = function() {
    	
    	var n = $scope.gridOptions2.data.length;
	    $scope.gridOptions2.data.push({
	    			"status": "I",
	    			"PRG_ID": $scope.gridApi.selection.getSelectedRows()[0].PRG_ID,
	    			"LINE_NO": n + 1
	              });
	    
	    $timeout(function() {
			if($scope.gridApi2.selection.selectRow){
				$scope.gridApi2.selection.selectRow($scope.gridOptions2.data[n]);
	        }
	    });
	    
    };
    
    $scope.removeCmpstList = function() {
    	$scope.show_save_btn = false;
    	$scope.show_del_btn = false;
    	$scope.err_msg = null;
    	if ($scope.gridOptions2.data.length > 0) {
    		var row = $scope.gridOptions2.data.length - 1;
    		var dtl = $scope.gridOptions2.data[row];
    		
    		if($scope.gridApi2.selection.selectRow){
				$scope.gridApi2.selection.selectRow(dtl);
	        }
    		
    		$scope.gridOptions2.data.splice(row,1);
    	} else {
    		$scope.msg = '항목을 선택하십시오.';
    		$scope.showModalMsg = !$scope.showModalMsg;
    	}
    };
    
    $scope.searchById = function(prg_id) {
//    	$scope.selectedDtlRow = "";
    	commonFactory.selectList(
        		'web/tbprgcmpstlist/', 
        		{id : prg_id}, 
        		function(res) {
        			
        			$scope.gridOptions2.data = [];
        			var d = res.data;
            		$scope.gridOptions2.totalItems = d.count;
            		var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            		$scope.gridOptions2.data = d.data.slice(firstRow, firstRow + paginationOptions.pageSize);
            		
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
    }
    
    init();
    $scope.search();
 });
