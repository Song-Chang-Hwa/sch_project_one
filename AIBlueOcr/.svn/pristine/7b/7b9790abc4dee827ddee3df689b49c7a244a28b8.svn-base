import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';

declare var $: any;

export enum ViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-manualbase',
    templateUrl: './manualbase.component.html',
    styleUrls: ['./manualbase.component.scss'],
})
export class ManualBaseComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    viewMode: ViewMode = ViewMode.new;

    hidden = false;

    /**
     * manual tree
     */
    // selectedManual: any = null;

    /**
     * item modal
     */

    /**
     * manual item slide
     */
    manualItemList: any = [];
    selectedIndexOfManualItemList = -1;

    detailinfo: any = {};

    @ViewChild('inputRtnCnt') inputRtnCnt;
    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('manualTree') manualTree;
    @ViewChild('manualItemSlide') manualItemSlide;
    @ViewChild('manualItemViewer') manualItemViewer;
    @ViewChild('segmentModal') segmentModal;
    @ViewChild('typeManualModal') typeManualModal;
    @ViewChild('itemModal') itemModal;

    constructor(
        // private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {}

    initialiseInvites() {}

    ngOnInit() {
        this.setViewMode(ViewMode.new);
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        $(this.inputRtnCnt.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });

        $(this.inputOrdinal.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });
    }

    /**
     * manual tree
     */

    onManualTreeSelected(selectedManual: any) {
        // console.log('----- onManualTreeSelected -----');
        // console.log('selectedManual:', selectedManual);

        this.manualItemSlide.selectedItem = null;
        this.manualItemViewer.clear();

        if ('manual' === selectedManual.type) {
            const params = this.cf.toHttpParams({
                MANUAL_ID: selectedManual.MANUAL_ID,
            });

            const serviceUrl = 'entity/manualitem/selectListForManualTree';

            this.apigatewayService.doGetPromise(serviceUrl, params).then(
                (resultData: any) => {
                    if (resultData.code === 200) {
                        this.detailinfo = selectedManual;
                        this.manualItemList = resultData.data.list;
                        this.manualItemSlide.items = this.manualItemList;
                        this.setViewMode(ViewMode.selected);
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                }
            );
        } else {
            this.setViewMode(ViewMode.new);
        }
    }

    /**
     * segment modal
     */

    openSegmentModal() {
        const modalRef = this.segmentModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                if (this.detailinfo) {
                    this.detailinfo.SEG_ID = result.SEG_ID;
                    this.detailinfo.SEG_NM = result.SEG_NM;
                }
            },
            reason => {}
        );
    }

    /**
     * typeManual modal
     */

    openTypeManualModal() {
        const modalRef = this.typeManualModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.detailinfo.FLD_ID = result.FLD_ID;
                this.detailinfo.FLD_NM = result.FLD_NM;
            },
            reason => {}
        );
    }

    /**
     * item modal
     */

    openItemModal() {
        const isCheckboxShown = true;

        const exceptItemIdList: any[] = [];
        this.manualItemList.forEach(e => exceptItemIdList.push(e.ITEM_ID));
        // for (let i = 0; i < this.manualItemList.length; i++) {
        //     const manualItem = this.manualItemList[i];
        //     exceptItemIdList.push(manualItem.ITEM_ID);
        // }

        const modalRef = this.itemModal.open(isCheckboxShown, exceptItemIdList);
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.manualItemList = this.manualItemList.concat(result.selectedItems);

                // 순서 설정
                for (let i = 0; i < this.manualItemList.length; i++) {
                    const manualItem = this.manualItemList[i];
                    manualItem.ORDINAL = i + 1;
                }

                this.manualItemSlide.items = this.manualItemList;

                // 0:
                // id: 1001
                // ord1: 2
                // ord2: 1
                // text: "dev-item-1087-00"
                // type: "item"

                // if (this.detailinfo) {
                //     this.detailinfo.ITEM_ID = result.ITEM_ID;
                //     this.detailinfo.ITEM_NM = result.ITEM_NM;
                // }
            },
            reason => {}
        );
    }

    /**
     * manual item slide
     */

    evtManualItemBtnDeleteClick() {
        // console.log('----- evtManualItemBtnDeleteClick() -----');
        const removedItem = this.manualItemSlide.removeSelectedItem();
        if (null == removedItem) {
            swal.fire('삭제할 아이템을 선택하십시오', '', 'warning');
        }

        // if (-1 < this.selectedIndexOfManualItemList) {
        //     this.manualItemList.splice(this.selectedIndexOfManualItemList, 1);
        //     this.resetManualItemListOrdinal();
        //     this.manualItemViewer.clear();
        // }
    }

    evtManualItemSlideSelected(manualItem: any) {
        // console.log('evtLayoutRecoSlideSelected()');
        // console.log(manualItem);

        this.manualItemViewer.data = manualItem;

        // this.selectedIndexOfManualItemList = this.getIndexOfManualItemList(manualItem);
        // if (-1 < this.selectedIndexOfManualItemList) {
        //     this.manualItemViewer.manualItem = this.manualItemList[
        //         this.selectedIndexOfManualItemList
        //     ];
        // } else {
        //     this.manualItemViewer.clear();
        // }
    }

    // getIndexOfManualItemList(targetManualItem: any): number {
    //     for (let i = 0; i < this.manualItemList.length; i++) {
    //         const manualItem = this.manualItemList[i];
    //         if (manualItem.id === targetManualItem.id) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // resetManualItemListOrdinal() {
    //     for (let i = 0; i < this.manualItemList.length; i++) {
    //         const manualItem = this.manualItemList[i];
    //         manualItem.ORDINAL = i + 1;
    //     }
    // }

    /**
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.detailinfo = {
                    SEG_ID: '',
                    MANUAL_NM: '',
                    FLD_ID: '',
                    RTN_CNT: 0,
                    DESIGN_KEY_VALUE: 'DS',
                    MANUAL_XML: '',
                    MANUAL_SQL: '',
                    MANUAL_DESC: '',
                    DEL_YN: 'N',
                    ORDINAL: 1,
                    SEG_NM: '',
                    FLD_NM: '',
                };
                this.manualItemList = [];
                this.manualItemSlide.items = this.manualItemList;
                this.manualItemViewer.data = {};
                break;
            case ViewMode.selected:
                break;
        }
        this.viewMode = viewMode;
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnNewClick() {
        // console.log('----- evtBtnNewClick -----');

        this.setViewMode(ViewMode.new);
    }
    evtBtnSaveClick() {
        // console.log('----- evtBtnSaveClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        // 필터링
        if (!this.detailinfo.MANUAL_DESC) {
            this.detailinfo.MANUAL_DESC = '';
        }
        if (!this.detailinfo.MANUAL_XML) {
            this.detailinfo.MANUAL_XML = '';
        }
        if (!this.detailinfo.MANUAL_SQL) {
            this.detailinfo.MANUAL_SQL = '';
        }

        // ng-bind 작동하지 않는 부분 보완
        this.detailinfo.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);
        this.detailinfo.ORDINAL = Number(this.inputOrdinal.nativeElement.value);

        if (!this.detailinfo.SEG_ID || 0 === this.detailinfo.SEG_ID.length) {
            swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.MANUAL_NM || 0 === this.detailinfo.MANUAL_NM.length) {
            swal.fire('Manual 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('Manual 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (0 === this.manualItemList.length) {
            swal.fire('Manual 아이템을 선택하십시오.', '', 'warning');
            return;
            // } else if (
            //     (!this.detailinfo.MANUAL_SQL || 0 === this.detailinfo.MANUAL_SQL.length) &&
            //     (!this.detailinfo.MANUAL_XML || 0 === this.detailinfo.MANUAL_XML.length)
            // ) {
            //     swal.fire('추출 쿼리 정보를 설정하십시오.', '', 'warning');
            //     return;
        } else {
            const bodyParam = {
                manual: this.detailinfo,
                manualItemList: this.manualItemList,
            };

            switch (this.viewMode) {
                case ViewMode.new: {
                    this.apigatewayService
                        .doPost('model/manualmstr/new', bodyParam, null)
                        .subscribe(
                            resultData => {
                                if (201 === resultData.code) {
                                    swal.fire('저장완료', '', 'warning');
                                    this.detailinfo.MANUAL_ID = resultData.data.MANUAL_ID;
                                    this.manualTree.refresh();
                                    this.setViewMode(ViewMode.selected);
                                } else if (resultData.msg) {
                                    swal.fire(resultData.msg, '', 'warning');
                                } else {
                                    swal.fire('저장실패', '', 'warning');
                                }
                            },
                            error => {
                                this.logger.debug(JSON.stringify(error, null, 4));
                                swal.fire('저장실패', '', 'error');
                            }
                        );
                    break;
                }
                case ViewMode.selected: {
                    this.apigatewayService
                        .doPost('model/manualmstr/save', bodyParam, null)
                        .subscribe(
                            resultData => {
                                if (200 === resultData.code) {
                                    swal.fire('저장완료', '', 'warning');
                                    this.manualTree.refresh();
                                } else if (resultData.msg) {
                                    swal.fire(resultData.msg, '', 'warning');
                                } else {
                                    swal.fire('저장실패', '', 'warning');
                                }
                            },
                            error => {
                                this.logger.debug(JSON.stringify(error, null, 4));
                                swal.fire('저장실패', '', 'error');
                            }
                        );
                    break;
                }
            }
        }
    }
    evtBtnSaveAsClick() {
        // console.log('----- evtBtnSaveAsClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        // 필터링
        if (!this.detailinfo.MANUAL_DESC) {
            this.detailinfo.MANUAL_DESC = '';
        }
        if (!this.detailinfo.MANUAL_XML) {
            this.detailinfo.MANUAL_XML = '';
        }
        if (!this.detailinfo.MANUAL_SQL) {
            this.detailinfo.MANUAL_SQL = '';
        }

        // ng-bind 작동하지 않는 부분 보완
        this.detailinfo.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);
        this.detailinfo.ORDINAL = Number(this.inputOrdinal.nativeElement.value);

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 Manual은 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (0 === this.manualItemList.length) {
            swal.fire('Manual 아이템을 선택하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                manual: this.detailinfo,
                manualItemList: this.manualItemList,
            };

            this.apigatewayService.doPost('model/manualmstr/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        swal.fire('저장완료', '', 'warning');
                        this.manualTree.refresh();
                    } else if (resultData.msg) {
                        swal.fire(resultData.msg, '', 'warning');
                    } else {
                        swal.fire('저장실패', '', 'warning');
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('저장실패', '', 'error');
                }
            );
        }
    }
    evtBtnDeleteClick() {
        // console.log('----- evtBtnDeleteClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.cf.nvl(this.detailinfo.MANUAL_ID, '') === '') {
            swal.fire('삭제할 Manual을 선택하십시오.', '', 'warning');
            return;
        }

        swal.fire({
            title: '삭제 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('model/manualmstr/delete', this.detailinfo, null)
                    .subscribe(
                        resultData => {
                            swal.fire('삭제완료', '', 'warning');
                            this.manualTree.refresh();
                            this.setViewMode(ViewMode.new);
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('삭제실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }

    evtManualItemViewerOrdinalUp(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorOrdinalUp -----');
        // console.log(target);
        this.manualItemSlide.moveUp(target);
    }

    evtManualItemViewerOrdinalDown(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorOrdinalDown -----');
        // console.log(target);
        this.manualItemSlide.moveDown(target);
    }

    showTree() {
        this.hidden = !this.hidden;
    }
}
