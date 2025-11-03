import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modalcontent-segment',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">세그먼트 목록</h4>
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
                    <app-tree-segment #tree segUseYn="{{ this.segUseYn }}"></app-tree-segment>
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
export class ModalContentSegmentComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree;

    @Input() segUseYn: any;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedNode:', this.tree.selectedNode);

        if ('typeSegment' === this.tree.selectedNode.type) {
            swal.fire('세그먼트를 선택 후 확인을 눌러주세요.', '', 'warning');
        } else if ('segment' === this.tree.selectedNode.type) {
            const result = {
                SEG_ID: this.tree.selectedNode.id,
                SEG_NM: this.tree.selectedNode.text,
            };

            this.activeModal.close(result);
        } else {
            swal.fire('세그먼트를 선택 후 확인을 눌러주세요.', '', 'warning');
        }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-segment',
    template: '',
})
export class ModalSegmentComponent {
    constructor(private modalService: NgbModal) {}

    open(segUseYn: any): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentSegmentComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });

        modalRef.componentInstance.segUseYn = segUseYn;

        return modalRef;
    }
}
