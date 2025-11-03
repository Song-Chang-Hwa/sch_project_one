import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CommFunction, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';

declare var $: any;

@Component({
    selector: 'app-typemodalcontent',
    // templateUrl: './advisorsegment-select-modal.component.html',

    template: `
        <div class="modal-header">
            <h4 class="modal-title">유형선택</h4>
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
            <div class="packList col20">
                <div class="treeCon mCustomScrollbar">
                    <div id="app-advisorsegment-select-modal-content-tree"></div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="evtBtnOkClick()">확인</button>
            <button
                type="button"
                class="btn btn-outline-dark"
                (click)="evtBtnCancelClick('Close click')"
            >
                취소
            </button>
        </div>
    `,
})
export class TypeModalContent implements OnInit, OnDestroy {
    params: HttpParams;

    FLD_ID = 0;

    // 추가 필드 - pack 조회 관련
    TYPE_KEY: any = 'SEGMENT';
    treeData: any = [];
    typeinfo: any = {};
    selectedFldId: any = '';
    selectedNode: any = '';

    constructor(
        private logger: LoggerService,
        private cf: CommFunction,
        private apigatewayService: ApigatewayService,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        // console.log('============== ngOnInit ==============');

        this.searchPackList();
    }

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedNode:', this.selectedNode);

        this.activeModal.close(this.selectedNode);
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
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
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    public clearSelectedData() {
        this.selectedFldId = '';
        this.selectedNode = '';
        this.typeinfo = '';
    }

    destroy_jstree() {
        $('#app-advisorsegment-select-modal-content-tree').jstree('destroy');
    }

    init_jstree() {
        $('#app-advisorsegment-select-modal-content-tree')
            .jstree({
                core: {
                    check_callback: true,
                    // data: this.treeData,
                },
                plugins: ['types'],
                types: {
                    default: {
                        icon: 'ti-folder',
                    },
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                },
            })
            .on('ready.jstree', function () {
                $('#app-advisorsegment-select-modal-content-tree').jstree('open_all');
            });
        // $('#app-advisorsegment-select-modal-content-tree').jstree('open_all');
    }

    refresh_jstree() {
        const $this = this;

        this.init_jstree();
        // console.log('refresh_jstree typeinfo', this.typeinfo);
        $('#app-advisorsegment-select-modal-content-tree').jstree(
            true
        ).settings.core.data = this.treeData;
        $('#app-advisorsegment-select-modal-content-tree').jstree(true).refresh();

        $('#app-advisorsegment-select-modal-content-tree').on('loaded.jstree', function () {
            $('#app-advisorsegment-select-modal-content-tree').jstree('open_all');
        });
        $('#app-advisorsegment-select-modal-content-tree').bind('select_node.jstree', function (
            event,
            data
        ) {
            // console.log('select_node.jstree', data.node.original, data.node.id);

            // console.log(event);
            // console.log(data);

            $this.selectedNode = data.node;
        });

        // this.openall_jstree();
    }
}

@Component({
    selector: 'app-typemodal',
    templateUrl: './typemodal.component.html',
})
export class TypeModalComponent {
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        const modalRef = this.modalService.open(TypeModalContent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        // modalRef.componentInstance.name = 'World';

        // modalRef.result.then(
        //     result => {
        //         console.log('modal result:', result);
        //     },
        //     reason => {}
        // );

        return modalRef;
    }
}
