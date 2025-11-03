import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../shared/services';

export enum ViewMode {
    stats = 0,
    ai = 1,
    manual = 2,
}

@Component({
    selector: 'app-modalcontent-layoutreco-item',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">아이템 선택</h4>
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
                    <div class="chartBtn text-right mB10">
                        <a
                            href="javascript:void(0)"
                            class="btn btn-default"
                            title="새로고침"
                            (click)="evtBtnRefreshClick()"
                            ><i class="ti-loop"></i
                        ></a>
                    </div>
                </div>
                <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a
                                data-toggle="tab"
                                href="#itemSelectnTab01"
                                (click)="evtTabStatsClick()"
                                >통계기반</a
                            >
                        </li>
                        <li class="">
                            <a data-toggle="tab" href="#itemSelectnTab02" (click)="evtTabAiClick()"
                                >AI기반</a
                            >
                        </li>
                        <li class="">
                            <a
                                data-toggle="tab"
                                href="#itemSelectnTab03"
                                (click)="evtTabManualClick()"
                                >편성기반</a
                            >
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div
                            id="itemSelectnTab01"
                            class="tab-pane active"
                            ng-show="this.viewMode === 0"
                        >
                            <div class="panel-body">
                                <div class="packList col20">
                                    <div class="treeCon mCustomScrollbar">
                                        <app-tree-stats-checkable
                                            [exceptItemList]="exceptItemList"
                                            #statsTree
                                        ></app-tree-stats-checkable>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="itemSelectnTab02" class="tab-pane" ng-show="this.viewMode === 1">
                            <div class="panel-body">
                                <div class="packList col20">
                                    <div class="treeCon mCustomScrollbar">
                                        <app-tree-ai-checkable
                                            [exceptItemList]="exceptItemList"
                                            #aiTree
                                        ></app-tree-ai-checkable>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="itemSelectnTab03" class="tab-pane" ng-show="this.viewMode === 2">
                            <div class="panel-body">
                                <div class="packList col20">
                                    <div class="treeCon mCustomScrollbar">
                                        <app-tree-manual-checkable
                                            [exceptItemList]="exceptItemList"
                                            #manualTree
                                        ></app-tree-manual-checkable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
export class ModalContentLayoutRecoItemComponent implements OnInit, OnDestroy {
    viewMode: ViewMode = ViewMode.stats;

    @ViewChild('statsTree') statsTree;
    @ViewChild('aiTree') aiTree;
    @ViewChild('manualTree') manualTree;

    @Input() exceptItemList: any[];

    constructor(public activeModal: NgbActiveModal, private logger: LoggerService) {}

    ngOnInit() {
        // this.setViewMode(ViewMode.stats);
    }

    ngOnDestroy() {}

    /**
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        this.logger.debug('----- setViewMode -----');
        this.logger.debug('viewMode:' + viewMode);

        if (this.viewMode !== viewMode) {
            switch (viewMode) {
                case ViewMode.stats:
                    break;
                case ViewMode.ai:
                    break;
                case ViewMode.manual:
                    break;
            }
            this.viewMode = viewMode;
        }
    }

    evtBtnOkClick(): void {
        this.logger.debug('----- evtBtnOkClick -----');

        let selectedItems: any[];
        switch (this.viewMode) {
            case ViewMode.stats:
                selectedItems = this.statsTree.selectedItems;
                break;
            case ViewMode.ai:
                selectedItems = this.aiTree.selectedItems;
                break;
            case ViewMode.manual:
                selectedItems = this.manualTree.selectedItems;
                break;
        }
        this.logger.debug('selectedItems:', selectedItems);

        if (0 < selectedItems.length) {
            const result = {
                selectedItems,
            };

            this.activeModal.close(result);
        } else {
            swal.fire('아이템을 선택 후 확인을 눌러주세요.', '', 'warning');
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }

    evtBtnRefreshClick() {
        this.logger.debug('----- evtBtnRefreshClick -----');
        switch (this.viewMode) {
            case ViewMode.stats:
                this.statsTree.refresh();
                break;
            case ViewMode.ai:
                this.aiTree.refresh();
                break;
            case ViewMode.manual:
                this.manualTree.refresh();
                break;
        }
    }

    evtTabStatsClick() {
        this.logger.debug('----- evtTabStatsClick -----');
        if (this.viewMode !== ViewMode.stats) {
            this.setViewMode(ViewMode.stats);
        }
    }

    evtTabAiClick() {
        this.logger.debug('----- evtTabAiClick -----');
        if (this.viewMode !== ViewMode.ai) {
            this.setViewMode(ViewMode.ai);
        }
    }

    evtTabManualClick() {
        this.logger.debug('----- evtTabManualClick -----');
        if (this.viewMode !== ViewMode.manual) {
            this.setViewMode(ViewMode.manual);
        }
    }
}

@Component({
    selector: 'app-modal-layoutreco-item',
    template: '',
})
export class ModalLayoutRecoItemComponent {
    @Input() exceptItemList: any[];
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentLayoutRecoItemComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        modalRef.componentInstance.exceptItemList = this.exceptItemList;
        return modalRef;
    }
}
