
(function($) {
  var body = $('html');

  //------------------------------------------------

   //.view 갯수를 파악
   var view = $('.view');
   var viewLength = $('.view').length;
   console.log(viewLength);

   //각각의 offset().top 위치를 파악
  // 1번째 테스트

  //var v1_top = view.eq(0).offset().top;
 // console.log(v1_top);

 //각각의 내용을 배열로 저장
 var viewList = [];
 var i = 0;
 for(; i<viewLength; i++){
  vTop =  view.eq(i).offset().top;
  //console.log(vTop);
  viewList[i] = vTop;
 } 
  console.log(viewList);




    var wheelnumber = 0;
  body.on('mousewheel DOMMouseScroll', function(event) {
    var mywheel = WheelEvent(event);


    //console.log(mywheel);
    //스크롤 움직일 때 사용된 값에 의해 페이지 이동처리
     //var myScroll = body.scrollTop(viewList[1]);

   // 마우스 휠 처리시 숫자 카운트 변경처리  
   wheelnumber -= mywheel;
   console.log(wheelnumber);

 //0보다 작아지는 경우
  if(wheelnumber < 0){
    wheelnumber = 0;
  }
  else if(wheelnumber >= viewLength){
   wheelnumber = viewLength -1;

  }
  $('html,body').stop().animate({scrollTop:viewList})
  console.log(wheelnumber);
  });


})(this.jQuery);