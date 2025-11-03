import { Component,  OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApigatewayService, CommFunction, LoggerService, PagerService } from '../../../shared/services';

declare var $: any;

declare let common: any;

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
    private navigationSubscription: any;

    pager: any = '';
    PAGESIZE = 10; // 총 데이터 건수
    routelinkurl: any = 'rsvinfo';
    paramJSON: any = {};
    pageId: any = {};
    paramJSONPreAddpageIdYn: any = 'N';
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cf: CommFunction,
        private pagerService: PagerService,
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

    ngOnInit() {
        this.pager = this.pagerService.getPager(null, 1); // 페이징초기화
    }


    setInitPageLoad(
        pageId: any = '', // 페이지 아이디
        totcount: any, // 전체 데이터 건수
        currentPage: any, // 현재 페이지 주소 index
        routelinkurl: any, // 이동 라우터 주소
        paramJSON: any = {}, // 파라메타 {pageId + paramJSON(KEY) : paramJSON(VALUE)}
        PAGESIZE: any = 10, // 한페이지에 출력 할 글 갯수
        paramJSONPreAddpageIdYn: any = 'N'
    ) {
        this.PAGESIZE = PAGESIZE;
        this.routelinkurl = routelinkurl;
        this.pageId = pageId;
        this.paramJSONPreAddpageIdYn = paramJSONPreAddpageIdYn;

        Object.keys(paramJSON).forEach(k => {
            let new_k = pageId + '_' + k;
            this.paramJSON[new_k] = paramJSON[k];
            // console.log('키값 : '+k + ', 데이터값 : ' + paramJSON[k]);
        });

        // this.paramJSON = paramJSON;
        this.pager = this.pagerService.getPager(totcount, Number(currentPage), this.PAGESIZE);
    }

    initialiseInvites() {}

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    setPage(page: number) {
        if (page === 0 || page === this.pager.totalPages + 1) {
            return false;
        }

        let pageno : any = {};
        pageno[this.pageId] = page; // 현재 페이지 주소 파리메타

        // console.log(this.cf.urlInfoParamJSON(this.cf.urlInfo('param')));
        /* 현재 페이지 주소 파리메타 + 기존 파라메타 + 이동시 파라메타 추가 */
        if( this.paramJSONPreAddpageIdYn ==='Y'){

        this.cf.urlInfoParamJSON(this.cf.urlInfo('param'));
        }
        const param = $.extend(this.cf.urlInfoParamJSON(this.cf.urlInfo('param')),pageno, this.paramJSON);

        this.cf.routeLink(this.routelinkurl, param);
    }
    setInitPage() {
        const page = this.cf.nvl(this.cf.getParam(this.pageId), '1');
        return Number(page);
    }

}

