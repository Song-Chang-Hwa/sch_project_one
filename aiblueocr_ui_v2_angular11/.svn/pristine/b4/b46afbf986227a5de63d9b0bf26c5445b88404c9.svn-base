import { HttpParams } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../../../shared/services';
import { CommFunction } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../../components/page/page.component';
// const javascripts = [];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

export enum ViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-prefdefinition',
    templateUrl: './prefdefinition.component.html',
    styleUrls: ['./prefdefinition.component.scss'],
})
export class PrefDefinitionComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    viewMode: ViewMode = ViewMode.new;

    prefStatusList: any = [];
    prefSqlTypeList: any = [];

    /**
     * pref imp grid
     */
    private myGridDataApi;
    private myGridDataColumnApi;
    // pager: any = {};
    // pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'multiple';
    myGridOptions: any;
    myDefaultColDef: any = { resizable: true };
    // myrowClassRules: any;

    chartCallType: any = 'horizontalBar';
    chartCallOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 1,
                        maxTicksLimit: 5,
                    },
                    // gridLines: {
                    //     color: 'rgba(0, 0, 0, .125)',
                    // },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                    },
                },
            ],
        },
    };
    chartCallData: any = {};

    /**
     * pref grid
     */
    prefList: any = [];

    detailinfo: any = {};
    @ViewChild('prefTree') prefTree;
    @ViewChild('prefImpGrid') prefImpGrid;
    // @ViewChild('prefGrid') prefGrid;
    @ViewChild('typePrefModal') typePrefModal;
    @ViewChild('sqlModal') sqlModal;
    // @ViewChild('inputPrefValue') inputPrefValue;
    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('chartJs') chartJs;

    @Input() _AI_MSTR: any;
    @Output() selected = new EventEmitter<any>();

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.PrefDefinitionComponent = this;
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
        this.cs.getCodelist('SEG_STATUS').then(data => {
            this.prefStatusList = data;
        });

        this.cs.getCodelist('PREF_SQL_TYPE').then(data => {
            this.prefSqlTypeList = data;
        });

        // 선택된 선호도 있을때 트리 클릭
        this.setViewMode(ViewMode.new);
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        const self = this;

        // $(this.inputPrefValue.nativeElement)
        //     .TouchSpin({
        //         min: 0,
        //         step: 0.1,
        //         decimals: 2,
        //         verticalbuttons: false,
        //         buttondown_class: 'btn btn-white',
        //         buttonup_class: 'btn btn-white',
        //     })
        //     .on('change', function (e) {
        //         self.detailinfo.PREF_VALUE = Number(e.target.value);
        //     });

        $(this.inputOrdinal.nativeElement)
            .TouchSpin({
                min: 1,
                max: 999999,
                step: 1,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.detailinfo.ORDINAL = Number(e.target.value);
            });
    }

    /*공통 스크립트 로드*/
    public loadScript() {
        // for (let i = 0; i < javascripts.length; i++) {
        //     const node = document.createElement('script');
        //     node.src = javascripts[i];
        //     node.type = 'text/javascript';
        //     node.async = true;
        //     node.charset = 'utf-8';
        //     document.getElementsByTagName('head')[0].appendChild(node);
        // }
    }

    /**
     * pref tree
     */

    onPrefTreeSelected(selectedPref: any) {
        // console.log('----- onPrefTreeSelected -----');
        // console.log('selectedPref:', selectedPref);

        if ('pref' === selectedPref.type) {
            // PREF_SQL_TYPE Preference 값은 사용안함으로 처리 > 다시 보이도록 처리
            // if ('Preference' === selectedPref.PREF_SQL_TYPE) {
            //    selectedPref.PREF_SQL_TYPE = '';
            // }

            this.detailinfo = selectedPref;
            this.prefImpGrid.PREF_ID = selectedPref.PREF_ID;

            this.setViewMode(ViewMode.selected);
        } else {
            this.setViewMode(ViewMode.new);
        }
    }

    viewChart() {
        // console.log('viewChart::::myGridData', this.prefImpGrid.myGridData);
        this.chartCallData = { labels: [], datasets: [] };
        this.chartJs.chart.update();

        const chartLabels = [];
        const chartDataSets = [];
        const chartLabelColors = [];

        const dataList = this.prefImpGrid.myGridData;

        if (dataList.length > 0) {
            const colors = this.cs.getChartColor(dataList.length);
            dataList.sort(function (a, b) {
                if (a.IMP_VALUE === b.IMP_VALUE) {
                    return 0;
                }
                return a.IMP_VALUE > b.IMP_VALUE ? -1 : 1; // 역
            });
            // label
            let i: any = 0;
            dataList.forEach(x => {
                chartLabels.push(x.VAL_NM);
                chartLabelColors.push(colors[i]);
                chartDataSets.push(x.IMP_VALUE);
                // chartDataSets.push(x.IMP_VALUE);
                // chartDataSets.push({
                //     // label: x.VAL_NM,
                //     // pointBackgroundColor: colors[i],
                //     backgroundColor: colors[i],
                //     // borderColor: colors[i],
                //     // pointBorderColor: '#fff',
                //     data: [x.IMP_VALUE],
                // });
                i++;
            });

            this.chartCallData = {
                labels: chartLabels,
                datasets: [
                    {
                        label: '선호값 추천 ',
                        data: chartDataSets,
                        backgroundColor: chartLabelColors,
                    },
                ],
            }; //
            const len = dataList.length - 1;
            this.chartCallOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                min: dataList[len].IMP_VALUE - dataList[len].IMP_VALUE,
                                // max: dataList[0].IMP_VALUE + dataList[0].IMP_VALUE,
                                maxTicksLimit: 5,
                            },
                            // gridLines: {
                            //     color: 'rgba(0, 0, 0, .125)',
                            // },
                        },
                    ],
                    yAxes: [
                        {
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
            this.chartJs.chart.update();
        }

        // console.log('chartCallData:::::::', this.chartCallData);
    }
    /**
     * grid
     */

    // onPrefSelected(pref) {
    //     console.log('============== onPrefSelected ==============');

    //     this.detailinfo = pref;
    //     this.prefImpGrid.PREF_ID = pref.PREF_ID;

    //     this.setViewMode(ViewMode.selected);
    // }

    /**
     * typePrefModal
     */

    openTypePrefModal() {
        const modalRef = this.typePrefModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);
                this.detailinfo.FLD_ID = result.FLD_ID;
                this.detailinfo.FLD_NM = result.FLD_NM;
            },
            reason => {}
        );
    }

    /**
     * pref imp grid
     */

    // searchSegList() {
    //     this.myGridData = [];

    //     // 트리에서 선택한 추천팩아이디
    //     this.params = this.cf.toHttpParams({});

    //     const serviceUrl = 'segment/segdef/selectList';

    //     this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
    //         (resultData: any) => {
    //             if (resultData.code === 200) {
    //                 // console.log('resultData.code 200');
    //                 this.myGridData = resultData.data.list;
    //             }
    //         },
    //         error => {
    //             this.logger.debug(JSON.stringify(error, null, 4));
    //         }
    //     );
    // }

    // onRowClick(event) {}

    // onGridReady(params: any) {
    //     params.api.sizeColumnsToFit();
    //     this.myGridDataApi = params.api;
    //     this.myGridDataColumnApi = params.columnApi;
    //     this.myGridDataApi.gridOptions = this.myGridOptions;
    //     // console.log('============== grid ready!!! ==============');
    // }

    // onPageSizeChanged() {
    //     // console.log('============== onPageSizeChanged ==============');
    //     // const pageSize: any = document.getElementById('pageSize');
    //     // console.log(pageSize[pageSize.selectedIndex].value);
    //     // this.gridApi.paginationSetPageSize(Number(pageSize));
    // }
    // onGridColumnsSizeChange(event) {
    //     event.api.sizeColumnsToFit();
    // }
    // onRowDataChanged(event) {
    //     // console.log('============== grid rowDataChanged!!! ==============');
    //     // this.myGridDataApi.forEachNode(function (rowNode: any, index: any) {
    //     //     console.log(
    //     //         '============== index  =====OLD_USE_YN=========',
    //     //         index,
    //     //         rowNode.OLD_USE_YN
    //     //     );
    //     //     if (rowNode.data.OLD_USE_YN === 'Y') {
    //     //         rowNode.setSelected(true);
    //     //         return;
    //     //     } else {
    //     //         rowNode.setSelected(false);
    //     //         return;
    //     //     }
    //     // });
    //     // this.myrowClassRules = { 'ag-rag-green': 'node.rowIndex % 2 === 0' };
    //     // if (node.rowIndex % 2 === 0) {
    //     //     console.log(node.rowIndex);
    //     //     return 'ag-rag-green';
    //     // }
    // }

    // gridOnSelectionChanged($event) {
    //     /* rowSelection로 구현되어 있음
    //     const selectedRows = this.myGridDataApi.getSelectedRows();
    //     if (0 < selectedRows.length) {
    //         const selected = selectedRows[0];

    //         console.log('selected: ' + selected);

    //         const FLD_ID = selected.FLD_ID;
    //         const SEG_ID = selected.SEG_ID;
    //     }*/
    // }

    /**
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.detailinfo = {
                    PREF_NM: '',
                    FLD_ID: '',
                    PREF_VALUE: 1.0,
                    DESIGN_KEY_VALUE: 'DS',
                    PREF_DESC: '',
                    PREF_SQL_TYPE: 'Advanced',
                    PREF_XML: '',
                    PREF_SQL: '',
                    PREF_FULL_XML: '',
                    PREF_FULL_SQL: '',
                    DEL_YN: 'N',
                    ORDINAL: 1,
                    PREF_STATUS: '40',
                    FLD_NM: '',
                };
                break;
            case ViewMode.selected:
                break;
        }
        this.viewMode = viewMode;
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnNewClick() {
        // console.log('----- evtBtnNewClick -----');

        this.setViewMode(ViewMode.new);
    }
    evtBtnSaveClick() {
        // console.log('----- evtBtnSaveClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        // 필터링
        if (!this.detailinfo.LAYOUT_DESC) {
            this.detailinfo.LAYOUT_DESC = '';
        }
        if (!this.detailinfo.PREF_XML) {
            this.detailinfo.PREF_XML = '';
        }
        if (!this.detailinfo.PREF_SQL) {
            this.detailinfo.PREF_SQL = '';
        }
        if (!this.detailinfo.FULL_PREF_XML) {
            this.detailinfo.FULL_PREF_XML = '';
        }
        if (!this.detailinfo.FULL_PREF_SQL) {
            this.detailinfo.FULL_PREF_SQL = '';
        }

        if (!this.detailinfo.PREF_NM || 0 === this.detailinfo.PREF_NM.length) {
            swal.fire('Preference 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('Preference 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (0 === this.detailinfo.PREF_SQL.length && 0 === this.detailinfo.PREF_XML.length) {
            swal.fire('추출 쿼리 정보를 설정하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                pref: this.detailinfo,
                prefImpList: this.prefImpGrid.myGridData,
            };

            switch (this.viewMode) {
                case ViewMode.new: {
                    this.apigatewayService.doPost('model/prefmstr/new', bodyParam, null).subscribe(
                        resultData => {
                            if (201 === resultData.code) {
                                swal.fire('저장완료', '', 'warning');
                                this.detailinfo.PREF_ID = resultData.data.PREF_ID;
                                this.prefTree.refresh();
                                this.prefImpGrid.PREF_ID = this.detailinfo.PREF_ID;
                                this.setViewMode(ViewMode.selected);
                            } else if (resultData.msg) {
                                swal.fire(resultData.msg, '', 'warning');
                            } else {
                                swal.fire('저장실패', '', 'warning');
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('저장실패', '', 'error');
                        }
                    );
                    break;
                }
                case ViewMode.selected: {
                    this.apigatewayService.doPost('model/prefmstr/save', bodyParam, null).subscribe(
                        resultData => {
                            if (200 === resultData.code) {
                                swal.fire('저장완료', '', 'warning');
                                this.prefTree.refresh();
                            } else if (resultData.msg) {
                                swal.fire(resultData.msg, '', 'warning');
                            } else {
                                swal.fire('저장실패', '', 'warning');
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('저장실패', '', 'error');
                        }
                    );
                    break;
                }
            }
        }
    }
    evtBtnSaveAsClick() {
        // console.log('----- evtBtnSaveAsClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        // 필터링
        if (!this.detailinfo.LAYOUT_DESC) {
            this.detailinfo.LAYOUT_DESC = '';
        }
        if (!this.detailinfo.PREF_XML) {
            this.detailinfo.PREF_XML = '';
        }
        if (!this.detailinfo.PREF_SQL) {
            this.detailinfo.PREF_SQL = '';
        }
        if (!this.detailinfo.FULL_PREF_XML) {
            this.detailinfo.FULL_PREF_XML = '';
        }
        if (!this.detailinfo.FULL_PREF_SQL) {
            this.detailinfo.FULL_PREF_SQL = '';
        }

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 Preference는 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (!this.detailinfo.PREF_NM || 0 === this.detailinfo.PREF_NM.length) {
            swal.fire('Preference 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('Preference 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (0 === this.detailinfo.PREF_SQL.length && 0 === this.detailinfo.PREF_XML.length) {
            swal.fire('추출 쿼리 정보를 설정하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                pref: this.detailinfo,
                prefImpList: this.prefImpGrid.myGridData,
            };

            this.apigatewayService.doPost('model/prefmstr/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        swal.fire('저장완료', '', 'warning');
                        this.detailinfo.PREF_ID = resultData.data.PREF_ID;
                        this.prefTree.refresh();
                        this.prefImpGrid.PREF_ID = this.detailinfo.PREF_ID;
                    } else if (resultData.msg) {
                        swal.fire(resultData.msg, '', 'warning');
                    } else {
                        swal.fire('저장실패', '', 'warning');
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('저장실패', '', 'error');
                }
            );
        }
    }
    evtBtnDeleteClick() {
        // console.log('----- evtBtnDeleteClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.cf.nvl(this.detailinfo.PREF_ID, '') === '') {
            swal.fire('삭제할 Preference를 선택하십시오.', '', 'warning');
            return;
        }

        swal.fire({
            title: '삭제 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('model/prefmstr/delete', this.detailinfo, null)
                    .subscribe(
                        resultData => {
                            swal.fire('삭제완료', '', 'warning');
                            this.prefTree.refresh();
                            this.setViewMode(ViewMode.new);
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('삭제실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }
    // 재처리
    evtBtnPrefExecClick() {
        // console.log('----- evtBtnPrefExecClick -----');
    }

    // 선호도 변수 재처리
    evtBtnPrefImpExecClick() {
        if (this.cf.nvl(this.detailinfo.PREF_ID, '') === '') {
            swal.fire('Preference를 선택하십시오.', '', 'warning');
            return;
        }
    }

    // 선호도 선택
    evtBtnPrefSelectClick() {
        if (this.cf.nvl(this.detailinfo.PREF_ID, '') === '') {
            swal.fire('Preference를 선택하십시오.', '', 'warning');
            return;
        }

        this.selected.emit({
            index: 2,
            PREF_ID: this.detailinfo.PREF_ID,
            PREF_NM: this.detailinfo.PREF_NM,
        });
    }

    evtBtnSqlClick() {
        if (this.detailinfo.PREF_SQL_TYPE === 'Advanced') {
            const modalRef = this.sqlModal.open(
                this.detailinfo.DESIGN_KEY_VALUE,
                this.detailinfo.PREF_XML,
                this.detailinfo.PREF_SQL,
                this.detailinfo.PREF_FULL_XML,
                this.detailinfo.PREF_FULL_SQL
            );
            modalRef.result.then(
                result => {
                    // console.log('modal result:', result);
                    // console.log('this.detailinfo:', this.detailinfo);
                    this.detailinfo.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                    this.detailinfo.PREF_XML = result.XML;
                    this.detailinfo.PREF_SQL = result.SQL;
                    this.detailinfo.PREF_FULL_XML = result.FULL_XML;
                    this.detailinfo.PREF_FULL_SQL = result.FULL_SQL;
                },
                reason => {}
            );
        } else if (this.detailinfo.PREF_SQL_TYPE === 'Preference') {
            swal.fire('준비중입니다.', '', 'warning');
        }
    }
}
