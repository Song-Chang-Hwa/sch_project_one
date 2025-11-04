import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { API_URL_TOKEN } from '@app/shared/token';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommFunction, CommService, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';

declare var $: any;

@Component({
    selector: 'app-modalcontent-aialg-parameter',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">[{{ MODEL_TYPE_NM }}] 알고리즘 파라미터</h4>
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
            <div class="tabWrap">
                <div class="chartBtnArea">
                    <div class="chartBtn mB10">
                        <a
                            href="javascript:void(0)"
                            class="btn btn-default"
                            title="새로고침"
                            (click)="searchParameterList(ALG_ID, ALG_FILE_NAME)"
                            ><i class="ti-loop"></i
                        ></a>
                        <a
                            href="javascript:void(0)"
                            class="btn btn-default"
                            title="최적화"
                            (click)="evtBtnDefaultClick()"
                            ><i class="fa fa-asterisk"></i
                        ></a>
                        <a
                            href="javascript:void(0)"
                            class="btn btn-default"
                            title="저장"
                            (click)="evtBtnSaveClick()"
                            ><i class="ti-save"></i
                        ></a>
                        <a
                            href="javascript:void(0)"
                            class="btn btn-default"
                            title="닫기"
                            (click)="evtBtnCancelClick('Close click')"
                            ><i class="ti-close"></i
                        ></a>
                        <!-- <a
                            href="javascript:void(0)"
                            (click)="evtBtnOkClick()"
                            class="btn btn-primary"
                            title="선택"
                            >선택</a
                        > -->
                    </div>
                </div>
                <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li
                            *ngFor="let item of algList; let i = index"
                            [class]="i === 0 ? 'active' : ''"
                        >
                            <a
                                data-toggle="tab"
                                href="#itemSelectnTab01"
                                (click)="searchParameterList(item.ALG_ID, item.ALG_FILE_NAME)"
                                >{{ item.ALG_NM }}</a
                            >
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="itemSelectnTab01" class="tab-pane active">
                            <div class="panel-body">
                                <!-- start of body-->
                                <div class="segmentType colRow">
                                    <div class="col60">
                                        <div class="roundBorder packTree03">
                                            <img
                                                class="lazy-img loaded"
                                                data-src="/assets/resources/img_app/algparam/{{
                                                    ALG_FILE_NAME
                                                }}"
                                                src="/assets/resources/img_app/algparam/{{
                                                    ALG_FILE_NAME
                                                }}"
                                            />
                                        </div>
                                    </div>

                                    <div class="col40">
                                        <div class="roundBorder packTree03">
                                            <div class="writeTypeCon">
                                                <div class="sectionCon packTree03">
                                                    <h2 class="tit-level2">파라미터</h2>
                                                    <div class="writeType01">
                                                        <div
                                                            *ngFor="let item of algParamList"
                                                            class="form-Area"
                                                        >
                                                            <div class="form-group">
                                                                <label
                                                                    class="control-label text-left labelTitle"
                                                                    [title]="item.PARAM_DESC"
                                                                    ><span class="star01">{{
                                                                        item.PARAM_NM
                                                                    }}</span
                                                                    ><span class="discriptEn">{{
                                                                        item.PARAM_DESC
                                                                    }}</span></label
                                                                >
                                                                <div class="formInput">
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        [(ngModel)]="
                                                                            item.PARAM_VALUE
                                                                        "
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end of body -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="evtBtnOkClick()">선택</button>
        </div> -->
    `,
})
export class ModalContentAiAlgParameterComponent implements OnInit, OnDestroy {
    params: HttpParams;

    algList: any = [];
    algParamList: any = [];
    MODEL_TYPE_NM: any = '';
    ALG_FILE_NAME: any = '';

    // criterion: any;
    // max_depth: any;
    // min_samples_leaf: any;
    // algNm: any;

    @Input() ALG_ID: any;
    @Input() MODEL_TYPE: any;

    constructor(
        public activeModal: NgbActiveModal,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService,
        private apigatewayService: ApigatewayService
    ) {}

    ngOnInit() {
        // this.MODEL_TYPE = this.cf.nvl(this.MODEL_TYPE, '10');
        this.searchAlgList();
    }

    ngOnDestroy() {}

    // 알고리즘 리스트 조회
    searchAlgList() {
        this.algList = [];
        // this.parameterList = [];

        // // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({ MODEL_TYPE: this.MODEL_TYPE });

        const serviceUrl = 'entity/aialgmstr/selectList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.algList = resultData.data.list;
                    if (this.algList.length > 0) {
                        // this.ALG_ID = this.cf.nvl(this.MODEL_TYPE, this.algList[0].ALG_ID);
                        console.log('a', resultData);
                        this.MODEL_TYPE_NM = this.algList[0].MODEL_TYPE_NM;
                        this.ALG_ID = this.algList[0].ALG_ID;
                        this.ALG_FILE_NAME = this.algList[0].ALG_FILE_NAME;
                        this.searchParameterList(this.ALG_ID, this.ALG_FILE_NAME);
                    } else {
                        this.evtBtnCancelClick('Data Not Found');
                    }
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 파라미터 값 조회
    searchParameterList(algId, fname) {
        this.ALG_ID = algId;
        this.ALG_FILE_NAME = fname;
        this.algParamList = [];

        // // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({ ALG_ID: this.ALG_ID });

        const serviceUrl = 'entity/algParam/selectList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.algParamList = resultData.data.list;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    evtBtnSaveClick() {
        if (this.algParamList.length === 0) {
            swal.fire('저장할 항목이 없습니다.', '', 'warning');
            return;
        }

        swal.fire({
            title: '저장 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('entity/algParam/update', this.algParamList, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 201) {
                                swal.fire('저장하였습니다.', '', 'warning').then(result => {
                                    this.searchParameterList(this.ALG_ID, this.ALG_FILE_NAME);
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'warning').then(result => {
                                    this.searchParameterList(this.ALG_ID, this.ALG_FILE_NAME);
                                });
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('수정실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }

    evtBtnOkClick(): void {
        console.log('----- evtBtnOkClick -----');
        swal.fire({
            title: '선택하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(result => {
            if (result.value) {
                this.activeModal.close(this.ALG_ID);
            }
        });
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }

    evtBtnDefaultClick() {
        this.algParamList.forEach(x => {
            x.PARAM_VALUE = x.PARAM_DEFAULT;
        });
        // this.criterion = 'mse';
        // this.max_depth = 5;
        // this.min_samples_leaf = 1;
    }
}

@Component({
    selector: 'app-modal-aialg-parameter',
    template: '',
})
export class ModalAiAlgParameterComponent {
    // @Input() ALG_ID: any;
    // @Input() MODEL_TYPE: any;

    constructor(private modalService: NgbModal) {}

    open(MODEL_TYPE, ALG_ID): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentAiAlgParameterComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
            size: 'lg',
        });

        modalRef.componentInstance.MODEL_TYPE = MODEL_TYPE;
        modalRef.componentInstance.ALG_ID = ALG_ID;

        return modalRef;
    }
}
