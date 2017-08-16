 //slide_button.js

(function($) {  
/* 1. me_link 이름을 .slide_btn>ul에 적용하기
   2. .slide_btn>ul>li 의 가로값을 세로에도 적용하기  (가로 == 세로) */
 
 var slide_btn = $('.slide_btn');
 var slide_ul = slide_btn.children('ul');
 var slide_li = slide_ul.children('li');
 var slide_button = $('.slide_btn').find('button');
 var slide_icon = slide_button.find('i');

slide_ul.addClass('me_link');

 var slide_li_width = $('.slide_btn>ul>li').width();
 $('.slide_btn>ul>li').height(slide_li_width);

slide_btn.addClass('leftMove');
 

 //click시 .leftMove를 삭제
 slide_button.on('click',function(e){
  e.preventDefault(); 

  //var slide_left = parseInt(slide_btn.css('left'));
    var slide_left = slide_btn.hasClass('leftMove');
    console.log(slide_left);
  // hasClass()  : class 이름의 존재 유무를 판단 (true/false)
  // is()        : class 뿐마 아니라 다른 내용도 판단 가능

  //if( slide_left < 0 ){
  //  slide_btn.removeClass('leftMove', 500);  
  //  slide_icon.removeClass('fa-arrow-right').addClass('fa-arrow-left');
  //  slide_button.find('span').text('닫기');
 // }else{
  //   slide_btn.addClass('leftMove', 500);  
  //   slide_icon.removeClass('fa-arrow-left').addClass('fa-arrow-right');
   //  slide_button.find('span').text('열기');
 // }
  
 });


//1. if문을 이용하여 이모지(이모티콘) 변경처리



//2. 열기 글자와 닫기 글자 기능 토글 hint:text
  //text() : 글자만 인지
  //html() : 요소까지 포함(요소 코드로 작성하지 않으면 글자로 인지)

 
  //slide_button.text('닫기');

   var timed = 500;
   var slLeft = parseInt( slide_btn.css('left'));
   console.log(slLeft);

//3.버튼에 마우스 올렸을 경우 .slide_btn 살짝 나오기 (약 10px정도 )
    slide_button.on('mouseenter', function(event) {
      event.preventDefault();
      slide_btn.css({'transform':'translateX(20px)','transition' :'all' + timed+'ms'});

    });

    slide_button.on('mouseleave', function(event) {
      event.preventDefault();
      slide_btn.css({'transform':'translateX(0)','transition' :'all' + timed+'ms'});
  });

//꼭 알아두기
//마우스 mousedown
//page X screen X
//page Y screen Y
//draggle

})(this.jQuery);