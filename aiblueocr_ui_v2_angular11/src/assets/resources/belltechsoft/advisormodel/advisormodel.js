
var tabsSwiper = new Swiper('#stepContent', {
	  calculateHeight:true,
	  touchRatio: 0,//드래그 금지
	  slidesPerView:'auto',
	 // autoHeight: true,
});	

	$('#step1 a').on('click', function(){
		tabsSwiper.slideTo(0);
    });
	$('#step2 a').on('click', function(){
		tabsSwiper.slideTo(1);			
    });
	$('#step3 a').on('click', function(){
		tabsSwiper.slideTo(2);
    });
	$('#step4 a').on('click', function(){
		tabsSwiper.slideTo(3);
	});
	$('#step5 a').on('click', function(){
		tabsSwiper.slideTo(4);
	});
	$('#step6 a').on('click', function(){
		tabsSwiper.slideTo(5);
	});
	$('#step7 a').on('click', function(){
		tabsSwiper.slideTo(6);
	});



	$('.navbar-minimalize').on('click', function (event) {        
		var tabsSwiper = new Swiper('#stepContent', {		  
		  slidesPerView:'auto',		 
	});
 }); 













// $(document).ready(function(){

// 	$('#definitionTree01').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});

// 	$('#definitionTree02').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	}); 

// 	$('#definitionTree03').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});

// 	$('#definitionTree04').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	}); 

// 	$('#definitionTree05').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	}); 

// 	$('#definitionTree06').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});

// 	$('#definitionTree07').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});

// });








// $(document).ready(function(){

// 	$('#modelSelectTree').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});        

// });











// $(document).ready(function(){

// 	$('#typePopTree').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});        

// });














// $(document).ready(function(){

// 	$('#packDateTree').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});        

// });









// $(document).ready(function(){

// 	$('#segmentTypeTree').jstree({
// 		'core' : {
// 		'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 		'default' : {
// 			'icon' : 'ti-file'
// 		}
// 	}
// });        

// });









// $(document).ready(function(){

// 	$('#manualTree').jstree({
// 		'core' : {
// 			'check_callback' : true
// 		},
// 		'plugins' : [ 'types', 'dnd' ],
// 		'types' : {
// 			'default' : {
// 				'icon' : 'ti-file'
// 			}
// 		}
// 	});        

// });













// $(document).ready(function() {

// 	$('#conFirmModal').click(function () {
// 		swal({
// 			title: "추천 세그먼트 분석을 실행 하시겠습니까?",
// 			//text: "추천 세그먼트 분석을 실행 하시겠습니까?",
// 			type: "info",
// 			showCancelButton: true,
// 			confirmButtonText: "확인",
// 			closeOnConfirm: false
// 		}, function () {
// 			swal("Suceess", "실행이 완료되었습니다.", "success");
// 		});
// 	});

// });

