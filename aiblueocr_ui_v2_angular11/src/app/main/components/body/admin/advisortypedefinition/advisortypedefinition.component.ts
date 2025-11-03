import { HttpParams } from '@angular/common/http';
import {
    AfterContentInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { ConsoleReporter } from 'jasmine';
// import { first } from 'rxjs/operators';
// import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
// import { jqxDropDownButtonComponent } from 'jqwidgets-ng/jqxdropdownbutton';
import swal from 'sweetalert2/dist/sweetalert2.js';

import { LoggerService } from '../../../../../shared/services';
import { CommFunction } from '../../../../../shared/services';
import { ApigatewayService } from '../../../../../shared/services/apigateway/apigateway.service';
import { PageComponent } from '../../../../components/page/page.component';
const javascripts = [
    './assets/resources/belltechsoft/advisortypedefinition/advisortypedefinition.js',
    './assets/resources/js/scripts.js',
];
// import * as $ from 'jquery';

// declare var createIBSheet2: any;
// declare var IBS_InitSheet: any;

declare var $: any;
declare let common: any;
declare let window: any;

@Component({
    selector: 'app-advisortypedefinition',
    templateUrl: './advisortypedefinition.component.html',
    styleUrls: ['./advisortypedefinition.component.scss'],
})
export class AdvisorTypeDefinitionComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private apigatewayService: ApigatewayService,
        private logger: LoggerService,
        private cf: CommFunction
    ) {
        window.AdvisorTypeDefinitionComponent = this;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // RELOAD로 설정했기 때문에 동일한 라우트로 요청이 되더라도
            // 네비게이션 이벤트가 발생한다.
            if (e instanceof NavigationEnd) {
                this.initialiseInvites();
            }
        });
    }
    navigationSubscription: any;
    params: HttpParams;

    TYPE_KEY: any = 'SEGMENT';
    treeData: any = [];
    typeinfo: any = {};
    selectedFldId: any = '';
    selectedNode: any = '';

    initialiseInvites() {}

    ngOnInit() {
        // 차트 데모 로드
        setTimeout(() => {
            // window.AdvisorTypeDefinitionComponent.loadScript();
        });

        this.init_jstree();
        this.tab(this.TYPE_KEY);
    }

    ngOnDestroy() {
        // 이벤트 해지
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    /*공통 스크립트 로드*/
    public loadScript() {
        for (let i = 0; i < javascripts.length; i++) {
            const node = document.createElement('script');
            node.src = javascripts[i];
            node.type = 'text/javascript';
            node.async = true;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    public tab(type) {
        // console.log('type::::', type);
        this.TYPE_KEY = type;
        this.search();
    }

    public clearSelectedData() {
        this.selectedFldId = '';
        this.selectedNode = '';
        this.typeinfo = '';
    }
    public search() {
        this.clearSelectedData();
        this.treeData = '';
        this.destroy_jstree();

        this.params = this.cf.toHttpParams({
            TYPE_KEY: this.TYPE_KEY,
        });

        const serviceUrl = 'admin/typedef/selectTreeList';

        this.apigatewayService.doGetPromise(serviceUrl, this.params).then(
            (resultData: any) => {
                if (resultData.code === 200) {
                    // console.log('resultData.code 200');
                    this.treeData = resultData.data.list;
                    this.refresh_jstree();
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
            }
        );
    }

    // 클릭시-move제외
    public nodeClick() {
        // console.log('nodeClick::::::::::::');
        this.selectedFldId = $('#clickFldIdBtn').val();
        this.selectedNode = this.getnode_jtree(this.selectedFldId);
        this.typeinfo = this.selectedNode.original;
        this.typeinfo.TYPE_KEY = this.TYPE_KEY;

        // console.log('nodeClick::::this.selectedFldId::::::::', this.selectedFldId);
        // console.log('nodeClick:::::::::this.selectedNode:::', this.selectedNode);
        // console.log('nodeClick:::::::::this.typeinfo:::', this.typeinfo);

        // console.log('click_node', $('#clickFldId').val());
        // const clickFldId = $('#clickFldId').val();
        // console.log('click_node clickFldId', clickFldId);
        // console.log('click_node this.treeData', this.treeData);
        // const item = this.treeData.filter(x => x.FLD_ID === Number(this.selectedFldId));
        // console.log('click_node item', item);
        // this.typeinfo = item[0];
        // this.typeinfo.FLD_PARENT_ID_TXT = item[0].FLD_NM;
    }

    // 새폴더 트리 추가, 저장
    public insert() {
        // console.log('insert::::::::::::');
        // swal.fire({
        //     title: '저장 하시겠습니까?',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: '예',
        //     cancelButtonText: '아니요',
        // }).then(result => {
        //     if (result.value) {
        const id: any = 'XXXXXX';
        const text: any = '새폴더';
        const parent: any = this.selectedFldId === '' ? '#' : this.selectedFldId;

        this.add_jtree(id, text, parent);
        // this.save(id, text, parent);
        const serviceUrl = 'admin/typedef/insert';
        this.params = this.cf.toHttpParams({});
        const infoData: any = {
            TYPE_KEY: this.TYPE_KEY,
            id: '',
            text: '',
            parent,
            FLD_ID: '',
            FLD_NM: text,
            FLD_PARENT_ID: parent === '#' ? '0' : parent,
        };
        this.apigatewayService.doPostPromise(serviceUrl, infoData, this.params).then(
            (resultData: any) => {
                // body = result;
                if (resultData.code === 201) {
                    // console.log('save resultData.data.typeinfo', resultData.data.typeinfo);
                    // const node: any = this.getnode_jtree(id);
                    // $('#definitionTree01').jstree(true).set_id(node, resultData.data.typeinfo.id);
                    // $('#definitionTree01')
                    //     .jstree(true)
                    //     .set_text(node, resultData.data.typeinfo.text);
                    // // $('#definitionTree01').jstree(true).settings.core.data = data;
                    // $('#definitionTree01').jstree(true).refresh();
                    // this.opennode_jstree(resultData.data.typeinfo.parent);
                    // this.edit_jtree();
                    this.search();
                } else {
                    swal.fire(resultData.msg, '', 'warning');
                    this.delete_jtree(id);
                }
            },
            error => {
                this.logger.debug(JSON.stringify(error, null, 4));
                swal.fire('저장이 실패하였습니다.', '', 'error');
                this.delete_jtree(id);
            }
        );
    }

    // 노드 삭제
    public delete() {
        // console.log('delete:::::::', this.selectedFldId);
        if (this.cf.nvl(this.selectedFldId, '') !== '') {
            const chld: any = this.selectedNode.children.length; // this.children_jtree(this.selectedFldId);
            // console.log('deleteFoder children_jtree', chld);
            if (chld > 0) {
                swal.fire('하위항목이 있으므로 삭제할 수 없습니다.', '', 'warning');
                return false;
            }

            swal.fire({
                title: '삭제 하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '예',
                cancelButtonText: '아니요',
            }).then(
                result => {
                    if (result.value) {
                        // 하위폴더 확인
                        const serviceUrl = 'admin/typedef/delete';
                        this.params = this.cf.toHttpParams({});

                        this.apigatewayService
                            .doPostPromise(serviceUrl, this.typeinfo, this.params)
                            .then((resultData: any) => {
                                // body = result;
                                if (resultData.code === 201) {
                                    // swal.fire('삭제 되었습니다.', '', 'success');
                                    // this.delete_jtree(this.selectedFldId);
                                    // $('#definitionTree01').jstree(true).refresh();
                                    // this.clearSelectedData();
                                    this.search();
                                } else {
                                    swal.fire(resultData.msg, '', 'warning');
                                }
                            });
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('삭제 실패하였습니다.', '', 'error');
                }
            );
        } else {
            swal.fire('삭제할 항목을 선택하십시오.', '', 'warning');
            return false;
        }
    }
    // 노드명 수정
    public updateName() {
        // console.log('updateName:::::::', this.selectedFldId);
        if (this.cf.nvl(this.selectedFldId, '') !== '') {
            // swal.fire({
            //     title: '수정 하시겠습니까?',
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonText: '예',
            //     cancelButtonText: '아니요',
            // }).then(result => {
            // if (result.value) {
            // this.delete_jtree(this.selectedFldId);

            const serviceUrl = 'admin/typedef/updateName';
            this.params = this.cf.toHttpParams({});
            this.typeinfo.FLD_NM = this.selectedNode.text;

            this.apigatewayService.doPostPromise(serviceUrl, this.typeinfo, this.params).then(
                (resultData: any) => {
                    // body = result;
                    if (resultData.code === 201) {
                        // swal.fire('저장 되었습니다.', '', 'success');
                    } else {
                        swal.fire(resultData.msg, '', 'warning');
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('수정이 실패하였습니다.', '', 'error');
                }
            );
            // }
            // });
        } else {
            // swal.fire('수정할 항목을 선택하십시오.', '', 'warning');
            return false;
        }
    }

    // 노드 이동
    public updatePos() {
        //
        // console.log('updatePos:::::::', this.selectedFldId, this.selectedNode, this.typeinfo);

        if (this.cf.nvl(this.selectedFldId, '') !== '') {
            const data: any = JSON.parse($('#moveFldIdBtn').val());
            // console.log('updatePos:::data::::', data);
            if (data.position === data.old_position && data.parent === data.old_parent) {
                return false;
            }
            const serviceUrl = 'admin/typedef/updatePos';
            this.params = this.cf.toHttpParams({});
            this.typeinfo.FLD_PARENT_ID = data.parent === '#' ? 0 : data.parent; // 0으로 변환
            this.typeinfo.FLD_ORDINAL = data.position + 1;
            this.typeinfo.OLD_FLD_ORDINAL = data.old_position + 1;

            this.apigatewayService.doPostPromise(serviceUrl, this.typeinfo, this.params).then(
                (resultData: any) => {
                    // body = result;
                    if (resultData.code === 201) {
                        // swal.fire('저장 되었습니다.', '', 'success');
                    } else {
                        swal.fire(resultData.msg, '', 'warning');
                    }
                },
                error => {
                    this.logger.debug(JSON.stringify(error, null, 4));
                    swal.fire('저장이 실패하였습니다.', '', 'error');
                    this.search();
                }
            );
            //     }
            // });
        } else {
            // swal.fire('수정할 항목을 선택하십시오.', '', 'warning');
            return false;
        }
    }

    destroy_jstree() {
        $('#definitionTree01').jstree('destroy');
    }

    init_jstree() {
        // console.log('init_jstree');
        const $treeview = $('#definitionTree01');

        $treeview
            .jstree({
                core: {
                    check_callback: true,
                    // data: this.treeData,
                },
                plugins: ['types', 'dnd', 'search'],
                types: {
                    default: {
                        icon: 'ti-folder',
                    },
                },
                search: {
                    case_sensitive: false,
                    show_only_matches: true,
                },
            })
            .on('ready.jstree', function () {
                $treeview.jstree('open_all');
            });
        // $('#definitionTree01').jstree('open_all');
    }

    refresh_jstree() {
        this.init_jstree();
        // console.log('refresh_jstree typeinfo', this.typeinfo);
        $('#definitionTree01').jstree(true).settings.core.data = this.treeData;
        $('#definitionTree01').jstree(true).refresh();
        $('#definitionTree01').bind('select_node.jstree', function (evt, data) {
            // console.log('select_node.jstree', data.node.original);
            const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            clickFldIdBtn.val(data.node.original.FLD_ID);
            clickFldIdBtn.click(); // nodeClick()
        });
        // $('#definitionTree01').bind('activate_node.jstree', function (event, data) {
        //     console.log('activate_node.jstree');
        //     if (data === undefined || data.node === undefined || data.node.id === undefined) return;
        //     const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
        //     clickFldIdBtn.val(data.node.original.FLD_ID);
        //     clickFldIdBtn.click();
        // });
        // $('#definitionTree01').bind('click.jstree', function (event) {
        //     console.log('click.jstree');
        //     // if (data === undefined || data.node === undefined || data.node.id === undefined) return;
        //     const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
        //     // clickFldIdBtn.val(data.node.original.FLD_ID);
        //     clickFldIdBtn.click();
        // });
        $('#definitionTree01').bind('dblclick.jstree', function (event) {
            const node = $(event.target).closest('li');
            const data = node.data('jstree');
            // console.log('dblclick.jstree node data', data);
            const dblClickFldIdBtn: any = $('#dblClickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            dblClickFldIdBtn.click(); // edit_jtree()
        });
        $('#definitionTree01').bind('move_node.jstree', function (evt, data) {
            // console.log('move_node.jstree data', data);
            const clickFldIdBtn: any = $('#clickFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            clickFldIdBtn.val(data.node.original.FLD_ID);
            clickFldIdBtn.click(); // nodeClick()
            const moveFldIdBtn: any = $('#moveFldIdBtn'); // window.opener.document.getElementById('clickFldId');
            // moveFldIdBtn.val(JSON.stringify(data));
            moveFldIdBtn.val(
                JSON.stringify({
                    position: data.position,
                    old_position: data.old_position,
                    parent: data.parent,
                    old_parent: data.old_parent,
                })
            );
            moveFldIdBtn.click(); // updatePos()
            // selected node object: data.node;
            // this.typeinfo = data.node.original;
            // this.typeinfo.FLD_PARENT_ID = data.parent === '#' ? 0 : data.parent; // 0으로 변환
            // this.typeinfo.FLD_ORDINAL = data.position;
        });
        $('#definitionTree01').on('rename_node.jstree', function (e, data) {
            // console.log('rename_node.jstree::::::data.old, data.text:::', data.old, data.text);
            if (data.text !== data.old) {
                $('#editFldIdBtn').click(); // updateName()
            }
            // else if (true) {}; (obj.text!==obj.old) updateDB(obj.node, 'rename');
        });
        // $('#definitionTree01').on('loaded.jstree', function () {
        //     console.log('loaded.jstree::::::');
        //     $('#definitionTree01').jstree('open_all');
        // });

        // this.openall_jstree();
    }
    //  하위노드 리턴
    children_jtree(id: any) {
        return this.getnode_jtree(id).children;
    }
    // 노드 삭제
    delete_jtree(id: any) {
        $('#definitionTree01')
            .jstree()
            .delete_node($('#' + id));
    }
    // 노드명 수정모드
    edit_jtree() {
        $('#definitionTree01').jstree(true).edit(this.selectedFldId);
    }
    // 선택된 노드 하위에 노드 추가
    add_jtree(id: any, text: any, parent: any) {
        $('#definitionTree01')
            .jstree()
            .create_node(
                parent,
                {
                    id,
                    text,
                },
                'last',
                function () {}
                // function (new_node) {
                //     $('#definitionTree01').jstree(
                //         'open_node',
                //         $('#definitionTree01').jstree('get_selected')
                //     );
                //     const inst = $.jstree.reference(new_node);
                //     inst.edit(new_node);
                // }
            );
    }
    // 선택된 노드 데이터
    getnode_jtree(id: any) {
        return $('#definitionTree01').jstree(true).get_node(id);
    }
    opennode_jstree(id: any) {
        // console.log('opennode_jstree::::::::::', id);
        $('#definitionTree01').jstree('open_node', id);
    }
    openall_jstree() {
        $('#definitionTree01').jstree('open_all');
    }
}

$(document).ready(function () {});
