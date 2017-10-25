(function($) {

 var joIn = $('#join');
 var joinmore = joIn.find('.more');
 
 var joinp = $('.p_scroll');
 var joinall = joinp.find('p');

 joinall.hide();

 joinmore.on('click',function(e){
  e.preventDefault();

  var _$this = $(this);
  joinall.stop().slideUp();
  _$this.parent().parent().next('.p_scroll').children('p').stop().slideToggle();

 });




})(this.jQuery);