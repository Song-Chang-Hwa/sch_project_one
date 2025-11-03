import { HttpParams } from '@angular/common/http';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import * as $ from 'jquery';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../../shared/services';
import { CommFunction } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { ConsoleReporter } from 'jasmine';
// import { first } from 'rxjs/operators';

const javascripts = [
    './assets/resources/belltechsoft/advisortypedefinition/advisortypedefinition.js',
    './assets/resources/js/scripts.js',
];

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;
declare function initSwiper();

@Component({
    selector: 'app-advisorsegmentanalysis',
    templateUrl: './advisorsegmentanalysis.component.html',
    styleUrls: ['./advisorsegmentanalysis.component.scss'],
})
export class AdvisorSegmentAnalysisComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AdvisorSegmentAnalysisComponent = this;
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

    extrTypeList: any = [];
    IU_TYPE: any = 'IR';
    SEG_CNT: any = 1;
    EXEC_CNT: any = 0;

    detailinfo: any = {};
    resultinfo: any = {};

    clustNumList: any = [];
    clJson: any = '';

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = false;
    myGridtRowSelection = 'multiple';

    chartCallType: any = 'scatter';
    chartCallData: any = {};
    chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 1,
                        maxTicksLimit: 5,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 1,
                        maxTicksLimit: 5,
                    },
                },
            ],
        },
    };

    @ViewChild('inputClustCnt') inputClustCnt;
    @ViewChild('sqlModal') sqlModal;
    @ViewChild('chartJs') chartJs;

    @Output() menuchange = new EventEmitter<any>();

    initialiseInvites() {}

    ngOnInit() {
        this.cs.getCodelist('IU_TYPE').then(data => {
            this.extrTypeList = data;
        });
        // 차트 데모 로드
        setTimeout(() => {
            // window.AdvisorSegmentAnalysisComponent.loadScript();
        });

        this.initGrid();
        this.searchClustValList();
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        const self = this;

        $(this.inputClustCnt.nativeElement)
            .TouchSpin({
                min: 1,
                step: 1,
                max: 999999,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.SEG_CNT = Number(e.target.value);
            });

        initSwiper();
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
                headerName: '선택',
                field: 'checkbox',
                width: 100,
                checkboxSelection: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                cellStyle: { textAlign: 'center' },
            },
            {
                headerName: '변수명[name]',
                field: 'name',
                width: 200,
                editable: false,
                filter: true,
                sortable: true,
            },
        ];
    }

    // 초기화
    initSearch() {
        // console.log('initSearch:::::::::::::::');
        // this.IU_TYPE = 'IR';
        // this.SEG_CNT = 5;
        this.EXEC_CNT = 0;

        // this.detailinfo = {};
        this.resultinfo = {};

        this.chartCallData = { labels: [], datasets: [] };
        this.chartJs.chart.update();
        this.clustNumList = [];
        this.clJson = '';

        // $('#btnSql').attr('class', 'btn btn-default');
    }

    // 분석변수 조회
    searchClustValList() {
        this.myGridData = [];

        const segType = this.cf.nvl(this.detailinfo.SEG_TYPE, 'ML');
        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({
            IU_TYPE: this.IU_TYPE, // IR, UR
            // SEG_TYPE: segType, // DS, SQL
            // SEG_SQL: segType === 'SQL' ? this.detailinfo.SEG_SQL : '',
        });

        const serviceUrl = 'segment/seganal/selectClustVarList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    console.log('rekdk');
                    this.myGridData = resultData.data.list;
                } else {
                    // console.log('resultData.code 200');
                    swal.fire(
                        '변수 항목 조회 에러입니다.\nerror code : ' + resultData.code,
                        '',
                        'warning'
                    );
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 실행
    evtBtnExecuteClick() {
        this.chartCallData = {};
        this.clustNumList = [];
        const segType = this.cf.nvl(this.detailinfo.SEG_TYPE, 'ML');
        const varList = this.myGridDataApi.getSelectedRows();
        this.detailinfo.IU_TYPE = this.IU_TYPE;
        this.detailinfo.SEG_CNT = this.SEG_CNT;
        this.detailinfo.SEG_TYPE = segType;

        if (!this.detailinfo.SEG_CNT || 0 === this.detailinfo.SEG_CNT.length) {
            swal.fire('세그먼트 수를 입력하십시오.', '', 'warning');
            return;
        } else if (segType === 'SQL' && 0 === this.detailinfo.SEG_SQL.length) {
            swal.fire('SQL을 입력하십시오.', '', 'warning');
            return;
        } else if (varList.length === 0) {
            swal.fire('선택한 변수가 없습니다.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                info: this.detailinfo,
                list: varList,
            };

            this.apigatewayService.doPost('segment/seganal/execute', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        // swal.fire('완료', '', 'warning');
                        this.resultinfo = resultData.data.resultInfo;
                        this.detailinfo.SEGDA_ID = this.resultinfo.SEGDA_ID;

                        if (this.resultinfo.CL_RS_JSON === null) {
                            swal.fire('분석결과 데이터가 없습니다.', '', 'warning');
                            return;
                        } else {
                            // this.EXEC_CNT = 1;// 재클러스터링 보류(2021.06.07)
                            this.viewChart();
                        }
                    } else if (resultData.msg) {
                        swal.fire(resultData.msg, '', 'warning');
                    } else {
                        swal.fire('실패', '', 'warning');
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('저장실패', '', 'error');
                }
            );
        }
    }

    // 저장
    evtBtnSaveClick() {
        // $('#btnSEG_DEF').click();
        // $('#step2 a').click();
        // $('#btnMain').val('SEG_DEF');
        // $('#btnMain').click();
        // this.clickSEGDEF.emit();

        // return;
        const checklist = [];
        const checkobj = $('input[name=chkClustNum]:checked');
        // console.log('check', check.length);
        checkobj.each(function (i) {
            checklist.push({ SEG_NO: $(this).val() });
        });
        // console.log('checklist', checklist);
        if (checklist.length === 0) {
            swal.fire('클러스터를 선택하십시오.', '', 'warning');
            return;
        } else {
            swal.fire({
                title: '[' + checklist.length + ' 건] 저장 하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '예',
                cancelButtonText: '아니요',
            }).then(result => {
                if (result.value) {
                    const segment = this.detailinfo;
                    segment.SEG_TYPE = this.resultinfo.SEG_TYPE;
                    segment.SEG_CNT = this.resultinfo.SEG_CNT;
                    segment.IU_TYPE = this.resultinfo.IU_TYPE;
                    segment.DESIGN_KEY_VALUE = this.cf.nvl(this.detailinfo.DESIGN_KEY_VALUE, 'DS');
                    segment.SEG_XML = this.cf.nvl(this.detailinfo.SEG_XML, '');
                    segment.SEG_XML = this.cf.nvl(this.detailinfo.SEG_SQL, '');
                    segment.SEG_STATUS = '40';
                    segment.DEL_YN = 'N';
                    segment.USE_YN = 'N';
                    const bodyParam = {
                        info: segment,
                        list: checklist,
                    };

                    this.apigatewayService
                        .doPost('segment/seganal/save', bodyParam, null)
                        .subscribe(
                            resultData => {
                                if (201 === resultData.code) {
                                    swal.fire(
                                        '[' +
                                            resultData.data.sucessCnt +
                                            ' 건] 저장하였습니다.\n세그먼트 정의 화면으로 이동합니다.',
                                        '',
                                        'success'
                                    ).then(result => {
                                        // this.initSearch();
                                        // this.searchClustValList();
                                        this.menuchange.emit('SEG_DEF');
                                    });
                                    /*swal.fire({
                                        title:
                                            '저장하였습니다.\n세그먼트 정의 화면으로 이동하시겠습니까?\n[아니오] 선택시 현재 화면이 초기화됩니다.',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: '예',
                                        cancelButtonText: '아니요',
                                    }).then(result => {
                                        if (result.value) {
                                            // 세그먼트 정의 화면 이동
                                            $('#SEG_LIST').click();
                                        } else {
                                            this.initSearch();
                                        }
                                    });*/
                                } else if (resultData.msg) {
                                    swal.fire(resultData.msg, '', 'warning');
                                } else {
                                    swal.fire('실패', '', 'warning');
                                }
                            },
                            error => {
                                this.logger.debug(JSON.stringify(error, null, 4));
                                swal.fire('저장실패', '', 'error');
                            }
                        );
                }
            });
        }
    }

    // 시각화 결과 챠트 조회
    viewChart() {
        this.clJson = this.cf.StrToObj(this.resultinfo.CL_RS_JSON);
        const clJsonData = this.clJson.data;
        const chartLabels = [];
        const chartDataSets = [];
        const chartLabelColors = [];

        // console.log('data:::::::', clJsonData);
        this.clustNumList = this.getClustNumList(clJsonData);

        const colors = this.cs.getChartColor(this.clustNumList.length);

        // label
        let i: any = 0;
        this.clustNumList.forEach(x => {
            // const d = Math.round(Math.random() * 255);
            chartLabels.push('Dataset ' + x.CLUST_NO);
            chartLabelColors.push('fontColor: ' + colors[i]);
        });

        // data
        i = 0;
        this.clustNumList.forEach(x => {
            const filterlist = clJsonData.filter(d => d.seg_no === x.CLUST_NO);
            // console.log('filterlist::::x.CLUST_NO:::', x.CLUST_NO, filterlist);
            const valueset = []; // {label : 'Dataset '+ x.CLUST_NO};
            filterlist.forEach(item => {
                valueset.push({ x: item.x1, y: item.x2 });
            });

            chartDataSets.push({
                label: 'Dataset ' + x.CLUST_NO,
                pointBackgroundColor: colors[i],
                backgroundColor: colors[i],
                borderColor: colors[i],
                // pointBorderColor: '#fff',
                data: valueset,
            });
            i++;
        });

        this.chartCallType = 'scatter';
        this.chartCallData = { labels: chartLabels, datasets: chartDataSets }; //
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            // legend: {
            //     labels: chartLabelColors,
            // },
        };

        // console.log('chartCallData:::::::', this.chartCallData);
        // console.log('chartOptions:::::::', this.chartOptions);
    }

    // 클러스터 선택 조회
    getClustNumList(list) {
        let clustList = [];
        list.forEach(x => {
            clustList = clustList.filter(item => item.CLUST_NO !== x.seg_no); // 중복제거
            const map = { CLUST_NO: x.seg_no };
            clustList.push(map);
        });
        clustList.sort(function (a, b) {
            if (a.CLUST_NO === b.CLUST_NO) {
                return 0;
            }
            return a.CLUST_NO > b.CLUST_NO ? 1 : -1;
        });
        return clustList;
    }

    evtBtnReExecuteClick() {}
    evtBtnSqlClick() {
        const modalRef = this.sqlModal.open(
            this.detailinfo.DESIGN_KEY_VALUE,
            this.detailinfo.SEG_XML,
            this.detailinfo.SEG_SQL
        );
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.detailinfo.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                // this.detailinfo.SEG_TYPE = result.SQL === '' ? 'DS' : 'SQL';
                this.detailinfo.SEG_TYPE = 'ML';
                this.detailinfo.SEG_XML = result.XML;
                this.detailinfo.SEG_SQL = result.SQL;
                // const className =
                //     this.detailinfo.SEG_TYPE === 'DS' ? 'btn btn-default' : 'btn btn-primary';
                // $('#btnSql').attr('class', className);
                // this.initSearch();
                // this.searchClustValList();
            },
            reason => {}
        );
    }

    onRowClick(event) {}

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
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
        // console.log('onRowDataChanged:::::::');
        this.myGridDataApi.selectAll();
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
