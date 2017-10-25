(function($) {
  var newProduct = $('#newProduct');
  var listbutton = newProduct.find('.listbutton');
  var articleBanner = newProduct.find('#articlebanner');

  // console.log( parseInt(articleBanner.css('marginLeft')) );

  var newButton = listbutton.children('ol').children('li');

  newButton.on('click',['button'], function(e){
    e.preventDefault();

    // console.log( $(this).index() );

    var index = $(this).index();
    articleBanner.stop().animate({'marginLeft': -index * 100 +'%'});

    $(this).addClass('active').siblings().removeClass('active');
  });


 var newProduct2 = $('#newProduct2');
 var listbutton2 = newProduct2.find('.listbutton');
 var articleBanner2 = newProduct2.find('#articlebanner2');

 var newButton2 = listbutton2.children('ol').children('li');

 newButton2.on('click',['button'], function(e) {
  e.preventDefault();

  var index = $(this).index();
  articleBanner2.stop().animate({'marginLeft': -index * 100 +'%'});

  $(this).addClass('active').siblings().removeClass('active');
 });


})(this.jQuery);