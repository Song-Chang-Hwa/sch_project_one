import { HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { max, min } from 'date-fns';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

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
    selector: 'app-recognition',
    templateUrl: './recognition.component.html',
    styleUrls: ['./recognition.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RecognitionComponent implements OnInit, OnDestroy {
    navigationSubscription: any;
    params: HttpParams;
    
    testImg: any;

    @ViewChild('fileUpload1') fileUpload1: ElementRef;
    @ViewChild('fileUpload2') fileUpload2: ElementRef;

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
    ocrDocTextPageNo: any = 0;

    PRJ_ID: any = '';
    DOC_SN: any = '';
    PAGE_SN: any = '';
    PDF_FILE_NM: any = '';
    SEARCH_PDF_FILE_NM: any = '';
    rsvdtlTableNewData: any = [];

    tmppage1No: any = '';
    tmppage2No: any = '';
    nowDateTime: any = '';

    uploadFileList1: any = [];
    uploadFileList2: any = [];

    OCR_TYPE1: any = 'tabular_ocr_1_1';
    OCR_TYPE2: any = 'tabular_ocr_1_1';
    PGE_RANGE1: any = '1';
    PGE_RANGE2: any = '1';
    TBL_NO1: any = '1';
    TBL_NO2: any = '1';
    BUSINESS_NM: any = '';

    addHeaderData: any = '';
    selectseq: any = '';
    selectseq2: any = '';
    selecttxt: any = '';
    selectdtxt: any = '';
    searchtxt: any = '';
    searchBusinessNm: any = '';
    searchStatCd: any = '';
    searchCondCd: any = '';

    OcrDocMstData: any[];
    OcrDocDetailData: any;
    OcrDocTextData: any[];
    OcrDocDetailListData: any;
    OcrDocDetailImgFileData: any[];
    OcrDocDetailHeaderCount: any;
    prjId: any = '';
    tblSno: any = '';
    pgSn: any = '';

    type42ImgFileNm1 = '';
    type42ImgFileNm2 = '';

    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService
    ) {
        window.recognition = this;
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
        this.type42ImgFileNm1 = '';
        this.type42ImgFileNm2 = '';

        const serviceUrl = 'recognition/selectOcrDocMstList';
        this.params = this.cf.toHttpParams({
            FILE_NM: this.searchtxt,
            STAT_CD: this.searchStatCd,
            BUSINESS_NM: this.searchBusinessNm,
            pageNo: pageNo == '0' ? '1' : pageNo,
            PAGESIZE: 10,
        });

        this.OcrDocMstData = [];
        this.OcrDocDetailData = undefined;
        this.OcrDocDetailImgFileData = undefined;
        if (pageNo == '0') this.OCRTABLETOTCNT = 0;
        this.OCRDETAILTABLETOTCNT = 0;
        this.OCRTEXTTABLETOTCNT = 0;
        this.searchCondCd = "";
        this.averageScore = "";
        this.DOC_SN = '';
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
                let tmp;
                if (resultData.code === 200) {
                    this.OcrDocMstData = resultData.data;
                }
                tmp =
                    '        <colgroup>                                                               ' +
                    '            <col style="width: 10px;">                                            ' +
                    '            <col style="width: auto;">                                            ' +
                    '            <col style="width: auto;">                                            ' +
                    '            <col style="width: 40px;">                                            ' +
                    '            <col style="width: 40px;">                                            ' +
                    '            <col style="width: 30px;">                                            ' +
                    '            <col style="width: 30px;">                                            ' +
                    '        </colgroup>                                                              ' +
                    '        <thead>                                                                  ' +
                    '	     <tr>                                                                     ' +
                    '            <th>순번</th>                                                      ' +
                    '            <th>파일명</th>                                                      ' +
                    '            <th>상호명</th>                                                      ' +
                    '            <th>평균점수</th>                                                      ' +
                    '            <th>처리상태</th>                                                      ' +
                    '            <th>선택</th>                                                  ' +
                    '            <th>삭제</th>                                                  ' +
                    '	    </tr>                                                                     ' +
                    '        </thead>                                                                 ' +
                    '        <tbody>                                                                  ';
                if (resultData.code === 200) {
                    // this.rsvList = resultData;

                    if (resultData.data.length > 0) {
                        let i = 0
                        $.each(resultData.data, (index: any, item: any) => {
                            let cdNm = 
                            tmp += '<tr>  ';
                            tmp +=
                                '                    <td>                                    ' +
                                item.DOC_SN +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td class="left">                                    ' +
                                item.FILE_ORI_NM +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td class="left">                                    ' +
                                (item.BUSINESS_NM || '') +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td class="right">                                    ' +
                                (item.AVERAGE_SCORE || '') +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td>                                    ' +
                                (this.processStatusCdList.find(i => i.DTL_CD == item.STAT_CD)||{DTL_CD_NM:""}).DTL_CD_NM +
                                '                    </td>                                    ';
                            // tmp +=
                            //     '                    <td>                                    ' +
                            //     item.PGE_NO +
                            //     '                    </td>                                    ';
                            // tmp +=
                            //     '                    <td>                                    ' +
                            //     item.TBL_NO +
                            //     '                    </td>                                    ';
                            tmp +=
                                '<td><a href="javascript:void(0);" onClick="window.recognition.onSelectOcrDocDetail(' +
                                // tslint:disable-next-line: prettier
                                '\'' +
                                i +
                                // tslint:disable-next-line: prettier
                                '\',\'' +
                                item.PRJ_ID +
                                // tslint:disable-next-line: prettier
                                '\',\'' +
                                item.DOC_SN +
                                // tslint:disable-next-line: prettier
                                '\');" class="btn btn-primary btn-xs btn-outline btn-fit">선택</a></td>';
                            tmp +=
                                '<td><a href="javascript:void(0);" onClick="window.recognition.onDeleteOcrDocMst(' +
                                // tslint:disable-next-line: prettier
                                '\'' +
                                item.PRJ_ID +
                                // tslint:disable-next-line: prettier
                                '\',\'' +
                                item.DOC_SN +
                                // tslint:disable-next-line: prettier
                                '\');" class="btn btn-danger btn-xs btn-outline btn-fit">삭제</a></td>';

                            tmp +=
                                '</tr>                                                                ';
                                
                            i ++;
                        });

                        tmp += '</tbody>';

                        setTimeout(() => {
                            $('#ocrDocMst').html(tmp);
                        });

                        // this.cf.dataTableCustInit('ocrDocMst', {
                        //     pageLength: 9999999999,
                        //     responsive: true,
                        //     paging: false,
                        //     bFilter: false,
                        //     searching: false, // enables the search bar
                        //     info: false, // disables the entry information
                        //     lengthChange: false,
                        //     ordering: false,
                        //     dom: 'lTfgitp',
                        //     // dom: '<"html5buttons"B>lTfgitp',
                        //     // dom: 'Bfrtip',
                        //     // buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                        // });

                        this.OCRTABLETOTCNT = resultData.dataCount;
                        this.page1.setInitPageLoad(
                            'page',
                            resultData.dataCount,
                            pageNo,
                            'recognition',
                            { target: 'page1' },
                            10 // this.PAGESIZE
                        );
                    }else{
                        $('#ocrDocMst').html('<div class="search_result"><h4>등록된 정보가 없습니다.</h4></div>');
                    }
                }

                // this.spinner.hide();
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
                // this.spinner.hide();
            }
        );
    }

    onDeleteOcrDocMst(PRJ_ID: any, DOC_SN: any) {

        const data = {
            PRJ_ID,
            DOC_SN
        };
        swal.fire({
            title: '삭제 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('recognition/deleteOcrDocMst', data, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 200) {
                                swal.fire('삭제 되었습니다.', '', 'success').then(result => {
                                    this.onSearchOcrDocMstList('1');
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'info').then(result => {
                                    this.onSearchOcrDocMstList('1');
                                });
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('삭제실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }

    onSelectOcrDocDetail(seq: any, prjId: any, docNo: any) {
        this.PRJ_ID = prjId;
        this.DOC_SN = docNo;
        const targetRow = this.OcrDocMstData.find(
            item => item.PRJ_ID == this.PRJ_ID && item.DOC_SN == this.DOC_SN
        );
        console.log(targetRow);
        this.selected(seq);
        this.onSelectOcrDocDetailPaging('1');
    }

    onSelectOcrDocDetailPaging(pageNo: any) {
        const serviceUrl = 'recognition/selectOcrDocDetailList';
        this.ocrDocTextPageNo = pageNo == '0' ? '1' : pageNo;
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            pageNo: pageNo == '0' ? '1' : pageNo,
            // PAGESIZE: 10,
            PAGESIZE: 1,
        });

        if (pageNo == '0') this.OCRDETAILTABLETOTCNT = 0;
        this.OCRTEXTTABLETOTCNT = 0;
        this.searchCondCd = "";
        this.averageScore = "";

        this.pgSn = '';

        if (pageNo == '0') this.onResetPage2();
        this.onResetPage3();

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                let tmp;
                console.log(resultData);
                tmp = '<tbody>';
                if (resultData.code === 200) {
                    // this.rsvList = resultData;
                    if (resultData.data.length > 0) {
                        let i = 0
                        $.each(resultData.data, (index: any, item: any) => {
                            tmp += '<tr>  ';
                            tmp +=
                                '                    <td> <a data-title="'+item.DOC_NM+'" href="'+this.apigatewayService.apiUrl+'/detailimage/' +
                                item.FILE_NM +
                                '" data-lightbox="ocrDocDetail"><img style="max-height:570px;" src="'+this.apigatewayService.apiUrl+'/detailimage/' +
                                item.FILE_NM +
                                '" class="mCS_img_loaded"/></a></td>                                    ';
                            tmp +=
                                '</tr>                                                                ';
                                
                            i ++;
                            this.PAGE_SN = item.PAGE_SN
                        });
                        tmp += '</tbody>';

                        setTimeout(() => {
                            $('#ocrDocDetail').html(tmp);
                        });

                        // this.cf.dataTableCustInit('ocrDocDetail', {
                        //     pageLength: 1,
                        //     responsive: true,
                        //     paging: false,
                        //     bFilter: false,
                        //     searching: false, // enables the search bar
                        //     info: false, // disables the entry information
                        //     lengthChange: false,
                        //     ordering: false,
                        //     dom: 'lTfgitp',
                        //     // dom: '<"html5buttons"B>lTfgitp',
                        //     // dom: 'Bfrtip',
                        //     // buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                        // });

                        this.OCRDETAILTABLETOTCNT = resultData.dataCount;
                        this.page2.setInitPageLoad(
                            'page',
                            resultData.dataCount,
                            pageNo,
                            'recognition',
                            { target: 'page2' },
                            1 // this.PAGESIZE
                        );
                        this.onSelectOcrDocTextPaging('1');
                    } else{
                        this.onResetPage2();
                        $('#ocrDocDetail').html('<div class="search_result"><h4>등록된 정보가 없습니다.</h4></div>');
                    }
                }

                
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    getAverageScore(){
        const serviceUrl = 'recognition/selectOcrDocTextAverageScore';
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            PAGE_SN: this.PAGE_SN
        });

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                let tmp;
                console.log(resultData);
                if (resultData.code === 200) {
                    this.averageScore = resultData.data.AVERAGE_SCORE;
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    onSelectOcrDocTextPaging(pageNo: any) {
        const serviceUrl = 'recognition/selectOcrDocTextList';
        this.params = this.cf.toHttpParams({
            PRJ_ID: this.PRJ_ID,
            DOC_SN: this.DOC_SN,
            PAGE_SN: this.PAGE_SN,
            COND_CD: this.searchCondCd,
            pageNo: pageNo == '0' ? '1' : pageNo,
            // PAGESIZE: 10,
            PAGESIZE: 10,
        });

        if (pageNo == '0') this.OCRTEXTTABLETOTCNT = 0;

        if (pageNo == '0') this.onResetPage3();

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                let tmp;
                console.log(resultData);
                if (resultData.code === 200) {
                    this.OcrDocTextData = resultData.data;
                }
                tmp =
                    '        <colgroup>                                                               ' +
                    '            <col style="width: 10px;">                                            ' +
                    '            <col style="width: auto%;">                                            ' +
                    '            <col style="width: 30%;">                                            ' +
                    '            <col style="width: 40px;">                                            ' +
                    '            <col style="width: 200px;">                                            ' +
                    '        </colgroup>                                                              ' +
                    '        <thead>                                                                  ' +
                    '	     <tr>                                                                     ' +
                    '            <th>순번</th>                                                      ' +
                    '            <th>텍스트</th>                                                      ' +
                    '            <th>인식 이미지</th>                                                      ' +
                    '            <th>점수</th>                                                      ' +
                    '            <th>변경값</th>                                                  ' +
                    '	    </tr>                                                                     ' +
                    '        </thead>                                                                 ' +
                    '        <tbody>                                                                  ';
                if (resultData.code === 200) {
                    // this.rsvList = resultData;

                    if (resultData.data.length > 0) {
                        let i = 0
                        $.each(resultData.data, (index: any, item: any) => {
                            tmp += '<tr>  ';
                            tmp +=
                                '                    <td>                                    ' +
                                item.TEXT_SN +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td class="left" style="white-space:pre;">' +
                                item.TEXT_NM +
                                '</td>';
                            tmp +=
                                '                    <td class="nopadding"> <a data-title="'+item.TEXT_NM+'" href="'+this.apigatewayService.apiUrl+'/textimagefile/' +
                                item.TEXT_IMAGE_PATH.replace("C:\\dev_project\\aiblue_ocr\\textimagefile\\","") +
                                '" data-lightbox="ocrDocText"><img style="max-height:30px;" src="'+this.apigatewayService.apiUrl+'/textimagefile/' +
                                item.TEXT_IMAGE_PATH.replace("C:\\dev_project\\aiblue_ocr\\textimagefile\\","") +
                                '" class="mCS_img_loaded" /></a></td>                                    ';
                            tmp +=
                                '                    <td class="right">                                    ' +
                                item.SCORE +
                                '                    </td>                                    ';
                            tmp +=
                                '                    <td class="right"><div class="formInput"><input type="text" class="form-control" value="'+(item.TEXT_UPDT_NM || "")+'"></div></td>';
                            tmp +=
                                '</tr>                                                                ';
                                
                            i ++;
                        });

                        tmp += '</tbody>';

                        setTimeout(() => {
                            $('#ocrDocText').html(tmp);
                        });

                        // this.cf.dataTableCustInit('ocrDocText', {
                        //     pageLength: 1,
                        //     responsive: true,
                        //     paging: false,
                        //     bFilter: false,
                        //     searching: false, // enables the search bar
                        //     info: false, // disables the entry information
                        //     lengthChange: false,
                        //     ordering: false,
                        //     dom: 'lTfgitp',
                        //     // dom: '<"html5buttons"B>lTfgitp',
                        //     // dom: 'Bfrtip',
                        //     // buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                        // });

                        this.OCRTEXTTABLETOTCNT = resultData.dataCount;
                        this.page3.setInitPageLoad(
                            'page',
                            resultData.dataCount,
                            pageNo,
                            'recognition',
                            { target: 'page3' },
                            10 // this.PAGESIZE
                        );
                    }else{
                        $('#ocrDocText').html('<div class="search_result"><h4>등록된 정보가 없습니다.</h4></div>');
                    }
                    this.getAverageScore();
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

    selected(seq: any) {
        this.selectseq = seq;
        $('#ocrDocMst>tbody tr').each(function (index, item) {
            $(item).removeClass('selectcell');
        });
        $('#ocrDocMst>tbody').find('tr').eq(seq).addClass('selectcell');
    }

    onResetPage1() {
        $('#ocrDocMst').empty();
        this.OCRTABLETOTCNT = 0;
        if (this.page1) {
            this.page1.setInitPageLoad(
                'page',
                0,
                1,
                'recognition',
                { target: 'page1' },
                10 // this.PAGESIZE
            );
        }
    }

    onResetPage2() {
        $('#ocrDocDetail').empty();
        this.OCRDETAILTABLETOTCNT = 0;
        if (this.page2) {
            this.page2.setInitPageLoad(
                'page',
                0,
                1,
                'recognition',
                { target: 'page2' },
                1 // this.PAGESIZE
            );
        }
    }

    onResetPage3() {
        $('#ocrDocText').empty();
        this.OCRTEXTTABLETOTCNT = 0;
        this.averageScore = "";
        if (this.page3) {
            this.ocrDocTextPageNo = 1;
            this.page3.setInitPageLoad(
                'page',
                0,
                1,
                'recognition',
                { target: 'page3' },
                10 // this.PAGESIZE
            );
        }
    }

    fileSave() {
        swal.fire('저장되었습니다.', '', 'success');
    }

    showFileUploadModal() {
        $('#fileUploadModal').modal('show');
    }

    onFileChange1(files: FileList) {
        this.uploadFileList1 = files;
    }

    onFileChange2(files: FileList) {
        this.uploadFileList2 = files;
    }

    onFileUpload() {
        if (!this.uploadFileList1 || this.uploadFileList1.length < 1) {
            swal.fire('파일을 선택하여 주세요.', '', 'warning');
            return;
        }

        if (
            this.uploadFileList1 &&
            this.uploadFileList1.length > 0
        ) {
            const serviceUrl = 'recognition/ocrDocFileUpload';
            const fileName = 'files';
            const myFiles: File[] = [this.uploadFileList1[0]];
            this.params = this.cf.toHttpParams({BUSINESS_NM:this.BUSINESS_NM});

            this.apigatewayService
                .doPostuploadFileNamesPromise(serviceUrl, fileName, myFiles, this.params)
                .then(
                    (resultData: any) => {
                        if (resultData.code === 200) {
                            swal.fire('등록 되었습니다.', '', 'success').then(result => {  
                                this.onCloseModal();
                                this.ngOnInit();
                            });
                        }
                    },
                    error => {
                        swal.fire('파일업로드중 에러가 발생하였습니다. 파일을 확인해 주세요.', '', 'error');
                        this.logger.debug(JSON.stringify(error, null, 4));
                    }
                );
        }
    }

    onCloseModal() {
        this.uploadFileList1 = [];
        this.fileUpload1.nativeElement.value = null;
        this.BUSINESS_NM = '';

        $('#fileUploadModal').modal('hide');
    }

    saveOcrDocText() {
        let ocrDocTextUpdateData = [];
        if (this.OcrDocTextData == null || this.OcrDocTextData.length === 0) {
            swal.fire('저장할 항목이 없습니다.', '', 'warning');
            return;
        }
        $.each(this.OcrDocTextData, function(i, item) {
            if((item.TEXT_UPDT_NM||"") != $("#ocrDocText input:eq("+i+")").val()){
                item.TEXT_UPDT_NM = $("#ocrDocText input:eq("+i+")").val()
                ocrDocTextUpdateData.push(item);
            }
        });
        if (ocrDocTextUpdateData.length === 0) {
            swal.fire('저장할 항목이 없습니다.', '', 'warning');
            return;
        }

        swal.fire({
            title: '저장 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
        }).then(result => {
            // confirm yes
            if (result.value) {
                this.apigatewayService
                    .doPost('recognition/updateOcrDocTextByTextUpdtNmList', ocrDocTextUpdateData, null)
                    .subscribe(
                        resultData => {
                            if (resultData.code === 201) {
                                swal.fire('저장하였습니다.', '', 'success').then(result => {
                                    this.onSelectOcrDocTextPaging(this.ocrDocTextPageNo);
                                });
                            } else {
                                swal.fire(resultData.msg, '', 'info').then(result => {
                                    this.onSelectOcrDocTextPaging(this.ocrDocTextPageNo);
                                });
                            }
                        },
                        error => {
                            this.logger.debug(JSON.stringify(error, null, 4));
                            swal.fire('수정실패', '', 'error');
                        }
                    );
            } // confirm yes
        });
    }
}
