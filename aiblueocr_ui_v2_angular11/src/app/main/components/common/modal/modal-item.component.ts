import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-modalcontent-item',
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
            <div class="packList col20">
                <div class="treeCon mCustomScrollbar">
                    <app-tree-item
                        #tree
                        [isCheckboxShown]="isCheckboxShown"
                        [exceptItemIdList]="exceptItemIdList"
                    ></app-tree-item>
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
export class ModalContentItemComponent implements OnInit, OnDestroy {
    @ViewChild('tree') tree;

    @Input() isCheckboxShown = true;
    @Input() exceptItemIdList: any[];

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        // console.log('ModalContentItemComponent');
        // console.log('isCheckboxShown', this.isCheckboxShown);
        // console.log('exceptItemIdList', this.exceptItemIdList);
    }

    ngOnDestroy() {}

    evtBtnOkClick(): void {
        // console.log('----- evtBtnOkClick -----');
        // console.log('selectedItems:', this.tree.selectedItems);

        if (0 < this.tree.selectedItems.length) {
            const result = {
                selectedItems: this.tree.selectedItems,
            };

            this.activeModal.close(result);
        } else {
            swal.fire('아이템을 선택 후 확인을 눌러주세요.', '', 'warning');
        }

        // if ('typeItem' === this.tree.selectedNode.type) {
        //     swal.fire('아이템을 선택 후 확인을 눌러주세요.', '', 'warning');
        // } else if ('item' === this.tree.selectedNode.type) {
        //     const result = {
        //         ITEM_ID: this.tree.selectedNode.id,
        //         ITEM_NM: this.tree.selectedNode.text,
        //     };

        //     this.activeModal.close(result);
        // } else {
        //     swal.fire('아이템을 선택 후 확인을 눌러주세요.', '', 'warning');
        // }
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-item',
    template: '',
})
export class ModalItemComponent {
    // @Input() isCheckboxShown = false;
    // @Input() exceptItemIdList: any[];

    constructor(private modalService: NgbModal) {}

    open(isCheckboxShown: boolean, exceptItemIdList: any[]): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentItemComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
        });
        modalRef.componentInstance.isCheckboxShown = isCheckboxShown;
        modalRef.componentInstance.exceptItemIdList = exceptItemIdList;

        return modalRef;
    }
}
