import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import { API_URL_TOKEN } from '@app/shared/token';

declare var $: any;

@Component({
    selector: 'app-tree-sqllist',
    templateUrl: './tree-sqllist.component.html',
})
export class TreeSqlListComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    @ViewChild('tree') tree: ElementRef;

    @Output() selected = new EventEmitter<any>();

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

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

        $($treeview).jstree({
            core: {
                check_callback: false,
                data: {
                    url(node) {
                        // console.log('init_jstree > url node:', node);
                        return self.apiUrl + '/entity/sqllist/selectListForSqlListTree';
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
                // typeManual: {
                //     icon: 'ti-folder',
                // },
                sql: {
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

            self.selected.emit(data.node.original);
        });
    }

    destroyJstree() {
        $(this.tree.nativeElement).jstree('destroy');
    }
}
