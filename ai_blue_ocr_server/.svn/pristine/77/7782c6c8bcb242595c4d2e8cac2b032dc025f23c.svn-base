'use strict';

var app = angular.module('sbAdminApp');

// dx차트 팩토리
app.factory('chartFactory', function($compile) {
	
	// dx차트 객체
	var Chart = function() {
		
		var _chartId;
		var _chartType;
		var _scope;
		var _xaxsNm;
		var _yaxsNm;
		
		this.setChartId = function(chartId) {
			_chartId = chartId;
		};
		
		this.setChartType = function(chartType) {
			_chartType = chartType;
		};
		
		this.setScope = function(scope) {
			_scope = scope;
		};
		
		this.setXaxsNm = function(xaxsNm) {
			_xaxsNm = xaxsNm;
		};
		
		this.setYaxsNm = function(yaxsNm) {
			_yaxsNm = yaxsNm;
		};
		
		this.configure = function(dataSource, series) {
			if (STACKED_SPLINE_AREA === _chartType) {
				_scope['chartOptions' + _chartId] = {
			        dataSource: dataSource,
			        commonSeriesSettings: {
			            argumentField: 'ARGUMENT_FIELD',
			            type: 'stackedSplineArea'
			        },
			        animate: true,
			        series: series,
			        legend: {
			            verticalAlignment: 'bottom',
			            horizontalAlignment: 'center'
			        }, 		
			    };
			} else if (PIE === _chartType) {
				series[0].label = {
	                visible: true,
	                connector: {
	                    visible: true,
	                    width: 1
	                }
	            };
				
				_scope['chartOptions' + _chartId] = {
			        dataSource: dataSource,
			        animate: true,
			        series: series,
		            tooltip: {
		                enabled: true,
		                format: 'largeNumber',
		                precision: 1,
		                customizeTooltip: function (e) {
		                    return { html: e.valueText + ' %' }
		                }
		            }	
			    };
			} else if (STACKED_BAR === _chartType) {
				_scope['chartOptions' + _chartId] = {
			        dataSource: dataSource,
			        commonSeriesSettings: {
			            argumentField: 'ARGUMENT_FIELD',
			            type: 'stackedBar'
			        },
			        animate: true,
			        series: series,
			        legend: {
			            verticalAlignment: 'bottom',
			            horizontalAlignment: 'center'
			        }, 		
			    };
			} else if (POLAR === _chartType) {
				_scope['chartOptions' + _chartId] = {
					  dataSource: dataSource,
			          commonSeriesSettings: {
			        	  argumentField: 'ARGUMENT_FIELD',
			              type: 'line'
			          },
			          series: series
			      }
			} else if (STACKED_LINE === _chartType) {
				_scope['chartOptions' + _chartId] = {
					  dataSource: dataSource,
			          commonSeriesSettings: {
			        	  argumentField: 'ARGUMENT_FIELD',
			              type: 'stackedline'
			          },
			          series: series
			      }
			} else if (STEP_LINE === _chartType) {
				_scope['chartOptions' + _chartId] = {
					  dataSource: dataSource,
			          commonSeriesSettings: {
			        	  argumentField: 'ARGUMENT_FIELD',
			              type: 'stepline',
			              point: { visible: false }
			          },
			          series: series
			      }
			} else if (MULTI_BAR === _chartType) {
				_scope['chartOptions' + _chartId] = {
					  equalBarWidth: false,
					  dataSource: dataSource,
			          commonSeriesSettings: {
			        	  argumentField: 'ARGUMENT_FIELD',
			              type: 'bar'
			          },
			          series: series
			      }
			} else if (SINGLE_BAR === _chartType) {
				
				var testDs = [
				              {"VAL":806,"ARGUMENT_FIELD":"2010", "VAL2":100,"ARGUMENT_FIELD2":"2010"},
				              {"VAL":3294,"ARGUMENT_FIELD":"2011", "VAL2":90,"ARGUMENT_FIELD2":"2011"},
				              {"VAL":3294,"ARGUMENT_FIELD":"2012", "VAL2":200,"ARGUMENT_FIELD2":"2012"},
				              {"VAL":3708,"ARGUMENT_FIELD":"2013", "VAL2":250,"ARGUMENT_FIELD2":"2013"},
				              {"VAL":3294,"ARGUMENT_FIELD":"2014", "VAL2":300,"ARGUMENT_FIELD2":"2014"},
				              {"VAL":3276,"ARGUMENT_FIELD":"2015", "VAL2":350,"ARGUMENT_FIELD2":"2015"}
				              ];
				var testSeries = [
				                  {"argumentField":"ARGUMENT_FIELD", "valueField":"VAL"}, 
				                  {"argumentField":"ARGUMENT_FIELD2", "valueField":"VAL2", "type":"spline", "axis":"absoluteAxis"}
				                  ];
				
				_scope['chartOptions' + _chartId] = {
					  dataSource: testDs,
			          commonSeriesSettings: {
			        	  argumentField: 'ARGUMENT_FIELD',
			              type: 'bar'
			          },
			          series: testSeries,
			          argumentAxis: {
			        	  title: {
							text: _xaxsNm
			        	  },
			        	  grid: {
			        	  	visible: false
			        	  },
			        	  visible: true,
			        	  color: "#136aca",
			        	  width: 2
			          },
			          valueAxis: [{
			        	  title: {
			        	      text: _yaxsNm
			        	  },
			        	  position: "left",
			        	  grid: {
			        	  	visible: false
			        	  },
			        	  visible: true,
			        	  color: "#136aca",
			        	  width: 2,
			        	  label: {
			        	  	format: 'fixedPoint'
			        	  }
			          }, {
			        	  name: 'absoluteAxis',
			        	  position: 'right',
			        	  label: { format: 'largeNumber' },
			        	  synchronizedValue: 0
			          }],
			          legend: { visible: false }
			      }
			} else if (GRID === _chartType) {
				_scope.grouping = {
				    autoExpandAll: true
				};

				_scope.dataGridOptions = {
				    dataSource: dataSource,
				    allowColumnReordering: true,    
				    "export": {
				        enabled: true,
				        fileName: "Employees",
				        allowExportSelectedData: true
				    },
				    bindingOptions: {
				        grouping: "grouping"
				    },
				    searchPanel: {
				        visible: true
				    },
				    paging: {
				        pageSize: 10
				    },  
				    groupPanel: {
				        visible: true
				    },
				    columns: [
				        "ARGUMENT_FIELD",
				        "VAL"
				    ]
				};
				_scope.checkBoxOptions = {
				    text: "Expand All Groups",
				    bindingOptions: {
				        value: "grouping.autoExpandAll"
				    }
				};
			} else if (CIRCULAR_GAUGE === _chartType) {
				_scope.gaugeOption = {
					scale: {
				        startValue: 50,
				        endValue: 150,
						tickInterval: 10,
				        label: {
				            useRangeColors: true
				        }
				    },    
				    rangeContainer: {
				        palette: 'pastel',
				        ranges: [
				            { startValue: 50, endValue: 90 },
				            { startValue: 90, endValue: 130 },
				            { startValue: 130, endValue: 150 },
				        ]
				    },
				    value: 105
				};
			}
		};
		
		this.getHtml = function() {
			var html = '';
			if (STACKED_SPLINE_AREA === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (PIE === _chartType) {
				html = '<div style="margin: 0 auto" dx-pie-chart="chartOptions' + _chartId + '"></div>';
			} else if (STACKED_BAR === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (POLAR === _chartType) {
				html = '<div style="margin: 0 auto" dx-polar-chart="chartOptions' + _chartId + '"></div>';
			} else if (STACKED_LINE === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (STEP_LINE === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (MULTI_BAR === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (SINGLE_BAR === _chartType) {
				html = '<div style="margin: 0 auto" dx-chart="chartOptions' + _chartId + '"></div>';
			} else if (GRID === _chartType) {
				html = 
					'<div id="gridContainer" dx-data-grid="dataGridOptions"></div>' +
						'<div class="options">' +
					    '<div>' +
					        '<div id="autoExpand" dx-check-box="checkBoxOptions"></div>' +
					    '</div>' +
					'</div>';
			} else if (CIRCULAR_GAUGE === _chartType) {
				html = 
					'<div dx-circular-gauge="gaugeOption"></div>';
			}
			return html;
		};
		
		this.perform = function() {
			$("#" + _chartId).html($compile(this.getHtml())(_scope));
		}
		
	};
	
	var service = {
		newInstance: function() {
			return new Chart();
		}
	};
	return service;
});