import { HttpParams } from '@angular/common/http';
import {
    AfterContentInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../../components/page/page.component';
import { TreeManualComponent } from '../../../../common/tree/tree-manual/tree-manual.component';

// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { ConsoleReporter } from 'jasmine';
// import { first } from 'rxjs/operators';

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
    selector: 'app-segmentselect',
    templateUrl: './segmentselect.component.html',
    styleUrls: ['./segmentselect.component.scss'],
})
export class SegmentSelectComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'single';
    myDefaultColDef: any = { resizable: true };

    detailinfo: any = {};

    packInfoViewMode: PackInfoViewMode = PackInfoViewMode.new;

    @ViewChild('advisorSegmentSelectModal') advisorSegmentSelectModal;
    @ViewChild('sqlModal') sqlModal;

    @Input() _AI_MSTR: any;
    @Output() selected = new EventEmitter<any>();

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.SegmentSelectComponent = this;
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
            // window.SegmentSelectComponent.loadScript();
        });
        this.initGrid();
        this.searchSegList();
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
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
                headerName: '선택',
                field: 'checkbox',
                width: 50,
                filter: true,
                sortable: true,
                hide: false,
                checkboxSelection: true,
                cellStyle: { textAlign: 'center' },
                // cellRenderer(params: any) {
                //     params.value = params.node.data.USE_YN === 'Y' ? 'Y' : 'N';
                //     console.log('params.value::::', params.value);
                // },
            },
            // {
            //     headerName: 'ID',
            //     field: 'SEG_ID',
            //     width: 100,
            //     filter: true,
            //     sortable: true,
            //     hide: false,
            //     cellStyle: { textAlign: 'center' },
            // },
            {
                headerName: '세그먼트 유형',
                field: 'FLD_NM',
                width: 150,
                filter: true,
                sortable: true,
            },
            {
                headerName: '세그먼트 명',
                field: 'SEG_NM',
                width: 300,
                filter: true,
                sortable: true,
            },
            {
                headerName: '상태',
                field: 'SEG_STATUS_NM',
                width: 100,
                filter: true,
                sortable: true,
            },
            {
                headerName: '타입',
                field: 'IU_TYPE_NM',
                width: 100,
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
        ];
    }

    // 팩유형 트리 조회
    // 세그먼트 리스트 조회
    searchSegList() {
        this.myGridData = [];

        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({ USE_YN: 'Y' });

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

    /**
     * 버튼 이벤트 처리
     */
    evtBtnSaveClick() {
        const rows = this.myGridDataApi.getSelectedRows();
        if (rows.length === 0) {
            swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            return;
        }

        this.selected.emit({ index: 0, SEG_ID: rows[0].SEG_ID, SEG_NM: rows[0].SEG_NM }); // 데이터탐색으로 이동
        // this.myGridDataApi.selectAll();
        // console.log('----- evtBtnSaveClick this.myGridData-----', rows[0].SEG_ID);
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
        // console.log('onRowDataChanged:::::1:::::::');
        if (!this.myGridDataApi) return;
        const segId = this.cf.nvl(this._AI_MSTR.SEG_ID, '');
        if (segId === '') return;
        this.myGridDataApi.forEachNode(node => {
            // console.log('onRowDataChanged::::::3::::::node', node.data.SEG_ID);
            // select the node
            if (node.data.SEG_ID === Number(segId)) {
                // console.log(
                //     'onRowDataChanged::::::4::::::node.data.SEG_ID === segId',
                //     node.data.SEG_ID === segId
                // );
                node.setSelected(true);
            }
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
        const rowData = [];
        this.myGridDataApi.forEachNode(node => rowData.push(node.data));
        return rowData;
    }
    evtBtnPackExecClick() {
        // console.log('----- evtBtnPackExecClick -----');
    }
}
