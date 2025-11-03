import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
import { TreeManualComponent } from '../../../common/tree/tree-manual/tree-manual.component';

// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { ConsoleReporter } from 'jasmine';
// import { first } from 'rxjs/operators';

const javascripts = [
    './assets/resources/belltechsoft/advisortypedefinition/advisortypedefinition.js',
    './assets/resources/js/scripts.js',
];
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
    selector: 'app-advisorsegmentlist',
    templateUrl: './advisorsegmentlist.component.html',
    styleUrls: ['./advisorsegmentlist.component.scss'],
})
export class AdvisorSegmentListComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'multiple';
    myGridOptions: any;
    // myrowClassRules: any;

    detailinfo: any = {};
    changeList: any = [];

    packInfoViewMode: PackInfoViewMode = PackInfoViewMode.new;

    @ViewChild('advisorSegmentSelectModal') advisorSegmentSelectModal;
    @ViewChild('sqlModal') sqlModal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AdvisorSegmentListComponent = this;
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
        // console.log('============== ngOnInit ==============');
        // 차트 데모 로드
        setTimeout(() => {
            // window.AdvisorSegmentListComponent.loadScript();
        });
        this.initGrid();
        this.searchSegList();
    }
    ngAfterViewInit(): void {}
    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    // myrowClassRules = params => {
    //     if (params.node.rowIndex % 2 === 0) {
    //         return 'ag-rag-green';
    //     }
    // };

    // getRowStyle = params => {
    //     // if (params.node.data.OLD_USE_YN !== 'Y') {
    //         // params.node.data.USE_YN) {
    //         // mark police cells as red
    //         return { color: 'red', backgroundColor: 'green' };
    //     // } else {
    //     //     return null;
    //     // }
    // };

    initGrid() {
        const $this = this;
        // this.myGridOptions = {
        //     rowClassRules: {
        //         'ag-rag-green': 'node.rowIndex % 2 === 0', // 'data.OLD_USE_YN !== dataode.USE_YN',
        //         // 'rag-amber': 'data.age >= 20 && data.age < 25',
        //         // 'rag-red': 'data.age >= 25',
        //     },
        //     // isRowSelectable: rowNode => (rowNode.data ? rowNode.data.year < 2007 : false),
        //     // other grid options ...
        // };
        // {
        //             // 'ag-rag-green': 'node.rowIndex % 2 === 0', // 'node.OLD_USE_YN !== node.USE_YN'
        //             'ag-row-hover': 'node.data.OLD_USE_YN !== node.data.USE_YN',
        //             // (params) {
        //             //     return params.data.OLD_USE_YN === params.data.USE_YN;
        //         };
        // this.myrowClassRules = { 'ag-rag-green': 'node.rowIndex % 2 === 0' };

        this.myGridColumnDefs = [
            {
                headerName: 'ID',
                field: 'SEG_ID',
                width: 60,
                filter: true,
                sortable: true,
                hide: false,
                cellStyle: { textAlign: 'center' },
            },
            {
                headerName: '세그먼트 유형',
                field: 'FLD_NM',
                width: 150,
                filter: true,
                sortable: true,
            },
            {
                headerName: '세그먼트 상태',
                field: 'SEG_STATUS_NM',
                width: 100,
                filter: true,
                sortable: true,
            },
            {
                headerName: '세그먼트 타입',
                field: 'IU_TYPE_NM',
                width: 100,
                filter: true,
                sortable: true,
            },
            {
                headerName: '세그먼트 명',
                field: 'SEG_NM',
                width: 200,
                filter: true,
                sortable: true,
            },
            {
                headerName: '추출 구분',
                field: 'SEG_TYPE_NM',
                width: 100,
                filter: true,
                sortable: true,
            },
            // {
            //     headerName: '선택',
            //     field: 'checkbox',
            //     width: 50,
            //     filter: true,
            //     sortable: true,
            //     hide: false,
            //     checkboxSelection: true,
            //     headerCheckboxSelection: true,
            //     headerCheckboxSelectionFilteredOnly: true,
            //     cellStyle: { textAlign: 'center' },
            //     // cellRenderer(params: any) {
            //     //     params.value = params.node.data.USE_YN === 'Y' ? 'Y' : 'N';
            //     //     console.log('params.value::::', params.value);
            //     // },
            // },
            // {
            //     headerName: '사용여부',
            //     field: 'OLD_USE_YN',
            //     width: 100,
            //     filter: true,
            //     sortable: true,
            //     /*cellStyle: {
            //         textAlign: 'center',
            //     }
            //     cellRenderer(params: any) {
            //         return params.node.data.USE_YN;
            //     },*/
            // },
            {
                headerName: '사용여부',
                field: 'NEW_USE_YN',
                width: 100,
                // editable: false,
                // filter: true,
                sortable: true,
                cellStyle(params: any) {
                    if (params.node.data.USE_YN !== params.node.data.OLD_USE_YN) {
                        // mark police cells as red
                        // console.log(
                        //     'cellStyle params.node.data.OLD_USE_YN::::',
                        //     params.node.data.OLD_USE_YN
                        // );
                        return { backgroundColor: '#f8ac59', textAlign: 'center' };
                    } else {
                        return null;
                    }
                },
                cellRenderer(params: any) {
                    // params.value = params.value === 'Y' ? 'Y' : 'N';
                    const isChecked = params.node.data.USE_YN === 'Y';

                    const input = document.createElement('input');
                    input.id = 'chkBox';
                    input.type = 'checkbox';
                    // input.disabled = true;
                    input.checked = isChecked;
                    input.addEventListener('click', function (event: any) {
                        const isCheck = event.target.checked;
                        // console.log('click isCheck', isCheck);
                        params.value = isCheck ? 'Y' : 'N';
                        params.node.data.USE_YN = params.value;
                        // console.log(
                        //     'click USE_YN OLD_USE_YN ',
                        //     params.node.data.USE_YN,
                        //     params.node.data.OLD_USE_YN
                        // );
                    });
                    input.addEventListener('change', function (event: any) {
                        // params.node.setSelected(false);
                        // if (params.node.data.OLD_USE_YN !== params.node.data.USE_YN) {
                        //     params.node.setSelected(true);
                        // }
                        // console.log('addEventListener change:::');
                        // $('#checkEvent').data('val', params.value);
                        // $('#checkEvent').click();
                        /*$this.changeList = $this.changeList.filter(
                            x => x !== params.node.data.SEG_ID
                        );
                        params.node.data.STATUS = ''; // setSelected(false);
                        if (params.node.data.OLD_USE_YN !== params.value) {
                            // $this.changeList.push(params.node.data.SEG_ID);
                            params.node.data.STATUS = 'U';
                        }
                        // console.log(
                            'addEventListener change:::OLD_USE_YN::USE_YN::changeList:::',
                            params.node.data.OLD_USE_YN,
                            params.value,
                            $this.changeList
                        );*/
                        // const row = $this.myGridDataApi.getDisplayedRowAtIndex(params.rowIndex);
                        // $this.myGridDataApi.rowStyle = { background: 'coral' };
                        $this.myGridDataApi.redrawRows();
                    });

                    const div = document.createElement('div');
                    // div.className = 'checkbox-out';
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
    searchSegList() {
        this.myGridData = [];

        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({});

        const serviceUrl = 'segment/segdef/selectList';

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

    onRowClick(event) {}

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
        this.myGridDataApi = params.api;
        this.myGridDataColumnApi = params.columnApi;
        this.myGridDataApi.gridOptions = this.myGridOptions;
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
        // console.log('============== grid rowDataChanged!!! ==============');
        // this.myGridDataApi.forEachNode(function (rowNode: any, index: any) {
        //     console.log(
        //         '============== index  =====OLD_USE_YN=========',
        //         index,
        //         rowNode.OLD_USE_YN
        //     );
        //     if (rowNode.data.OLD_USE_YN === 'Y') {
        //         rowNode.setSelected(true);
        //         return;
        //     } else {
        //         rowNode.setSelected(false);
        //         return;
        //     }
        // });
        // this.myrowClassRules = { 'ag-rag-green': 'node.rowIndex % 2 === 0' };
        // if (node.rowIndex % 2 === 0) {
        //     console.log(node.rowIndex);
        //     return 'ag-rag-green';
        // }
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

    /**
     * 버튼 이벤트 처리
     */
    evtBtnSaveClick() {
        // console.log('----- evtBtnSaveClick this.myGridData-----', this.getAllRows());
        this.changeList = [];
        const list = this.getAllRows();
        list.forEach(item => {
            if (item.OLD_USE_YN !== item.USE_YN) {
                this.changeList.push(item);
                // console.log('----- this.changeList SEG_ID-----', item.SEG_ID);
            }
        });

        // console.log('----- evtBtnSaveClick this.changeList-----', this.changeList);
        if (this.changeList.length === 0) {
            swal.fire('수정할 세그먼트를 선택하십시오.', '', 'warning');
            return;
        }

        swal.fire({
            title: '[' + this.changeList.length + '건] 수정 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('segment/segdef/updateUseYn', this.changeList, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 201) {
                                swal.fire('수정하였습니다.', '', 'warning').then(result => {
                                    this.searchSegList();
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'warning').then(result => {
                                    this.searchSegList();
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

    getAllRows() {
        const rowData = [];
        this.myGridDataApi.forEachNode(node => rowData.push(node.data));
        return rowData;
    }
    evtBtnPackExecClick() {
        // console.log('----- evtBtnPackExecClick -----');
    }
}
