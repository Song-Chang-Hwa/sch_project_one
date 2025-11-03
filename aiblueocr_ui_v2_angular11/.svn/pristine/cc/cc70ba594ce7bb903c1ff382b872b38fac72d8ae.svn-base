import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modalcontent-typemanual',
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
                    <app-tree-typemanual #tree (selected)="onSelected($event)">
                    </app-tree-typemanual>
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
export class ModalContentTypeManualComponent implements OnInit, OnDestroy {
    selectedTypeManual: any = null;

    @ViewChild('tree') tree;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    ngOnDestroy() {}

    onSelected(selectedTypeManual: any) {
        this.selectedTypeManual = selectedTypeManual;
    }

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedTypeManual:', this.selectedTypeManual);

        if (null != this.selectedTypeManual) {
            const result = {
                FLD_ID: this.selectedTypeManual.id,
                FLD_NM: this.selectedTypeManual.text,
            };

            this.activeModal.close(result);
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-typemanual',
    template: '',
})
export class ModalTypeManualComponent {
    constructor(private modalService: NgbModal) {}

    open(): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentTypeManualComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });

        return modalRef;
    }
}
