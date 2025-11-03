import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

import { API_URL_TOKEN } from '@app/shared/token';

declare var $: any;

@Component({
    selector: 'app-tree-segment',
    templateUrl: './tree-segment.component.html',
})
export class TreeSegmentComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedNode: any = {};

    @ViewChild('tree') tree: ElementRef;

    @Input() segUseYn: any;

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {
        // console.log('TreeSegmentComponent :::::::::::::::: segUseYn', this.segUseYn);
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        this.initJstree();
    }

    /**
     * jstree
     */

    initJstree() {
        const self = this;
        const $treeview = this.tree.nativeElement;

        const serviceUrl = this.segUseYn === 'Y' ? '/entity/typesegmstr/selectListForSegTreeUse' : '/entity/typesegmstr/selectListForSegTree' ;

        $($treeview)
            .jstree({
                core: {
                    check_callback: false,
                    data: {
                        url(node) {
                            // console.log('init_jstree > url node:', node);
                            return self.apiUrl + serviceUrl;
                        },
                        data(node) {
                            // console.log('init_jstree > data node:', node);
                            return { id: node.id };
                        },
                    },
                },
                plugins: ['types'],
                types: {
                    // default: {
                    //     icon: 'ti-file',
                    // },
                    // typeSegment: {
                    //     icon: 'ti-folder',
                    // },
                    segment: {
                        icon: 'ti-file',
                    },
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                },
            })
            .on('ready.jstree', function () {
                $($treeview).jstree('open_all');
            });

        $(this.tree.nativeElement).bind('select_node.jstree', function (event, data) {
            // console.log('select_node.jstree', data.node.original, data.node.id);

            // console.log(event);
            // console.log(data);

            self.selectedNode = data.node;
        });
    }

    destroyJstree() {
        $(this.tree.nativeElement).jstree('destroy');
    }
}
