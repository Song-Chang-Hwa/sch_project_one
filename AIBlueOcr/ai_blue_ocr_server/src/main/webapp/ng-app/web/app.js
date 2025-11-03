'use strict';

var app = angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'underscore',
    'dx'
  ])
  .directive('dynamicController', ['$controller', function($controller) {
    return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                    
                var locals = {
                    $scope: scope,
                    $element: element,
                    $attrs: attrs
                };
                
                element.data('$Controller', $controller(scope.$eval(attrs.dynamicController), locals));                       
            }
        };
    }
])
  .factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })
  .directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });
      
      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        element.off(attr.eventFocus);
      });
    };
  })
  .provider('runtimeStates', function runtimeStates($stateProvider) {
	  // runtime dependencies for the service can be injected here, at the provider.$get() function.
	  this.$get = function($q, $timeout, $state) { // for example
		  return {
			  addState: function(name, state) {
				  var stateParam = {
					views : {
						"main" : state
					}
				  };
				  $stateProvider.state(name, stateParam, {cache: false});
			  }
		  }
	  }
  })
  .config(function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider) {

	var header = {
	  'Content-Type': 'application/json;charset=utf-8',
      'X-CSRF-TOKEN': $("meta[name='_csrf']").attr("content")
	};

	$httpProvider.defaults.headers["post"] = header;
	$httpProvider.defaults.headers["put"] = header;
	$httpProvider.defaults.headers["delete"] = header;

	$httpProvider.interceptors.push(function($q, $injector, $window) {
		return {
			'responseError': function(rejection) {
				if (rejection.status == '401') {
					$injector.get('$state').transitionTo('login');
				} else if (rejection.status == '403') {
					$injector.get('$state').transitionTo('login');
				} else if (rejection.status == '404') {
					$injector.get('$state').transitionTo('eis.404');
				}
				return $q.reject(rejection);
			}
		};
  	});

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/main');

    $stateProvider
    
	    .state('login', {
	        url: '/login',
	        templateUrl: 'login'
	    })
    
	    .state('eis', {
	        url: '/main',
	        templateUrl: 'web/main'
	    })
	    
	    .state('eis.home', {
	    	views : {
		    	"main" : {
			        url: '/home',
			        templateUrl: 'ng-app/web/home/home.html',
			        resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/home/home.js']
				            })                                                      
				    	}                                                         
				    }
		    	}
	    	}
	    })
	    
	    .state('eis.auth_group', {       
	    	views : {
		    	"main" : {
				    url: '/auth_group',                                             
				    templateUrl: 'ng-app/web/auth_group/auth_group.html',                                  
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/auth_group/auth_group.js',       
				                       'ng-app/web/common/directive/modal.js']
				            })                                                      
				    	}                                                         
				    }
		    	}
	    	}
		})                                                                  
		                                                                    
		.state('eis.auth_user', {    
			views : {
		    	"main" : {
				    url: '/auth_user',                                              
				    templateUrl: 'ng-app/web/auth_user/auth_user.html',                                   
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/auth_user/auth_user.js',         
				                       'ng-app/web/common/directive/modal.js']
				            })                                                      
				    	}                                                         
				    }       
		    	}
			}
		})                                                                  
		                                                                    
		.state('eis.code', {   
			views : {
		    	"main" : {
					url: '/code',                                                   
				    templateUrl: 'ng-app/web/code/code.html',                                        
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/code/code.js',                   
				                       'ng-app/web/code/codeFactory.js',                
				                       'ng-app/web/code/codeController.js',             
				                       'ng-app/web/common/directive/modal.js']
				            })                                                      
				    	}                                                         
				    }            
		    	}
			}
		})
		
		.state('eis.intro', {      
			views : {
		    	"main" : {
					url: '/intro',                                                   
				    templateUrl: 'ng-app/web/intro/intro.html',                                        
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/intro/intro.js']
				            })                                                      
				    	}                                                         
				    }                                                               
		    	}
			}
		})
		
		.state('eis.intro_mgt', {      
			views : {
		    	"main" : {
					url: '/intro_mgt',                                                   
				    templateUrl: 'ng-app/web/intro_mgt/intro_mgt.html',                                        
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/intro_mgt/intro_mgt.js']
				            })                                                      
				    	}                                                         
				    }                                                               
		    	}
			}
		})
		
		.state('eis.404', {
			views : {
		    	"main" : {
			        url: '/404',
			        templateUrl: 'ng-app/web/error/error_404.html'
		    	}
			}
	    })
	    
	    .state('eis.prg_mgt', {
	    	views : {
		    	"main" : {
			    	url: '/prg_mgt',                                                   
				    templateUrl: 'ng-app/web/prg_mgt/prg_mgt.html',  
				    controller: function($injector) {
				    	$injector.get('$state').transitionTo('eis.prg_mgt.menu');
				    }
		    	}
	    	}
	    })
	    
	    .state('eis.prg_mgt.menu', {
	    	views : {
	    		"prgMgt" : {
			    	url: '/menu',                                                   
				    templateUrl: 'ng-app/web/menu/menu.html',                                        
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/menu/menu.js',                   
				                       'ng-app/web/menu/menuFactory.js',                
				                       'ng-app/web/menu/menuController.js',             
				                       'ng-app/web/common/directive/modal.js']
				            })                                                      
				    	}                                                         
				    }        
	    		}
	    	}
	    })
	    
	    .state('eis.prg_mgt.set_view', {
	    	views : {
	    		"prgMgt" : {
			    	url: '/set_view',                                                   
				    templateUrl: 'ng-app/web/set_view/set_view.html',                                        
				    resolve: {                                                      
				    	loadMyFile:function($ocLazyLoad) {                          
				            return $ocLazyLoad.load({                               
				            	serie: true,                                        
				                name:'sbAdminApp',                                  
				                files:['ng-app/web/set_view/set_view.js',                   
				                       'ng-app/web/common/directive/modal.js']
				            })                                                      
				    	}                                                         
				    }   
	    		}
	    	}
	    })
	    
	    ;
    });