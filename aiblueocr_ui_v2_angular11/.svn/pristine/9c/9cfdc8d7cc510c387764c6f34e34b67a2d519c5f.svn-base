import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../shared/services';
import { CommFunction } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../components/page/page.component';


const javascripts = ['./assets/resources/js/scripts.js'];

// import * as $ from 'jquery';

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.RootComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }
    navigationSubscription: any;
    params: HttpParams;

    END_DATE: any = this.cf.toDateAddDay(0);
    LAYOUT: any = '통계';

    typeLayoutList: any = [{ NAME: '통계' }, { NAME: '개인화' }, { NAME: '전체' }];

    private myGridDataApi;
    private myGridDataColumnApi;
    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'single';
    myDefaultColDef: any = { resizable: true };

    totalDocCount: any;
    totalRecognitionCount: any;
    totalLearningCount: any;
    totalEtcCount: any;
    recoRateTop5ByAreaList: any = [];
    // prgressbarMax: any = 100;

    totalChartCallType: any = 'bar';
    totalChartCallData: any = {};
    totalChartCallOptions: any = { responsive: true, maintainAspectRatio: false };

    enrollChartCallType: any = 'bar';
    enrollChartCallData: any = {};
    enrollChartCallOptions: any = { responsive: true, maintainAspectRatio: false };

    teacherChartCallType: any = 'bar';
    teacherChartCallData: any = {};
    teacherChartCallOptions: any = { responsive: true, maintainAspectRatio: false };

    @ViewChild('totalChartJs') totalChartJs;
    @ViewChild('enrollChartJs') enrollChartJs;
    @ViewChild('teacherChartJs') teacherChartJs;

    initialiseInvites() {}

    ngOnInit() {
        setTimeout(() => {
            window.RootComponent.loadScript();
        });

        this.initGrid();
        this.getTotalCount();
        //this.getMaxDate();
    }

    ngOnDestroy() {
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
        const gridOpions = {
            // isRowSelectble: rowNode => (rowNode.daa ? roNode.data.year < 2007 : false)            // other gridotions ...
        };
        this.myGridColumnDefs = [
            {
                headerName: '추천일자',
                field: 'DATE',
                editable: false,
                filter: false,
                sortable: true,
                headerCellClass: 'text-center',
            },
            {
                headerName: '수강신청수',
                field: 'ENROLLMENT',
                editable: false,
                filter: false,
                sortable: true,
                valueFormatter:
                    'Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
                cellClass: 'text-right',
                headerCellClass: 'text-center',
            },
            {
                headerName: '추천성공수',
                field: 'RECOSUCCESS',
                editable: false,
                filter: false,
                sortable: true,
                valueFormatter:
                    'Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")',
                cellClass: 'text-right',
                headerCellClass: 'text-center',
            },
            {
                headerName: '전환율',
                field: 'RECO_RATE',
                editable: false,
                filter: false,
                sortable: true,
                cellClass: 'text-right',
                headerCellClass: 'text-center',
                valueFormatter: params => params.data.RECO_RATE.toFixed(2) + '%',
            },
        ];
    }

    // 최근 기준일 조회
    getMaxDate() {
        const serviceUrl = 'main/selectMaxDate';
        this.apigatewayService.doGetPromise(serviceUrl, null).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.END_DATE = resultData.data.END_DATE;
                }
                this.search();
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    search() {
        // 1.
        this.getTotalRecoRate();
        this.searchByLayout();
    }

    // 1. 건수
    getTotalCount() {
        const params = this.cf.toHttpParams({
            END_DATE: this.END_DATE,
        });
        const serviceUrl = 'main/selectTotalCount';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                // console.log(':::: getTotalCount ::::::::: resultData', resultData);
                if (resultData.code === 200) {
                    this.totalDocCount = resultData.data.totalDocCount;
                    this.totalRecognitionCount = resultData.data.totalRecognitionCount;
                    this.totalLearningCount = resultData.data.totalLearningCount;
                    this.totalEtcCount = resultData.data.totalEtcCount;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    //  2. 추천 유형별 전환율
    getTotalRecoRate() {
        const params = this.cf.toHttpParams({
            // START_DATE: this.START_DATE,
            END_DATE: this.END_DATE,
        });
        const serviceUrl = 'main/selectTotalRecoRate';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.viewTotalChart(resultData.data.list);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 레이아웃 선택 조회
    searchByLayout() {
        this.getRecoRateByDate();
        this.getRecoRateTop5ByArea();
        this.getEnrollCount();
        this.getRecoRateTop5ByTeacher();
    }
    // 3. 일자별 현황
    getRecoRateByDate() {
        const params = this.cf.toHttpParams({
            // START_DATE: this.START_DATE,
            END_DATE: this.END_DATE,
            LAYOUT: this.LAYOUT,
        });
        const serviceUrl = 'main/selectRecoRateByDate';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.myGridData = resultData.data.list;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 4. 영역별 전환율
    getRecoRateTop5ByArea() {
        const params = this.cf.toHttpParams({
            LAYOUT: this.LAYOUT,
        });
        const serviceUrl = 'main/selectRecoRateTop5ByArea';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.recoRateTop5ByAreaList = resultData.data.list;
                    // console.log('this.recoRateTop5ByAreaList', this.recoRateTop5ByAreaList);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 5. 수강신청수
    getEnrollCount() {
        this.myGridData = [];
        const params = this.cf.toHttpParams({
            // START_DATE: this.START_DATE,
            END_DATE: this.END_DATE,
            LAYOUT: this.LAYOUT,
        });
        const serviceUrl = 'main/selectEnrollCount';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.myGridData = resultData.data.list;
                    this.viewEnrollChart(resultData.data.list);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 6. 선생님별 전환율
    getRecoRateTop5ByTeacher() {
        const params = this.cf.toHttpParams({
            LAYOUT: this.LAYOUT,
        });
        const serviceUrl = 'main/selectRecoRateTop5ByTeacher';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.viewTeacherChart(resultData.data.list);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }
    // 추천유형별 전환율 챠트
    viewTotalChart(list) {
        // totalChartCallType: any = 'bar';
        this.totalChartCallData = {};
        let chartDateLabels = [];
        let chartDataSetsLabels = [];
        let maxRate = 0;
        list.forEach(x => {
            // console.log('list :::  ', x);
            chartDateLabels = chartDateLabels.filter(d => d !== x.DATE); // 중복제거
            chartDateLabels.push(x.DATE);
            chartDataSetsLabels = chartDataSetsLabels.filter(d => d !== x.LAYOUT); // 중복제거
            chartDataSetsLabels.push(x.LAYOUT);
            maxRate = maxRate > x.RECO_RATE ? maxRate : x.RECO_RATE;
        });

        const colors = this.cs.getChartColor(chartDataSetsLabels.length);

        let i = 0;
        let valueset = [];
        const lableset = [];
        const chartDataSets = [];
        chartDataSetsLabels.forEach(x => {
            valueset = [];
            const datalist = list.filter(l => l.LAYOUT === x);
            // console.log('datalist :::  ', datalist);
            chartDateLabels.forEach(d => {
                const data = datalist.filter(item => d === item.DATE); // 해당날짜 데이터
                // console.log('x d data :::  ', x, d, data);
                valueset.push(data.length > 0 ? data[0].RECO_RATE : 0);
            });
            // console.log('valueset :::  ', valueset);
            chartDataSets.push({
                label: x,
                pointBackgroundColor: colors[i],
                backgroundColor: colors[i],
                borderColor: colors[i],
                // pointBorderColor: '#fff',
                data: valueset,
            });

            i++;
        });

        this.totalChartCallOptions = {
            responsive: true,
            maintainAspectRatio: false,
            // showTooltips: false,
            hover: {
                animationDuration: 0,
            },
            animation: {
                duration: 1,
                onComplete() {
                    const chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    // ctx.font = Chart.helpers.fontString(
                    //     Chart.defaults.global.defaultFontSize,
                    //     Chart.defaults.global.defaultFontStyle,
                    //     Chart.defaults.global.defaultFontFamily
                    // );
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        const meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            const data = dataset.data[index];
                            if (data !== 0) {
                                ctx.fillText(data + '%', bar._model.x, bar._model.y - 5);
                            }
                        });
                    });
                },
            },
            scales: {
                xAxes: [
                    {
                        // time: {
                        //     // unit: '%',
                        // },
                        gridLines: {
                            display: false,
                        },
                        // ticks: {
                        //     maxTicksLimit: 6,
                        // },
                    },
                ],
                yAxes: [
                    {
                        time: {
                            unit: '%',
                        },
                        ticks: {
                            min: 0,
                            max: Math.ceil(maxRate + maxRate / 10),
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
        };

        // console.log('chartDataSets :::  ', chartDataSets);
        this.totalChartCallData = { labels: chartDateLabels, datasets: chartDataSets };
        // console.log(':::::::::::::::::::: totalChartCallData :::  ', this.totalChartCallData);
        this.totalChartJs.chart.update();
    }

    // 수강신청수 챠트
    viewEnrollChart(list) {
        // enrollChartCallType: any;
        this.enrollChartCallData = {};
        const chartLabels = [];
        const valuesetRecoSuccess = [];
        const valuesetEnroll = [];
        const valuesetRecoRate = [];
        const chartDataSetsLabels = ['수강신청수', '추천성공수', '전환율'];
        let maxRate: any = 0;
        list.forEach(x => {
            chartLabels.push(x.DATE);
            valuesetRecoSuccess.push(x.RECOSUCCESS);
            valuesetEnroll.push(x.ENROLLMENT);
            valuesetRecoRate.push(x.RECO_RATE);
            maxRate = maxRate > x.RECO_RATE ? maxRate : x.RECO_RATE;
        });

        const colors = this.cs.getChartColor(chartDataSetsLabels.length);

        this.enrollChartCallOptions = {
            responsive: true,
            maintainAspectRatio: false,
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
                                ctx.fillText(data.toLocaleString(), bar._model.x, bar._model.y - 5);
                            }
                        });
                    });
                },
            },

            // showTooltips: false,
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        id: 'A',
                        type: 'linear',
                        position: 'left',
                        stacked: true,
                    },
                    {
                        id: 'B',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            maxTicksLimit: 5,
                            max: list.length === 0 ? 100 : Math.ceil(maxRate + maxRate / 10),
                            min: 0,
                        },
                    },
                ],
            },
        };

        const chartDataSets = [
            {
                type: 'bar',
                label: chartDataSetsLabels[0],
                // pointBackgroundColor: colors[0],
                backgroundColor: colors[0],
                borderColor: colors[0],
                // pointBorderColor: '#fff',
                data: valuesetEnroll,
                yAxisID: 'A',
                // stack: 'combined',
            },
            {
                type: 'bar',
                label: chartDataSetsLabels[1],
                // pointBackgroundColor: colors[1],
                backgroundColor: colors[1],
                borderColor: colors[1],
                // pointBorderColor: '#fff',
                data: valuesetRecoSuccess,
                yAxisID: 'A',
                // stack: 'combined',
            },
            {
                // stack: 'combined',
                type: 'line',
                label: chartDataSetsLabels[2],
                pointBackgroundColor: '#FA5882',
                // backgroundColor: colors[2],
                borderColor: '#F6CEEC',
                // pointBorderColor: '#fff',
                data: valuesetRecoRate,
                yAxisID: 'B',
                fill: false,
            },
        ];

        // console.log(
        //     ':::::::::::::: viewEnrollChart chartLabels, chartDataSets :::  ',
        //     chartLabels,
        //     chartDataSets
        // );
        this.enrollChartCallData = { labels: chartLabels, datasets: chartDataSets };
        // console.log(':::::::::::::::::::: enrollChartCallData :::  ', this.enrollChartCallData);
        this.enrollChartJs.chart.update();
    }
    // 선생님별 전환률 TOP 5 챠트
    viewTeacherChart(list) {
        // console.log('viewTeacherChart :::  ');

        this.teacherChartCallOptions = {
            responsive: true,
            maintainAspectRatio: false,
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
                    this.data.datasets.forEach(function (dataset, i) {
                        const meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            const data = dataset.data[index];
                            if (data !== 0) {
                                ctx.fillText(data + '%', bar._model.x, bar._model.y - 5);
                            }
                        });
                    });
                },
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        time: {
                            unit: '%',
                        },
                        ticks: {
                            min: 0,
                            max:
                                list.length > 0
                                    ? Math.ceil(list[0].RECO_RATE + list[0].RECO_RATE / 10)
                                    : 100,
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        };
        this.teacherChartCallData = {};
        const chartLabels = [];
        const valueset = [];
        const colors = this.cs.getChartColor(list.length);
        const i = 0;
        list.forEach(x => {
            // console.log('list :::  ', x);
            chartLabels.push(x.TEACHER);
            valueset.push(x.RECO_RATE);
        });

        this.teacherChartCallData = {
            labels: chartLabels,
            datasets: [
                {
                    // label: '',
                    data: valueset,
                    pointBackgroundColor: colors,
                    backgroundColor: colors,
                    borderColor: colors,
                },
            ],
        };
        // console.log('teacherChartCallData :::  ', this.teacherChartCallData);
        this.teacherChartJs.chart.update();
    }

    onChangeType(type) {
        this.LAYOUT = type;
        this.searchByLayout();
    }

    onRowClick(event) {}

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
        this.myGridDataApi = params.api;
        this.myGridDataColumnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }

    onPageSizeChanged(event) {
        // console.log('============== onPageSizeChanged ==============');
        // const pageSize: any = document.getElementById('pageSize');
        // console.log(pageSize[pageSize.selectedIndex].value);
        // this.gridApi.paginationSetPageSize(Number(pageSize));
    }
    onGridColumnsSizeChange(event) {
        event.api.sizeColumnsToFit();
    }
    onRowDataChanged(event) {
        // console.log('onRowDataChanged:::::::');
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
}

