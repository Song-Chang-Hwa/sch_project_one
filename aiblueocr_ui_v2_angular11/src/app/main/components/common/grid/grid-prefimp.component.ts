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
import { ApigatewayService, CommFunction, LoggerService } from '@app/shared/services';

import { GridCellRendererTouchSpin } from './grid-cellrenderer-touchpin.component';

@Component({
    selector: 'app-grid-prefimp',
    templateUrl: './grid-prefimp.component.html',
})
export class GridPrefImpComponent implements OnInit, OnDestroy, AfterViewInit {
    private _PREF_ID = -1;

    /**
     * grid
     */
    private myGridDataApi;
    private myGridDataColumnApi;
    myGridData = [];
    myGridColumnDefs: any = [];
    myGridPagination = true;
    myGridtRowSelection = 'multiple';
    myGridOptions: any;
    myDefaultColDef: any = { resizable: true };
    // myrowClassRules: any;
    gridFrameworkComponents: any = {
        gridCellRendererTouchSpin: GridCellRendererTouchSpin,
    };

    @ViewChild('grid') grid: ElementRef;

    @Output() selected = new EventEmitter<any>();
    @Output() onPrefGrid = new EventEmitter<any>();
    constructor(
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
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

    public set PREF_ID(value: number) {
        this._PREF_ID = value;
        this.searchPrefImpList();
    }

    public refresh() {
        this.searchPrefImpList();
    }

    /**
     * grid
     */

    initGrid() {
        const self = this;

        this.myGridColumnDefs = [
            {
                headerName: '사용',
                field: 'USE_YN',
                width: 70,
                resizable: true,
                cellStyle(params: any) {
                    if (params.node.data.USE_YN !== params.node.data.OLD_USE_YN) {
                        return { backgroundColor: '#f8ac59' };
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
                        self.myGridDataApi.redrawRows();
                    });

                    const div = document.createElement('div');
                    // div.className = 'checkbox-out';
                    div.style.width = '100%';
                    div.style.textAlign = 'center';
                    div.appendChild(input);

                    return div;
                },
            },
            { headerName: '선호요소 추천', field: 'VAL_NM', width: 180, resizable: true },
            {
                headerName: '선호값',
                field: 'PREF_VALUE',
                width: 180,
                resizable: true,
                cellRenderer: 'gridCellRendererTouchSpin',
                cellRendererParams: {
                    clicked(field: any) {
                        alert(`${field} was clicked`);
                    },
                },

                // cellRenderer(params: any) {
                //     //

                //     const input = document.createElement('input');
                //     // input.id = 'chkBox';
                //     input.type = 'number';
                //     input.className = 'touchspin01';
                //     // input.disabled = true;
                //     input.addEventListener('click', function (event: any) {
                //         const isCheck = event.target.checked;
                //         // console.log('click isCheck', isCheck);
                //         params.value = isCheck ? 'Y' : 'N';
                //         params.node.data.USE_YN = params.value;
                //         // console.log(
                //         //     'click USE_YN OLD_USE_YN ',
                //         //     params.node.data.USE_YN,
                //         //     params.node.data.OLD_USE_YN
                //         // );
                //     });
                //     input.addEventListener('change', function (event: any) {
                //         // params.node.setSelected(false);
                //         // if (params.node.data.OLD_USE_YN !== params.node.data.USE_YN) {
                //         //     params.node.setSelected(true);
                //         // }
                //         // console.log('addEventListener change:::');
                //         // $('#checkEvent').data('val', params.value);
                //         // $('#checkEvent').click();
                //         /*$this.changeList = $this.changeList.filter(
                //             x => x !== params.node.data.SEG_ID
                //         );
                //         params.node.data.STATUS = ''; // setSelected(false);
                //         if (params.node.data.OLD_USE_YN !== params.value) {
                //             // $this.changeList.push(params.node.data.SEG_ID);
                //             params.node.data.STATUS = 'U';
                //         }
                //         console.log(
                //             'addEventListener change:::OLD_USE_YN::USE_YN::changeList:::',
                //             params.node.data.OLD_USE_YN,
                //             params.value,
                //             $this.changeList
                //         );*/
                //         // const row = $this.myGridDataApi.getDisplayedRowAtIndex(params.rowIndex);
                //         // $this.myGridDataApi.rowStyle = { background: 'coral' };
                //         self.myGridDataApi.redrawRows();
                //     });

                //     const div = document.createElement('div');
                //     // div.className = 'checkbox-out';
                //     div.style.width = '100%';
                //     div.style.textAlign = 'center';
                //     div.appendChild(input);

                //     return div;
                // },
            },
            { headerName: '선호값 추천', field: 'IMP_VALUE', width: 100, resizable: true },
            { headerName: '선호 타입', field: 'PREF_TYPE_NM', width: 110, resizable: true },
        ];

        // this.gridFrameworkComponents = {
        //     gridCellRendererTouchSpin: GridCellRendererTouchSpin
        // };
    }

    onRowClick(event) {}

    onGridReady(params: any) {
        // params.api.sizeColumnsToFit();
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
        // event.api.sizeColumnsToFit();
    }
    onRowDataChanged(event) {
        // console.log('============== grid rowDataChanged!!! ==============');
        this.onPrefGrid.emit();
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

    gridOnSelectionChanged(event) {
        /* rowSelection로 구현되어 있음
        const selectedRows = this.myGridDataApi.getSelectedRows();
        if (0 < selectedRows.length) {
            const selected = selectedRows[0];

            // console.log('selected: ' + selected);

            const FLD_ID = selected.FLD_ID;
            const SEG_ID = selected.SEG_ID;
        }*/
    }

    searchPrefImpList() {
        this.myGridData = [];

        const params = this.cf.toHttpParams({
            PREF_ID: this._PREF_ID,
        });

        const serviceUrl = 'entity/prefimp/selectListForPrefImpGrid';

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
