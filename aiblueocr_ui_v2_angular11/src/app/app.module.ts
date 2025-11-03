import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

// import { ComModule } from './com/com.module';

import { LogLevel, LoggerService, ApigatewayService } from './shared/services';
import { LOG_LEVEL_TOKEN, REMOTE_URL_TOKEN, API_URL_TOKEN, API_URL_TOKEN1, API_URL_TOKEN2, API_ROOT_TOKEN, API_ACCESS_TOKEN, LOG_DEBUG_LEVEL_TOKEN, USER_FOLDER_CURRENT_SNO_TOKEN } from './shared/token';
import { CommFunction, CommProcess, CommService } from './shared/services';

import {environment} from '../environments/environment';

const Server = {
    local: [
              {provide: API_URL_TOKEN, useValue: 'http://127.0.0.1:8080/ai_blue_ocr_server'} //  기 본 was
            , {provide: API_URL_TOKEN1, useValue: 'http://127.0.0.1:8080/ai_blue_ocr_server'} //  기 본 was1
            , {provide: API_URL_TOKEN2, useValue: 'http://127.0.0.1:8080/ai_blue_ocr_server'} //  기 본 was2
            , {provide: REMOTE_URL_TOKEN, useValue: 'http://127.0.0.1:4100'} //  사용자  ui
            , {provide: API_ROOT_TOKEN, useValue: 'http://127.0.0.1:4100'}
    ],
    dev: [
              {provide: API_URL_TOKEN, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was
            , {provide: API_URL_TOKEN1, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was1
            , {provide: API_URL_TOKEN2, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was2
            , {provide: REMOTE_URL_TOKEN, useValue: 'http://211.217.67.74:13080'} //  사용자  ui
            , {provide: API_ROOT_TOKEN, useValue: 'http://211.217.67.74:13080'}
        ]
    ,
    real: [
              {provide: API_URL_TOKEN, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was
            , {provide: API_URL_TOKEN1, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was1
            , {provide: API_URL_TOKEN2, useValue: 'http://211.217.67.74:13080/ai_blue_ocr_server'} //  기 본 was2
            , {provide: REMOTE_URL_TOKEN, useValue: 'http://211.217.67.74:13080'} //  사용자  ui
            , {provide: API_ROOT_TOKEN, useValue: 'http://211.217.67.74:13080'}
        ]
    }

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, ApigatewayService, LoggerService, CommProcess, {provide: LOG_LEVEL_TOKEN, useValue: LogLevel.DEBUG}
             /*
               local node js : Server.local
               dev node js : Server.dev
               real node js : Server.real
             */
            , environment.production === true ? Server.real : Server.local 
            , {provide: API_ACCESS_TOKEN, useValue: { inValue : 'membToken' , outValue : 'X-Auth-Token'}}
            // 디버그 래벨  0 : 접속성공 / 1:접 속 성 공 +데 이 터
            , {provide: LOG_DEBUG_LEVEL_TOKEN, useValue: 1}
            , {provide: USER_FOLDER_CURRENT_SNO_TOKEN, useValue: '100000'} // 사용자 폴더 시작값 USER_FOLDER_CURRENT_SNO + 1
            , CommFunction, CommService],
    bootstrap: [AppComponent]
})
export class AppModule {}
