import { HttpParams } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { API_URL_TOKEN } from '@app/shared/token';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommFunction, CommService, LoggerService } from '../../../../shared/services';
import { ApigatewayService } from '../../../../shared/services/apigateway/apigateway.service';

declare var $: any;

@Component({
    selector: 'app-modalcontent-abtest-rslt',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">[{{ABTEST_NM}}] 통계 검증 결과</h4>
            <button
                type="button"
                class="close"
                aria-label="Close"
                (click)="evtBtnCancelClick('Cross click')"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <!-- <h2 class="tit-level2">통계 검증 결과</h2> -->
            <div class="chartBtnArea">
				<div class="chartBtn">
                    <a href="javascript:void(0)" (click)="search()" class="btn btn-default" title="새로고침"><i class="ti-loop"></i></a>
					<a href="javascript:void(0)" (click)="evtBtnCancelClick('Cross click')" class="btn btn-default" title="닫기"><i class="ti-close"></i></a>
                </div>
            </div>
            <div class="roundBorder mT10">
                <div class="modelChart">
                    <div class="data-chart">
                        <chart
                            [type]="myChartAbtestCallType"
                            [data]="myChartAbtestCallData"
                            [options]="myChartAbtestCallOptions"
                            id="myChartAbtestJs"
                            #myChartAbtestJs
                            style="height:360px;"
                        ></chart>
                    </div>
                </div>
            </div>
            <div class="roundBorder mT15">
                <div class="form-Area">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="control-label">전환률 (A)</label>
                                <div class="formInput">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            [(ngModel)]="detailinfo.TRG_IDX_VALUE_A"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="control-label">전환률 (B)</label>
                                <div class="formInput">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            [(ngModel)]="detailinfo.TRG_IDX_VALUE_B"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4"></div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="control-label">z-score</label>
                                <div class="formInput">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            [(ngModel)]="detailinfo.z_score"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="control-label">p-value</label>
                                <div class="formInput">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            [(ngModel)]="detailinfo.p_value"
                                            readonly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label">confidence</label>
                            <div class="formInput">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        [(ngModel)]="detailinfo.confidence"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class ModalContentAbtestRsltComponent implements OnInit, OnDestroy {
    params: HttpParams;

    @Input() ABTEST_ID: any;
    @Input() ABTEST_NM: any;

    @ViewChild('myChartAbtestJs') myChartAbtestJs;

    myChartAbtestCallType: any = 'line';
    myChartAbtestCallData: any;
    myChartAbtestCallOptions: any = {};
    myChartAbtestCallPlugins: any = [];

    detailinfo: any = {};

    constructor(
        public activeModal: NgbActiveModal,
        private logger: LoggerService,
        private cf: CommFunction,
        private cs: CommService,
        private apigatewayService: ApigatewayService
    ) {}

    ngOnInit() {
        this.search();
    }

    ngOnDestroy() {}

    search() {
        this.detailinfo = {};
        const params = this.cf.toHttpParams({
            ABTEST_ID: this.ABTEST_ID,
        });
        const serviceUrl = 'simulation/abtest/result';
        this.apigatewayService.doGetPromise(serviceUrl, params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    this.viewChart(resultData.data.list);
                } else if (resultData.msg) {
                    swal.fire(resultData.msg, '', 'warning').then(result => {
                        this.activeModal.dismiss('result not found');
                    });
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    viewChart(list) {
        // this.myChartAbtestCallData = { labels: [], datasets: [] };
        // this.myChartAbtestJs.chart.update();

        // let maxRate = 0;
        const mapA = list[0];
        const mapB = list[1];
        if (null === mapA.ABTEST_STAT_RSLT) {
            swal.fire('검증결과가 없습니다', '', 'warning').then(result => {
                this.activeModal.dismiss('result not found');
            });
            return;
        }
        const abtestStatResult = this.cf.StrToObj(mapA.ABTEST_STAT_RSLT);

        this.detailinfo.TRG_IDX_VALUE_A = this.cf.nvl(mapA.TRG_IDX_VALUE, '');
        this.detailinfo.TRG_IDX_VALUE_B = this.cf.nvl(mapB.TRG_IDX_VALUE, '');
        this.detailinfo.p_value = this.cf.nvl(abtestStatResult.p_value, '');
        this.detailinfo.z_score = this.cf.nvl(abtestStatResult.z_score, '');
        this.detailinfo.confidence = abtestStatResult.confidence
            ? abtestStatResult.confidence.toFixed(2)
            : '';

        this.myChartAbtestCallData = { labels: [], datasets: [] };
        this.myChartAbtestJs.chart.update();

        this.myChartAbtestCallData = {};
        const chartLabels = [];
        const chartDataSetsLabels = [];
        const datasetA: any = [];
        const datasetB: any = [];

        abtestStatResult.data.forEach(data => {
            datasetA.push({ x: data.x, y: data.y1 });
            datasetB.push({ x: data.x, y: data.y2 });
            // maxRate = maxRate > data.y1 ? maxRate : data.y1;
            // maxRate = maxRate > data.y2 ? maxRate : data.y2;
        });

        const chartDataSets = [];
        const colors = this.cs.getChartColor(2);

        chartDataSets.push({
            label: 'A',
            // pointBackgroundColor: '#FA5882',
            backgroundColor: '#F5ECCE',
            borderColor: colors[0],
            // pointBorderColor: '#fff',
            data: datasetA,
            fill: false,
        });

        chartDataSets.push({
            label: 'B',
            // pointBackgroundColor: '#F6CEEC',
            backgroundColor: '#81F79F',
            borderColor: colors[1],
            // pointBorderColor: '#fff',
            data: datasetB,
            fill: false,
        });

        // this.myChartAbtestCallPlugins = [
        //     {
        //         afterDraw: chart => {
        //             var ctx = chart.chart.ctx;
        //             var xAxis = chart.scales['x-axis-0'];
        //             var yAxis = chart.scales['y-axis-0'];
        //             xAxis.ticks.forEach((value, index) => {
        //                 var x = xAxis.getPixelForTick(index);
        //                 var yTop = yAxis.getPixelForValue(datasetA[index]);
        //                 ctx.save();
        //                 ctx.strokeStyle = '#aaaaaa';
        //                 ctx.beginPath();
        //                 ctx.moveTo(x, yAxis.bottom);
        //                 ctx.lineTo(x, yTop);
        //                 ctx.stroke();
        //                 ctx.restore();
        //             });
        //         },
        //     },
        // ];
        // this.logger.debug('viewChart##########abtestStatResult###', abtestStatResult);

        this.myChartAbtestCallOptions = {
            responsive: true,
            maintainAspectRatio: false,
            // showTooltips: false,
            // hover: {
            //     animationDuration: 0,
            // },
            // animation: {
            //     // duration: 1,
            //     onComplete() {
            //         const chartInstance = this.chart,
            //             ctx = chartInstance.ctx;
            //         const scale = this.scale;

            //         // draw line
            //         this.chart.ctx.beginPath();
            //         this.chart.ctx.moveTo(75.21, 0);
            //         this.chart.ctx.strokeStyle = '#ff0000';
            //         this.chart.ctx.lineTo(75.21, 0.07);
            //         this.chart.ctx.stroke();

            //         // write TODAY
            //         this.chart.ctx.textAlign = 'center';
            //         this.chart.ctx.fillText('CRA', 75.21, 0);
            //     },
            // },
            scales: {
                xAxes: [
                    {
                        type: 'linear',
                        position: 'bottom',
                        display: true,
                        gridLines: {
                            display: true,
                        },
                    },
                ],

                yAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            // legend: {
            //     display: false,
            // },
        };

        // // console.log('chartDataSets :::  ', chartDataSets);
        this.myChartAbtestCallData = { datasets: chartDataSets };
        // this.logger.debug(
        //     ':::::::::::::::::::: myChartAbtestCallData :::  ',
        //     this.myChartAbtestCallData
        // );
        this.myChartAbtestJs.chart.update();
    }

    evtBtnCancelClick(reason: any): void {
        this.activeModal.dismiss(reason);
    }
}

@Component({
    selector: 'app-modal-abtest-rslt',
    template: '',
})
export class ModalAbtestRsltComponent {
    @Input() ABTEST_NM: any;
    // @Input() MODEL_TYPE: any;

    constructor(private modalService: NgbModal) {}

    open(ABTEST_ID): NgbModalRef {
        const modalRef = this.modalService.open(ModalContentAbtestRsltComponent, {
            windowClass: 'modal inmodal fade in',
            backdropClass: 'modal-backdrop fade in',
            size: 'lg',
        });

        modalRef.componentInstance.ABTEST_ID = ABTEST_ID;
        modalRef.componentInstance.ABTEST_NM = this.ABTEST_NM;

        return modalRef;
    }
}
