import { LoggerService } from '../../../../shared/services';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modalcontent-model',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">AI모델 선택</h4>
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
                    <app-tree-model
                        #tree
                        [isCheckboxShown]="isCheckboxShown"
                        [exceptItemList]="exceptItemList"
                        (unselected)="evtBtnUnCheckModel($event)"
                        (selected)="evtBtnCheckModel($event)"
                    ></app-tree-model>
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
export class ModalContentModelComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree;

    @Input() isCheckboxShown: any;
    @Input() exceptItemList: any[];

    returnList: any = [];

    constructor(public activeModal: NgbActiveModal, private logger: LoggerService) {}

    ngOnInit() {
        /*console.log(
            '----ModalContentModelComponent ngOnInit inputModelList----------',
            this.inputModelList
        );*/
    }

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        this.logger.debug('----- evtBtnOkClick -----', this.returnList);
        // console.log('selectedNodesList:', this.tree.selectedNodesList);
        // const data = this.tree.selectedNodesList;
        if (this.returnList.length === 0) {
            swal.fire('조회할 모델을 선택 후 확인을 눌러주십시오', '', 'warning');
        } else {
            // const result = data;
            this.activeModal.close(this.returnList);
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }

    evtBtnCheckModel(data) {
        // this.logger.debug('evtBtnCheckModel data', data);
        this.returnList = this.returnList.filter(x => x.id !== data.id);
        this.returnList.push(data);
    }
    evtBtnUnCheckModel(data) {
        // this.logger.debug('evtBtnUnCheckModel data', data);
        this.returnList = this.returnList.filter(x => x.id !== data.id);
    }
}

@Component({
    selector: 'app-modal-model',
    template: '',
})
export class ModalModelComponent {
    @Input() isCheckboxShown: any;
    @Input() exceptItemList: any[];

    constructor(private modalService: NgbModal,
        private logger: LoggerService) {}

    open(): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentModelComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        modalRef.componentInstance.isCheckboxShown = this.isCheckboxShown;
        modalRef.componentInstance.exceptItemList = this.exceptItemList;
        this.logger.debug(
            '----ModalModelComponent open inputModelList----------',
            this.exceptItemList
        );
        return modalRef;
    }
}
