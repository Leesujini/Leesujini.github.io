 slide_button.js

(function($) {  
/* 1. me_link 이름을 .slide_btn>ul에 적용하기
   2. .slide_btn>ul>li 의 가로값을 세로에도 적용하기  (가로 == 세로) */
 
 $('.slide_btn>ul').addClas('me_link');

 var slide_li_width = $('.slide_btn>ul>li').wudth();
 $('.slide_btn>ul>li').height(slide_li_width);

})(this.jQuery);