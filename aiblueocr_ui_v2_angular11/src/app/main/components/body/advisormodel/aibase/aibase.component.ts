import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
// import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
const javascripts = [
    // './assets/resources/belltechsoft/advisormodel/advisormodel.js',
    './assets/resources/js/scripts.js',
    // './assets/resources/js/lib/rangeSliderCustom.js',
];
declare var $: any;
declare let window: any;
declare function initSwiper();

export enum ViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-aibase',
    templateUrl: './aibase.component.html',
    styleUrls: ['./aibase.component.scss'],
})
export class AiBaseComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    viewMode: ViewMode = ViewMode.new;

    menuId: any = 'SEG_SELECT';

    hidden = false;

    AI_MSTR: any;

    aiStatusList: any = [];

    @ViewChild('inputRtnCnt') inputRtnCnt;
    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('aiTree') aiTree;
    @ViewChild('typeAiModal') typeAiModal;
    @ViewChild('sqlModal') sqlModal;

    @ViewChild('segmentSelect') segmentSelect;
    @ViewChild('dataSet') dataSet;
    @ViewChild('aiBasePref') aiBasePref;
    @ViewChild('dataSplit') dataSplit;
    @ViewChild('algSelect') algSelect;
    @ViewChild('modelLearn') modelLearn;
    @ViewChild('modelEvaluation') modelEvaluation;

    constructor(
        // private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AiBaseComponent = this;
    }

    initialiseInvites() {}

    ngOnInit() {
        this.initAiMstr();
        setTimeout(() => {
            window.AiBaseComponent.loadScript();
        });
        this.cs.getCodelist('AI_STATUS').then(data => {
            this.aiStatusList = data; // data;
        });
        this.setViewMode(ViewMode.new);
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        initSwiper();
        $(this.inputRtnCnt.nativeElement).TouchSpin({
            max: 999999,
            verticalbuttons: false,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white',
        });

        // $(this.inputOrdinal.nativeElement).TouchSpin({
        //     max: 999999,
        //     verticalbuttons: false,
        //     buttondown_class: 'btn btn-white',
        //     buttonup_class: 'btn btn-white',
        // });
    }

    public loadScript() {
        for (let i = 0; i < javascripts.length; i++) {
            const node = document.createElement('script');
            node.src = javascripts[i];
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    initAiMstr() {
        this.AI_MSTR = {
            AI_NM: '',
            SEG_ID: '',
            PREF_ID: '',
            FLD_ID: '',
            AI_STATUS: '40',
            RTN_CNT: 0,
            AI_DESC: '',
            AI_XML: '',
            AI_SQL: '',
            DEL_YN: 'N',
            DESIGN_KEY_VALUE: 'DS', // 데이터 원본 뷰
            SEG_NM: '',
            FLD_NM: '',
            PREF_NM: '',
            DATA_SPLIT: [],
            ALG_ID: [],
        };
    }

    main(menuId) {
        // console.log('main:::::::::::::::', menuId);
        this.menuId = menuId;
    }

    onAiTreeSelected(selectedAiItem: any) {
        console.log('----- onAiTreeSelected -----');

        // this.manualItemSlide.selectedItem = null;
        // this.manualItemViewer.clear();

        if ('ai' === selectedAiItem.type) {
            const params = this.cf.toHttpParams({
                AI_ID: selectedAiItem.AI_ID,
            });

            const serviceUrl = 'model/aimodel/detail';

            this.apigatewayService.doGetPromise(serviceUrl, params).then(
                (resultData: any) => {
                    if (resultData.code === 200) {
                        this.AI_MSTR = resultData.data.info;
                        this.AI_MSTR.DATA_SPLIT = resultData.data.DATA_SPLIT;
                        this.AI_MSTR.ALG_ID = resultData.data.ALG_ID;
                        this.setViewMode(ViewMode.selected);
                        this.aiSlideRefresh(this.menuId);
                    } else {
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
     * ViewMode
     */
    setViewMode(viewMode: ViewMode) {
        // console.log('----- setViewMode -----');
        // console.log('viewMode:', viewMode);

        switch (viewMode) {
            case ViewMode.new:
                this.initAiMstr();
                break;
            case ViewMode.selected:
                break;
        }
        this.viewMode = viewMode;
    }

    setAiMstr(data: any) {
        // console.log('###################### setAiMstr::1::data::::::', data);
        const idx = data.index;
        switch (idx) {
            case 0: // 0 : 세그먼트 선택 -> 데이터셋으로 이동
                this.menuId = 'DATASET';
                this.AI_MSTR.SEG_ID = data.SEG_ID;
                this.AI_MSTR.SEG_NM = data.SEG_NM;
                $('#step2 a').click();
                break;
            case 2: // 2: 선호도 정의 -> 데이터분할로 이동
                this.menuId = 'DATA_SPLIT';
                this.AI_MSTR.PREF_ID = data.PREF_ID;
                this.AI_MSTR.PREF_NM = data.PREF_NM;
                $('#step4 a').click();
                break;
            case 3: // 2: 데이터분할 : 화면이동 없음
                // this.menuId = 'DATA_SPLIT';
                this.AI_MSTR.DATA_SPLIT = this.AI_MSTR.DATA_SPLIT.filter(
                    x => x.SPLIT_GUBUN !== data.datasplit.SPLIT_GUBUN
                );
                this.AI_MSTR.DATA_SPLIT.push(data.datasplit);
                // if (data.SPLIT_GUBUN === data.SPLIT_GUBUN_CODE[1]) {
                //     this.AI_MSTR.TRAIN_SPLIT_CROSS = data.TRAIN_SPLIT;
                // } else {
                //     // 데이터분할
                //     this.AI_MSTR.TRAIN_SPLIT_DATA = data.TRAIN_SPLIT;
                // }
                break;
            case 4: // 4: 알고리즘 선택 -> 모델학습으로 이동
                this.AI_MSTR.ALG_ID = data.algidlist;
                break;
        }

        // console.log('###################### setAiMstr::2::AI_MSTR::::::', this.AI_MSTR);
    }

    // 모델 저장 후 모델학습으로 이동
    evtBtnSaveClick() {
        if (!this.AI_MSTR.AI_NM) {
            swal.fire('AI명을 입력하십시오.', '', 'warning');
            return;
        }
        if (!this.AI_MSTR.FLD_ID) {
            swal.fire('AI유형을 입력하십시오.', '', 'warning');
            return;
        }
        if (!this.AI_MSTR.SEG_ID) {
            swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            this.menuId = 'SEG_SELECT';
            $('#step1 a').click();
            return;
        }
        if (!this.AI_MSTR.PREF_ID) {
            swal.fire('선호도를 선택하십시오.', '', 'warning');
            this.menuId = 'PREF_DEF';
            $('#step3 a').click();
            return;
        }
        if (this.AI_MSTR.DATA_SPLIT.length < 2) {
            swal.fire('데이터분할 비율을 입력하십시오.', '', 'warning');
            this.menuId = 'DATA_SPLIT';
            $('#step4 a').click();
            return;
        }
        if (this.AI_MSTR.ALG_ID.length === 0) {
            swal.fire('알고리즘을 선택하십시오.', '', 'warning');
            this.menuId = 'ALG_SELECT';
            $('#step5 a').click();
            return;
        }
        swal.fire({
            title:
                '[' +
                this.AI_MSTR.ALG_ID.length +
                ' 건] 모델을 ' +
                (this.viewMode === ViewMode.new ? '생성' : '저장') +
                '하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            if (result.value) {
                if (!this.AI_MSTR.AI_DESC) {
                    this.AI_MSTR.AI_DESC = '';
                }
                if (!this.AI_MSTR.AI_XML) {
                    this.AI_MSTR.AI_XML = '';
                }
                if (!this.AI_MSTR.AI_SQL) {
                    this.AI_MSTR.AI_SQL = '';
                }

                this.AI_MSTR.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);

                const bodyParam = {
                    info: this.AI_MSTR,
                };

                switch (this.viewMode) {
                    case ViewMode.new: {
                        this.apigatewayService
                            .doPost('model/aimodel/new', bodyParam, null)
                            .subscribe(
                                resultData => {
                                    if (201 === resultData.code) {
                                        // swal.fire('완료', '', 'warning');
                                        const sucessCnt = resultData.data.sucessCnt;
                                        this.AI_MSTR.AI_ID = resultData.data.AI_ID;
                                        this.aiTree.refresh();
                                        this.setViewMode(ViewMode.selected);
                                        swal.fire(
                                            '[' + sucessCnt + ' 건] 저장하였습니다.',
                                            '',
                                            'success'
                                        ).then(result => {
                                            // this.initAiMstr();
                                            this.aiSlideRefresh('LEARN');
                                        });
                                    } else if (resultData.msg) {
                                        swal.fire(resultData.msg, '', 'warning');
                                    } else {
                                        swal.fire('실패', '', 'warning');
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
                            .doPost('model/aimodel/save', bodyParam, null)
                            .subscribe(
                                resultData => {
                                    if (200 === resultData.code) {
                                        this.aiTree.refresh();
                                        swal.fire('저장완료', '', 'warning').then(result => {
                                            this.aiSlideRefresh('LEARN');
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
                }
            }
            //
        });
    }
    /**
     * 버튼 이벤트 처리
     */
    evtBtnNewClick() {
        // console.log('----- evtBtnNewClick -----');
        this.setViewMode(ViewMode.new);
        this.aiTree.unSelectAll();
        this.aiSlideRefresh(this.menuId);
    }

    evtBtnSaveAsClick() {
        // console.log('----- evtBtnSaveAsClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.viewMode === ViewMode.new) {
            swal.fire('신규 AI는 다른이름으로 저장할 수 없습니다.', '', 'warning');
        } else {
            if (!this.AI_MSTR.AI_NM) {
                swal.fire('AI명을 입력하십시오.', '', 'warning');
                return;
            }
            if (!this.AI_MSTR.FLD_ID) {
                swal.fire('AI유형을 입력하십시오.', '', 'warning');
                return;
            }
            if (!this.AI_MSTR.SEG_ID) {
                swal.fire('세그먼트를 선택하십시오.', '', 'warning');
                this.menuId = 'SEG_SELECT';
                $('#step1 a').click();
                return;
            }
            if (!this.AI_MSTR.PREF_ID) {
                swal.fire('선호도를 선택하십시오.', '', 'warning');
                this.menuId = 'PREF_DEF';
                $('#step3 a').click();
                return;
            }
            if (this.AI_MSTR.DATA_SPLIT.length < 2) {
                swal.fire('데이터분할 비율을 입력하십시오.', '', 'warning');
                this.menuId = 'DATA_SPLIT';
                $('#step4 a').click();
                return;
            }
            if (this.AI_MSTR.ALG_ID.length === 0) {
                swal.fire('알고리즘을 선택하십시오.', '', 'warning');
                this.menuId = 'ALG_SELECT';
                $('#step5 a').click();
                return;
            }
            if (!this.AI_MSTR.AI_DESC) {
                this.AI_MSTR.AI_DESC = '';
            }
            if (!this.AI_MSTR.AI_XML) {
                this.AI_MSTR.AI_XML = '';
            }
            if (!this.AI_MSTR.AI_SQL) {
                this.AI_MSTR.AI_SQL = '';
            }

            // ng-bind 작동하지 않는 부분 보완
            this.AI_MSTR.RTN_CNT = Number(this.inputRtnCnt.nativeElement.value);

            const bodyParam = {
                info: this.AI_MSTR,
            };

            this.apigatewayService.doPost('model/aimodel/save-as', bodyParam, null).subscribe(
                resultData => {
                    if (201 === resultData.code) {
                        // this.AI_MSTR.AI_ID = resultData.data.AI_ID;
                        this.aiTree.refresh();
                        this.setViewMode(ViewMode.selected);
                        swal.fire('저장완료', '', 'warning').then(result => {
                            this.AI_MSTR.AI_ID = resultData.data.AI_ID;
                            this.aiTree.selectAiNode(this.AI_MSTR.AI_ID);
                            // this.initAiMstr();
                            this.aiSlideRefresh('LEARN');
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
    evtBtnDeleteClick() {
        // console.log('----- evtBtnDeleteClick -----');
        // console.log('this.detailinfo:', this.detailinfo);

        if (this.cf.nvl(this.AI_MSTR.AI_ID, '') === '') {
            swal.fire('삭제할 AI를 선택하십시오.', '', 'warning');
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
                const bodyParam = {
                    info: this.AI_MSTR,
                };

                this.apigatewayService.doPost('model/aimodel/delete', bodyParam, null).subscribe(
                    resultData => {
                        this.aiTree.refresh();
                        this.setViewMode(ViewMode.new);
                        swal.fire('삭제완료', '', 'warning').then(result => {
                            this.aiSlideRefresh(this.menuId);
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
     * typeManual modal
     */

    openTypeAiModal() {
        const modalRef = this.typeAiModal.open();
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);

                this.AI_MSTR.FLD_ID = result.FLD_ID;
                this.AI_MSTR.FLD_NM = result.FLD_NM;
            },
            reason => {}
        );
    }

    evtBtnSqlClick() {
        const modalRef = this.sqlModal.open(
            this.AI_MSTR.DESIGN_KEY_VALUE,
            this.AI_MSTR.AI_XML,
            this.AI_MSTR.AI_SQL
        );
        modalRef.result.then(
            result => {
                // console.log('modal result:', result);
                // console.log('this.detailinfo:', this.detailinfo);
                this.AI_MSTR.DESIGN_KEY_VALUE = result.DESIGN_KEY_VALUE;
                this.AI_MSTR.AI_XML = result.XML;
                this.AI_MSTR.AI_SQL = result.SQL;
            },
            reason => {}
        );
    }

    aiSlideRefresh(targetMenuId: any) {
        // const newMenuId = targetMenuId;
        // this.logger.debug('aiSlideRefresh :::::1::::targetMenuId:::::::::: ', targetMenuId);
        // this.logger.debug('aiSlideRefresh :::::2:::::menuId::::::::: ', this.menuId);
        this.menuId = null;
        // this.logger.debug('aiSlideRefresh :::::3:::::menuId::::::::: ', this.menuId);

        setTimeout(() => {
            this.menuId = targetMenuId;
            switch (this.menuId) {
                case 'SEG_SELECT':
                    $('#step1 a').click();
                    break;
                case 'DATASET':
                    $('#step2 a').click();
                    break;
                case 'PREF_DEF':
                    $('#step3 a').click();
                    break;
                case 'DATA_SPLIT':
                    $('#step4 a').click();
                    break;
                case 'ALG_SELECT':
                    $('#step5 a').click();
                    break;
                case 'LEARN':
                    $('#step6 a').click();
                    break;
                case 'LEARN':
                    $('#step7 a').click();
                    break;
            }
            // this.logger.debug('aiSlideRefresh :::::5:::::menuId::::::::: ', this.menuId);
        }, 10);
        // this.logger.debug('aiSlideRefresh :::::4:::::menuId::::::::: ', this.menuId);

        //     // 다른 메뉴이동
        //     if (targetMenuId && this.menuId !== targetMenuId) {
        //         this.menuId = targetMenuId;
    }

    showTree() {
        this.hidden = !this.hidden;
    }
}
