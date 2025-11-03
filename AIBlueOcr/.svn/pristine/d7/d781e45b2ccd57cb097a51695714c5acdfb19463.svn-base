import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modalcontent-layout',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">레이아웃 선택</h4>
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
                    <app-tree-layout-checkable
                        #tree
                        [isCheckboxShown]="isCheckboxShown"
                        [exceptLayoutIdList]="exceptLayoutIdList"
                    ></app-tree-layout-checkable>
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
export class ModalContentLayoutComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree;

    @Input() isCheckboxShown: any;
    @Input() exceptLayoutIdList: any[];

    selectedNodesList = [];

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        /*console.log(
            '----ModalContentLayoutComponent ngOnInit inputLayoutList----------',
            this.inputLayoutList
        );*/
    }

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedNodesList:', this.tree.getSelectedLayoutList());
        const data = this.tree.getSelectedLayoutList();
        if (data.length === 0) {
            swal.fire('레이아웃을 선택 후 확인을 눌러주십시오', '', 'warning');
        } else {
            const result = data;
            this.activeModal.close(result);
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-layout',
    template: '',
})
export class ModalLayoutComponent {
    constructor(private modalService: NgbModal) {}

    open(exceptLayoutIdList: any[], isCheckboxShown: boolean): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentLayoutComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        modalRef.componentInstance.isCheckboxShown = isCheckboxShown;
        modalRef.componentInstance.exceptLayoutIdList = exceptLayoutIdList;
        // console.log('----ModalModelComponent open inputModelList----------', inputLayoutList);
        return modalRef;
    }
}
