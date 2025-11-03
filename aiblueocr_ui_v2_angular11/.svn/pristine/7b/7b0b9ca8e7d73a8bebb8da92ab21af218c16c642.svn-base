import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { LoggerService } from '../../shared/services';
import { API_URL_TOKEN } from '../../shared/token/app.tokens';

@Injectable()
export class AuthenticationService {
    params: HttpParams;
    constructor(
        private logger: LoggerService,
        private http: HttpClient,
        @Inject(API_URL_TOKEN) public apiUrl: string
    ) {}
    // let URL = this.apiUrl + '/login';

    /*
     * JSON to HttpParams 변형
     */
    /*toHttpParams(obj: Object): HttpParams {
    return Object.getOwnPropertyNames(obj)
        .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
    }*/
    login(params) {
        const serviceUrl = this.apiUrl + '/login';
        this.logger.debug('connect serviceUrl :' + serviceUrl);
        return this.http.post<any>(serviceUrl, params).pipe(
            map(data => {
                this.logger.debug('data: ', data);
                return data;
            })
        );
    }
}
