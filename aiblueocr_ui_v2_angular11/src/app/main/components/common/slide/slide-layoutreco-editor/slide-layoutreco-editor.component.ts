import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { API_URL_TOKEN } from '@app/shared/token';

declare var $: any;

@Component({
    selector: 'app-slide-layoutreco-editor',
    templateUrl: './slide-layoutreco-editor.component.html',
    styleUrls: ['./slide-layoutreco-editor.component.scss'],
})
export class SlideLayoutRecoEditorComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    @Input() data: any = {};

    @Output() ordinalUp = new EventEmitter<any>();
    @Output() ordinalDown = new EventEmitter<any>();
    @Output() itemOrdinalUp = new EventEmitter<any>();
    @Output() itemOrdinalDown = new EventEmitter<any>();

    @ViewChild('inputOrdinal') inputOrdinal;
    @ViewChild('inputItemOrdinal') inputItemOrdinal;

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {
        const self = this;

        $(this.inputOrdinal.nativeElement)
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
                self.changeItemOrinal(e.target.value);
            })
            .on('keyup', function (e) {
                // console.log('keyup:::::::::::::', e.target.value);
                self.changeItemOrinal(e.target.value);
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

    changeItemOrinal(value: any) {
        if (!value) return;
        const newItemOrdinal = Number(value);
        const oldItemOrdinal = Number(this.data.ITEM_ORDINAL);

        // console.log(
        //     'changeOrinal++++++++++1++++++oldItemOrdinal+++newItemOrdinal+++++',
        //     oldItemOrdinal,
        //     newItemOrdinal
        // );
        this.data.NEW_ITEM_ORDINAL = newItemOrdinal;

        if (oldItemOrdinal < newItemOrdinal) {
            // console.log('changeOrinal++++++++++2++++++++++++++', this.data);
            this.itemOrdinalUp.emit(this.data);
        } else if (oldItemOrdinal > newItemOrdinal) {
            // console.log('changeOrinal++++++++++3++++++++++++++', this.data);
            this.itemOrdinalDown.emit(this.data);
        }
    }

    public clear() {
        this.data = {};
    }
}
