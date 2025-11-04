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
import { Observable } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-slideitem-manualitem',
    template: `
        <div class="item" (click)="evtItemClick()">
            <div
                [class]="
                    selectItem && selectItem.ITEM_ID === item.ITEM_ID
                        ? 'itemDetail active'
                        : 'itemDetail'
                "
            >
                <div class="lectureColorWrap lectureColor03">
                    <p>편성<span>기반</span></p>
                </div>
                <div class="lectureThumbnail">
                    <img
                        class="lazy-img loaded"
                        data-src="https://file.etoos.com/lecture/lecturethumbnail/resize_박상현t_l63201_2021_고23 [화학 1]  중화반응 뽀개기_ver1(2).jpg"
                        alt="강의 썸네일"
                        src="https://file.etoos.com/lecture/lecturethumbnail/resize_박상현t_l63201_2021_고23 [화학 1]  중화반응 뽀개기_ver1(2).jpg"
                        style="opacity: 0;"
                    />
                </div>
                <div class="description" style="display: block;padding-left: 70px;">
                    <p class="txt_info" style="margin-top: 0;">
                        [순서]: {{ item.ORDINAL }}<br />[아이템ID]: {{ item.ITEM_ID }}
                    </p>
                    <strong class="tit_cont">[아이템]: {{ item.ITEM_NM }}</strong>
                </div>
            </div>
        </div>
    `,
})
export class SlideItemManualItemComponent implements OnInit, OnDestroy {
    @Input() item: any;
    @Input() selectItem: any;

    @Output() selected = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}

    evtItemClick(): void {
        // console.log('----- evtItemClick -----');
        // console.log('item:', this.item, this.selectItem);

        this.selected.emit(this.item);
    }
}

@Component({
    selector: 'app-slide-manualitem',
    templateUrl: './slide-manualitem.component.html',
    styleUrls: ['./slide-manualitem.component.scss'],
})
export class SlideManualItemComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedItem: any = null;

    @ViewChild('slide') slide: ElementRef;

    @Input() items: any[];
    @Input() selectItem: any;

    @ContentChild(TemplateRef) templateVariable: TemplateRef<any>;
    @Output() selected = new EventEmitter<any>();

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {}

    evtItemSelected(menualItem: any) {
        // console.log('evtItemClick(): ', menualItem);

        this.selectedItem = menualItem;
        this.fireSelectedEvent();
    }

    fireSelectedEvent() {
        this.selected.emit(this.selectedItem);
    }

    public removeSelectedItem() {
        if (null !== this.selectedItem) {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];

                if (this.selectedItem === item) {
                    this.items.splice(i, 1);

                    this.selectedItem = {};
                    this.fireSelectedEvent();

                    return item;
                }
            }
        }

        return null;
    }

    public moveUp(data: any) {
        const newOrdinal = data.NEW_ORDINAL; // 현재 순서
        const oldOrdinal = data.ORDINAL;
        // let nextOrdinal = ordinal + 1;

        // console.log('moveUp::::::::1::oldOrdinal:newOrdinal', oldOrdinal, newOrdinal);
        // 순서가 올라갈때는 위의 아이템들을 밀어올리면서 간다
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // const ordinal = item.ORDINAL;
            // console.log('moveUp:::::::2::::item', item);

            if (data.ITEM_ID === item.ITEM_ID) {
                // console.log('moveUp:::::::3::::item', item);
                item.ORDINAL = newOrdinal;
            } else if (item.ORDINAL > oldOrdinal && item.ORDINAL <= newOrdinal) {
                // console.log('moveUp:::::::4::::item', item);
                // old< ~ <= new 사이, 순서 감소
                item.ORDINAL = item.ORDINAL - 1;
            }
        }
        this.items.sort(function (a, b) {
            if (a.ORDINAL === b.ORDINAL) {
                return 0;
            }
            return a.ORDINAL > b.ORDINAL ? 1 : -1;
        });
    }

    public moveDown(data: any) {
        const newOrdinal = data.NEW_ORDINAL; // 현재 순서
        const oldOrdinal = data.ORDINAL;

        // console.log('moveUp::::::::1::oldOrdinal:newOrdinal', oldOrdinal, newOrdinal);
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // const ordinal = item.ORDINAL;
            // console.log('moveUp:::::::2::::item', item);

            if (data.ITEM_ID === item.ITEM_ID) {
                // console.log('moveUp:::::::3::::item', item);
                item.ORDINAL = newOrdinal;
            } else if (item.ORDINAL < oldOrdinal && item.ORDINAL >= newOrdinal) {
                // console.log('moveUp:::::::4::::item', item);
                // new <= ~ < old 사이, 순서 증가
                item.ORDINAL = item.ORDINAL + 1;
            }
        }
        this.items.sort(function (a, b) {
            if (a.ORDINAL === b.ORDINAL) {
                return 0;
            }
            return a.ORDINAL > b.ORDINAL ? 1 : -1;
        });
    }
}
