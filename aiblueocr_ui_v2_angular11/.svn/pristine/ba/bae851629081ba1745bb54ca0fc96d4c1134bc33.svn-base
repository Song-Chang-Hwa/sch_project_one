import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CommFunction, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modal-test',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">eeee</h4>
            <button
                type="button"
                class="close"
                aria-label="Close"
            >
                <span aria-hidden="true">sdf</span>
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
                                ><i class="ti-loop"></i></a
                            >
                            <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                title="새로고침"
                                ><i class="ti-close"></i></a
                            >
                        </div>
                    </div>    
                </div>
                <div class="packInfo col70">
                    <div class="chartBtnArea">
                        <div class="chartBtn">
                            <a
                                href="javascript:void(0)"
                                class="btn btn-default"
                                title="clear"
                                ><i class="ti-trash"></i></a
                            >
                            <a
                                href="javascript:void(0)"
                                class="btn btn-primary"
                                title="적용"
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
export class ModalTestComponent implements OnInit, OnDestroy {
    params: HttpParams;

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

}

