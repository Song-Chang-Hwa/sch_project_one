import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { CommFunction } from '../../services';
import { API_ACCESS_TOKEN, API_URL_TOKEN } from '../../token';
declare let window: any;
declare var $: any;
@Injectable()
export class CommProcess {
    constructor(
        @Inject(API_ACCESS_TOKEN) public access: { inValue: string; outValue: string },
        @Inject(API_URL_TOKEN) public apiUrl: string,
        @Inject(DOCUMENT) private document: Document
    ) {
        window.CommProcess = this;
    }

    process_init() {
        sessionStorage.setItem('loading', '0');
        sessionStorage.setItem('processloading', '0');
        sessionStorage.setItem('totprocessloading', '0');
    }

    porcess_start(gbn: String) {
        if (Number(sessionStorage.getItem('loading')) > 0) {
            // if a is negative,undefined,null,empty value then...
            sessionStorage.setItem(
                'loading',
                String(Number(sessionStorage.getItem('loading')) + 1)
            );
            sessionStorage.setItem(
                'totprocessloading',
                String(Number(sessionStorage.getItem('totprocessloading')) + 1)
            );
        } else {
            sessionStorage.setItem('loading', '1');
            sessionStorage.setItem('totprocessloading', '1');
        }

        if (sessionStorage.getItem('loading') === '1') {
            setTimeout(function () {
                window.CommProcess.porcess_show(gbn);
            }, 0);
        }
        //  $('.processdText').text('※ ' + localStorage.getItem('processloading') + '/' + localStorage.getItem('totprocessloading') + ' 처리중입니다.' );
    }

    porcess_success(gbn: String) {
        if (Number(sessionStorage.getItem('loading')) > 0) {
            // if a is negative,undefined,null,empty value then...
            sessionStorage.setItem(
                'loading',
                String(Number(sessionStorage.getItem('loading')) - 1)
            );
            sessionStorage.setItem(
                'processloading',
                String(Number(sessionStorage.getItem('processloading')) + 1)
            );
        }

        if (sessionStorage.getItem('loading') === '0') {
            setTimeout(function () {
                window.CommProcess.porcess_hide(gbn);
            }, 0);
            sessionStorage.setItem('processloading', '0');
            sessionStorage.setItem('totprocessloading', '0');

            setTimeout(() => {
                $('#processEndAppClick').click();
            });
        }
        // $('.processdText').text('※ ' + localStorage.getItem('processloading') + '/' + localStorage.getItem('totprocessloading') + ' 처리중입니다.');
    }

    process_error(gbn: String, error: Response) {
        // this.onLoggedout();
        this.process_init();
        window.CommProcess.porcess_hide(gbn);
    }

    porcess_show(gbn) {
        setTimeout(() => {
            $('.data-load').show();
        });
        /*
	let popynurl = window.location.href.indexOf('popyn') > 0 ? 'Y' : window.location.href.indexOf('popup') > 0 ? 'Y' : 'N' ;
    let maskDiv = '<div id=\"processdDiv\"><div class=\"processdText\">'+
    '<img width=\"244px\" height=\"155px\" src=\"../../../assets/resources/belltechsoft/images/processbar/process6.gif\"></img>'+
    '</div></div>';
	$(maskDiv).appendTo('.process').fadeIn('fast');
	*/
        /*if('N' == popynurl){
		if (gbn=='doGet') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
		} else if (gbn=='doPost') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
		} else if (gbn=='doPut') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
		} else if (gbn=='doDelete') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
		} else if (gbn=='DownloadFiles') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
		} else if (gbn=='doPostuploadFiles') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
        } else if (gbn=='doGetFileDown') {
			var maskDiv = "<di id=\"processdDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.contentRight').fadeIn("fast");
        }


	} else if('Y' == popynurl){
		if (gbn=='doGet') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
		} else if (gbn=='doPost') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
		} else if (gbn=='doPut') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
		} else if (gbn=='doDelete') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
		} else if (gbn=='DownloadFiles') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
		} else if (gbn=='doPostuploadFiles') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
        } else if (gbn=='doGetFileDown') {
			var maskDiv = "<div id=\"processdpopDiv\"><div class=\"processdText\">※ 처리중입니다</div></div>";
			$(maskDiv).appendTo('.popwrap').fadeIn("fast");
        }
	}*/
    }

    porcess_hide(gbn) {
        setTimeout(() => {
            $('.data-load').fadeOut();
        }, 400);
        /*
	let popynurl = window.location.href.indexOf('popyn') > 0 ? 'Y' : window.location.href.indexOf('popup') > 0 ? 'Y' : 'N' ;
	$('#processdDiv').remove();

	*/
        /*
	if('N' == popynurl){
		if (gbn=='doGet') {
			$('#processdDiv').remove();
		} else if (gbn=='doPost') {
			$('#processdDiv').remove();
		} else if (gbn=='doPut') {
			$('#processdDiv').remove();
		} else if (gbn=='doDelete') {
			$('#processdDiv').remove();
		} else if (gbn=='DownloadFiles') {

		} else if (gbn=='doPostuploadFiles') {

		} else if (gbn=='doGetFileDown') {
			$('#processdDiv').remove();
        }
	} else 	if('Y' == popynurl){
		if (gbn=='doGet') {
			$('#processdpopDiv').remove();
		} else if (gbn=='doPost') {
			$('#processdpopDiv').remove();
		} else if (gbn=='doPut') {
			$('#processdpopDiv').remove();
		} else if (gbn=='doDelete') {
			$('#processdpopDiv').remove();
		} else if (gbn=='DownloadFiles') {

		} else if (gbn=='doPostuploadFiles') {

		} else if (gbn=='doGetFileDown') {
			$('#processdpopDiv').remove();
        }
	}*/
    }

    /*log out*/
    onLoggedout() {
        localStorage.removeItem('isLoggedin'); //
        localStorage.removeItem('EMAIL_ADR'); //
        localStorage.removeItem('MBR_NO'); //
        localStorage.removeItem(this.access.inValue);
        window.location.href = './#/login';
    }
}

