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
    selector: 'app-grid-pref',
    templateUrl: './grid-pref.component.html',
})
export class GridPrefComponent implements OnInit, OnDestroy, AfterViewInit {

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
        this.searchPrefList();
    }

    public refresh() {
        this.searchPrefList();
    }

    /**
     * grid
     */

    initGrid() {
        this.myGridColumnDefs = [
            { headerName: 'Preference 유형', field: 'FLD_NM' },
            { headerName: 'Preference 상태', field: 'PREF_STATUS_NM' },
            { headerName: 'SQL 타입', field: 'PREF_SQL_TYPE' },
            { headerName: 'Preference 명', field: 'PREF_NM' },
            { headerName: '선호값', field: 'PREF_VALUE' },
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

    searchPrefList() {
        // console.log('============== searchPrefList ==============');

        this.myGridData = [];

        if (null != this._FLD_ID) {
            const params = this.cf.toHttpParams({
                FLD_ID: this._FLD_ID,
            });

            const serviceUrl = 'model/prefmstr/selectListForPrefGrid';

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
