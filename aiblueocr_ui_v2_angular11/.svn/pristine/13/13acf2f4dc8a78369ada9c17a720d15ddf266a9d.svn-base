import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import { AgGridModule } from 'ag-grid-angular';

import { CommFunction,CommProcess } from '../../../../shared/services';

import { Subject } from 'rxjs';

// import * as $ from 'jquery';
// declare var $: any;

declare var $: any;
declare let common: any;
declare let service: any;
declare let Window: any;

@Component({
    selector: 'app-sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss'],
})
export class SampleComponent implements OnInit, OnDestroy {
    [x: string]: any;
    params: HttpParams = new HttpParams();
    // sampledatas: [{FST_REG_USR_NM: any, FST_REG_DT: any}];
    sampledatas = [];
    sampleinputNgModel: any;
    FST_REG_USR_NM: any;
    FST_REG_DT: any;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    columnDefs: any; // = [];

    rowData = [];
    pagination = true;
    Window: any;

    htmlstr: any = '';

    // historyTbl02: [{FST_REG_DT: any, FST_REG_USR_NM: any, CNSL_SCD: any, CNSL_CN: any}]; // tab2 상담이력
    // historyTbl02: any; // tab2 상담이력
    // historyTbl02: Object = new Object();

    // dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    // dtData: DataTables.

    constructor(
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cp: CommProcess
    ) {
        // common.fndateStart();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
    ngOnInit() {
        // this.pager = this.cp.getPager(1); // 페이징초기화

        Window.sample = this;
        this.htmlstr =
            '<select class="form-control" name="insure_company_present" id="insure_company_present" onChange="Window.sample.insure_company_present_onChange(\'test\')"><option value="1">-----------------</option><option value="2">222222222</option></select>';
        this.search_newCustomer();
    }

    public onSearch(page: any) {
        this.params = this.cf.toHttpParams({ pageNo: 0, pageLength: 8 });

        this.apigatewayService.doGet('any/connectTest/', this.params).subscribe(
            resultData => {
                alert(page);
                // this.pager = this.cp.getPager(79, page, this.pageSize); // 전체 데이터 건수 -- 페이지 번호 -- 페이지 리스트
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    setPage(page: number) {
        // 클릭할때 페이지 정보
        if (page === 0 || page === this.pager.totalPages + 1) {
            return false;
        }
        this.onSearch(page);
    }

    insure_company_present_onChange(test: any) {
        common.javascriptcall();
    }

    typescriptcall() {
        alert('typescriptcall');
    }

    onItemClickFunc(event: any): void {
        alert();
        if (event) {
            event.stopPropagation();
        }
        this.onItemClick.emit(1);
    }

    public search_newCustomer() {
        let TOTCNT = 9999;
        this.params = this.cf.toHttpParams({
            pageNo: 0,
            // tslint:disable-next-line:max-line-length
            pageLength: 9999,
            GBN: '1',
            FROM_DATE: '',
            TO_DATE: '',
            // getSessionUserInfo: JSON.stringify(this.cp.getSessionUserInfo()),
        });

        // this.apigatewayService.doGet('cust/listcustbiz/listCustomerBiz', this.params).subscribe(
        //     resultData => {
                // TOTCNT = resultData.list[0][0].TOTCNT;
                this.columnDefs = [
                    { headerName: 'CST_NO', field: 'CST_NO' },
                    { headerName: '성명', field: 'CST_NM' },
                    { headerName: '생년월일', field: 'BIRTH_DAY' },
                    { headerName: '디비', field: 'DB_SCD_NM' },
                    { headerName: '통화결과', field: 'TLK_RSLT_SCD_NM' },
                    { headerName: '가망등급', field: 'POSB_CST_GRD_SCD' },
                    { headerName: '통화예약일시', field: 'TLK_RESV_DT' },
                ];

                // this.rowData = resultData.list[1];
                this.rowData = [{ CST_NO: '1'
                                , CST_NM: '1'
                                , BIRTH_DAY : '1'
                                , DB_SCD_NM: '2'
                                , TLK_RSLT_SCD_NM: '3'
                                , POSB_CST_GRD_SCD:'32'
                                , TLK_RESV_DT:'32'
                                },{ CST_NO: '1'
                                , CST_NM: '1'
                                , BIRTH_DAY : '1'
                                , DB_SCD_NM: '2'
                                , TLK_RSLT_SCD_NM: '3'
                                , POSB_CST_GRD_SCD:'32'
                                , TLK_RESV_DT:'32'
                                }];


                // recordsFiltered: resultData.list[0][0].TOTCNT,
                // data:  resultData.list[1]
        //     },
        //     error => {
        //         this.logger.debug(JSON.stringify(error, null, 4));
        //     }
        // );
    }

    onPageSizeChanged() {
        const pageSize: any = document.getElementById('pageSize');

        // console.log(pageSize[pageSize.selectedIndex].value);

        // this.gridApi.paginationSetPageSize(Number(pageSize));
    }

    onGridReady(params: any) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }
}
