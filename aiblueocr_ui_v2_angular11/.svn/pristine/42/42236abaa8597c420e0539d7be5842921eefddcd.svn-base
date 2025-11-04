$(document).ready(function(){
    // check func
    userAgentCheck();
    languageCheck();



    // top bar util menu UI
    utilUi();

    // layout UI
    columnClass();
    panelUi();
    tabCardUi();
    tabUi();
    //modalUi();
    datepiker();
    tblSlide();

    // input UI
    iptCount();
    btnswitch();
    btnEffect();
    progressBar();
    formCellCtl();

/*
    if($('select').length){
        $('select').niceSelect();
    }
    if($('.panel-ui').length){
        $('footer').addClass('layout-pd');
    }
*/

    // media UI
    mediaTab();
    mediaLayout();

});


$(window).resize(function() {
    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100);

    $('.chartjs-render-monitor').css({'animation':'chartjs-render-animation 0.001s'})
});

$(window).on('resize', function(){
    //modalUi();
    btnswitch();
    mediaLayout();
}).resize();

function userAgentCheck(){
    var ua = window.navigator.userAgent;
    var other = 999;
    var msie = ua.indexOf('MSIE ');

    // check Mobile
    if(ua.indexOf('Mobile') != -1){
        $('html').addClass('mobile');
    }

    // check Browser
    if(ua.toLowerCase().indexOf('safari') != -1){

        if(ua.toLowerCase().indexOf('chrome') != -1){
            $('html').addClass('chrome');

        } else {
            $('html').addClass('safari');
        }

    } else if(ua.toLowerCase().indexOf('firefox') != -1){
        $('html').addClass('firefox');

    } else if(ua.toLowerCase().indexOf('msie 10.0') != -1){
        $('html').addClass('ie ie10');

    } else if(ua.toLowerCase().indexOf('rv:11.0') != -1){
        $('html').addClass('ie ie11');
    }

    if($('.main-section').length){
        $('html').addClass('main');
        chartBug();
    }

    // check OS
    if( ua.toLowerCase().indexOf('os x') != -1 ){

    }
}

function languageCheck(){
      var $html = $('html');
      var lang = $html.attr('lang');

      switch(lang){
        case 'ko' :
          $html.addClass('ko');
          break;
        case 'en' :
          $html.addClass('en');
          break;
      }
}

function utilUi(){

    var textSize = 15;
    var gnbW = $('#gnb').width();
    var headerH = $('header').height();

    $('.ico-language').on("click", function(e){
        e.preventDefault();
        $('.language-inner').toggleClass('active');
        if($('.language-inner').hasClass('active')){
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });

    $('.hamburger').on("click", function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        if($('.hamburger').hasClass('active')){
            $('#gnb, h1').addClass('fold');
            $('.container-inner').css({paddingLeft: headerH});
            $('.layout-pd').css({paddingLeft: headerH + headerH});

        } else {
            $('#gnb, h1').removeClass('fold');
            $('.container-inner').css({paddingLeft: gnbW});
            $('.layout-pd').css({paddingLeft: gnbW + headerH});

        }
    });


    $('.text-zoom-plus').on('click', function(){
        textSize ++;
        $('html').css('font-size', textSize);
    });
    $('.text-zoom-minus').on('click', function(){
        textSize --;
        $('html').css('font-size', textSize);
    });
}

function columnClass(){
    // tab layout
    var countNum = $('.tab-title ul, .dashboard-top ul'),
        classNum = countNum.length;
    for (var i = 0; i < classNum; i++) {
        var classCount = 'col-' + countNum.eq(i).find('li').length;
        countNum.eq(i).addClass(classCount);
    }

    // column layout
    var layoutCountNum = $('.row'),
        layoutClassNum = layoutCountNum.length;
    for (var i = 0; i < layoutClassNum; i++) {
        var layoutClassCount = 'col-' + layoutCountNum.eq(i).find('>.column').length;
        layoutCountNum.eq(i).addClass(layoutClassCount);
    }
}

function tabUi(){
    var tabTit = $('.tab-title, .tab-title-radio'),
        tabNum = tabTit.length,
        tabBtn = tabTit.find('li');

    var tabCnt = $('.tab-content01'),
        tabIdx = tabCnt.index();

    // load style settings
    tabCnt.hide();
    $('.tab-title ul li:first-child').addClass('on');
    $('.tab-component .tab-content01:first-child').show();

    tabBtn.on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            thisRel = $this.attr('rel');
            thisClass = $('.'+ thisRel);
            target = thisClass.parent('.tab-component').attr('id');

        // content connect
        $('#' + target +  '>.tab-content01').hide().removeClass('on');
        $('#' + target + ' .' + thisRel).fadeIn().addClass('on');
    });

    tabBtn.on("click", function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
}

function iptCount(){
    window.inputNumber = function(el){
        var min = el.attr('min') || false;
        var max = el.attr('max') || false;
        var els = {};

        els.dec = el.prev();
        els.inc = el.next();

        el.each(function(){
            init($(this));
        });

        function init(el){
            els.dec.on('click', decrement);
            els.inc.on('click', increment);

            function decrement(){
                var value = el[0].value;
                value--;
                if(!min || value >= min){
                    el[0].value = value;
                }
            }

            function increment(){
                var value = el[0].value;
                value++;
                if(!max || value <= max){
                    el[0].value = value++;
                }
            }
        }
    }
    inputNumber($('.ipt-number'));
}

function btnswitch() {
    $('.switch').each(function(){
        $(this).on('click', function(){
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $(this).find('input').attr('checked', false);
                return false;
            }else {
                $(this).addClass('on');
                $(this).find('input').attr('checked', true);
                return false;
            }
        });
    });


    $('.cell-ctl').each(function(){
        $(this).find('.switch').on('click', function(){
            if($(this).hasClass('on')){
                $(this).prev('.ctl-ipt').find('input').attr('disabled', false);
            } else{
                $(this).prev('.ctl-ipt').find('input').attr('disabled', true);
            };
        });
    });


}



function btnEffect(){
    var element, circle, d, x, y;

    $(".btn .effect").click(function(e){

        element = $(this);

        if(element.find(".circle").length == 0)
            element.prepend("<span class='circle'></span>");

        circle = element.find(".circle");
        circle.removeClass("animate");

        if(!circle.height() && !circle.width()){
            d = Math.max(element.outerWidth(), element.outerHeight());
            circle.css({height: d, width: d});
        }

        x = e.pageX - element.offset().left - circle.width()/2;
        y = e.pageY - element.offset().top - circle.height()/2;

        circle.css({top: y+'px', left: x+'px'}).addClass("animate");
    });
}



function progressBar(){
    $('.progress-bar').each(function(){
        var valorLargura = $(this).data('nivel');
        $(this).animate({
            width: valorLargura + '%'
        },10);
    });
}

function datepiker(){
    $('.datetimes').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'M/DD hh:mm A'
        }
    });
}

function tblSlide(){
    $('.slide').each(function(){
        $(this).find('.slide-btn').on("click", function(){
            $(this).toggleClass('on');
        });
    });

}

function chartBug(){
    $('.chartjs-render-monitor').css({'animation':'none'})
}



function panelUi(){

    // Variable
    var panelEl = $('.panel-ui'),
        panelH = panelEl.height();

    var panelLst = $('.panel-ui > ul > li');

    var panelPoint = $('.panel-indicators li'),
        panelPointW = panelPoint.width(),
        panelPointL = panelPoint.length;

    var panelNextBtn = $('.next-panel');
    var panelPextBtn = $('.prev-panel');
    var panelFirstBtn = $('.first-panel');
    var panelLastBtn = $('.last-panel');

    // slider oparation
    function slide(target) {
        // indicator Add ID/Class
        var stepId = panelPoint.removeClass("on").eq(target).attr('id');
        panelPoint.eq(target).addClass("on").siblings().removeClass('on').parents('.step-container').attr('class','step-container ' + stepId);
        $(".panel-indicators li.on").removeClass('off').prevAll().addClass("off");
        $(".panel-indicators li.on").nextAll().removeClass("off");

        // panel Add Class
        panelLst.eq(target).addClass("show").siblings().removeClass('show');
        $('.panel-ui > ul > li.show').removeClass('hide').prevAll().addClass("hide");
        $('.panel-ui > ul > li.show').nextAll().removeClass("hide");

        if(panelLst.eq(target).hasClass('show')){
            //애니메이션을 위한 슬라이드 로드될때 차트 리로드실행
            if($('.chart-area').length){
                setTimeout(function() {
                    chartJsCustom();
                    chartBug();
                }, 400);
            }
        }

        // $(".panel-ui > ul > li").animate({
        //   top : - panelH * target + 'px'
        // }, 250);

        // $(".progress").animate({
        //   'width': (100/panelPointLW) * target + '%'
        // }, 250);
        setTimeout(function() {
            panelNextBtn.attr('disabled',false);
            panelPextBtn.attr('disabled',false);
        }, 300)
    };

    // Controller
    panelPoint.find('a').on('click', function() {
        $(this).attr('disabled',true);
      var target = $(this).parent('li').index();
      if (target === 6){
          $('.panel-ui .deco-wrap').show();
      } else {
          $('.panel-ui .deco-wrap').hide();
      }
      slide(target);
    });

    panelNextBtn.on('click', function() {

      $(this).attr('disabled',true);
      var target = $(".panel-indicators li.on").index();
      if (target === panelPoint.length - 1) {
        target = -1;
      }
      if (target === 6){
          $('.panel-ui .deco-wrap').show();
      } else {
          $('.panel-ui .deco-wrap').hide();
      }
      target = target + 1;
      slide(target);


      var panelBox = $('.vertical-cont.show'),
          panelBoxOffset = panelBox.offset(),
          panelBoxOffsetTop = panelBoxOffset.top;
      $('html, body').animate({scrollTop : panelBoxOffsetTop}, 400);
    });

    panelPextBtn.on('click', function() {
        $(this).attr('disabled',true);
        var target = $(".panel-indicators li.on").index();
        if (target === 0) {
            target = panelPoint.length;
        }
          target = target - 1;

          if (target === 6){
              $('.panel-ui .deco-wrap').show();
          } else {
              $('.panel-ui .deco-wrap').hide();
          }
        slide(target);
    });
}
function tabCardUi(){
    var tabCardBtn = $('.card-tab');
    // load style settings
    tabCardBtn.on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            thisRel = $this.attr('rel');
            thisClass = $('.'+ thisRel);
            target = thisClass.parent('.tab-component-card').attr('id');
            // content connect
            setTimeout(function() {
                $('#' + target +  '>.tab-content01').hide();
                $('#' + target + ' .' + thisRel).fadeIn();
            }, 300);
    });

    tabCardBtn.on("click", function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    $('.tab-back').on('click', function(){
        var $this = $(this);
        $this.parents('.tab-content01').fadeOut();
    });
}

/*

function modalUi(){
    // sizing and position
    modalSizing();

    function modalSizing(){
        $('.modal').each(function(){
            var layerResize = $(window).height();
            var layerHeight = $(this).outerHeight();
            var layerWidth = $(this).outerWidth();
            $(this).css({
                marginLeft : -layerWidth/2,
                marginTop : -layerHeight/2
            });

            $(this).find('.modal-body').css({
                maxHeight : layerResize/2
            });
        });
    }
    $('.modalLoad').on('click',function(e){
        e.preventDefault();
        var $self = $(this);
        var $target = $($(this).attr('href'));
        var $targetId = $target.attr('id');

        modalSizing();
        createDim();
        $('.dim').addClass($targetId);
        $target.fadeIn(250);
        chartJsCustom();

        // close and focusout
        var isVisible = $target.is(':visible');
        var modalLength = $('.modal:visible').length;

        $target.find(".close").on('click',function(e){
            e.preventDefault();
            $target.fadeOut(250);
            $self.focus();
            $(this).off('click');
            if (isVisible) {
                if (modalLength > 1) {
                    $target.fadeOut(250);
                } else {
                    removeDim();
                }
            }
        });

        $target.find(".ok-hide").on('click',function(e){
            e.preventDefault();
            $target.fadeOut(250);
            $self.focus();
            if (isVisible) {
                if (modalLength > 1) {
                    $target.fadeOut(250);
                } else {
                    removeDim();
                }
            }
        });

        // keyboard interaction
        $target.on("keyup", function(e){
            if(e.which=='27'){
                $target.fadeOut(250);
                $self.focus();
                $(this).off('click');
                if (isVisible) {
                    if (modalLength > 1) {
                        $target.fadeOut(250);
                    } else {
                        removeDim();
                    }
                }

            }
        });


    });
}
*/

function createDim(){
    if (!$('.dim').length) {
        $('body').append('<div class="dim"></div>');
    }
    $('.dim').fadeIn(250);
}
function removeDim(){
    $('.dim').fadeOut(250);
}
function dataLocationText(){
    $('.lct-depth1').on('click', function(){
        var clickText = $(this).attr('data-location');

        $('.data-location').find('.depth1').text(clickText);
        $('.data-location').attr('class','data-location ' + clickText);

    });
    $('.lct-depth2').on('click', function(){
        var clickText = $(this).text();
        $('.data-location').find('.depth2').text(clickText);
    });
}
function formCellCtl(){

    var rowStrText='';
        rowStrText+='<tr>';
        rowStrText+='<th>' + 'LabelText' + '</th>';
        rowStrText+='<td>';
        rowStrText+='<div class="cell-ctl">';
        rowStrText+='<div class="ctl-ipt">';
        rowStrText+='<input type="text">';
        rowStrText+='</div>';
        rowStrText+='<button class="gui minus" type="button" name="button">삭제</button>';
        rowStrText+='</div>';
        rowStrText+='</td>';
        rowStrText+='</tr>';

    var rowStrSelect='';
        rowStrSelect+='<tr>';
        rowStrSelect+='<th>' + 'LabelText' + '</th>';
        rowStrSelect+='<td>';
        rowStrSelect+='<div class="cell-ctl">';
        rowStrSelect+='<div class="ctl-ipt">';
        rowStrSelect+='<select>';
        rowStrSelect+='<option data-display="Select">Nothing</option>';
        rowStrSelect+='</select>';
        rowStrSelect+='</div>';
        rowStrSelect+='<button class="gui minus" type="button" name="button">삭제</button>';
        rowStrSelect+='</div>';
        rowStrSelect+='</td>';
        rowStrSelect+='</tr>';

    //행 추가
    $('.data-form').each(function(){
        $(this).find('.plus.slt').on('click', function() {
            $(this).parent().next('.tbl').find('tbody').append(rowStrSelect);
            $('select').niceSelect();
        });
        $(this).find('.plus.ipt').on('click', function() {
            $(this).parent().next('.tbl').find('tbody').append(rowStrText);
            $('select').niceSelect();
        });

        $(document).on('click', '.data-form .minus', function(){
            $(this).parents('tr').remove();
        });
    });


}
function mediaTab(){
    $('.tab-title').find('ul').each(function(){
        var nowSlt = $(this).find('li').eq(0).text();
        if($(this).find('li').length > 4){
            $(this).addClass('tab-m');
            $(this).prepend('<li class="now-slt"><a href="#">'+ nowSlt +'</a></li>');
            $(this).find('li.now-slt').on('click', function(e){
                e.preventDefault();
                $(this).parent('ul').toggleClass('m-open');
            });
            $(this).find('li').not('li.now-slt').on('click',function(e){
                e.preventDefault();
                var clickSlt = $(this).text();
                $(this).parent('ul').removeClass('m-open').find('li.now-slt a').text(clickSlt);
            });
        }
    });

}
function mediaLayout(){
    // panel centering
    $('.panel-indicators li').find('span').each(function(){
        var thisW = $(this).width();
        $(this).css({marginLeft:- thisW/2 + 15});
    });

    var tabletW = $(this).outerWidth();
    var gnbW = $('#gnb').width();
    var headerH = $('header').height();
    var fixTopH = $('.content-top').outerHeight();
    $('.basic-cont, .vertical-cont, .tab-component-card > .tab-content01').css({paddingTop: fixTopH});

    if(tabletW <= 1280){
        $('#gnb,h1').addClass('fold');
        //$('.hamburger').addClass('active');
        // $('.layout-pd').css({position: 'relative',left: headerH});
    } else {
        $('#gnb,h1').removeClass('fold');
        //$('.hamburger').removeClass('active');
    }
}
