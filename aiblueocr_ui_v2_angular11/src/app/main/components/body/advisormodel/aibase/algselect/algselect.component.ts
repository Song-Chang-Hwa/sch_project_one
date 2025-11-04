import { HttpParams } from '@angular/common/http';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import {
    AfterContentInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { LoggerService } from '../../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';

const javascripts = [
];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

export enum PackInfoViewMode {
    new = 0,
    selected = 1,
}

@Component({
    selector: 'app-algselect',
    templateUrl: './algselect.component.html',
    styleUrls: ['./algselect.component.scss'],
})
export class AlgSelectComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    _SEG_ID: any;

    aiTypeList: any = [];
    dataList: any = [];
    ALG_ID_LIST: any = [];

    @Input() _AI_MSTR: any;
    @Output() selected = new EventEmitter<any>();

    @ViewChild('aiAlgParameterModal') aiAlgParameterModal;

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.AlgSelectComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                // this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {}

    ngOnInit() {
        
        // console.log('============== ngOnInit ==============');
        // 차트 데모 로드
        setTimeout(() => {
            // window.AlgSelectComponent.loadScript();
        });

        this.cs.getCodelist('MODEL_TYPE').then(data => {
            this.aiTypeList = data; // data;
        });

        this.ALG_ID_LIST = this._AI_MSTR.ALG_ID;
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this.search();
    }

    search() {
        if (!this._SEG_ID) {
            // swal.fire('세그먼트를 선택하십시오.', '', 'warning');
            // return;
        }

        this.dataList = [];

        // 트리에서 선택한 추천팩아이디
        this.params = this.cf.toHttpParams({});

        const serviceUrl = 'entity/aialgmstr/selectList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    resultData.data.list.forEach(item => {
                        const map = item;
                        map.CHECK = false;
                        for (let i = 0; i < this.ALG_ID_LIST.length; i++) {
                            if (item.ALG_ID === Number(this.ALG_ID_LIST[i].ALG_ID)) {
                                map.CHECK = true;
                                break;
                            }
                        }
                        this.dataList.push(map);
                    });
                    // console.log('search###this.ALG_ID_LIST########dataList##', this.ALG_ID_LIST, this.dataList);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // getCheck(id) {
    //     console.log('getCheck########1##############', id);
    //     if (this.ALG_ID_LIST && this.ALG_ID_LIST.length > 0) {
    //         this.ALG_ID_LIST.forEach(item => {
    //             if (item.ALG_ID === id) {
    //                 console.log('getCheck######## 2 ############ true ##', id);
    //                 return true;
    //             }
    //         });
    //     }
    //     console.log('getCheck######## 3 ############ false ##', id);

    //     return false;
    // }

    evtBtnSaveClick() {
        const chklist: any = [];
        $('[id^=algorithmCheck]').each(function () {
            if (this.checked)
                chklist.push({
                    ALG_ID: this.value,
                    ALG_NM: $(this).parents().children('label').text(),
                });
        });
        if (chklist.length === 0) {
            swal.fire('알고리즘을 선택하십시오.', '', 'warning');
            return;
        }
        // swal.fire({
        //     title: '[' + chklist.length + ' 건] 모델을 생성하시겠습니까?',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: '예',
        //     cancelButtonText: '아니요',
        // }).then(result => {
        //     // confirm yes
        //     if (result.value) {
        const info = {
            index: 4,
            algidlist: chklist,
        };
        this.selected.emit(info);
        swal.fire('설정하였습니다.', '', 'success');
        //     } // confirm yes
        // });
        // console.log('evtBtnSaveClick####################', chklist);
    }

    check(e) {
        // console.log('check:::::::', e.target.id, e.target.checked);
        // const check = e.target.checked;
        // const id = e.target.id;
        // if (!check) return;
        // $('[id^=algorithmCheck]').each(function () {
        //    console.log(this.id);
        //    if (this.id !== id) this.checked = false; // checked 처리
        // });
    }

    openAiAlgParameterModal(MODEL_TYPE, ALG_ID) {
        // console.log('openAiAlgParameterModal::::1:::', MODEL_TYPE, ALG_ID);
        const modalRef = this.aiAlgParameterModal.open(MODEL_TYPE, ALG_ID);
        modalRef.result.then(
            result => {
                //    console.log('openAiAlgParameterModal::::2:ALG_ID:checked:', result, $('#algorithmCheck'+result).is(':checked'));
                //    $('#algorithmCheck'+result).checked = true;
                $('#algorithmCheck' + result).each(function () {
                    this.checked = true;
                });
            },
            reason => {}
        );
    }
}
