import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';

const javascripts = [];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

export enum PackInfoViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    _SEG_ID: any;

    delYnList: any;
    VAR_USE_YN: any = '';
    VAR_TARGET_YN: any = '';
    VAL_NM: any = '';

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 10; // 한페이지에 데이터로우  갯수
    pageSizeList: any = [];

    myGridData = [];
    totalValueVAR_UNI_CNT = '-';
    totalValueDATA_CNT = '-';
    totalValueVAR_MISS_CNT = '-';
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'single';
    myDefaultColDef: any = { resizable: true, headerCellClass: 'text-center' };

    detailinfo: any = {};

    @Input() _AI_MSTR: any;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.DatasetComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                // this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {}

    ngOnInit() {
        // console.log('============== ngOnInit =========aimstr=====', this._AI_MSTR);
        // 차트 데모 로드
        setTimeout(() => {
            // window.SegmentSelectComponent.loadScript();
        });

        this.cs.getCodelist('DEL_YN').then(data => {
            this.delYnList = data; // data;
        });

        this.pageSizeList = this.cf.getPageSizeList();
        this._SEG_ID = this._AI_MSTR.SEG_ID;
        this.initGrid();
        this.search();
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    public set SEG_ID(value: any) {
        // console.log('DatasetComponent :::::::::::SEG_ID:::', value);
        this._SEG_ID = value;
        this.search();
    }

    initGrid() {
        const $this = this;
        const gridOptions = {
            // isRowSelectable: rowNode => (rowNode.data ? rowNode.data.year < 2007 : false),
            // other grid options ...
        };
        this.myGridColumnDefs = [
            {
                headerName: '변수명',
                field: 'VAL_NM',
                width: 300,
                filter: true,
                sortable: true,
            },
            {
                headerName: '변수유형',
                field: 'VAR_TYPE',
                width: 150,
                filter: true,
                sortable: true,
            },
            {
                headerName: '최소값',
                field: 'VAR_MIN',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '최대값',
                field: 'VAR_MAX',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '유일값',
                field: 'VAR_UNI_CNT',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '결측값',
                field: 'VAR_MISS_CNT',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '평균',
                field: 'VAR_MIN',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '표준편차',
                field: 'VAR_STD_DEV',
                width: 150,
                filter: true,
                sortable: true,
                cellClass: 'text-right',
            },
            {
                headerName: '사용',
                field: 'NEW_VAR_USE_YN',
                width: 120,
                // filter: true,
                sortable: true,
                cellStyle(params: any) {
                    if (params.node.data.VAR_USE_YN !== params.node.data.OLD_VAR_USE_YN) {
                        return { backgroundColor: '#f8ac59' };
                    } else {
                        return null;
                    }
                },
                cellRenderer(params: any) {
                    const isChecked = params.node.data.VAR_USE_YN === 'Y';
                    const input = document.createElement('input');
                    input.id = 'chkBox';
                    input.type = 'checkbox';
                    input.checked = isChecked;
                    input.addEventListener('click', function (event: any) {
                        const isCheck = event.target.checked;
                        params.value = isCheck ? 'Y' : 'N';
                        params.node.data.VAR_USE_YN = params.value;
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
            {
                headerName: '목표변수',
                field: 'NEW_VAR_TARGET_YN',
                width: 120,
                // filter: true,
                sortable: true,
                cellStyle(params: any) {
                    if (params.node.data.VAR_TARGET_YN !== params.node.data.OLD_VAR_TARGET_YN) {
                        return { backgroundColor: '#f8ac59' };
                    } else {
                        return null;
                    }
                },
                cellRenderer(params: any) {
                    const isChecked = params.node.data.VAR_TARGET_YN === 'Y';
                    const input = document.createElement('input');
                    input.id = 'chkBox';
                    input.type = 'checkbox';
                    input.checked = isChecked;
                    input.addEventListener('click', function (event: any) {
                        const isCheck = event.target.checked;
                        params.value = isCheck ? 'Y' : 'N';
                        params.node.data.VAR_TARGET_YN = params.value;
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

    // 팩유형 트리 조회
    // 세그먼트 리스트 조회
    search() {
        if (!this._SEG_ID) {
            swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            return;
        }

        this.myGridData = [];
        this.totalValueVAR_UNI_CNT = '-';
        this.totalValueDATA_CNT = '-';
        this.totalValueVAR_MISS_CNT = '-';

        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({
            SEG_ID: this._SEG_ID,
            VAR_USE_YN: this.VAR_USE_YN,
            VAR_TARGET_YN: this.VAR_TARGET_YN,
            VAL_NM: this.VAL_NM,
        });

        const serviceUrl = 'model/dataset/selectList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.myGridData = resultData.data.list;
                    // this.totalValue = resultData.data.total;
                    if (resultData.data.total) {
                        this.totalValueVAR_UNI_CNT = resultData.data.total.VAR_UNI_CNT.toLocaleString();
                        this.totalValueDATA_CNT = resultData.data.total.DATA_CNT.toLocaleString();
                        this.totalValueVAR_MISS_CNT = resultData.data.total.VAR_MISS_CNT.toLocaleString();
                    }
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnSaveClick() {
        const changeList: any = [];
        const list = this.getAllRows();
        list.forEach(item => {
            if (
                item.OLD_VAR_TARGET_YN !== item.VAR_TARGET_YN ||
                item.OLD_VAR_USE_YN !== item.VAR_USE_YN
            ) {
                changeList.push(item);
                // console.log('----- this.changeList SEG_ID-----', item.SEG_ID);
            }
        });

        // console.log('----- evtBtnSaveClick this.changeList-----', this.changeList);
        if (changeList.length === 0) {
            swal.fire('수정할 항목이 없습니다.', '', 'warning');
            return;
        }

        swal.fire({
            title: '[' + changeList.length + '건] 수정 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService.doPost('model/dataset/update', changeList, null).subscribe(
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
                        swal.fire('수정실패', '', 'error');
                    }
                );
            } // confirm yes
        });
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
    onRowDataChanged(event) {}
    gridOnSelectionChanged($event) {
        /* rowSelection로 구현되어 있음
        const selectedRows = this.myGridDataApi.getSelectedRows();
        if (0 < selectedRows.length) {
            const selected = selectedRows[0];

            console.log('selected: ' + selected);

            const FLD_ID = selected.FLD_ID;
            const SEG_ID = selected.SEG_ID;
        }*/
    }

    // 추가 메소드

    getAllRows() {
        const rowData = [];
        this.myGridDataApi.forEachNode(node => rowData.push(node.data));
        return rowData;
    }

    // 초기화
    initData() {
        this.VAR_USE_YN = '';
        this.VAR_TARGET_YN = '';
        this.VAL_NM = '';

        this.myGridDataApi.forEachNode(node => {
            node.data.VAR_USE_YN = 'N';
            node.data.VAR_TARGET_YN = 'N';
        });

        this.myGridDataApi.redrawRows();
    }

    evtBtnPackExecClick() {
        // console.log('----- evtBtnPackExecClick -----');
    }
}
