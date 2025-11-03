'use strict';

var app = angular.module('sbAdminApp');

// 모달템플릿을 제공하는 디렉티브
app.directive('modal', function () {
    return {
      template: 
    	'<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content" ng-transclude>' + 
              /*'<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + */
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
	};
});

// 메시지 박스 (오류 팝업, 삭제여부확인, 저장여부확인 등에 사용한다.)
app.directive('msg', function () {
    return {
    	template: 
        	'<div class="modal fade">' + 
              '<div class="modal-dialog">' + 
                '<div class="modal-content">' + 
                  '<div class="modal-header">' + 
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                    '<h4 class="modal-title">{{ title }}</h4>' + 
                  '</div>' + 
                  '<div class="modal-body">' +
                  	'<div class="form-group">' +
                  	  '<label>{{msg}}</label>' +
    		        '</div>' +
    		        '<div ng-show="err_msg != null" class="form-group has-error">' + 
				      '<label class="control-label" for="inputError">{{ err_msg }}</label>' + 
				    '</div>' + 
                  '</div>' + 
                  '<div class="modal-footer">' +
                    '<button ng-show="show_confirm_btn == true" type="button" class="btn btn-primary" ng-click="confirm()">확인</button>' +
                    '<button ng-show="show_save_btn == true" type="button" class="btn btn-primary" ng-click="save()">저장</button>' +
                    '<button ng-show="show_del_btn == true" type="button" class="btn btn-primary" ng-click="del()">삭제</button>' +
              	    '<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>' +
                  '</div>' +
                '</div>' + 
              '</div>' + 
            '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
	};
});

//저장,수정 처리 모달
app.directive('saveModal', function () {
    return {
    	template: 
        	'<div class="modal fade">' + 
              '<div class="modal-dialog">' + 
                '<div class="modal-content">' + 
                  '<div class="modal-header">' + 
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                    '<h4 class="modal-title">{{ saveModalTitle }}</h4>' + 
                  '</div>' + 
                  '<div class="modal-body">' +
                  	'<form class="form-horizontal" role="form">' +
                  	  '<div class="form-group" data-ng-repeat="row in list">' +
                  	    '<label class="control-label col-sm-3" >{{row.displayName}}</label>' +
				        '<div class="col-sm-8">' +
				          '<input class="form-control" ng-model="inputData[row.name]" type="{{row.type}}">' +
				        '</div>' +
                  	  '</div>' +
//                  	'<div class="form-group">' +
//              	    '<label class="control-label col-sm-3" >{{inputData.EMP_ID.$invalid}}</label>' +
//              	  '</div>' +
				    '</form>' + 
				    '<div ng-show="err_msg != null" class="form-group has-error">' + 
				      '<label class="control-label" for="inputError">{{ err_msg }}</label>' + 
				    '</div>' + 
                  '</div>' + 
                  '<div class="modal-footer">' +
                    '<button ng-show="show_confirm_btn == true" type="button" class="btn btn-primary" ng-click="confirm()">확인</button>' +
                    '<button ng-show="show_save_btn == true" type="button" class="btn btn-primary" ng-click="save()">저장</button>' +
                    '<button ng-show="show_btn == true" type="button" class="btn btn-primary" ng-click="mod.func()">{{mod.btn_name}}</button>' +
                    '<button ng-show="show_del_btn == true" type="button" class="btn btn-primary" ng-click="del()">삭제</button>' +
                    '<button ng-show="show_add_btn == true" type="button" class="btn btn-primary" ng-click="add()">생성</button>' +
              	    '<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>' +
                  '</div>' +
                '</div>' + 
              '</div>' + 
            '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
	};
});
