import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CommFunction, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';

@Component({
    selector: 'app-modalcontent-sql',
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
            <div class="chartBtnArea">
                <div class="chartBtn">
                    <!--<a href="javascript:void(0)" class="btn btn-default" title=""
                        ><i class="ti-plus"></i
                    ></a>-->
                    <a
                        href="javascript:void(0)"
                        class="btn btn-primary"
                        title="적용"
                        (click)="evtBtnOkClick()"
                        >적용</a
                    >
                </div>
            </div>

            <!--<div class="segmentType colRow">
                 <div class="packTree01 col30">
                    <div class="treeCon mCustomScrollbar">
                        <div id="app-advisorsegmentdefinition-query-modal-content-tree"></div>
                    </div>
                </div> -->

            <div class="packInfo col70">
                <div class="writeTypeCon">
                    <!-- <div class="chartBtnArea">
                            <div class="chartBtn">
                                <a
                                    href="javascript:void(0);"
                                    class="btn btn-primary btn-outline"
                                    title="SQL"
                                    >SQL</a
                                >
                            </div>
                        </div> -->

                    <!--div class="sectionCon mT20">
                            <h2 class="tit-level2">표시항목</h2>

                            <div class="board_top mT10">
                                <div class="listSearch listSearchType01">
                                    <div class="formInput">
                                        <label class="control-label labelTitle mR10"
                                            >표시항목 반환요건 설정</label
                                        >
                                    </div>
                                    <div class="formInput">
                                        <div class="selects">
                                            <select class="form-control" name="">
                                                <option value="" selected>selected</option>
                                                <option value="">타이틀</option>
                                                <option value="">타이틀</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="formInput">
                                        <input
                                            class="touchspin"
                                            type="text"
                                            value="1"
                                            name="demo"
                                            style="width:80px;"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="grid-wrap mT0">
                                <div class="panel-field grid margin-reset">
                                    <div class="data-table">
                                        <div id="gridContainerB5-1" class="dataGrid"></div>
                                    </div>
                                </div>
                            </div>
                        </div-->

                    <div class="sectionCon mT20">
                        <!-- <h2 class="tit-level2">쿼리</h2> -->

                        <div class="board_top mT10">
                            <div class="listSearch listSearchType01" style="width:100%;">
                                <!--div class="">
                                        <label class="control-label labelTitle">조건식변경</label>
                                    </div-->
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
                                        <!--div class="checkAttch">
                                                <ul>
                                                    <li><a href="#" class="refreshIco"></a></li>
                                                </ul>
                                                <div class="checkReg">
                                                    <a href="#" class="checkRegBtn">조건식 점검</a>
                                                </div>
                                            </div-->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--div class="grid-wrap mT0">
                                <div class="panel-field grid margin-reset">
                                    <div class="data-table">
                                        <div id="gridContainerB5-2" class="dataGrid"></div>
                                    </div>
                                </div>
                            </div-->
                    </div>

                    <!--div class="sectionCon">
                            <h2 class="tit-level2">연결정보 & 정렬</h2>
                            <div class="grid-wrap mT0">
                                <div class="panel-field grid margin-reset">
                                    <div class="data-table">
                                        <div id="gridContainerB6-2" class="dataGrid"></div>
                                    </div>
                                </div>
                            </div>
                        </div-->
                </div>
            </div>
            <!-- /div> -->
        </div>
        <!--div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="evtBtnOkClick()">확인</button>
            <button
                type="button"
                class="btn btn-outline-dark"
                (click)="evtBtnCancelClick('Close click')"
            >
                취소
            </button>
        </div-->
    `,
})
export class ModalContentSqlComponent implements OnInit, OnDestroy {
    params: HttpParams;

    DESIGN_KEY_VALUE = 'DS';
    XML = '';
    SQL = '';

    sqlBuilderTitle: any = '';

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

        this.activeModal.close(result);
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-sql',
    template: '',
})
export class ModalSqlComponent {
    @Input() sqlBuilderTitle: any;
    constructor(private modalService: NgbModal) {}

    open(DESIGN_KEY_VALUE: string, XML: string, SQL: string): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentSqlComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        modalRef.componentInstance.DESIGN_KEY_VALUE = DESIGN_KEY_VALUE;
        modalRef.componentInstance.XML = XML;
        modalRef.componentInstance.SQL = SQL;
        modalRef.componentInstance.sqlBuilderTitle = this.sqlBuilderTitle;

        return modalRef;
    }
}
