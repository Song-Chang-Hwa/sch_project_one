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
    selector: 'app-slideitem-layoutreco',
    template: `
        <div class="item" (click)="evtItemClick()">
            <div
                [class]="
                    selectItem &&
                    selectItem.RECO_TYPE === item.RECO_TYPE &&
                    selectItem.RECO_ID === item.RECO_ID
                        ? 'itemDetail active'
                        : 'itemDetail'
                "
            >
                <div
                    class="lectureColorWrap"
                    [ngClass]="{
                        lectureColor01: item.RECO_TYPE === '10',
                        lectureColor02: item.RECO_TYPE === '20',
                        lectureColor03: item.RECO_TYPE === '30'
                    }"
                >
                    <p>{{ this.recoTypeName }}<span>기반</span></p>
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
                        [유형]: {{ item.RECO_TYPE_NM }} [순서]: {{ item.ORDINAL }}
                    </p>
                    <strong class="tit_cont">[이름]: {{ item.RECO_NM }}</strong>
                    <p class="txt_info" style="margin-top: 0;">
                        [아이템]: {{ item.ITEM_NM }} [아이템순서]: {{ item.ITEM_ORDINAL }}
                    </p>
                </div>
            </div>
        </div>
    `,
})
export class SlideItemLayoutRecoComponent implements OnInit, OnDestroy {
    @Input() item: any;
    @Input() selectItem: any;

    @Output() selected = new EventEmitter<any>();

    recoTypeName = '';

    constructor() {}

    ngOnInit() {
        switch (this.item.RECO_TYPE) {
            case '10':
                this.recoTypeName = '통계';
                break;
            case '20':
                this.recoTypeName = 'AI';
                break;
            case '30':
                this.recoTypeName = '편성';
                break;
        }
    }

    ngOnDestroy() {}

    evtItemClick(): void {
        // console.log('----- evtItemClick -----');
        // console.log('item:', this.item);

        this.selected.emit(this.item);
    }
}

@Component({
    selector: 'app-slide-layoutreco',
    templateUrl: './slide-layoutreco.component.html',
    styleUrls: ['./slide-layoutreco.component.scss'],
})
export class SlideLayoutRecoComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedItem: any;

    @ViewChild('slide') slide: ElementRef;

    @Input() items: any[];
    @ContentChild(TemplateRef) templateVariable: TemplateRef<any>;
    @Output() selected = new EventEmitter<any>();

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {}

    evtItemSelected(layoutReco: any) {
        // console.log('evtItemClick(): ' + layoutReco);

        this.selectedItem = layoutReco;
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

            if (data.RECO_TYPE === item.RECO_TYPE && data.RECO_ID === item.RECO_ID) {
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

            if (data.RECO_TYPE === item.RECO_TYPE && data.RECO_ID === item.RECO_ID) {
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

    public moveItemUp(data: any) {
        const newOrdinal = data.NEW_ITEM_ORDINAL; // 현재 순서
        const oldOrdinal = data.ITEM_ORDINAL;

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // const ordinal = item.ORDINAL;
            // console.log('moveUp:::::::2::::item', item);

            if (data.RECO_TYPE === item.RECO_TYPE && data.RECO_ID === item.RECO_ID) {
                // console.log('moveUp:::::::3::::item', item);
                item.ITEM_ORDINAL = newOrdinal;
            } else if (item.ITEM_ORDINAL > oldOrdinal && item.ITEM_ORDINAL <= newOrdinal) {
                // console.log('moveUp:::::::4::::item', item);
                // old< ~ <= new 사이, 순서 감소
                item.ITEM_ORDINAL = item.ITEM_ORDINAL - 1;
            }
        }
    }

    public moveItemDown(data: any) {
        const newOrdinal = data.NEW_ITEM_ORDINAL; // 현재 순서
        const oldOrdinal = data.ITEM_ORDINAL;

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (data.RECO_TYPE === item.RECO_TYPE && data.RECO_ID === item.RECO_ID) {
                // console.log('moveUp:::::::3::::item', item);
                item.ITEM_ORDINAL = newOrdinal;
            } else if (item.ITEM_ORDINAL < oldOrdinal && item.ITEM_ORDINAL >= newOrdinal) {
                // console.log('moveUp:::::::4::::item', item);
                // new <= ~ < old 사이, 순서 증가
                item.ITEM_ORDINAL = item.ORDINAL + 1;
            }
        }
    }
}
