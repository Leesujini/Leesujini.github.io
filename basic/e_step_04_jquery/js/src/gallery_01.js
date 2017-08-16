
// gallery_01.js

 (function($){

 var galleryBox  = $('.gallery_box');
 var galleryList = $('.gallery_list');
 var gallery_li  = galleryList.children('li');
 var timed =  500;

  // 변수 이름을 설정할 때 미리 방법을 정의해놓는 것이 좋다. * 1000000
  // carmelCase  > 최초의 선택자를 선정하는 경우에 
  // snake_Case  > 다른 변수의 하위 또는 다른 변수와의 조합으로 만들어진 변수
  // pascal      > 함수의 이름을 사용할 때 / 변수로 할당된 함수 
  // $           > 함수의 이름을 사용할 때 함수 자체의 이름
  // _           > 함수 내부의 히든처리 되는 변수
  
  //gallery_li 클릭
  gallery_li.on('click', function(e){
    e.preventDefault();
    var _this = $(this);
    // console.log( $(this));
    // console.log( $(this) .index() );
    // console.log( $(this) .attr('data-src') );
    // console.log( $(this) .attr('data-alt') );

     var _mySrc= _this.attr('data-src');
     var _myAlt= _this.attr('data-alt');

     galleryBox.find('img').attr({'src': _mySrc , 'alt': _myAlt});
    
  });
   //galleryBox 에 들어있는 속성 src 의 값을 선택 되었던 li 의 속성 data-src 의 값으로 변경


 })(this.jQuery);