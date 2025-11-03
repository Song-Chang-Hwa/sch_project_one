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
    selector: 'app-tree-layout-checkable',
    templateUrl: './tree-layout-checkable.component.html',
    styleUrls: ['./tree-layout-checkable.component.scss'],
})
export class TreeLayoutCheckableComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = '0';

    // selectedNodes = [];
    selectedNodesList = [];
    treeData: any = [];

    @ViewChild('tree') tree: ElementRef;

    @Input() isCheckboxShown = false;
    @Input() exceptLayoutIdList: any[];
    @Output() selected = new EventEmitter<any>();
    @Output() unselected = new EventEmitter<any>();

    constructor(
        @Inject(API_URL_TOKEN) public apiUrl0: string,
        private logger: LoggerService,
        private apigatewayService: ApigatewayService
    ) {
        this.apiUrl = apiUrl0;
    }

    ngOnInit() {
        // console.log('app-tree-layout-checkable ngOnInit ', this.inputLayoutList);
        // this.inputLayoutList = this.inputLayoutList.split(',');
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        // console.log(
        //     'TreeLayoutCheckableComponent ngAfterViewInit isCheckboxShown: ',
        //     this.isCheckboxShown
        // );
        // console.log(
        //     'TreeLayoutCheckableComponent ngAfterViewInit exceptLayoutIdList 1: ',
        //     this.exceptLayoutIdList
        // );
        // console.log('inputModelList 2: ', this.inputModelList);
        // this.initJstree();
        this.search();
    }

    public search() {
        this.treeData = [];
        const $treeview = this.tree.nativeElement;

        let exceptLayoutId = 'exceptLayoutId=';
        if (this.exceptLayoutIdList) {
            for (let i = 0; i < this.exceptLayoutIdList.length; i++) {
                const layoutId = this.exceptLayoutIdList[i];
                if (0 === i) {
                    exceptLayoutId += layoutId;
                } else {
                    exceptLayoutId += ',' + layoutId;
                }
            }
        }
        const serviceUrl = 'entity/layoutmstr/selectListForLayoutCheckableTree?' + exceptLayoutId;
        this.apigatewayService.doGetPromise(serviceUrl, null).then(
            (resultData: any) => {
                // if (resultData.code === 200) {
                // console.log('search() resultData.code 200', resultData);
                this.treeData = resultData;
                this.initJstree();
                // $(this.tree.nativeElement).jstree(true).refresh();
                //    }
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
                    // typeItem: {
                    //     icon: 'ti-folder',
                    // },
                    layout: {
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
                // setTimeout(() => {
                // $($treeview).jstree(true).select_node(self.inputLayoutList);
                // $('.lvl4').find('ins.jstree-checkbox').hide();
                // });
            });
        // .on('loaded.jstree', function (e, data) {
        //     console.log('loaded.jstree', self.inputModelList);

        // })

        $(this.tree.nativeElement).bind('select_node.jstree', function (event, data) {
            // console.log(
            //     'select_node.jstree##############',
            //     $($treeview).jstree('get_checked', null, true)
            // );
            self.selectedNodesList = $($treeview).jstree('get_checked', null, true);
            // console.log('select_node.jstree', self.selectedNodesList);
            // const node = data.node.original;
            // // if (!node.id.startsWith('T')) {
            // self.onLayoutTreeSelected(node);
            // }
        });
        $(this.tree.nativeElement).bind('deselect_node.jstree', function (event, data) {
            self.selectedNodesList = $($treeview).jstree('get_checked', null, true);
            // console.log('deselect_node.jstree', self.selectedNodesList);
            // console.log(
            //     'deselect_node.jstree##############',
            //     $($treeview).jstree('get_checked', null, true)
            // );
            // const node = data.node.original;
            // if (!node.id.startsWith('T')) {
            // self.onLayoutTreeUnSelected(data.node.original);
            // }
        });
    }

    getSelectedLayoutList() {
        // console.log(
        //     'getSelectedLayoutList##########this.selectedNodesList',
        //     this.selectedNodesList
        // );
        const result: any = [];
        this.selectedNodesList.forEach(item => {
            // 레이아웃만
            if (!item.startsWith('T')) {
                result.push(this.treeData.filter(d => d.id === item)[0]);
            }
        });
        // console.log('getSelectedLayoutList##########result', result);
        return result;
    }
    // onLayoutTreeSelected(selectedItem: any) {
    //     this.selectedNodesList = this.selectedNodesList.filter(x => x.id !== selectedItem.id);
    //     this.selectedNodesList.push(selectedItem);
    //     // console.log('onLayoutTreeSelected#####', this.selectedNodesList);
    // }
    // onLayoutTreeUnSelected(selectedItem: any) {
    //     // console.log('modal-layout#############onLayoutTreeUnSelected', selectedItem);
    //     this.selectedNodesList = this.selectedNodesList.filter(x => x.id !== selectedItem.id);
    //     // console.log('onLayoutTreeUnSelected#####', this.selectedNodesList);
    // }
    destroyJstree() {
        $(this.tree.nativeElement).jstree('destroy');
    }
}
