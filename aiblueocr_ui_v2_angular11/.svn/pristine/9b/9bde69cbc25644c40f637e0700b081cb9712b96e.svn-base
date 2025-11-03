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
import { CommFunction } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
const javascripts = [];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    searchcond: any = {};
    detailinfo: any = {};

    viewList: any = [];
    // resultList: any = [];

    private myItemGridDataApi;
    private myItemGridDataColumnApi;
    myItemGridData = [];
    myItemGridColumnDefs: any; // = [];
    myItemGridPagination = true;
    myItemGridtRowSelection = 'single';

    private myUserGridDataApi;
    private myUserGridDataColumnApi;
    myUserGridData = [];
    myUserGridColumnDefs: any; // = [];
    myUserGridPagination = true;
    myUserGridtRowSelection = 'single';

    @ViewChild('aiModelModal') aiModelModal;
    @ViewChild('segmentModal') segmentModal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
    ) {
        window.IndividualComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
        console.log('starttt');
    }
    @ViewChild('testmodal') testmodal;
    initialiseInvites() {}

    ngOnInit() {
        // 차트 데모 로드
        setTimeout(() => {
            // $('#segmentTypeTree').jstree({
            //     core: {
            //         check_callback: true,
            //     },
            //     plugins: ['types', 'dnd'],
            //     types: {
            //         default: {
            //             icon: 'ti-file',
            //         },
            //     },
            // });
            // window.IndividualComponent.loadScript();
        });
        this.initGrid();
    }
    ngAfterViewInit() {
        this.searchViewList();
    }
    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    search() {
        this.detailinfo = {};
        this.params = this.cf.toHttpParams({ AD_DS_VIEW_ID: this.searchcond.AD_DS_VIEW_ID });

        const serviceUrl = 'admin/config/selectCofigMstr';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.detailinfo = resultData.data.info;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 데이터원본 뷰 리스트 조회
    searchViewList() {
        this.params = this.cf.toHttpParams({});

        const serviceUrl = 'admin/config/selectViewList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.viewList = resultData.data.list;
                    if (resultData.data.dataCount > 0) {
                        this.searchcond.AD_DS_VIEW_ID = this.viewList[0].DS_VIEW_ID; // $('#dsViewId  option:eq(0)').attr('selected', 'selected');
                        this.search();
                    }
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    evtBtnSaveClick() {}

    evtBtnItemNewClick() {
        // 아이템 +버튼 클릭시
        const modalRef = this.testmodal.open(
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

    evtBtnItemDeleteClick() {}

    initGrid() {
        this.myItemGridColumnDefs = [
            { headerName: '컬럼논리명', field: 'COL_NM' },
            { headerName: '테이블 논리명', field: 'TBL_NM' },
            { headerName: '조건', field: 'OPER' },
            { headerName: '조건값', field: 'VALUES' },
        ];

        this.myUserGridColumnDefs = this.myItemGridColumnDefs;
    }
    onItemRowClick(event) {
        // console.log('----- onRowClick -----');
        // console.log('event: ', event);
        this.detailinfo = event.data;
    }

    onItemGridReady(params: any) {
        this.myItemGridDataApi = params.api;
        this.myItemGridDataColumnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }

    // onItemPageSizeChanged() {
    //     // console.log('============== onPageSizeChanged ==============');
    //     const pageSize: any = document.getElementById('pageSize');
    // }
    onItemGridColumnsSizeChange(event) {
        event.api.sizeColumnsToFit();
    }
    onItemGridSelectionChanged($event) {}

    onUserRowClick(event) {
        // console.log('----- onRowClick -----');
        // console.log('event: ', event);
        this.detailinfo = event.data;
    }

    onUserGridReady(params: any) {
        this.myItemGridDataApi = params.api;
        this.myItemGridDataColumnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }

    // onItemPageSizeChanged() {
    //     // console.log('============== onPageSizeChanged ==============');
    //     const pageSize: any = document.getElementById('pageSize');
    // }
    onUserGridColumnsSizeChange(event) {
        event.api.sizeColumnsToFit();
    }
    onUserGridSelectionChanged($event) {}
}
