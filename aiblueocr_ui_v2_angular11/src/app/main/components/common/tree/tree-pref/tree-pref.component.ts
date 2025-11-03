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
import swal from 'sweetalert2/dist/sweetalert2.js';

import { CommFunction } from '../../../../../shared/services';

declare var $: any;

@Component({
    selector: 'app-tree-pref',
    templateUrl: './tree-pref.component.html',
})
export class TreePrefComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedItems = [];

    @ViewChild('appPrefTree') appPrefTree: ElementRef;

    @Input() _PREF_ID: any;
    @Output() selected = new EventEmitter<any>();

    constructor(private cf: CommFunction, @Inject(API_URL_TOKEN) public apiUrl0: string) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {
        this._PREF_ID = this.cf.nvl(this._PREF_ID, '');
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        this.initJstree();
    }

    /**
     * public
     */
    public refresh() {
        const $treeview = this.appPrefTree.nativeElement;
        $($treeview).jstree(true).refresh();
    }

    /**
     * jstree
     */

    initJstree() {
        const self = this;
        const $treeview = this.appPrefTree.nativeElement;

        $($treeview)
            .jstree({
                core: {
                    check_callback: false,
                    data: {
                        url(node) {
                            // console.log('init_jstree > url node:', node);
                            return self.apiUrl + '/model/prefmstr/selectListForPrefTree';
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
                    // typePref: {
                    //     icon: 'ti-folder',
                    // },
                    pref: {
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
                // $($treeview + " li[id=" + 1007 + "] a").click();
                // $($treeview).jstree(true).select_node('1007');

                // const id = '10070';
            })
            .on('select_node.jstree', function (event, data) {
                // console.log('@@@@@@@@@@@@@select_node.jstree', data.node.original, data.node.id);

                // console.log(event);
                // console.log(data);

                self.selected.emit(data.node.original);
            })
            .on('loaded.jstree', function (e, data) {
                // $($treeview).jstree('select_node', '#T1000', true);

                if (self._PREF_ID !== '') {
                    // console.log(
                    //     '##########################self._PREF_ID###########',
                    //     self._PREF_ID
                    // );
                    let isSelected = false;
                    const interval_id = setInterval(() => {
                        const id = $($treeview).jstree(true).get_node(self._PREF_ID).id;
                        if (id) {
                            // console.log(
                            //     '##########################this._PREF_ID###########',
                            //     self._PREF_ID
                            // );
                            // "exit" the interval loop with clearInterval command
                            clearInterval(interval_id);
                            isSelected = true;
                            // since the node is loaded, now we can open it without an error
                            // $($treeview).jstree('select_node', '#' + self._PREF_ID, true);
                            $($treeview).jstree(true).select_node(self._PREF_ID, true);
                        }
                    }, 5);

                    // 10초 후에 정지
                    setTimeout(() => {
                        if (!isSelected) {
                            clearInterval(interval_id);
                            swal.fire(
                                '[Timeout] [선호도ID: ' +
                                    self._PREF_ID +
                                    '] 해당 선호도를 찾을 수 없습니다.',
                                '',
                                'warning'
                            );
                        }
                    }, 5000);
                    // let interval_id = setInterval(function () {
                    //     // const obj = $('li#' + this._PREF_ID);
                    //     // console.log('obj:::::%%%%%%%%%%%%%%%', obj.text(), obj);
                    //     // $("li#"+id).length will be zero until the node is loaded
                    // }, 5);
                }
            });

        // $(this.tree.nativeElement).bind('select_node.jstree', function (event, data) {
        //     console.log('select_node.jstree', data.node.original, data.node.id);
        //     console.log(event);
        //     console.log(data);
        //     self.selected.emit(data.node.original);
        // });
        // $(this.tree.nativeElement).on('loaded.jstree', function() {
        //     console.log('loaded.jstree');
        //     $(this.tree.nativeElement).jstree(true).select_node('1007');
        //     //$($treeview).jstree('select_node', '#1007');
        //     //$($treeview + " li[id=" + 1007 + "] a").click();
        // });
        // if (self._PREF_ID !== null && self._PREF_ID !== '')
        // $(this.tree.nativeElement).jstree('select_node', 1007);
    }
    destroyJstree() {
        $(this.appPrefTree.nativeElement).jstree('destroy');
    }
}
