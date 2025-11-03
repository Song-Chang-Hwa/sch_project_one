import { Component,  OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApigatewayService, CommFunction, LoggerService } from '../../../shared/services';
declare var $: any;

declare let common: any;

@Component({
    selector: 'app-common',
    templateUrl: './common.component.html',
    styleUrls: ['./common.component.scss'],
})
export class CommonComponent implements OnInit, OnDestroy {
    loadAPI: Promise<any>;
    pushRightClass = 'push-right';
    navigationSubscription: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cf: CommFunction,
        private apigatewayService: ApigatewayService
    ) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    ngOnInit() {}

    initialiseInvites() {
        this.insertLog();
            setTimeout(() => {
                $('#processEndAppClick').click();
            });
    }

    insertLog() {
        const body = { url: this.cf.urlInfo('full') };
        const serviceUrl = 'comm/insertCommonLog';
        this.apigatewayService.doPostPromise(serviceUrl, body, null).then(
            (result: any) => {},
            error => {
                console.log(JSON.stringify(error, null, 4));
            }
        );
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

}

