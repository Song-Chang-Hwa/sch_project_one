import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modalcontent-typepref',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">유형 선택</h4>
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
                    <app-tree-typepref #tree (selected)="onSelected($event)"> </app-tree-typepref>
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
export class ModalContentTypePrefComponent implements OnInit, OnDestroy {
    selectedTypePref: any = null;

    @ViewChild('tree') tree;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    ngOnDestroy() {}

    onSelected(selectedTypePref: any) {
        this.selectedTypePref = selectedTypePref;
    }

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedTypePref:', this.selectedTypePref);

        if (null != this.selectedTypePref) {
            const result = {
                FLD_ID: this.selectedTypePref.id,
                FLD_NM: this.selectedTypePref.text,
            };

            this.activeModal.close(result);
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-typepref',
    template: '',
})
export class ModalTypePrefComponent {
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentTypePrefComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });

        return modalRef;
    }
}
