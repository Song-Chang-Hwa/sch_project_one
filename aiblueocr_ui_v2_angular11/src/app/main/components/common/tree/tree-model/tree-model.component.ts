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

import { LoggerService } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';

declare var $: any;

@Component({
    selector: 'app-tree-model',
    templateUrl: './tree-model.component.html',
    styleUrls: ['./tree-model.component.scss'],
})
export class TreeModelComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    selectedIdList = [];
    treeData: any = [];

    @ViewChild('tree') tree: ElementRef;

    @Input() isCheckboxShown: any;
    @Input() exceptItemList: any[];

    @Output() selected = new EventEmitter<any>();
    @Output() unselected = new EventEmitter<any>();

    constructor(
        @Inject(API_URL_TOKEN) public apiUrl0: string,
        private logger: LoggerService,
        private apigatewayService: ApigatewayService
    ) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {
        // this.inputModelList = this.inputModelList.split(',');
        this.exceptItemList.forEach(data => {
            this.selectedIdList.push(data.id);
        });
        // console.log('TreeModelComponent ngAfterViewInit isCheckboxShown: ', this.isCheckboxShown);
        // console.log('TreeModelComponent ngAfterViewInit inputModelList 1: ', this.inputModelList);
        // console.log('inputModelList 2: ', this.inputModelList);
        // this.initJstree();
        this.search();
    }

    public search() {
        this.treeData = '';

        const serviceUrl = 'model/aimodel/selectListForAiModelTree';
        const $treeview = this.tree.nativeElement;

        this.apigatewayService.doGetPromise(serviceUrl, null).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('search() resultData.code 200', resultData);
                    this.treeData = resultData.data.list;
                    this.initJstree();
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }
    /**
     * jstree
     */

    initJstree() {
        const self = this;

        const plugins = ['types'];

        if (this.isCheckboxShown) {
            plugins.push('checkbox');
        }

        const $treeview = this.tree.nativeElement;

        $($treeview)
            .jstree({
                core: {
                    check_callback: true,
                    data: this.treeData,
                },
                plugins, // ['types', 'checkbox'],
                types: {
                    // default: {
                    //     icon: 'ti-file',
                    // },
                    typeItem: {
                        icon: 'ti-folder',
                    },
                    item: {
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
                setTimeout(() => {
                    $($treeview).jstree(true).select_node(self.selectedIdList);
                });
            });
        // .on('loaded.jstree', function (e, data) {
        //     console.log('loaded.jstree', self.inputModelList);

        // })

        $(this.tree.nativeElement).bind('select_node.jstree', function (event, data) {
            // self.logger.debug('select_node.jstree 1 data.node.original', data.node.original);
            const idlist = $($treeview).jstree('get_checked', null, true);
            // self.logger.debug('select_node.jstree 2 idlist', idlist);
            idlist.forEach(x => {
                const item = $($treeview).jstree(true).get_node(x);
                if (item.type === 'item') self.selected.emit(item.original);
                // if (data.node.original.type === 'item') self.selected.emit(data.node.original);
                // console.log('select_node self.selectedNodesList', self.selectedNodesList);
            });
            // const type = data.node.original.type;
            // const id = data.node.original.id;
            // if (type === 'item') {
            //     self.selected.emit(data.node.original);
            // } else if (type === 'typeAi') {
            //     // const idlist = $($treeview).jstree('get_checked', null, true);
            //     const idlist = $($treeview).jstree().get_node(id).children;
            //     // if (type === 'typeItem') {
            //     //     idlist = $($treeview).jstree().get_node(id).children;
            //     // }
            //     self.logger.debug('select_node.jstree 2 idlist', idlist);
            //     idlist.forEach(x => {
            //         const item = $($treeview).jstree(true).get_node(x);
            //         if (item.type === 'item') self.selected.emit(item);
            //         // if (data.node.original.type === 'item') self.selected.emit(data.node.original);
            //         // console.log('select_node self.selectedNodesList', self.selectedNodesList);
            //     });
            // }
        });

        $(this.tree.nativeElement).bind('deselect_node.jstree', function (event, data) {
            // self.logger.debug('deselect_node.jstree', data.node.original);
            const type = data.node.original.type;
            const id = data.node.original.id;
            if (type === 'item') {
                self.unselected.emit(data.node.original);
            } else {
                // const idlist = $($treeview).jstree('get_checked', null, true);
                const idlist = $($treeview).jstree().get_node(id).children;
                idlist.forEach(x => {
                    const item = $($treeview).jstree(true).get_node(x);
                    if (item.type === 'item') self.unselected.emit(item.original);
                    else {
                        const idlist1 = $($treeview).jstree().get_node(item.id).children;
                        idlist1.forEach(y => {
                            const item = $($treeview).jstree(true).get_node(y);
                            if (item.type === 'item') self.unselected.emit(item.original);
                        });
                    }
                });
            }
        });
    }

    destroyJstree() {
        $(this.tree.nativeElement).jstree('destroy');
    }
}
