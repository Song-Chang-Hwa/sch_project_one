import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CommFunction, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modalcontent-segment-sql',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">{{ sqlBuilderTitle }} 쿼리</h4>
            <button
                type="button"
                class="close"
                aria-label="Close"
                (click)="evtBtnCancelClick('Cross click')"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="segmentType colRow">
                <div class="packTree01 col30">
                    <div class="chartBtnArea">
                        <div class="chartBtn mB10">
                            <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                title="새로고침"
                                (click)="search()"
                                ><i class="ti-loop"></i></a
                            >
                            <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                title="새로고침"
                                (click)="evtBtnCancelClick('Cross click')"
                                ><i class="ti-close"></i></a
                            >
                        </div>
                    </div>
                    <div class="treeCon mCustomScrollbar" style="height:450px;">
                    	<app-tree-sqllist #sqlListTree (selected)="onSqlListTreeSelected($event)"></app-tree-sqllist>
			        </div>    
                </div>
                <div class="packInfo col70">
                    <div class="chartBtnArea">
                        <div class="chartBtn">
                            <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                title="clear"
                                (click)="sqlClear()"
                                ><i class="ti-trash"></i></a
                            >
                            <a
                                href="javascript:void(0)"
                                class="btn btn-primary"
                                title="적용"
                                (click)="evtBtnOkClick()"
                                >적용</a
                            >
                        </div>
                    </div>
                    <div class="writeTypeCon">
                        <div class="sectionCon">
                            <div class="board_top">
                                <div class="listSearch listSearchType01" style="width:100%;">
                                    <div class="mT10">
                                        <div class="checkBodyDetail">
                                            <div class="checkBodyWrite1 wrongAnswerWrite1">
                                                <textarea
                                                    class="form-control"
                                                    placeholder="쿼리를  입력해 주세요"
                                                    rows="20"
                                                    [(ngModel)]="SQL"
                                                ></textarea>
                                                <!--p class="txtArea" id="counter">0/200</p-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class ModalContentSegmentSqlComponent implements OnInit, OnDestroy {
    params: HttpParams;

    DESIGN_KEY_VALUE = 'DS';
    XML = '';
    SQL = '';

    sqlBuilderTitle: any = '';

    @ViewChild('sqlListTree') sqlListTree;
    constructor(
        private logger: LoggerService,
        private cf: CommFunction,
        private apigatewayService: ApigatewayService,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        // console.log('============== ngOnInit ==============');
        // this.screenTitle = '세그먼트 정의 쿼리';
    }

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('SQL:', this.SQL);

        const result = {
            DESIGN_KEY_VALUE: this.SQL ? 'DS' : 'DS_VIEW',
            XML: '',
            SQL: this.SQL,
        };
        this.params = this.cf.toHttpParams({ SQL: this.SQL });

        const serviceUrl = 'entity/sqllist/vaild';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // this.SQL = resultData.data.info.SQL_QUERY;
                    swal.fire('sql이 유효합니다.', '', 'success');
                } else if (resultData.msg) {
                    swal.fire(resultData.msg, '', 'warning');
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );

        // const serviceUrl2 = 'entity/sqllist/vaild2';

        // this.apigatewayService.doGetPromise(serviceUrl2, this.params).then(
        //     (resultData: any) => {
        //         if (resultData.code === 200) {
        //             swal.fire('rollback 완료', '', 'success');
        //         } else if (resultData.msg) {
        //             swal.fire(resultData.msg, '', 'warning');
        //         }
        //     },
        //     error => {
        //         this.logger.debug(JSON.stringify(error, null, 4));
        //     }
        // );

        this.activeModal.close(result);
    }

    onSqlListTreeSelected(data) {
        this.logger.debug('onSqlListTreeSelected:::::::',data);

        if (data.type !== 'sql') {
            this.DESIGN_KEY_VALUE = 'ML';
            this.XML = '';
            this.SQL = '';
            return;
        }

        this.params = this.cf.toHttpParams({ SQL_ID: data.SQL_ID });

        const serviceUrl = 'entity/sqllist/select';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.SQL = resultData.data.info.SQL_QUERY;
                } else if (resultData.msg) {
                    swal.fire(resultData.msg, '', 'warning');
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }

    search() {
        this.sqlListTree.destroyJstree();
        this.sqlListTree.initJstree();
        this.DESIGN_KEY_VALUE = 'DS';
        this.XML = '';
        this.SQL = '';
    }

    sqlClear() {
        this.DESIGN_KEY_VALUE = 'DS';
        this.XML = '';
        this.SQL = '';
    }
}

@Component({
    selector: 'app-modal-segment-sql',
    template: '',
})
export class ModalSegmentSqlComponent {
    @Input() sqlBuilderTitle: any;
    constructor(private modalService: NgbModal) {}

    open(DESIGN_KEY_VALUE: string, XML: string, SQL: string): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentSegmentSqlComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
            size: 'lg',
        });
        modalRef.componentInstance.DESIGN_KEY_VALUE = DESIGN_KEY_VALUE;
        modalRef.componentInstance.XML = XML;
        modalRef.componentInstance.SQL = SQL;
        modalRef.componentInstance.sqlBuilderTitle = this.sqlBuilderTitle;

        return modalRef;
    }
}
