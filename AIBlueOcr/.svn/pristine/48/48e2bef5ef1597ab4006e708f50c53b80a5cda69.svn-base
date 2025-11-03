import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../../../shared/services';
import { CommFunction } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../../components/page/page.component';
const javascripts = [
    // './assets/resources/js/lib/dataGridDemoData.js',
    // './assets/resources/js/lib/dataGridCustom.js',
];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-modelevaluation',
    templateUrl: './modelevaluation.component.html',
    styleUrls: ['./modelevaluation.component.scss'],
})
export class ModelEvaluationComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    @Input() _AI_MSTR: any;

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = false;
    myGridtRowSelection = 'single';
    myDefaultColDef: any = { resizable: true };

    myChartCallType: any = 'line';
    myChartCallData: any = {};
    myChartCallOptions: any = {};

    MODEL_ID: any;

    @ViewChild('myChartJs') myChartJs;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.ModelEvaluationComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {}

    ngOnInit() {
        // 차트 데모 로드
        setTimeout(() => {
            // window.ModelEvaluationComponent.loadScript();
        });
        this.initGrid();
        this.search();
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    /*공통 스크립트 로드*/
    public loadScript() {
        for (let i = 0; i < javascripts.length; i++) {
            const node = document.createElement('script');
            node.src = javascripts[i];
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    initGrid() {
        const $this = this;
        const gridOptions = {
            // isRowSelectable: rowNode => (rowNode.data ? rowNode.data.year < 2007 : false),
            // other grid options ...
        };
        this.myGridColumnDefs = [
            {
                headerName: '모델명',
                field: 'MODEL_NM',
                width: 150,
                filter: true,
                sortable: true,
                hide: false,
                // cellStyle: { textAlign: 'center' },
            },
            {
                headerName: '세그먼트명',
                field: 'SEG_NM',
                width: 150,
                filter: true,
                sortable: true,
            },
            {
                headerName: '선호도명',
                field: 'PREF_NM',
                width: 150,
                filter: true,
                sortable: true,
            },
            {
                headerName: '알고리즘명',
                field: 'ALG_NM',
                width: 120,
                filter: true,
                sortable: true,
                hide: false,
                // cellStyle: { textAlign: 'center' },
            },
            {
                headerName: 'Precision',
                field: 'PRECISION',
                width: 110,
                filter: true,
                sortable: true,
                hide: false,
                cellStyle: { textAlign: 'right' },
            },
            {
                headerName: 'NDCG',
                field: 'NDCG',
                width: 110,
                filter: true,
                sortable: true,
                hide: false,
                cellStyle: { textAlign: 'right' },
            },
            {
                headerName: 'MAP',
                field: 'MAP',
                width: 110,
                filter: true,
                sortable: true,
                hide: false,
                cellStyle: { textAlign: 'right' },
            },
            {
                headerName: '상태',
                field: 'MODEL_STATUS_NM',
                width: 100,
                filter: true,
                sortable: true,
                hide: false,
                // cellStyle: { textAlign: 'center' },
            },
            {
                headerName: '선택',
                field: 'NEW_USE_YN',
                width: 120,
                // filter: true,
                sortable: true,
                cellStyle(params: any) {
                    if (params.node.data.USE_YN !== params.node.data.OLD_USE_YN) {
                        return { backgroundColor: '#f8ac59' };
                    } else {
                        return null;
                    }
                },
                cellRenderer(params: any) {
                    const isChecked = params.node.data.USE_YN === 'Y';
                    const input = document.createElement('input');
                    input.id = 'chkBox';
                    input.type = 'checkbox';
                    input.checked = isChecked;
                    input.addEventListener('click', function (event: any) {
                        const isCheck = event.target.checked;
                        params.value = isCheck ? 'Y' : 'N';
                        params.node.data.USE_YN = params.value;
                    });
                    input.addEventListener('change', function (event: any) {
                        $this.myGridDataApi.redrawRows();
                    });

                    const div = document.createElement('div');
                    div.style.width = '100%';
                    div.style.textAlign = 'center';
                    div.appendChild(input);
                    return div;
                },
            },
        ];
    }
    search() {
        if (!this._AI_MSTR.AI_ID) {
            return;
        }
        this.myGridData = [];

        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({ AI_ID: this._AI_MSTR.AI_ID });

        const serviceUrl = 'model/evaluation/selectList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.myGridData = resultData.data.list;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 모델확정
    evtBtnSaveClick() {
        const changeList: any = [];
        const list = this.getAllRows();
        list.forEach(item => {
            if (item.OLD_USE_YN !== item.USE_YN) {
                changeList.push(item);
                // console.log('----- this.changeList SEG_ID-----', item.SEG_ID);
            }
        });

        // console.log('----- evtBtnSaveClick this.changeList-----', this.changeList);
        if (changeList.length === 0) {
            swal.fire('선택한 항목이 없습니다.', '', 'warning');
            return;
        }

        swal.fire({
            title: '[' + changeList.length + '건] 확정 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('model/evaluation/update', changeList, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 201) {
                                swal.fire('저장하였습니다.', '', 'warning').then(result => {
                                    this.search();
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'warning').then(result => {
                                    this.search();
                                });
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('저장실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }

    onRowClick(e) {
        this.logger.debug('onRowClick@@@@@@@@@@', this.myGridDataApi.getFocusedCell().column.colId);
        const colId = this.myGridDataApi.getFocusedCell().column.colId;
        if (colId === 'NEW_USE_YN' && this.MODEL_ID === e.node.data.MODEL_ID) {
            return;
        }
        this.getModelDetailData(e.node.data.MODEL_ID);
    }

    getModelDetailData(modelId) {
        this.MODEL_ID = modelId;
        this.params = this.cf.toHttpParams({ MODEL_ID: modelId });

        const serviceUrl = 'model/evaluation/select';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.viewChart(resultData.data.info.MODEL_RANK_DETAIL);
                    // this.viewChart(
                    //     '[{"model_id":1001,"model_nm":"deepcf","avg_precision":94.9,"avg_ndcg":80.2,"avg_map":80,"detail_data":[{"ymd":20210618,"precision":82.21,"ndcg":81.21,"map":81.21},{"ymd":20210619,"precision":83.12,"ndcg":83.12,"map":82.12},{"ymd":20210620,"precision":89.12,"ndcg":84.12,"map":83.12},{"ymd":20210621,"precision":90.21,"ndcg":88.21,"map":90.21},{"ymd":20210622,"precision":92.12,"ndcg":92.12,"map":91.12},{"ymd":20210623,"precision":93.21,"ndcg":93.21,"map":92.21},{"ymd":20210624,"precision":94.12,"ndcg":94.12,"map":93.12}]},{"model_id":1001,"model_nm":"deepcf","avg_precision":94.9,"avg_ndcg":80.2,"avg_map":80,"detail_data":[{"ymd":20210618,"precision":82.21,"ndcg":81.21,"map":81.21},{"ymd":20210619,"precision":83.12,"ndcg":83.12,"map":82.12},{"ymd":20210620,"precision":89.12,"ndcg":84.12,"map":83.12},{"ymd":20210621,"precision":90.21,"ndcg":88.21,"map":90.21},{"ymd":20210622,"precision":92.12,"ndcg":92.12,"map":91.12},{"ymd":20210623,"precision":93.21,"ndcg":93.21,"map":92.21},{"ymd":20210624,"precision":94.12,"ndcg":94.12,"map":93.12}]}]'
                    // );
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    viewChart(modelRankDetail) {
        // this.logger.debug('viewChart:::::1:::::::modelRankDetail :::  ', modelRankDetail);
        // this.logger.debug(
        //     'viewChart:::::1-1:::::::modelRankDetail.model_id :::  ',
        //     modelRankDetail[0].model_id
        // );
        this.myChartCallData = { labels: [], datasets: [] };
        this.myChartJs.chart.update();

        if (!modelRankDetail) return;

        const detail = this.cf.StrToObj(modelRankDetail);
        // this.logger.debug('viewChart:::::2:::::::detail :::  ', detail);
        if (!detail) return;

        // const list = modelRankDetail.detail_data;
        // this.logger.debug('viewChart::::::3::::::data.detail_data :::  ', list);
        // if (!list) return;

        // this.chartCallData = { labels: [], datasets: [] };
        // this.chartJs.chart.update();

        const chartDateLabels = [];
        const chartDataSetsLabels = ['Precision', 'NDCG', 'MAP'];
        const chartDataSetsPrecision = [];
        const chartDataSetsNdcp = [];
        const chartDataSetsMap = [];
        // let maxRate = 0;
        detail.forEach(x => {
            // this.logger.debug('viewChart::::::::::::list :::  ', x);
            x.detail_data.forEach(data => {
                chartDateLabels.push(data.ymd);
                chartDataSetsPrecision.push(data.precision);
                chartDataSetsNdcp.push(data.ndcp);
                chartDataSetsMap.push(data.map);
                // maxRate = maxRate > x.RECO_RATE ? maxRate : x.RECO_RATE;
            });
        });

        const colors = this.cs.getChartColor(3);

        const chartDataSets = [];
        chartDataSets.push({
            label: 'Precision',
            pointBackgroundColor: colors[0],
            // backgroundColor: colors[i],
            borderColor: colors[0],
            // pointBorderColor: '#fff',
            data: chartDataSetsPrecision,
            fill: false,
        });
        chartDataSets.push({
            label: 'NDCG',
            pointBackgroundColor: colors[1],
            // backgroundColor: colors[i],
            borderColor: colors[1],
            // pointBorderColor: '#fff',
            data: chartDataSetsNdcp,
            fill: false,
        });
        chartDataSets.push({
            label: 'MAP',
            pointBackgroundColor: colors[2],
            // backgroundColor: colors[i],
            borderColor: colors[2],
            // pointBorderColor: '#fff',
            data: chartDataSetsMap,
            fill: false,
        });

        this.myChartCallOptions = {
            responsive: true,
            maintainAspectRatio: false,
            // showTooltips: true,
            hover: {
                animationDuration: 0,
            },
            animation: {
                duration: 1,
                onComplete() {
                    const chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.font = '11px verdana, sans-serif ';
                    ctx.fillStyle = '#6E6E6E';
                    this.data.datasets.forEach(function (dataset, i) {
                        const meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            const data = dataset.data[index];
                            if (data !== 0) {
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            }
                        });
                    });
                },
            },
            title: {
                display: true,
                text: detail[0].model_nm,
            },
            scales: {
                xAxes: [
                    {
                        // time: {
                        //     // unit: '%',
                        // },
                        gridLines: {
                            display: true,
                        },
                        // ticks: {
                        //     maxTicksLimit: 6,
                        // },
                    },
                ],
                yAxes: [
                    {
                        // time: {
                        //     unit: '%',
                        // },
                        // ticks: {
                        //     min: 0,
                        //     // max: Math.ceil(maxRate + maxRate / 10),
                        //     // maxTicksLimit: 5,
                        // },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            // legend: {
            //     display: false,
            // },
        };

        // console.log('chartDataSets :::  ', chartDataSets);
        this.myChartCallData = { labels: chartDateLabels, datasets: chartDataSets };
        // console.log(':::::::::::::::::::: totalChartCallData :::  ', this.totalChartCallData);
        this.myChartJs.chart.update();
    }

    onGridReady(params: any) {
        // params.api.sizeColumnsToFit();
        this.myGridDataApi = params.api;
        this.myGridDataColumnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }

    onPageSizeChanged() {
        // console.log('============== onPageSizeChanged ==============');
        // const pageSize: any = document.getElementById('pageSize');
        // console.log(pageSize[pageSize.selectedIndex].value);
        // this.gridApi.paginationSetPageSize(Number(pageSize));
    }
    onGridColumnsSizeChange(event) {
        event.api.sizeColumnsToFit();
    }
    onRowDataChanged(event) {
        const list = this.getAllRows();
        if (list.length > 0) {
            this.getModelDetailData(list[0].MODEL_ID);
        } else {
            return;
        }
        // console.log('onRowDataChanged:::::1:::::::');
        // const segId = this.cf.nvl(this._AI_MSTR.SEG_ID, '');
        // if (segId === '') return;
        let cnt: any = 0;
        this.myGridDataApi.forEachNode(node => {
            // console.log('onRowDataChanged::::::3::::::node', node.data.SEG_ID);
            // select the node
            if (cnt === 0) {
                // console.log(
                //     'onRowDataChanged::::::4::::::node.data.SEG_ID === segId',
                //     node.data.SEG_ID === segId
                // );
                node.setSelected(true);
            }
            cnt++;
        });
    }
    gridOnSelectionChanged($event) {
        /* rowSelection로 구현되어 있음
        const selectedRows = this.myGridDataApi.getSelectedRows();
        if (0 < selectedRows.length) {
            const selected = selectedRows[0];

            // console.log('selected: ' + selected);

            const FLD_ID = selected.FLD_ID;
            const SEG_ID = selected.SEG_ID;
        }*/
    }

    // 추가 메소드

    getAllRows() {
        try {
            const rowData = [];
            this.myGridDataApi.forEachNode(node => rowData.push(node.data));
            return rowData;
        } catch (e) {
            return [];
        }
    }
}
