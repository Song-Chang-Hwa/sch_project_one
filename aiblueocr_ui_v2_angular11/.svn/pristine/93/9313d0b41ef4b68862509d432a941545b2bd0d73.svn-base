import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';

declare var $: any;

@Component({
    selector: 'app-grid-cellrenderer-touchspin',
    template: ` <input class="touchspin01" type="number" [(ngModel)]="params.value" #input /> `,
})
export class GridCellRendererTouchSpin
    implements ICellRendererAngularComp, OnDestroy, AfterViewInit {
    public params: any;

    @ViewChild('input') input;

    agInit(params: any): void {
        this.params = params;
    }

    btnClickedHandler() {
        this.params.clicked(this.params.value);
    }

    ngOnDestroy() {
        // no need to remove the button click handler
        // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }

    ngAfterViewInit(): void {
        const self = this;

        $(this.input.nativeElement)
            .TouchSpin({
                min: 0,
                step: 0.1,
                max: 999999,
                decimals: 2,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                // console.log('change: ' + Number(e.target.value));
                self.params.data.PREF_VALUE = Number(e.target.value);
            });
    }

    refresh(params: ICellRendererParams): boolean {
        // console.log('----- refresh -----');
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
        // console.log('----- afterGuiAttached -----');
    }
}
