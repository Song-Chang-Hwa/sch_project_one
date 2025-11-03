import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommService, LoggerService } from '../../../../../shared/services';
import { CommFunction } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
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
    selector: 'app-abtest',
    templateUrl: './abtest.component.html',
    styleUrls: ['./abtest.component.scss'],
})
export class AbTestComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    hidden = false;

    viewMode: ViewMode = ViewMode.new;

    abStatusList: any = [];
    trgTypeList: any = [];
    trgIdxList: any = [];

    /**
     * layout reco slide
     */
    detailinfo: any; // 테스트정보
    abtestRsltList: any = []; // 테스트 결과
    rsltinfo: any; // 테스트 결과

    layoutCardList: any = []; // 슬라이드(화면용)

    @ViewChild('myChartAbtestJs') myChartAbtestJs;

    @ViewChild('abtestTree') abtestTree;
    @ViewChild('segmentModal') segmentModal;
    @ViewChild('typeModal') typeModal;
    @ViewChild('sqlModal') sqlModal;
    @ViewChild('layoutModal') layoutModal;
    // @ViewChild('layoutRecoItemModal') layoutRecoItemModal;
    // @ViewChild('layoutRecoSlide') layoutRecoSlide;
    // @ViewChild('layoutRecoSlideEditor') layoutRecoSlideEditor;
    @ViewChild('inputTrgCnt') inputTrgCnt;
    @ViewChild('abtestRslt') abtestRslt;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AbTestComponent = this;
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
        this.cs.getCodelist('AB_STATUS').then(data => {
            this.abStatusList = data;
        });
        this.cs.getCodelist('TRG_TYPE').then(data => {
            this.trgTypeList = data;
        });
        this.cs.getCodelist('TRG_IDX').then(data => {
            this.trgIdxList = data;
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
            // window.AbTestComponent.loadScript();
        });

        this.setViewMode(ViewMode.new);
        // this.search();

    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        const self = this;

        $(this.inputTrgCnt.nativeElement)
            .TouchSpin({
                min: 0,
                max: 999999,
                step: 1,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.detailinfo.TRG_CNT = Number(e.target.value);
            });
        // this.abtestTree.selectItem(1000);
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
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.detailinfo = {
                    SEG_ID: '',
                    ABTEST_NM: '',
                    FLD_ID: '',
                    START_DATE: '',
                    END_DATE: '',
                    TRG_TYPE: '10',
                    TRG_CNT: 0,
                    TRG_IDX: '10',
                    AB_SQL: '',
                    AB_DESC: '',
                    AB_STATUS: '40',
                    SEG_NM: '',
                    FLD_NM: '',
                };
                this.layoutCardList = [];
                this.abtestRsltList = [];
                this.rsltinfo = {};
                break;
            case ViewMode.selected:
                break;
        }
        // this.layoutRecoSlideEditor.data = {};

        this.viewMode = viewMode;
    }

    /**
     * AB테스트 선택
     */

    onAbtestTreeSelected(selecteItem: any) {
        // console.log('----- onAbtestTreeSelected -----');
        // console.log('selectedLayout:', selecteItem);

        this.setViewMode(ViewMode.new);
        if ('abtest' === selecteItem.type) {
            const params = this.cf.toHttpParams({
                ABTEST_ID: selecteItem.id,
            });
            const serviceUrl = '/simulation/abtest/detail';
            this.apigatewayService.doGetPromise(serviceUrl, params).then(
                (resultData: any) => {
                    if (resultData.code === 200) {
                        this.detailinfo = resultData.data.info;
                        this.layoutCardList = resultData.data.list;
                        this.setViewMode(ViewMode.selected);
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                }
            );
        } else {
        }
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnAbtestNewClick() {
        // console.log('----- evtBtnNewAbtestClick -----');

        this.setViewMode(ViewMode.new);
    }

    // AB테스트 등록
    evtBtnAbtestSaveClick() {
        // console.log('----- evtBtnAbtestSaveClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        this.detailinfo.START_DATE = $('#startDate').val();
        this.detailinfo.END_DATE = $('#endDate').val();

        if (!this.detailinfo.SEG_ID || 0 === this.detailinfo.SEG_ID.length) {
            swal.fire('세그먼트를 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('테스트 유형을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.ABTEST_NM || 0 === this.detailinfo.ABTEST_NM.length) {
            swal.fire('테스트 명을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.START_DATE || 0 === this.detailinfo.START_DATE.length) {
            swal.fire('테스트 시작일을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.END_DATE || 0 === this.detailinfo.END_DATE.length) {
            swal.fire('테스트 종료일을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_TYPE || 0 === this.detailinfo.TRG_TYPE.length) {
            swal.fire('타겟팅방법을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_CNT || 0 === this.detailinfo.TRG_CNT) {
            swal.fire('타겟 수를 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_IDX || 0 === this.detailinfo.TRG_IDX.length) {
            swal.fire('목표지표를  입력하십시오.', '', 'warning');
            return false;
        } else if (2 !== this.layoutCardList.length) {
            swal.fire('Layout은 2개만 입력가능합니다.', '', 'warning');
            return false;
        } else {
            if (!this.detailinfo.AB_DESC) {
                this.detailinfo.AB_DESC = '';
            }
            if (!this.detailinfo.AB_SQL) {
                this.detailinfo.AB_SQL = '';
            }

            const bodyParam = {
                info: this.detailinfo,
                list: this.layoutCardList,
            };

            switch (this.viewMode) {
                case ViewMode.new: {
                    this.apigatewayService
                        .doPost('/simulation/abtest/new', bodyParam, null)
                        .subscribe(
                            resultData => {
                                if (201 === resultData.code) {
                                    swal.fire('저장완료', '', 'warning').then(result => {
                                        this.detailinfo.ABTEST_ID = resultData.data.ABTEST_ID;
                                        this.abtestTree.refresh();
                                        this.setViewMode(ViewMode.selected);
                                    });
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
                    if ('50' === this.detailinfo.AB_STATUS) {
                        swal.fire('테스트 진행중에는 수정할 수 없습니다.', '', 'warning');
                        return false;
                    } else {
                        this.apigatewayService
                            .doPost('simulation/abtest/save', bodyParam, null)
                            .subscribe(
                                resultData => {
                                    if (200 === resultData.code) {
                                        swal.fire('저장완료', '', 'warning').then(result => {
                                            this.abtestTree.refresh();
                                        });
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
                    break;
                }
            }
        }
    }

    // AB테스트 다른이름으로 저장
    evtBtnAbtestSaveAsClick() {
        // console.log('----- evtBtnAbtestSaveAsClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 테스트는 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else if (!this.detailinfo.SEG_ID || 0 === this.detailinfo.SEG_ID.length) {
            swal.fire('세그먼트를 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.FLD_ID || 0 === this.detailinfo.FLD_ID.length) {
            swal.fire('테스트 유형을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.ABTEST_NM || 0 === this.detailinfo.ABTEST_NM.length) {
            swal.fire('테스트 명을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.START_DATE || 0 === this.detailinfo.START_DATE.length) {
            swal.fire('테스트 시작일을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.END_DATE || 0 === this.detailinfo.END_DATE.length) {
            swal.fire('테스트 종료일을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_TYPE || 0 === this.detailinfo.TRG_TYPE.length) {
            swal.fire('타겟팅방법을 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_CNT || 0 === this.detailinfo.TRG_CNT) {
            swal.fire('타겟 수를 입력하십시오.', '', 'warning');
            return false;
        } else if (!this.detailinfo.TRG_IDX || 0 === this.detailinfo.TRG_IDX.length) {
            swal.fire('목표지표를  입력하십시오.', '', 'warning');
            return false;
        } else if (2 !== this.layoutCardList.length) {
            swal.fire('Layout은 2개만 입력가능합니다.', '', 'warning');
            return false;
        } else {
            if (!this.detailinfo.AB_DESC) {
                this.detailinfo.AB_DESC = '';
            }
            if (!this.detailinfo.AB_SQL) {
                this.detailinfo.AB_SQL = '';
            }
            const bodyParam = {
                info: this.detailinfo,
                list: this.layoutCardList,
            };

            this.apigatewayService.doPost('simulation/abtest/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        swal.fire('저장완료', '', 'warning').then(result => {
                            this.abtestTree.refresh();
                        });
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

    // AB테스트 삭제
    evtBtnAbtestDeleteClick() {
        // console.log('----- evtBtnAbtestDeleteClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.cf.nvl(this.detailinfo.ABTEST_ID, '') === '') {
            swal.fire('삭제할 테스트르 선택하십시오.', '', 'warning');
            return;
        }

        if ('50' === this.detailinfo.AB_STATUS) {
            swal.fire('테스트 진행중에는 삭제할 수 없습니다.', '', 'warning');
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
                    .doPost('simulation/abtest/delete', this.detailinfo, null)
                    .subscribe(
                        resultData => {
                            swal.fire('삭제완료', '', 'warning').then(result => {
                                this.abtestTree.refresh();
                                this.setViewMode(ViewMode.new);
                            });
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('삭제실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }

    /**
     * 레이아웃 카드 삭제
     */
    evtLayoutBtnDeleteClick() {
        const layoutId = this.rsltinfo.LAYOUT_ID;
        if (!layoutId) {
            swal.fire('삭제할 레이아웃을 선택하십시오.', '', 'warning');
            return;
        }

        this.layoutCardList = this.layoutCardList.filter(x => x.LAYOUT_ID !== layoutId);
        for (let i = 0; i < this.layoutCardList.length; i++) {
            const item = this.layoutCardList[i];
            item.ORDINAL = i + 1;
            this.layoutCardList[i] = item;
        }
    }

    // 레이아웃 순서변경
    evtLayoutBtnOrdinalClick(p) {
        // const layoutId = this.rsltinfo.LAYOUT_ID;
        const ordinalIdx = this.rsltinfo.ORDINAL - 1;
        const trgOrdinalIdx = ordinalIdx + p;
        const endIdx = this.layoutCardList.length - 1;

        // console.log('evtLayoutBtnOrdinalClick###ordinal#####p####', ordinal, p);
        if (trgOrdinalIdx < 0 || trgOrdinalIdx > endIdx) {
            // console.log(
            //     'evtLayoutBtnOrdinalClick###1##ordinalIdx#trgOrdinalIdx#endIdx',
            //     ordinalIdx,
            //     trgOrdinalIdx,
            //     endIdx
            // );
        } else {
            // console.log(
            //     'evtLayoutBtnOrdinalClick###2##ordinalIdx#trgOrdinalIdx#endIdx',
            //     ordinalIdx,
            //     trgOrdinalIdx,
            //     endIdx
            // );
            const item = this.layoutCardList[ordinalIdx]; // 선택한 아이템
            const trgItem = this.layoutCardList[trgOrdinalIdx]; // 이동할 아이템
            item.ORDINAL = trgOrdinalIdx + 1;
            trgItem.ORDINAL = ordinalIdx + 1;
            this.layoutCardList[trgOrdinalIdx] = item;
            this.layoutCardList[ordinalIdx] = trgItem;
            this.rsltinfo = item;
        }
    }

    // 레이아웃 선택 팝업
    openLayoutModal() {
        const exceptLayoutList: any[] = [];
        this.layoutCardList.forEach(e => exceptLayoutList.push(e.LAYOUT_ID));

        const modalRef = this.layoutModal.open(exceptLayoutList, true);
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);
                // 선택된 레이아웃 추가
                this.addLayoutCardList(result);
            },
            reason => {}
        );
    }

    // 레이아웃 추가
    addLayoutCardList(list) {
        // for (let i = 0; i < list.length; i++) {
        //     let node = list[i];
        //     console.log('addLayoutCardList i node:', i, node, node.id, node.text);
        // }
        let ordinal = this.layoutCardList.length;
        list.forEach(node => {
            ++ordinal;
            // console.log('addLayoutCardList node:', node, node.id, node.text);
            const data = this.layoutCardList.filter(x => x.LAYOUT_ID === node.id);
            if (data.length === 0) {
                // 기존에 없으면 추가
                this.layoutCardList.push({
                    LAYOUT_ID: node.id,
                    LAYOUT_NM: node.text,
                    FLD_NM: node.FLD_NM,
                    ORDINAL: ordinal,
                    NEW_ORDINAL: ordinal,
                });
            }
        });
        // console.log('addLayoutCardList:', this.layoutCardList);
    }

    setAbtestRsltInfo(info) {
        this.rsltinfo = info;
    }

    openTypeAbtestModal() {
        const modalRef = this.typeModal.open();
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

    openSegmentModal() {
        const modalRef = this.segmentModal.open('Y');
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

    evtBtnSqlClick() {
        const modalRef = this.sqlModal.open(
            this.detailinfo.DESIGN_KEY_VALUE,
            this.detailinfo.AB_XML,
            this.detailinfo.AB_SQL
        );
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.detailinfo.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                this.detailinfo.AB_XML = result.XML;
                this.detailinfo.AB_SQL = result.SQL;
            },
            reason => {}
        );
    }

    openAbtestRsltModal() {
        const modalRef = this.abtestRslt.open(this.detailinfo.ABTEST_ID);
        modalRef.result.then(
            result => {},
            reason => {}
        );
    }

    showTree() {
        this.hidden = !this.hidden;
    }
}
