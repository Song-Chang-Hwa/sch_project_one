import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { ApigatewayService, CommFunction, LoggerService } from '../shared/services';

// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;

    tmrRsvStatus: any = {};
    rsvChgReq: any = {};
    rsvList: any = {};
    PAGESIZE = 5; // 총 데이터 건수
    RSV_DAY: any = this.cf.toDateAddDay(1);

    rsvCheReqCnt = this.cf.nvl(this.cf.getParam('rsvCheReqCnt'), '0');
    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
    ) {
        window.Alert = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {
        this.rsvCheReqCnt = this.cf.getParam('rsvCheReqCnt');
    }

    ngOnInit() {}

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    routeLink(url: any, param: any = {}) {
        window.opener.window.Main.hreflink('root');
        window.close();
    }
}
