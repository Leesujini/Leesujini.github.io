(function($) {
  var mypage = $('#page');
  var listbutton = mypage.find('.buttons');
  var articleBanner = mypage.find('.pagewrap');

  // console.log( parseInt(articleBanner.css('marginLeft')) );

  var newButton = listbutton.children('ol').children('li');

  newButton.on('click',['button'], function(e){
    e.preventDefault();

    // console.log( $(this).index() );

    var index = $(this).index();
    articleBanner.stop().animate({'marginLeft': -index * 100 +'%'});

    $(this).addClass('active').siblings().removeClass('active');
  });


})(this.jQuery)