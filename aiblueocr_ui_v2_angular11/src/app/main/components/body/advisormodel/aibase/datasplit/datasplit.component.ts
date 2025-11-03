import { HttpParams } from '@angular/common/http';
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
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../../shared/services';
import { CommFunction, CommService } from '../../../../../../shared/services';
import { ApigatewayService } from '../../../../../../shared/services/apigateway/apigateway.service';

const javascripts = [
    // './assets/resources/belltechsoft/advisormodel/advisormodel.js',
    // './assets/resources/js/scripts.js',
    './assets/resources/js/lib/rangeSliderCustom.js',
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
    selector: 'app-datasplit',
    templateUrl: './datasplit.component.html',
    styleUrls: ['./datasplit.component.scss'],
})
export class DataSplitComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    codelist: any = [
        { SPLIT_GUBUN: 'A', MIN: 2, MAX: 98 },
        { SPLIT_GUBUN: 'B', MIN: 2, MAX: 50 },
    ];

    SPLIT_GUBUN: any = this.codelist[0].SPLIT_GUBUN;
    TRAIN_SPLIT: any = '';

    @Input() _AI_MSTR: any;
    @Output() selected = new EventEmitter<any>();

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.DataSplitComponent = this;
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
            window.DataSplitComponent.loadScript();
        });
    }

    ngAfterViewInit(): void {
        this.tab(this.SPLIT_GUBUN, 0);
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

    tab(code, idx) {
        this.SPLIT_GUBUN = code;
        // const rangeObjValue = $('#rangeTRAIN_SPLIT' + code).val();
        const objValue = $('#TRAIN_SPLIT' + code).val();
        const list = this._AI_MSTR.DATA_SPLIT.filter(x => x.SPLIT_GUBUN === code);
        if (list.length > 0) {
            // console.log('tab########list#rangeObjValue##objValue##', list[0], objValue);
            if (!objValue) {
                // 입력값이 없을때 설정값
                // console.log(
                //     'tab########list[0].TRAIN_SPLITe##objValue##',
                //     list[0].TRAIN_SPLIT,
                //     objValue
                // );
                this.setSliderValue(code, list[0].TRAIN_SPLIT);
                $('#TRAIN_SPLIT' + code).val(list[0].TRAIN_SPLIT);
            }
            this.TRAIN_SPLIT = $('#TRAIN_SPLIT' + code).val();
        } else {
            if (!objValue) {
                // this.logger.debug('tab', this.codelist[idx].MIN);
                // const interval_id = setInterval(() => {
                //     this.setSliderValue(code, this.codelist[idx].MIN);
                // }, 5);
            }
            this.TRAIN_SPLIT = objValue ? objValue : this.codelist[idx].MIN;
        }
    }

    setSliderValue(code, val) {
        try {
            const instance = $('#rangeTRAIN_SPLIT' + code).data('ionRangeSlider');
            instance.update({
                from: val, // your new value
            });
        } catch (e) {}
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    // 초기화
    initData() {}

    // 직접입력시
    onInputTrainSplit(code, event) {
        // console.log('onInputTrainSplit:::::', code);
        const val = event.target.value;
        if (val === '') return;
        // $('#rangeTRAIN_SPLIT' + code).val(val);

        // this.TRAIN_SPLIT = val;
        // $('#TRAIN_SPLIT' + code).val(val);
        this.setSliderValue(code, val);
    }
    // 클릭시
    onClickTrainSplit(code, event) {
        // console.log('onInputTrainSplit:::::', code);
        const val = event.target.value;
        // this._TRAIN_SPLIT = val;
        $('#TRAIN_SPLIT' + code).val(val);
        // this.setTrainSplitValue(code, val);
    }

    /**
     * 버튼 이벤트 처리
     */
    evtBtnSaveClick(code) {
        const val = $('#TRAIN_SPLIT' + code).val();
        const splitcode = this.codelist.filter(x => x.SPLIT_GUBUN === code);
        // console.log('evtBtnSaveClick:::::', code, val);
        // // console.log('----- evtBtnSaveClick this.changeList-----', this.changeList);
        if (val > splitcode[0].MAX || val < splitcode[0].MIN) {
            swal.fire(
                splitcode[0].MIN + '~' + splitcode[0].MAX + '사이에서 입력하십시오.',
                '',
                'warning'
            );
            return;
        }
        // swal.fire({
        //     title: '설정하시겠습니까?',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: '예',
        //     cancelButtonText: '아니요',
        // }).then(result => {
        //     // confirm yes
        //     if (result.value) {
        const info = {
            index: 3,
            SPLIT_GUBUN_CODE: this.SPLIT_GUBUN,
            datasplit: { SPLIT_GUBUN: this.SPLIT_GUBUN, TRAIN_SPLIT: val },
        };
        this.selected.emit(info);
        swal.fire('설정하였습니다.', '', 'success');
        // } // confirm yes
        //     });
    }
}
