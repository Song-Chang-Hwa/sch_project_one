import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { System } from 'typescript';

import { ApigatewayService, CommFunction, CommProcess, LoggerService } from '../shared/services';
import { API_ACCESS_TOKEN } from '../shared/token';

import { User } from './model';
import { AuthenticationService } from './services/authentication.service';

const javascripts = [''];

declare var $: any;
declare var common: any;
declare var window: any;
declare var Switchery: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    params: HttpParams;
    loading = false;
    submitted = false;
    returnUrl: string;
    testtest2: string;
    username: any;

    constructor(
        private authenticationService: AuthenticationService,
        private apigatewayService: ApigatewayService,
        private http: HttpClient,
        private logger: LoggerService,
        private cf: CommFunction,
        private cp: CommProcess,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(API_ACCESS_TOKEN) public access: { inValue: string; outValue: string }
    ) {
        window.Login = this;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            testtest: [],
        });

        setTimeout(() => {
            window.Login.loadScript();

            if (!$('body').hasClass('gray-bg01')) {
                $('body').addClass('gray-bg01');
            }
        });

        if (localStorage.getItem('isLoggedin') == 'true') {
            this.loginchk();
        }
    }

    loginchk() {
        const serviceUrl = 'api/autologoinChk';
        this.apigatewayService.doPostPromise(serviceUrl, null, null).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // this.cp.onLoggedout();
                    // alert(resultData.data.EXP_YN);
                    if (resultData.data.EXP_YN === 'N') {
                        window.location.href = './';
                    } else if (resultData.data.EXP_YN === 'Y') {
                        this.onLoggedout();
                    }
                }
            },
            error => {}
        );
    }

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

    get f() {
        return this.loginForm.controls;
    }

    onLoggedin() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        const serviceUrl = 'login';

        // this.params = this.cf.toHttpParams({
        //     username: this.f.username.value,
        //     password: this.f.password.value,
        // });
        // this.authenticationService
        //     .login(this.params)
        //     .pipe(first())
        //     .subscribe(
        // resultData => {
        this.params = this.cf.toHttpParams({
            username: this.f.username.value,
            password: this.f.password.value,
        });

        this.apigatewayService
            .doPost(serviceUrl, null, this.params)
            .pipe(first())
            .subscribe(
                resultData => {
                    if (resultData.requestCode === 10001) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('EMAIL_ADR', resultData.resultData.membInfo.EMAIL_ADR);
                        localStorage.setItem('MBR_NO', resultData.resultData.membInfo.MBR_NO);
                        localStorage.setItem(this.access.inValue, resultData.resultData.membToken);
                        // this.router.navigate(['/']);
                        this.loading = false;
                        /*pys 페이지 이동 추가 20200306*/
                        window.location.href = './';
                    } else {
                        this.loading = false;
                        alert(resultData.msg);
                        this.testtest2 = resultData.msg;
                    }
                },
                error => {
                    // alert(JSON.stringify(error,null,4));
                    this.loading = false;
                    alert(error.error.message);
                    this.logger.debug(JSON.stringify(error));
                    this.testtest2 = error.error.message;

                    // this.logger.debug(error);
                }
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
