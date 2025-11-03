import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
const javascripts = [];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-individual',
    templateUrl: './individual.component.html',
    styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    info: any = {};

    searchModelList: any = [];
    resultList: any = [];

    @ViewChild('aiModelModal') aiModelModal;
    @ViewChild('segmentModal') segmentModal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
    ) {
        window.IndividualComponent = this;
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
            // window.IndividualComponent.loadScript();
        });
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    search() {
        this.resultList = [];
        const list: any = [];
        this.searchModelList.forEach(data => {
            list.push({ MODEL_ID: data.id, MODEL_NM: data.text, AI_ID: data.parent });
        });
        if (list.length === 0) {
            swal.fire('조회할 모델을 선택하십시오.', '', 'warning');
            return;
        } else if (!this.info.USER_ID) {
            swal.fire('User Id를 입력하십시오.', '', 'warning');
            return;
        } else {
            const bodyParam = {
                info: this.info,
                list,
            };

            this.apigatewayService
                .doPost('simulation/individual/selectList', bodyParam, null)
                .subscribe(
                    resultData => {
                        if (201 === resultData.code) {
                            // swal.fire('완료', '', 'warning');
                            const list = resultData.data.list;
                            list.forEach(x => {
                                if (x.RESULT_JSON) {
                                    try {
                                        const data = this.cf.StrToObj(x.RESULT_JSON);
                                        this.resultList.push({
                                            MODEL_ID: x.MODEL_ID,
                                            RESULT_JSON: data,
                                        });
                                    } catch (e) {}
                                }
                            });
                            this.logger.debug('##############resultList', this.resultList);
                        } else if (resultData.msg) {
                            // swal.fire(resultData.msg, '', 'warning');
                        } else {
                            swal.fire('실패', '', 'warning');
                        }
                    },
                    error => {
                        this.logger.debug(JSON.stringify(error, null, 4));
                        swal.fire('저장실패', '', 'error');
                    }
                );
        }
    }

    // getDataList(algId) {
    //     return this.resultList.filter(x => x.ALG_ID === algId);
    // }
    evtBtnDeleteClick() {
        this.logger.debug('##############searchModelList', this.searchModelList);
        const self = this;
        let cnt: any = 0;
        $('[id^=check]').each(function () {
            if (this.checked) {
                const id = this.value;
                self.searchModelList = self.searchModelList.filter(x => x.id !== id);
                cnt++;
            }
        });
        if (cnt === 0) {
            swal.fire('삭제할 모델을 선택하십시오.', '', 'warning');
        }
    }

    openAiModelModal() {
        const modalRef = this.aiModelModal.open();
        modalRef.result.then(
            result => {
                // this.logger.debug('openAiModelModal modal result:', result);
                this.searchModelList = result;
                if (this.info.USER_ID) {
                    this.search();
                }
            },
            reason => {}
        );
    }

    // openSegmentModal() {
    //     const modalRef = this.segmentModal.open();
    //     modalRef.result.then(
    //         result => {
    //             // console.log('modal result:', result);

    //             this.SEG_ID = result.SEG_ID;
    //             this.SEG_NM = result.SEG_NM;
    //         },
    //         reason => {}
    //     );
    // }
}
