import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { API_URL_TOKEN } from '@app/shared/token';

declare var $: any;

@Component({
    selector: 'app-slide-manualitem-viewer',
    templateUrl: './slide-manualitem-viewer.component.html',
    styleUrls: ['./slide-manualitem-viewer.component.scss'],
})
export class SlideManualItemViewerComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    @Input() data: any = {};
    @Output() ordinalUp = new EventEmitter<any>();
    @Output() ordinalDown = new EventEmitter<any>();
    @ViewChild('inputItemOrdinal') inputItemOrdinal;

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {
        const self = this;
        $(this.inputItemOrdinal.nativeElement)
            .TouchSpin({
                min: 1,
                max: 999999,
                step: 1,
                verticalbuttons: false,
                buttondown_class: 'btn btn-white',
                buttonup_class: 'btn btn-white',
            })
            .on('change', function (e) {
                self.changeOrinal(e.target.value);
            })
            .on('keyup', function (e) {
                // console.log('keyup:::::::::::::', e.target.value);
                self.changeOrinal(e.target.value);
            });
    }

    changeOrinal(value: any) {
        if (!value) return;
        const newItemOrdinal = Number(value);
        const oldItemOrdinal = Number(this.data.ORDINAL);

        // console.log(
        //     'changeOrinal++++++++++1++++++oldItemOrdinal+++newItemOrdinal+++++',
        //     oldItemOrdinal,
        //     newItemOrdinal
        // );
        this.data.NEW_ORDINAL = newItemOrdinal;

        if (oldItemOrdinal < newItemOrdinal) {
            // console.log('changeOrinal++++++++++2++++++++++++++', this.data);
            this.ordinalUp.emit(this.data);
        } else if (oldItemOrdinal > newItemOrdinal) {
            // console.log('changeOrinal++++++++++3++++++++++++++', this.data);
            this.ordinalDown.emit(this.data);
        }
    }

    public clear() {
        this.data = {};
    }
}
