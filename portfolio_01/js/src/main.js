
(function($) {
  var foot = $('#article2');
  var listbutton = foot.find('.buttons');
  var articleBanner = foot.find('.footmenu');

  // console.log( parseInt(articleBanner.css('marginLeft')) );

  var newButton = listbutton.children('ol').children('li');

  newButton.on('click',['button'], function(e){
    e.preventDefault();

    // console.log( $(this).index() );

    var index = $(this).index();
    articleBanner.stop().animate({'marginLeft': -index * 100 +'%'});

    $(this).addClass('active').siblings().removeClass('active');
  });


 var foot2 = $('#article3');
 var listbutton2 = foot2.find('.buttons');
 var articleBanner2 = foot2.find('.footmenu2');

 var newButton2 = listbutton2.children('ol').children('li');

 newButton2.on('click',['button'], function(e) {
  e.preventDefault();

  var index = $(this).index();
  articleBanner2.stop().animate({'marginLeft': -index * 100 +'%'});

  $(this).addClass('active').siblings().removeClass('active');
 });


})(this.jQuery);










  //(function($) {
  //   var winWidth = $(window).innerWidth();
  //     $('#bannerBox').css({width:winWidth, height:'auto', marginLeft:-winWidth/2});
  //  })(this.jQuery);
