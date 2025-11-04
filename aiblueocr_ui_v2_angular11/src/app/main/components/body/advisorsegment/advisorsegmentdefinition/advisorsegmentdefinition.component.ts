import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';

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
    selector: 'app-advisorsegmentdefinition',
    templateUrl: './advisorsegmentdefinition.component.html',
    styleUrls: ['./advisorsegmentdefinition.component.scss'],
})
export class AdvisorSegmentDefinitionComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    FLD_ID = 0;

    private myGridDataApi;
    private myGridDataColumnApi;
    pager: any = {};
    pageSize = 20; // 한페이지에 데이터로우  갯수

    myGridData = [];
    myGridColumnDefs: any; // = [];
    myGridPagination = true;
    myGridtRowSelection = 'single';

    detailinfo: any = {};

    segTypeList: any = [];
    extrTypeList: any = [];

    packStatusList: any = [];

    // 추가 필드 - pack 조회 관련
    TYPE_KEY: any = 'SEGMENT';
    treeData: any = [];
    typeinfo: any = {};
    selectedFldId: any = '';
    selectedNode: any = '';

    packInfoViewMode: PackInfoViewMode = PackInfoViewMode.new;

    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('advisorSegmentSelectModal') advisorSegmentSelectModal;
    @ViewChild('sqlModal') sqlModal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AdvisorSegmentDefinitionComponent = this;
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
        // console.log('============== ngOnInit ==============');
        // 차트 데모 로드
        setTimeout(() => {
            // window.AdvisorSegmentDefinitionComponent.loadScript();
        });
        this.cs.getCodelist('SEG_TYPE').then(data => {
            this.segTypeList = data; // data;
        });
        this.cs.getCodelist('IU_TYPE').then(data => {
            this.extrTypeList = data; // data;
        });
        this.cs.getCodelist('SEG_STATUS').then(data => {
            this.packStatusList = data;
        });

        this.initGrid();
        this.searchPackList();
        // this.searchSegList();

        this.setPackInfoViewMode(PackInfoViewMode.new);
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        $(this.inputOrdinal.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });
    }

    initGrid() {
        this.myGridColumnDefs = [
            { headerName: '세그먼트 유형', field: 'FLD_NM' },
            { headerName: '세그먼트 상태', field: 'SEG_STATUS_NM' },
            { headerName: '세그먼트 타입', field: 'IU_TYPE_NM' },
            { headerName: '세그먼트 명', field: 'SEG_NM' },
            { headerName: '추출 구분', field: 'SEG_TYPE_NM' },
            { headerName: '선택 여부', field: 'USE_YN' },
        ];
    }

    // 팩유형 트리 조회
    // 세그먼트 리스트 조회
    searchSegList() {
        this.myGridData = [];

        const FLD_ID = this.FLD_ID;

        if (0 < FLD_ID) {
            // 트리에서 선택한 추천팩아이디
            this.params = this.cf.toHttpParams({
                FLD_ID: this.FLD_ID,
            });

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

        this.setPackInfoViewMode(PackInfoViewMode.new);
    }

    onRowClick(event) {
        // console.log('----- onRowClick -----');
        // console.log('event: ', event);

        this.detailinfo = event.data;

        this.setPackInfoViewMode(PackInfoViewMode.selected);

        // return;

        // this.params = this.cf.toHttpParams({ SEG_ID: event.data.SEG_ID });

        // this.apigatewayService.doGet('segment/segdef/detail', this.params).subscribe(
        //     resultData => {
        //         this.detailinfo = resultData.list;
        //     },
        //     error => {
        //         this.logger.debug(JSON.stringify(error, null, 4));
        //         this.detailinfo = [];
        //     }
        // );
    }

    onGridReady(params: any) {
        this.myGridDataApi = params.api;
        this.myGridDataColumnApi = params.columnApi;
        // console.log('============== grid ready!!! ==============');
    }

    onPageSizeChanged() {
        // console.log('============== onPageSizeChanged ==============');
        const pageSize: any = document.getElementById('pageSize');

        // console.log(pageSize[pageSize.selectedIndex].value);

        // this.gridApi.paginationSetPageSize(Number(pageSize));
    }
    onGridColumnsSizeChange(event) {
        event.api.sizeColumnsToFit();
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
    /*공통 스크립트 로드*/
    // public loadScript() {
    //     for (let i = 0; i < javascripts.length; i++) {
    //         const node = document.createElement('script');
    //         node.src = javascripts[i];
    //         node.type = 'text/javascript';
    //         node.async = true;
    //         node.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node);
    //     }
    // }

    // 추가 메소드

    public clearSelectedData() {
        this.selectedFldId = '';
        this.selectedNode = '';
        this.typeinfo = '';
    }

    destroy_jstree() {
        $('#definitionTree01').jstree('destroy');
    }

    init_jstree() {
        $('#definitionTree01')
            .jstree({
                core: {
                    check_callback: true,
                    // data: this.treeData,
                },
                plugins: ['types', 'dnd', 'search'],
                types: {
                    default: {
                        icon: 'ti-file',
                    },
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                },
            })
            .on('ready.jstree', function () {
                $('#definitionTree01').jstree('open_all');
            });
        // $('#definitionTree01').jstree('open_all');
    }

    refresh_jstree() {
        const $this = this;

        this.init_jstree();
        // console.log('refresh_jstree typeinfo', this.typeinfo);
        $('#definitionTree01').jstree(true).settings.core.data = this.treeData;
        $('#definitionTree01').jstree(true).refresh();
        $('#definitionTree01').bind('select_node.jstree', function (evt, data) {
            // console.log('select_node.jstree', data.node.original);
            const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            clickFldIdBtn.val(data.node.original.FLD_ID);
            clickFldIdBtn.click(); // nodeClick()
        });
        // $('#definitionTree01').bind('activate_node.jstree', function (event, data) {
        //     console.log('activate_node.jstree');
        //     if (data === undefined || data.node === undefined || data.node.id === undefined) return;
        //     const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
        //     clickFldIdBtn.val(data.node.original.FLD_ID);
        //     clickFldIdBtn.click();
        // });
        // $('#definitionTree01').bind('click.jstree', function (event) {
        //     console.log('click.jstree');
        //     // if (data === undefined || data.node === undefined || data.node.id === undefined) return;
        //     const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
        //     // clickFldIdBtn.val(data.node.original.FLD_ID);
        //     clickFldIdBtn.click();
        // });
        $('#definitionTree01').bind('dblclick.jstree', function (event) {
            const node = $(event.target).closest('li');
            const data = node.data('jstree');
            // console.log('dblclick.jstree node data', data);
            const dblClickFldIdBtn: any = $('#dblClickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            dblClickFldIdBtn.click(); // edit_jtree()
        });
        $('#definitionTree01').bind('move_node.jstree', function (evt, data) {
            // console.log('move_node.jstree data', data);
            const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            clickFldIdBtn.val(data.node.original.FLD_ID);
            clickFldIdBtn.click(); // nodeClick()
            const moveFldIdBtn: any = $('#moveFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            // moveFldIdBtn.val(JSON.stringify(data));
            moveFldIdBtn.val(
                JSON.stringify({
                    position: data.position,
                    old_position: data.old_position,
                    parent: data.parent,
                    old_parent: data.old_parent,
                })
            );
            moveFldIdBtn.click(); // updatePos()
            // selected node object: data.node;
            // this.typeinfo = data.node.original;
            // this.typeinfo.FLD_PARENT_ID = data.parent === '#' ? 0 : data.parent; // 0으로 변환
            // this.typeinfo.FLD_ORDINAL = data.position;
        });
        $('#definitionTree01').on('rename_node.jstree', function (e, data) {
            // console.log('rename_node.jstree::::::data.old, data.text:::', data.old, data.text);
            if (data.text !== data.old) {
                $('#editFldIdBtn').click(); // updateName()
            }
            // else if (true) {}; (obj.text!==obj.old) updateDB(obj.node, 'rename');
        });
        $('#definitionTree01').on('loaded.jstree', function () {
            $('#definitionTree01').jstree('open_all');
        });
        $('#definitionTree01').bind('select_node.jstree', function (event, data) {
            // console.log('select_node.jstree');

            // console.log(event);
            // console.log(data);

            $this.FLD_ID = data.node.id;
            $this.searchSegList();
        });

        // this.openall_jstree();
    }

    public searchPackList() {
        this.clearSelectedData();
        this.treeData = '';
        this.destroy_jstree();

        this.params = this.cf.toHttpParams({
            TYPE_KEY: this.TYPE_KEY,
        });

        const serviceUrl = 'admin/typedef/selectTreeList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.treeData = resultData.data.list;
                    this.refresh_jstree();

                    this.searchSegList();
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    openAdvisorSegmentSelectModal() {
        const modalRef = this.advisorSegmentSelectModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                if (this.detailinfo) {
                    this.detailinfo.FLD_ID = result.original.FLD_ID;
                    this.detailinfo.FLD_NM = result.original.FLD_NM;
                }
            },
            reason => {}
        );
    }
    openTypeModal() {
        const rootPath = window.location.protocol + '//' + window.location.host;
        this.cf.newWindow(
            rootPath + '/#/typepopup?type=SEGMENT', // &id=' + this.cf.nvl(this.detailinfo.SEG_ID, ''),
            'typepopup',
            500,
            600,
            'yes',
            'yes',
            null,
            null
        );
    }
    public setType(fldId) {
        // console.log('setType==========================', fldId);
    }

    openSQLModal() {
        const rootPath = window.location.protocol + '//' + window.location.host;
        // console.log('openSQLModal==========================', rootPath);
        this.cf.newWindow(
            rootPath + '/#/sqlpopup?type=SEGMENT&id=' + this.cf.nvl(this.detailinfo.SEG_ID, ''),
            'sqlpopup',
            800,
            600,
            'yes',
            'yes',
            null,
            null
        );
    }

    public setSql(sql) {
        // console.log('setSql==========================', sql);
    }

    // private getDismissReason(reason: any): string {
    //     console.log('getDismissReason() :', reason);
    //     // return 'getDismissReason';
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return  `with: ${reason}`;
    //     }
    // }

    /**
     * PackInfoView
     */
    setPackInfoViewMode(viewMode: PackInfoViewMode) {
        // console.log('----- setPackInfoViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case PackInfoViewMode.new:
                this.detailinfo = {};
                this.detailinfo = {
                    SEG_NM: '',
                    SEG_TYPE: 'DS',
                    IU_TYPE: 'IR',
                    SEG_DESC: '',
                    ORDINAL: 1,
                    DESIGN_KEY_VALUE: 'DS',
                    SEG_XML: '',
                    SEG_SQL: '',
                };
                break;
            case PackInfoViewMode.selected:
                break;
        }
        this.packInfoViewMode = viewMode;
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnNewClick() {
        // console.log('----- evtBtnNewClick -----');

        this.setPackInfoViewMode(PackInfoViewMode.new);
    }
    evtBtnSaveClick() {
        // console.log('----- evtBtnSaveClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        const SEG_ID = this.detailinfo.SEG_ID;
        const SEG_NM = this.detailinfo.SEG_NM;
        const FLD_ID = this.detailinfo.FLD_ID;
        const SEG_TYPE = this.cf.nvl(this.detailinfo.SEG_TYPE, 'DS');
        const IU_TYPE = this.detailinfo.IU_TYPE;
        let SEG_DESC = this.detailinfo.SEG_DESC;
        const SEG_STATUS = '40'; // this.detailinfo.SEG_STATUS;
        const ORDINAL = Number(this.inputOrdinal.nativeElement.value);
        const DESIGN_KEY_VALUE = this.detailinfo.DESIGN_KEY_VALUE;
        let SEG_XML = this.detailinfo.SEG_XML;
        let SEG_SQL = this.detailinfo.SEG_SQL;

        // 필터링
        if (!SEG_DESC || 0 === SEG_DESC.length) {
            SEG_DESC = '';
        }
        if (!SEG_XML || 0 === SEG_XML.length) {
            SEG_XML = '';
        }
        if (!SEG_SQL || 0 === SEG_SQL.length) {
            SEG_SQL = '';
        }

        if (!SEG_NM || 0 === SEG_NM.length) {
            swal.fire('세그먼트 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!FLD_ID || 0 === FLD_ID.length) {
            swal.fire('세그먼트 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (!SEG_TYPE || 0 === SEG_TYPE.length) {
            swal.fire('추출 구분을 선택하십시오.', '', 'warning');
            return;
        } else {
            switch (this.packInfoViewMode) {
                case PackInfoViewMode.new: {
                    const bodyParam = {
                        SEG_NM,
                        FLD_ID,
                        SEG_TYPE,
                        IU_TYPE,
                        SEG_DESC,
                        SEG_STATUS,
                        ORDINAL,
                        DESIGN_KEY_VALUE,
                        SEG_XML,
                        SEG_SQL,
                        DEL_YN: 'N',
                        USE_YN: 'N',
                    };

                    this.apigatewayService.doPost('segment/segdef/new', bodyParam, null).subscribe(
                        resultData => {
                            if (201 === resultData.code) {
                                swal.fire('저장완료', '', 'warning');
                                this.searchSegList();
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
                case PackInfoViewMode.selected: {
                    const bodyParam = {
                        SEG_ID,
                        SEG_NM,
                        FLD_ID,
                        SEG_TYPE,
                        IU_TYPE,
                        SEG_DESC,
                        SEG_STATUS,
                        ORDINAL,
                        DESIGN_KEY_VALUE,
                        SEG_XML,
                        SEG_SQL,
                    };

                    this.apigatewayService.doPost('segment/segdef/save', bodyParam, null).subscribe(
                        resultData => {
                            swal.fire('저장완료', '', 'warning');
                            this.searchSegList();
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

        // const SEG_ID = this.detailinfo.SEG_ID;
        const SEG_NM = this.detailinfo.SEG_NM;
        const FLD_ID = this.detailinfo.FLD_ID;
        const SEG_TYPE = this.cf.nvl(this.detailinfo.SEG_TYPE, 'DS');
        const IU_TYPE = this.detailinfo.IU_TYPE;
        let SEG_DESC = this.detailinfo.SEG_DESC;
        const SEG_STATUS = '40'; // this.detailinfo.SEG_STATUS;
        const ORDINAL = Number(this.inputOrdinal.nativeElement.value);
        const DESIGN_KEY_VALUE = this.detailinfo.DESIGN_KEY_VALUE;
        let SEG_XML = this.detailinfo.SEG_XML;
        let SEG_SQL = this.detailinfo.SEG_SQL;

        // 필터링
        if (!SEG_DESC || 0 === SEG_DESC.length) {
            SEG_DESC = '';
        }
        if (!SEG_XML || 0 === SEG_XML.length) {
            SEG_XML = '';
        }
        if (!SEG_SQL || 0 === SEG_SQL.length) {
            SEG_SQL = '';
        }

        if (this.packInfoViewMode === PackInfoViewMode.new) {
            swal.fire('신규 세그먼트는 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (!SEG_TYPE || 0 === SEG_TYPE.length) {
            swal.fire('추출 구분을 선택하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                SEG_NM,
                FLD_ID,
                SEG_TYPE,
                IU_TYPE,
                SEG_DESC,
                SEG_STATUS,
                ORDINAL,
                DESIGN_KEY_VALUE,
                SEG_XML,
                SEG_SQL,
                DEL_YN: 'N',
                USE_YN: 'N',
            };

            this.apigatewayService.doPost('segment/segdef/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        swal.fire('저장완료', '', 'warning');
                        this.searchSegList();
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

        if (this.cf.nvl(this.detailinfo.SEG_ID, '') === '') {
            swal.fire('삭제할 세그먼트를 선택하십시오.', '', 'warning');
            return;
        }

        // const SEG_ID = this.detailinfo.SEG_ID;

        // const bodyParam = {
        //     SEG_ID,
        // };
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
                    .doPost('segment/segdef/delete', this.detailinfo, null)
                    .subscribe(
                        resultData => {
                            swal.fire('삭제완료', '', 'warning');
                            this.searchSegList();
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('삭제실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }
    evtBtnPackExecClick() {
        // console.log('----- evtBtnPackExecClick -----');
    }

    evtBtnSqlClick() {
        const modalRef = this.sqlModal.open(
            this.detailinfo.DESIGN_KEY_VALUE,
            this.detailinfo.SEG_XML,
            this.detailinfo.SEG_SQL
        );
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                if (this.detailinfo) {
                    this.detailinfo.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                    this.detailinfo.SEG_TYPE = result.SQL === '' ? 'DS' : 'SQL';
                    this.detailinfo.SEG_XML = result.XML;
                    this.detailinfo.SEG_SQL = result.SQL;
                }
            },
            reason => {}
        );
    }
}
