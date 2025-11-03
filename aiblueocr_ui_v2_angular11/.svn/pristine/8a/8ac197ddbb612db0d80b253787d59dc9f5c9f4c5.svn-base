var common = {
	 dateStart :function(){
		try{
			dateStart();
		}catch(exception){return false;}
	},removeMobileNav :function(){
		try{
			removeMobileNav();
		}catch(exception){return false;}
	}


};

 

function dateStart(){
	$(document).ready(function() {
		$('#dateStart .input-group.date').datepicker({
			todayBtn: "linked"
		});
	});

}


function removeMobileNav() {
	if($('body').hasClass('mobile-nav-opened')){
		$('body').removeClass('mobile-nav-opened');
		$('body').removeClass('header-fixed-at-mobile-nav-opened');
		$(window).scrollTop(pausedScrollTop);
	}
}




