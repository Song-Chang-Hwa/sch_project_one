import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import { ApigatewayService, LoggerService, CommFunction } from '@app/shared/services';

@Component({
    selector: 'app-grid-stats',
    templateUrl: './grid-stats.component.html',
})
export class GridStatsComponent implements OnInit, OnDestroy, AfterViewInit {

    private _FLD_ID: string = null;

    /**
     * grid
     */
    // private myGridDataApi;
    // private myGridDataColumnApi;
    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'single';
    myDefaultColDef: any = {resizable: true};


    @ViewChild('grid') grid: ElementRef;

    @Output() selected = new EventEmitter<any>();

    constructor(
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
    ) {
        // this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {
        this.initGrid();
    }

    /**
     * public
     */

    public set FLD_ID(value: string) {
        this._FLD_ID = value;
        this.searchStatsList();
    }

    public refresh() {
        this.searchStatsList();
    }

    /**
     * grid
     */

    initGrid() {
        this.myGridColumnDefs = [
            { headerName: 'Statistics 유형', field: 'FLD_NM' },
            { headerName: 'Statistics 상태', field: 'STATS_STATUS_NM', width: 140 },
            { headerName: '세그먼트 명', field: 'SEG_NM'},
            { headerName: 'Statistics 구분', field: 'STATS_TYPE_NM', width: 140 },
            { headerName: 'Statistics 명', field: 'STATS_NM', width: 300 },
            { headerName: '반환 아이템 수', field: 'RTN_CNT' },
        ];
    }

    onGridReady(params: any) {
        // console.log('============== onGridReady ==============');
        // this.myGridDataApi = params.api;
        // this.myGridDataColumnApi = params.columnApi;
    }

    onRowClick(event) {
        // console.log('============== onRowClick ==============');
        // console.log('event: ', event);

        this.selected.emit(event.data);
    }

    onGridColumnsSizeChange(event) {
        // console.log('============== onGridColumnsSizeChange ==============');
        event.api.sizeColumnsToFit();
    }

    gridOnSelectionChanged(event) {
        // console.log('============== gridOnSelectionChanged ==============');
        /* rowSelection로 구현되어 있음
        const selectedRows = this.myGridDataApi.getSelectedRows();
        if (0 < selectedRows.length) {
            const selected = selectedRows[0];

            // console.log('selected: ' + selected);

            const FLD_ID = selected.FLD_ID;
            const SEG_ID = selected.SEG_ID;
        }*/
    }

    onPageSizeChanged() {
        // console.log('============== onPageSizeChanged ==============');
        const pageSize: any = document.getElementById('pageSize');

        // console.log(pageSize[pageSize.selectedIndex].value);

        // this.gridApi.paginationSetPageSize(Number(pageSize));
    }

    searchStatsList() {
        // console.log('============== searchStatsList ==============');

        this.myGridData = [];

        if (null != this._FLD_ID) {
            const params = this.cf.toHttpParams({
                FLD_ID: this._FLD_ID,
            });

            const serviceUrl = 'model/statsmstr/selectListForStatsGrid';

            this.apigatewayService.doGetPromise(serviceUrl, params).then(
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
    }

}
