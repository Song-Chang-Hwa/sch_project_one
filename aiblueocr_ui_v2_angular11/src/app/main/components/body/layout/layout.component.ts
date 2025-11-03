import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../shared/services';
import { CommFunction } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../components/page/page.component';
// const javascripts = [];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

export enum ViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    viewMode: ViewMode = ViewMode.new;

    layoutStatusList: any = [];

    /**
     * layout reco slide
     */
    layoutRecoList: any = [];

    detailinfo: any = {};

    hidden = false;

    @ViewChild('layoutTree') layoutTree;
    @ViewChild('typeLayoutModal') typeLayoutModal;
    @ViewChild('layoutRecoItemModal') layoutRecoItemModal;
    @ViewChild('layoutRecoSlide') layoutRecoSlide;
    @ViewChild('layoutRecoSlideEditor') layoutRecoSlideEditor;
    @ViewChild('inputRtnCnt') inputRtnCnt;
    @ViewChild('inputOrdinal') inputOrdinal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.LayoutComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {}

    ngOnInit() {
        this.cs.getCodelist('SEG_STATUS').then(data => {
            this.layoutStatusList = data;
        });

        // 차트 데모 로드
        setTimeout(() => {
            // $('#segmentTypeTree').jstree({
            //     core: {
            //         check_callback: true,
            //     },
            //     plugins: ['types', 'dnd'],
            //     types: {
            //         default: {
            //             icon: 'ti-file',
            //         },
            //     },
            // });
            // window.LayoutComponent.loadScript();
        });
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        const self = this;

        $(this.inputRtnCnt.nativeElement)
            .TouchSpin({
                min: 0,
                max: 999999,
                step: 1,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.detailinfo.RTN_CNT = Number(e.target.value);
            });

        $(this.inputOrdinal.nativeElement)
            .TouchSpin({
                min: 1,
                max: 999999,
                step: 1,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.detailinfo.ORDINAL = Number(e.target.value);
            });

        this.setViewMode(ViewMode.new);
    }

    /*공통 스크립트 로드*/
    public loadScript() {
        // for (let i = 0; i < javascripts.length; i++) {
        //     const node = document.createElement('script');
        //     node.src = javascripts[i];
        //     node.type = 'text/javascript';
        //     node.async = true;
        //     node.charset = 'utf-8';
        //     document.getElementsByTagName('head')[0].appendChild(node);
        // }
    }

    /**
     * layout tree
     */

    onLayoutTreeSelected(selectedLayout: any) {
        // console.log('----- onLayoutTreeSelected -----');
        // console.log('selectedLayout:', selectedLayout);

        this.layoutRecoSlide.selectedItem = null;
        // this.layoutRecoSlide.
        if ('layout' === selectedLayout.type) {
            const params = this.cf.toHttpParams({
                LAYOUT_ID: selectedLayout.LAYOUT_ID,
            });
            const serviceUrl = 'entity/layoutreco/selectListForLayoutTree';
            this.apigatewayService.doGetPromise(serviceUrl, params).then(
                (resultData: any) => {
                    if (resultData.code === 200) {
                        this.detailinfo = selectedLayout;
                        this.layoutRecoList = resultData.data.list;
                        // this.layoutRecoSlide.items = this.layoutRecoList;
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
     * typeLayout modal
     */

    openTypeLayoutModal() {
        const modalRef = this.typeLayoutModal.open();
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
     * layout reco item modal
     */

    openLayoutRecoItemModal() {
        const modalRef = this.layoutRecoItemModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                let lastOrdinal = 0;
                if (0 < this.layoutRecoList.length) {
                    lastOrdinal = this.layoutRecoList[this.layoutRecoList.length - 1].ORDINAL;
                }

                result.selectedItems.forEach(function (e) {
                    e.ORDINAL = lastOrdinal + 1;
                    lastOrdinal++;
                });

                this.layoutRecoList = this.layoutRecoList.concat(result.selectedItems);

                this.layoutRecoSlide.items = this.layoutRecoList;

                // const newLayoutReco = result.selectedItems;

                // if (0 === this.layoutRecoList.length) {
                //     newLayoutReco.ORDINAL = 1;
                // } else {
                //     const lastLayoutReco = this.layoutRecoList[this.layoutRecoList.length - 1];
                //     newLayoutReco.ORDINAL = lastLayoutReco.ORDINAL + 1;
                // }
                // this.layoutRecoList.push(result.selectedItems);

                // this.layoutRecoSlide.items = this.layoutRecoList;
            },
            reason => {}
        );
    }

    /**
     * layout reco slide
     */

    evtLayoutRecoBtnDeleteClick() {
        // console.log('----- evtLayoutRecoBtnDeleteClick() -----');
        const removedItem = this.layoutRecoSlide.removeSelectedItem();
        if (null == removedItem) {
            swal.fire('삭제할 아이템을 선택하십시오', '', 'warning');
        }
    }

    evtLayoutRecoSlideSelected(layoutReco: any) {
        // console.log('evtLayoutRecoSlideSelected()');
        // console.log(layoutReco);

        this.layoutRecoSlideEditor.data = layoutReco;

        // this.selectedIndexOfManualItemList = this.getIndexOfManualItemList(manualItem);
        // if (-1 < this.selectedIndexOfManualItemList) {
        //     this.manualItemViewer.manualItem = this.manualItemList[
        //         this.selectedIndexOfManualItemList
        //     ];
        // } else {
        //     this.manualItemViewer.clear();
        // }
    }

    /**
     * layout reco slide editor
     */

    evtLayoutRecoSlideEditorOrdinalUp(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorOrdinalUp -----');
        // console.log(target);
        this.layoutRecoSlide.moveUp(target);
    }

    evtLayoutRecoSlideEditorOrdinalDown(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorOrdinalDown -----');
        // console.log(target);
        this.layoutRecoSlide.moveDown(target);
    }

    evtLayoutRecoSlideEditorItemOrdinalUp(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorItemOrdinalUp -----');
        // console.log(target);
        this.layoutRecoSlide.moveItemUp(target);
    }

    evtLayoutRecoSlideEditorItemOrdinalDown(target: any) {
        // console.log('----- evtLayoutRecoSlideEditorItemOrdinalDown -----');
        // console.log(target);
        this.layoutRecoSlide.moveItemDown(target);
    }

    /**
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.detailinfo = {
                    LAYOUT_NM: '',
                    FLD_ID: '',
                    RTN_CNT: 0,
                    LAYOUT_DESC: '',
                    DEL_YN: 'N',
                    MASTER_YN: 'N',
                    MANUAL_YN: '',
                    ORDINAL: 1,
                    LAYOUT_STATUS: '40',
                    FLD_NM: '',
                };
                this.layoutRecoList = [];
                // this.layoutRecoSlide.items = this.layoutRecoList;
                break;
            case ViewMode.selected:
                break;
        }
        this.layoutRecoSlideEditor.data = {};

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
        if (!this.detailinfo.LAYOUT_DESC) {
            this.detailinfo.LAYOUT_DESC = '';
        }

        if (!this.detailinfo.LAYOUT_NM || 0 === this.detailinfo.LAYOUT_NM.length) {
            swal.fire('Layout 명을 입력하십시오.', '', 'warning');
            return;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('Layout 유형을 선택하십시오.', '', 'warning');
            return;
        } else if (0 === this.layoutRecoList.length) {
            swal.fire('Layout 아이템을 선택하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                layout: this.detailinfo,
                layoutRecoList: this.layoutRecoList,
            };

            switch (this.viewMode) {
                case ViewMode.new: {
                    this.apigatewayService.doPost('layout/new', bodyParam, null).subscribe(
                        resultData => {
                            if (201 === resultData.code) {
                                swal.fire('저장완료', '', 'warning');
                                this.detailinfo.LAYOUT_ID = resultData.data.LAYOUT_ID;
                                this.layoutTree.refresh();
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
                    this.apigatewayService.doPost('layout/save', bodyParam, null).subscribe(
                        resultData => {
                            if (200 === resultData.code) {
                                swal.fire('저장완료', '', 'warning');
                                this.layoutTree.refresh();
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

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 Layout은 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (0 === this.layoutRecoList.length) {
            swal.fire('Layout 아이템을 선택하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                layout: this.detailinfo,
                layoutRecoList: this.layoutRecoList,
            };

            this.apigatewayService.doPost('layout/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        swal.fire('저장완료', '', 'warning');
                        this.layoutTree.refresh();
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

        if (this.cf.nvl(this.detailinfo.LAYOUT_ID, '') === '') {
            swal.fire('삭제할 Layout을 선택하십시오.', '', 'warning');
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
                this.apigatewayService.doPost('layout/delete', this.detailinfo, null).subscribe(
                    resultData => {
                        swal.fire('삭제완료', '', 'warning');
                        this.layoutTree.refresh();
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

    showTree() {
        this.hidden = !this.hidden;
    }
}
