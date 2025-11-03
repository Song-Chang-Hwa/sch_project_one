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
    selector: 'app-tree-ai',
    templateUrl: './tree-ai.component.html',
})
export class TreeAiComponent implements OnInit, OnDestroy, AfterViewInit {
    private _AI_ID = -1;
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

    public set AI_ID(value: number) {
        console.log('TreeAiComponent set AI_ID#######1############', value);
        this._AI_ID = value;
        this.selectAiNode(this._AI_ID);
    }

    public selectAiNode(aiId) {
        console.log('TreeAiComponent selectAiNode#####2##############', aiId);
        this.unSelectAll();
        const $treeview = this.tree.nativeElement;
        let isSelected = false;
        const interval_id = setInterval(() => {
            const id = $($treeview).jstree(true).get_node(aiId).id;
            if (id) {
                clearInterval(interval_id);
                isSelected = true;
                // since the node is loaded, now we can open it without an error
                // $($treeview).jstree('select_node', '#' + self._PREF_ID, true);
                $($treeview).jstree(true).select_node(aiId, true);
            }
        }, 5);

        // 10초 후에 정지
        setTimeout(() => {
            if (!isSelected) {
                clearInterval(interval_id);
                // swal.fire(
                //     '[Timeout] [선호도ID: ' +
                //         aiId +
                //         '] 해당 선호도를 찾을 수 없습니다.',
                //     '',
                //     'warning'
                // );
            }
        }, 5000);
    }
    /**
     * public
     */
    public refresh() {
        this.refreshJsTree();
    }

    /**
     * jstree
     */

    initJstree() {
        const self = this;
        const $treeview = this.tree.nativeElement;

        $($treeview)
            .jstree({
                core: {
                    check_callback: false,
                    data: {
                        url(node) {
                            // console.log('init_jstree > url node:', node);
                            return self.apiUrl + '/entity/aimstr/selectListForAiTree';
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
                    ai: {
                        icon: 'ti-file',
                    },
                },
                // search: {
                //     case_sensitive: false,
                //     show_only_matches: true,
                // },
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

    refreshJsTree() {
        $(this.tree.nativeElement).jstree(true).refresh();
    }

    unSelectAll() {
        $(this.tree.nativeElement).jstree('deselect_all');
    }
}
