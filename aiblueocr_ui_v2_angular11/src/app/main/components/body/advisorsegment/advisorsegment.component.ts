import { HttpParams } from '@angular/common/http';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { ConsoleReporter } from 'jasmine';
// import { first } from 'rxjs/operators';

import { LoggerService } from '../../../../shared/services';
import { CommFunction } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../components/page/page.component';

const javascripts = [
    // './assets/resources/belltechsoft/advisortypedefinition/advisortypedefinition.js',
    './assets/resources/js/scripts.js',
];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;
declare function initSwiper();

@Component({
    selector: 'app-advisorsegment',
    templateUrl: './advisorsegment.component.html',
    styleUrls: ['./advisorsegment.component.scss'],
})
export class AdvisorSegmentComponent implements OnInit, OnDestroy, AfterViewInit {
    navigationSubscription: any;
    params: HttpParams;

    menuId: any = 'SEG_ANAL';

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
    ) {
        window.AdvisorSegmentComponent = this;
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
            window.AdvisorSegmentComponent.loadScript();
        });
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        initSwiper();
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

    main(menuId) {
        // console.log('main:::::::menuId::::::::', menuId);
        this.menuId = menuId;
    }

    goMain(menuId: any) {
        this.menuId = menuId;
        switch (this.menuId) {
            case 'SEG_DEF':
                $('#step2 a').click();
        }
    }
}
