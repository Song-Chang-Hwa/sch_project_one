import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { ApigatewayService, CommFunction, LoggerService, CommService } from '../../../../shared/services';
import { PageComponent } from '../../../components/page/page.component';

const javascripts = [
    './assets/resources/belltechsoft/advisortypedefinition/advisortypedefinition.js',
    './assets/resources/js/scripts.js',
];

// import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;
declare let window: any;

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TrainingComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;
    
    pager: any = '';
    rsvSuccess: any = {};
    PAGESIZE = 10; // 총 데이터 건수
    Info: any;

    processStatusCdList: any = [];

    /*calendar*/
    calendar: any;
    calendarEl: any;
    containerEl: any;
    calendarLoding: any = 'N'; // 한번 로딩된 달력은 로딩 하지 않는다.
    resourcesData: any;
    calendarData: any;

    tmpsaveData: any;
    /*calendar*/

    /*CUSTTABLE*/
    @ViewChild('page1') page1: PageComponent;
    OCRTABLETOTCNT = 0;
    CUST_NM: any = '';
    CUST_FOUR_DIGIT_TEL_NO: any = '';
    BRTH_YMD: any = '';

    @ViewChild('page2') page2: PageComponent;
    Type1DetailHeader: any = [];
    Type1DetailHeaderCnt: any = 0;
    OCRDETAILTABLETOTCNT = 0;

    @ViewChild('page3') page3: PageComponent;
    OCRTEXTTABLETOTCNT = 0;
    averageScore = "";
    trainingScore = "";
    trainingTargetCnt = "";     
    ocrDocTextPageNo: any = 0;

    PRJ_ID: any = '';
    DOC_SN: any = '';
    PAGE_SN: any = '';
    PDF_FILE_NM: any = '';
    SEARCH_PDF_FILE_NM: any = '';
    rsvdtlTableNewData: any = [];

    uploadFileList1: any = [];
    uploadFileList2: any = [];

    selectseq: any = '';
    selecttxt: any = '';
    searchtxt: any = '';
    searchStatCd: any = '';
    searchCondCd: any = '';
    searchBusinessNm: any = '';
    
    OcrDocMstData: any[];
    OcrDocDetailData: any[];
    OcrDocTextData: any[];

    prjId: any = '';
    tblSno: any = '';
    pgSn: any = '';
    apiUrl: any = '';
    
	textTrainingYnAll: any = false;
    
    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
		this.apiUrl = apigatewayService.apiUrl;
        window.training = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }

    initialiseInvites() {
        const pageNo = this.cf.nvl(this.cf.getParam('page'), '1');
        const page_target = this.cf.nvl(this.cf.getParam('page_target'), 'page1');

        console.log('initialiseInvites pageNo : ' + pageNo + ', page_target : ' + page_target);

        if (page_target == 'page1') {
            this.onSearchOcrDocMstList(pageNo);
        } else if (page_target == 'page2') {
            this.onSelectOcrDocDetailPaging(pageNo);
        } else if (page_target == 'page3') {
            this.onSelectOcrDocTextPaging(pageNo);
        }
    }

    ngOnInit() {
        this.cs.getCodelist('PROCESS_STATUS').then(data => {
            this.processStatusCdList = data; // data;
        });
        this.onSearchOcrDocMstList('1');
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    onSearchOcrDocMstList(pageNo: any) {
        console.log('onSearchOcrDocMstList pageNo : ' + pageNo);
        
        this.DOC_SN = '';

        const serviceUrl = 'training/selectOcrDocMstList';
        this.params = this.cf.toHttpParams({
            FILE_NM: this.searchtxt,
            STAT_CD: this.searchStatCd,
            BUSINESS_NM: this.searchBusinessNm,
            pageNo: pageNo == '0' ? '1' : pageNo,
            PAGESIZE: 10,
        });

        this.OcrDocMstData = undefined;
        this.OcrDocDetailData = undefined;
        this.OcrDocTextData = undefined;
        if (pageNo == '0') this.OCRTABLETOTCNT = 0;
        this.OCRDETAILTABLETOTCNT = 0;
        this.OCRTEXTTABLETOTCNT = 0;
        this.averageScore = "";
    	this.trainingScore = "";
    	this.trainingTargetCnt = "";    
    	this.searchCondCd = "";     
        // this.OCRDETAILIMGTOTCNT = 0;

        this.prjId = '';
        this.tblSno = '';
        this.pgSn = '';

        if (pageNo == '0') this.onResetPage1();
        this.onResetPage2();
        this.onResetPage3();

        // this.spinner.show();

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                console.log(resultData);
                if (resultData.code === 200) {
                    this.OcrDocMstData = resultData.data;
                    
                    this.OCRTABLETOTCNT = resultData.dataCount;
                    this.page1.setInitPageLoad(
                        'page',
                        resultData.dataCount,
                        pageNo,
                        'training',
                        { target: 'page1' },
                        10 // this.PAGESIZE
                    );                    
                }

                // this.spinner.hide();
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
                // this.spinner.hide();
            }
        );
    }

    onSelectOcrDocDetail(prjId: any, docNo: any) {
        this.PRJ_ID = prjId;
        this.DOC_SN = docNo;
        this.onSelectOcrDocDetailPaging('0');
    }

    onSelectOcrDocDetailPaging(pageNo: any) {
        const serviceUrl = 'training/selectOcrDocDetailList';
        this.ocrDocTextPageNo = pageNo == '0' ? '1' : pageNo;
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            pageNo: pageNo == '0' ? '1' : pageNo,
            // PAGESIZE: 10,
            PAGESIZE: 1,
        });

        this.OcrDocDetailData = undefined;
        this.OcrDocTextData = undefined;
        
        if (pageNo == '0') this.OCRDETAILTABLETOTCNT = 0;
        this.OCRTEXTTABLETOTCNT = 0;
        this.averageScore = "";
    	this.trainingScore = "";
    	this.trainingTargetCnt = "";         
    	this.searchCondCd = "";

        this.pgSn = '';

        if (pageNo == '0') this.onResetPage2();
        this.onResetPage3();

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                console.log(resultData);
                if (resultData.code === 200) {
                    this.OcrDocDetailData = resultData.data;
                    
                    if (resultData.data.length > 0) {
						this.PAGE_SN = resultData.data[0].PAGE_SN;
						
                        this.OCRDETAILTABLETOTCNT = resultData.dataCount;
                        this.page2.setInitPageLoad(
                            'page',
                            resultData.dataCount,
                            pageNo,
                            'training',
                            { target: 'page2' },
                            1 // this.PAGESIZE
                        );

                        this.onSelectOcrDocTextPaging('0');
                    } else{
                        this.onResetPage2();
                        //$('#ocrDocDetail').html('<div class="search_result"><h4>등록된 정보가 없습니다.</h4></div>');
                    }
                }

                
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    getAverageScore(){
        const serviceUrl = 'training/selectOcrDocTextAverageScore';
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            PAGE_SN: this.PAGE_SN
        });

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                console.log(resultData);
                if (resultData.code === 200) {
                    this.averageScore = resultData.data.AVERAGE_SCORE;
                    if(resultData.data.TRAINING_TARGET_CNT > 0) {
	                    this.trainingScore = resultData.data.TRAINING_SCORE;
	                    this.trainingTargetCnt = resultData.data.TRAINING_TARGET_CNT;   
					}
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    onSelectOcrDocTextPaging(pageNo: any) {
        const serviceUrl = 'training/selectOcrDocTextList';
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            PAGE_SN: this.PAGE_SN,
            COND_CD: this.searchCondCd,
            pageNo: pageNo == '0' ? '1' : pageNo,
            // PAGESIZE: 10,
            PAGESIZE: 10,
        });

        this.OcrDocTextData = undefined;
        
        if (pageNo == '0') this.OCRTEXTTABLETOTCNT = 0;

        if (pageNo == '0') this.onResetPage3();

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {

                console.log(resultData);
                if (resultData.code === 200) {
                    this.OcrDocTextData = resultData.data;

                    if (resultData.data.length > 0) {

                        this.OCRTEXTTABLETOTCNT = resultData.dataCount;
                        this.page3.setInitPageLoad(
                            'page',
                            resultData.dataCount,
                            pageNo,
                            'training',
                            { target: 'page3' },
                            10 // this.PAGESIZE
                        );
                    }
                    
					this.getAverageScore();     
					
					this.textTrainingYnAll = false;               
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    onResetPage1() {
        this.OCRTABLETOTCNT = 0;
        if (this.page1) {
            this.page1.setInitPageLoad(
                'page',
                0,
                1,
                'training',
                { target: 'page1' },
                10 // this.PAGESIZE
            );
        }
    }

    onResetPage2() {
        this.OCRDETAILTABLETOTCNT = 0;
        if (this.page2) {
            this.page2.setInitPageLoad(
                'page',
                0,
                1,
                'training',
                { target: 'page2' },
                1 // this.PAGESIZE
            );
        }
    }

    onResetPage3() {
        this.OCRTEXTTABLETOTCNT = 0;
        this.averageScore = "";
    	this.trainingScore = "";
    	this.trainingTargetCnt = ""; 
        if (this.page3) {
            this.ocrDocTextPageNo = 1;
            this.page3.setInitPageLoad(
                'page',
                0,
                1,
                'training',
                { target: 'page3' },
                10 // this.PAGESIZE
            );
        }
    }

    onSaveOcrDocText() {
                	
		let ocrDocTextUpdateData = [];
        this.OcrDocTextData.forEach(data => {
			if(data.ORG_TEXT_TRAINING_YN != data.TEXT_TRAINING_YN) {
				ocrDocTextUpdateData.push(data);
			}
		});
		      
        if (ocrDocTextUpdateData.length === 0) {
            swal.fire('변경된 내역이 없습니다.', '', 'warning');
            return;
        }
        		        	
        swal.fire({
            title: '학습 저장하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
        	
                this.apigatewayService
                    .doPost('training/updateOcrDocText', ocrDocTextUpdateData, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 201) {
                                swal.fire('실행하였습니다.', '', 'success').then(result => {
                                    this.onSelectOcrDocTextPaging(this.ocrDocTextPageNo);
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'info').then(result => {
                                    this.onSelectOcrDocTextPaging(this.ocrDocTextPageNo);
                                });
                            }
                            
                            this.textTrainingYnAll = false;
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('실행 실패하였습니다.<br>관리자에게 문의하여 주세요.', '', 'error');
                        }
                    );
            } // confirm yes
        });	
	}

	changeTextTrainingYnAll() {
		
        this.OcrDocTextData.forEach(data => {
			data.TEXT_TRAINING_YN = this.textTrainingYnAll;
		});
	}
}
