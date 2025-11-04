import { HttpParams } from '@angular/common/http';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
// import { PageComponent } from '../../../components/page/page.component';
// const javascripts = [
//     './assets/resources/belltechsoft/advisormodel/advisormodel.js',
//     './assets/resources/js/scripts.js',
//     './assets/resources/js/lib/rangeSliderCustom.js',
// ];
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
    selector: 'app-statsbase',
    templateUrl: './statsbase.component.html',
    styleUrls: ['./statsbase.component.scss'],
})
export class StatsBaseComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    viewMode: ViewMode = ViewMode.new;
    statsStatusList: any = [];
    statsTypeList: any = [];

    hidden = false;

    /**
     * typestats tree
     */
    selectedTypeStats: any = null;

    /**
     * grid
     */
    // private myGridDataApi;
    // private myGridDataColumnApi;
    // myGridData = [];
    // myGridColumnDefs: any; // = [];
    // myGridPagination = false;
    // myGridtRowSelection = 'single';

    detailinfo: any = {};

    @ViewChild('inputRtnCnt') inputRtnCnt;
    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('typestatsTree') typestatsTree;
    @ViewChild('statsGrid') statsGrid;
    @ViewChild('segmentModal') segmentModal;
    @ViewChild('typeStatsModal') typeStatsModal;
    @ViewChild('sqlModal') sqlModal;

    constructor(
        // private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        // window.StatsBaseComponent = this;
        // this.navigationSubscription = this.router.events.subscribe((e: any) => {
        //     // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
        //     // 네비게이션 이벤트가 발생한다.
        //     if (e instanceof NavigationEnd) {
        //         this.initialiseInvites();
        //     }
        // });
    }

    initialiseInvites() {}

    ngOnInit() {
        this.cs.getCodelist('SEG_STATUS').then(data => {
            this.statsStatusList = data;
        });
        this.cs.getCodelist('STATS_TYPE').then(data => {
            this.statsTypeList = data;
        });

        // this.initGrid();

        this.setViewMode(ViewMode.new);
    }

    ngOnDestroy() {
        // 이벤트 해지
        // if (this.navigationSubscription) {
        //     this.navigationSubscription.unsubscribe();
        // }
    }

    ngAfterViewInit() {
        $(this.inputRtnCnt.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });

        $(this.inputOrdinal.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });
    }

    /**
     * typestats tree
     */

    onTypeStatsSelected(selectedTypeStats: any) {
        this.setViewMode(ViewMode.new);
        this.selectedTypeStats = selectedTypeStats;
        this.statsGrid.FLD_ID = this.selectedTypeStats.id;
    }

    /**
     * grid
     */

    onStatsSelected(stats) {
        // console.log('============== onStatsSelected ==============');

        this.detailinfo = stats;

        this.setViewMode(ViewMode.selected);
    }

    // initGrid() {
    //     this.myGridColumnDefs = [
    //         { headerName: 'Statistics 유형', field: 'FLD_NM' },
    //         { headerName: 'Statistics 상태', field: 'STATS_STATUS_NM' },
    //         { headerName: '세그먼트 명', field: 'SEG_NM' },
    //         { headerName: 'Statistics 구분', field: 'STATS_TYPE_NM' },
    //         { headerName: 'Statistics 명', field: 'STATS_NM' },
    //         { headerName: '반환 아이템 수', field: 'RTN_CNT' },
    //     ];
    // }

    // onGridReady(params: any) {
    //     this.myGridDataApi = params.api;
    //     this.myGridDataColumnApi = params.columnApi;
    //     console.log('============== grid ready!!! ==============');
    // }

    // onRowClick(event) {
    //     console.log('----- onRowClick -----');
    //     console.log('event: ', event);

    //     this.detailinfo = event.data;

    //     this.setViewMode(ViewMode.selected);

    //     // return;

    //     // this.params = this.cf.toHttpParams({ SEG_ID: event.data.SEG_ID });

    //     // this.apigatewayService.doGet('segment/segdef/detail', this.params).subscribe(
    //     //     resultData => {
    //     //         this.detailinfo = resultData.list;
    //     //     },
    //     //     error => {
    //     //         this.logger.debug(JSON.stringify(error, null, 4));
    //     //         this.detailinfo = [];
    //     //     }
    //     // );
    // }

    // onGridColumnsSizeChange(event) {
    //     event.api.sizeColumnsToFit();
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

    // onPageSizeChanged() {
    //     console.log('============== onPageSizeChanged ==============');
    //     const pageSize: any = document.getElementById('pageSize');

    //     console.log(pageSize[pageSize.selectedIndex].value);

    //     // this.gridApi.paginationSetPageSize(Number(pageSize));
    // }

    // searchStatsList() {
    //     this.myGridData = [];

    //     if (null != this.selectedTypeStats) {
    //         this.params = this.cf.toHttpParams({
    //             FLD_ID: this.selectedTypeStats.original.id,
    //         });

    //         const serviceUrl = 'model/statsmstr/selectListForStatsGrid';

    //         this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
    //             (resultData: any) => {
    //                 if (resultData.code === 200) {
    //                     // console.log('resultData.code 200');
    //                     this.myGridData = resultData.data.list;
    //                 }
    //             },
    //             error => {
    //                 this.logger.debug(JSON.stringify(error, null, 4));
    //             }
    //         );
    //         this.setViewMode(ViewMode.new);
    //     }
    // }

    /**
     * segment modal
     */

    openSegmentModal() {
        const modalRef = this.segmentModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                if (this.detailinfo) {
                    this.detailinfo.SEG_ID = result.SEG_ID;
                    this.detailinfo.SEG_NM = result.SEG_NM;
                }
            },
            reason => {}
        );
    }

    /**
     * typeStats modal
     */

    openTypeStatsModal() {
        const modalRef = this.typeStatsModal.open();
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
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.detailinfo = {
                    SEG_ID: '',
                    STATS_NM: '',
                    FLD_ID: '',
                    RTN_CNT: 0,
                    STATS_TYPE: 'SR_TOP',
                    IU_TYPE: '',
                    DESIGN_KEY_VALUE: 'DS',
                    STATS_XML: '',
                    STATS_SQL: '',
                    STATS_DESC: '',
                    DEL_YN: 'N',
                    ORDINAL: 1,
                    STATS_STATUS: '40',
                    SEG_NM: '',
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

        // const SEG_ID = this.detailinfo.SEG_ID;
        // const SEG_NM = this.detailinfo.SEG_NM;
        // const FLD_ID = this.detailinfo.FLD_ID;
        // const IU_TYPE = this.detailinfo.IU_TYPE;
        // let SEG_DESC = this.detailinfo.SEG_DESC;
        // const SEG_STATUS = '40'; // this.detailinfo.SEG_STATUS;
        // const ORDINAL = this.detailinfo.ORDINAL;
        // const DESIGN_KEY_VALUE = this.detailinfo.DESIGN_KEY_VALUE;
        // let SEG_XML = this.detailinfo.SEG_XML;
        // let SEG_SQL = this.detailinfo.SEG_SQL;

        // 필터링
        if (!this.detailinfo.STATS_DESC) {
            this.detailinfo.STATS_DESC = '';
        }
        if (!this.detailinfo.STATS_XML) {
            this.detailinfo.STATS_XML = '';
        }
        if (!this.detailinfo.STATS_SQL) {
            this.detailinfo.STATS_SQL = '';
        }

        // ng-bind 작동하지 않는 부분 보완
        this.detailinfo.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);
        this.detailinfo.ORDINAL = Number(this.inputOrdinal.nativeElement.value);

        if (!this.detailinfo.SEG_ID || 0 === this.detailinfo.SEG_ID.length) {
            swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.STATS_NM || 0 === this.detailinfo.STATS_NM.length) {
            swal.fire('Statistics 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('Statistics 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (
            (!this.detailinfo.STATS_SQL || 0 === this.detailinfo.STATS_SQL.length) &&
            (!this.detailinfo.STATS_XML || 0 === this.detailinfo.STATS_XML.length)
        ) {
            swal.fire('추출 쿼리 정보를 설정하십시오.', '', 'warning');
            return;
        } else {
            switch (this.viewMode) {
                case ViewMode.new: {
                    //             const bodyParam = {
                    //                 SEG_NM,
                    //                 FLD_ID,
                    //                 IU_TYPE,
                    //                 SEG_DESC,
                    //                 SEG_STATUS,
                    //                 ORDINAL,
                    //                 DESIGN_KEY_VALUE,
                    //                 SEG_XML,
                    //                 SEG_SQL,
                    //                 DEL_YN: 'N',
                    //             };

                    this.apigatewayService
                        .doPost('model/statsmstr/new', this.detailinfo, null)
                        .subscribe(
                            resultData => {
                                if (201 === resultData.code) {
                                    swal.fire('저장완료', '', 'warning');

                                    this.detailinfo.STATS_ID = resultData.data.STATS_ID;

                                    this.statsGrid.refresh();
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
                    //             const bodyParam = {
                    //                 SEG_ID,
                    //                 SEG_NM,
                    //                 FLD_ID,
                    //                 IU_TYPE,
                    //                 SEG_DESC,
                    //                 SEG_STATUS,
                    //                 ORDINAL,
                    //                 DESIGN_KEY_VALUE,
                    //                 SEG_XML,
                    //                 SEG_SQL,
                    //             };

                    this.apigatewayService
                        .doPost('model/statsmstr/save', this.detailinfo, null)
                        .subscribe(
                            resultData => {
                                if (200 === resultData.code) {
                                    swal.fire('저장완료', '', 'warning');
                                    this.statsGrid.refresh();
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

        // // const SEG_ID = this.detailinfo.SEG_ID;
        // const SEG__NM = this.detailinfo.SEG_NM;
        // const FLD_ID = this.detailinfo.FLD_ID;
        // const IU_TYPE = this.detailinfo.IU_TYPE;
        // let SEG_DESC = this.detailinfo.SEG_DESC;
        // const SEG_STATUS = '40'; // this.detailinfo.SEG__STATUS;
        // const ORDINAL = this.detailinfo.ORDINAL;
        // const DESIGN_KEY_VALUE = this.detailinfo.DESIGN_KEY_VALUE;
        // let SEG_XML = this.detailinfo.SEG_XML;
        // let SEG_SQL = this.detailinfo.SEG_SQL;

        // 필터링
        if (!this.detailinfo.STATS_DESC) {
            this.detailinfo.STATS_DESC = '';
        }
        if (!this.detailinfo.STATS_XML) {
            this.detailinfo.STATS_XML = '';
        }
        if (!this.detailinfo.STATS_SQL) {
            this.detailinfo.STATS_SQL = '';
        }

        // ng-bind 작동하지 않는 부분 보완
        this.detailinfo.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);
        this.detailinfo.ORDINAL = Number(this.inputOrdinal.nativeElement.value);

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 Statistics는 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (!this.detailinfo.STATS_ID) {
            swal.fire('새로 저장할 항목을 선택하십시오.', '', 'warning');
        } else {
            //     const bodyParam = {
            //         SEG_NM,
            //         FLD_ID,
            //         IU_TYPE,
            //         SEG_DESC,
            //         SEG_STATUS,
            //         ORDINAL,
            //         DESIGN_KEY_VALUE,
            //         SEG_XML,
            //         SEG_SQL,
            //         DEL_YN: 'N',
            //     };

            this.apigatewayService
                .doPost('model/statsmstr/save-as', this.detailinfo, null)
                .subscribe(
                    resultData => {
                        if (201 === resultData.code) {
                            swal.fire('저장완료', '', 'warning');
                            this.detailinfo.STATS_ID = resultData.data.STATS_ID;
                            this.statsGrid.refresh();
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

        if (this.cf.nvl(this.detailinfo.STATS_ID, '') === '') {
            swal.fire('삭제할 Statistics를 선택하십시오.', '', 'warning');
            return;
        }

        // // const SEG_ID = this.detailinfo.SEG_ID;

        // // const bodyParam = {
        // //     SEG_ID,
        // // };
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
                    .doPost('model/statsmstr/delete', this.detailinfo, null)
                    .subscribe(
                        resultData => {
                            swal.fire('삭제완료', '', 'warning');
                            this.statsGrid.refresh();
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
    evtBtnStatsExecClick() {
        // console.log('----- evtBtnStatsExecClick -----');
    }

    evtBtnSqlClick() {
        const modalRef = this.sqlModal.open(
            this.detailinfo.DESIGN_KEY_VALUE,
            this.detailinfo.STATS_XML,
            this.detailinfo.STATS_SQL
        );
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.detailinfo.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                this.detailinfo.STATS_XML = result.XML;
                this.detailinfo.STATS_SQL = result.SQL;
            },
            reason => {}
        );
    }

    showTree() {
        this.hidden = !this.hidden;
    }
}
