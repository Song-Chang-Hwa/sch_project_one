import {
    AfterViewInit,
    Component,
    ElementRef,
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
    selector: 'app-tree-manual-checkable',
    templateUrl: './tree-manual-checkable.component.html',
    styleUrls: ['./tree-manual-checkable.component.scss'],
})
export class TreeManualCheckableComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedItems = [];

    @ViewChild('tree') tree: ElementRef;

    @Input() exceptItemList: any[];

    @Output() selected = new EventEmitter<any>();
    @Output() deselected = new EventEmitter<any>();

    constructor(@Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {
        // console.log('TreeManualCheckableComponent', this.exceptItemList);
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        this.initJstree();
    }

    /**
     * public
     */
    public refresh() {
        const $treeview = this.tree.nativeElement;
        $($treeview).jstree(true).refresh();
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

                            let exceptItemId = 'exceptItemId=';
                            if (self.exceptItemList) {
                                for (let i = 0; i < self.exceptItemList.length; i++) {
                                    const item = self.exceptItemList[i];
                                    if (item.RECO_TYPE === '30') {
                                        const itemId = item.RECO_ID;
                                        if (exceptItemId === 'exceptItemId=') {
                                            exceptItemId += itemId;
                                        } else {
                                            exceptItemId += ',' + itemId;
                                        }
                                    }
                                }
                            }

                            return (
                                self.apiUrl +
                                '/model/manualmstr/selectListForManualCheckableTree?' +
                                exceptItemId
                            );
                        },
                        data(node) {
                            // console.log('init_jstree > data node:', node);
                            return { id: node.id };
                        },
                    },
                },
                plugins: ['types', 'checkbox'],
                types: {
                    // default: {
                    //     icon: 'ti-file',
                    // },
                    // typeManual: {
                    //     icon: 'ti-folder',
                    // },
                    manual: {
                        icon: 'ti-file',
                    },
                },
                // checkbox: {
                //     three_state: true,
                // },
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

            // 모든 하위 노드의 original 목록 생성
            const originalList = self.getAllOriginalList(data.node.id);

            // 기존 선택 목록에서 중복 제거
            const notDuplicateList: any[] = [];
            for (let i = 0; i < self.selectedItems.length; i++) {
                const item = self.selectedItems[i];

                let isExist = false;
                for (let j = 0; j < originalList.length; j++) {
                    const original = originalList[j];
                    if (original.id === item.id) {
                        isExist = true;
                        break;
                    }
                }

                if (!isExist) {
                    notDuplicateList.push(item);
                }
            }

            self.selectedItems = notDuplicateList.concat(originalList);
            self.selected.emit(self.selectedItems);
        });

        $(this.tree.nativeElement).bind('deselect_node.jstree', function (event, data) {
            // console.log('deselect_node.jstree', data.node.original, data.node.id);

            // console.log(event);
            // console.log(data);

            const originalList = self.getAllOriginalList(data.node.id);

            const newList: any[] = [];
            for (let i = 0; i < self.selectedItems.length; i++) {
                const item = self.selectedItems[i];

                let isDeselect = false;
                for (let j = 0; j < originalList.length; j++) {
                    const original = originalList[j];
                    if (original.id === item.id) {
                        isDeselect = true;
                        break;
                    }
                }

                if (!isDeselect) {
                    newList.push(item);
                }
            }

            self.selectedItems = newList;
            self.deselected.emit(self.selectedItems);
        });
    }

    destroyJstree() {
        $(this.tree.nativeElement).jstree('destroy');
    }

    getAllOriginalList(nodeId) {
        const nodeIdList = this.getAllChildrenNodeIdListOf(nodeId);
        // console.log('nodeIdList: ', nodeIdList);
        const originalList = this.getOriginalListFrom(nodeIdList);
        // console.log('originalList: ', originalList);

        return originalList;
    }

    getOriginalListFrom(nodeIdList: string[]) {
        const $tree = $(this.tree.nativeElement).jstree(true);

        const list: any[] = [];
        for (let i = 0; i < nodeIdList.length; i++) {
            const nodeId = nodeIdList[i];
            const original = $tree.get_node(nodeId).original;
            list.push(original);
        }

        return list;
    }

    getAllChildrenNodeIdListOf(nodeId) {
        let list: any[] = [];

        const node = $(this.tree.nativeElement).jstree(true).get_node(nodeId);
        // console.log('node: ', node);

        if (nodeId.startsWith('T')) {
            for (let i = 0; i < node.children.length; i++) {
                const childNodeId = node.children[i];

                if (childNodeId.startsWith('T')) {
                    const nodeIdList = this.getAllChildrenNodeIdListOf(childNodeId);
                    list = list.concat(nodeIdList);
                } else {
                    list.push(childNodeId);
                }
            }
        } else {
            list.push(nodeId);
        }

        return list;
    }
}
