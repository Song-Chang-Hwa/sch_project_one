import { HttpParams } from '@angular/common/http';
import { BoundText } from '@angular/compiler/src/render3/r3_ast';
import { Inject, Injectable } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';
// import swal from 'sweetalert';
/* https://sweetalert.js.org/guides/
npm install sweetalert --save
npm install --save sweetalert2
"styles": [
      "src/styles.css",
      "node_modules/sweetalert2/src/sweetalert2.scss"
    ],
        // swal.fire('Hello world!', '', 'success');
        // swal.fire({
        //     title: 'Are you sure want to remove?',
        //     text: 'You will not be able to recover this file!',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Yes, delete it!',
        //     cancelButtonText: 'No, keep it',
        // }).then(result => {
        //     if (result.value) {
        //         swal.fire('Deleted!', 'Your imaginary file has been deleted.', 'success');
        //     } else if (result.dismiss === swal.DismissReason.cancel) {
        //         swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        //     }
        // });
*/

import { CommFunction, LoggerService } from '../shared/services';
import { ApigatewayService } from '../shared/services/apigateway/apigateway.service';
import { CommProcess } from '../shared/services/commprocess';
import { API_ACCESS_TOKEN, API_URL_TOKEN } from '../shared/token';
const javascripts = ['./assets/resources/js/ui.js', './assets/resources/js/lib/loadAnimation.js'];

// const javascripts = [''];

declare var $: any;
declare var common: any;
declare var window: any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
    // [x: string]: any;

    params: HttpParams;
    navigationSubscription: any = '';

    menulist: any;
    userNm: any = this.cf.nvl(localStorage.getItem('userNm'), '');
    hsptNm: any = this.cf.nvl(localStorage.getItem('hsptNm'), '');
    EMAIL_ADR: any = this.cf.nvl(localStorage.getItem('EMAIL_ADR'), '');

    USER_NM: any = '';
    alarm1: any = 60;
    alarm2: any = 60;
    RSV_DAY: any = this.cf.toDateAddDay(0);
    win: any;

    popyn = 'N';
    // counter2: any = 2;

    constructor(
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private router: Router,
        private route: ActivatedRoute,
        private cf: CommFunction,
        private cp: CommProcess,
        @Inject(API_ACCESS_TOKEN) public access: { inValue: string; outValue: string }
    ) {
        window.Main = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {
        setTimeout(() => {
            common.dateStart();
            // $('.modal').appendTo('body');

            if ($('body').hasClass('gray-bg01')) {
                $('body').removeClass('gray-bg01');
            }
        });
        this.popyn = this.cf.nvl(this.cf.getParam('popyn'), 'N');
        this.cp.process_init();
    }

    // 상단 메뉴 링크
    routerlink(actionUrl: any) {
        if (this.cf.nvl(actionUrl, '') !== '') {
            this.cf.routeLink(actionUrl, {});
        }
        common.removeMobileNav();
    }

    mobileLogOut() {
        common.removeMobileNav();
    }

    ngOnInit() {
        window.Main.menuDb();
        this.USER_NM = localStorage.getItem('EMAIL_ADR');
        setTimeout(() => {
            window.Main.loadScript();
        });
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
    menuDb() {
        // const serviceUrl = 'api/getMenuList';
        // this.params = this.cf.toHttpParams({});
        // this.apigatewayService
        //     .doGetPromise(serviceUrl, this.params)
        //     .then(
        //         dbDataSet => {
        //             const result: any = dbDataSet;
        //             this.menulist = result.data;
        //         },
        //         error => {}
        //     )
        //     .then(() => {
        //         setTimeout(function () {
        //             // nav_ui.init();
        //         }, 1);
        //     });
    }

    // 새폴더 트리 추가, 저장
    onLoggedout() {
        const serviceUrl = 'api/logout';
        this.apigatewayService.doPostPromise(serviceUrl, null, null).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.cp.onLoggedout();
                }
            },
            error => {}
        );
    }

    /*공통 스크립트 로드*/
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
}
