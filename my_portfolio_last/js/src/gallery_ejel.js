(function($) {
  var ejel = $('.ej');
  var ejelImg = ejel.children('ul').find('li');
  var bigImg = $('#big');
  var drawBig = bigImg.find('.drawing_big');  

  ejelImg.on('click', ['a'], function(e){
    e.preventDefault();
    // console.log(ejelImg.length);
    var _this = $(this).find('a');
    // console.log( _this.attr('class') );
    var thisClass = _this.attr('class');
    bigImg.addClass('active');

  // 이미지 삽입
  drawBig.css({'backgroundImage':'url(../img/ft_img/' + thisClass + '.png)'});

  // button click
    bigImg.find('#ok').on('click',function(e){
      e.preventDefault();
      bigImg.removeClass('active');
    });
  });
  
})(this.jQuery);