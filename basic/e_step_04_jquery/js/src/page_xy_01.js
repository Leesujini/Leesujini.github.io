





(function($) {

 //page-x page-y
 //event.pageX, event.pageY
 //.on('mousemove')

 $('#wrap').on('mousemove',function(e) {
  //마우스 좌표값
  var pagex = e.pageX;
  var pagey = e.pageY;
  var winW = $(window).width();

  //x 좌표와 y좌표를 확인
  $('.x').children('span').text(pagex);
  $('.y').children('span').text(pagey);
  
  // 사용하려는 좌표는 모니터의 크기에 따라 달라지게 된다.
  // 모두 동일한 환경으로 세팅하려고 한다.
  // 0 ~ 100 마우스 좌표 / 내가 가진 브라우저 화면의 가로값 * 100
  // 사용할 크기 / 기준 크기 * 100 -> vw,vh
  var myX = pagex /winW * 100;
  var myY = pagey /winW * 100;

 var percentX = parseInt(myX);
 var percentY = parseInt(myY);

 //parseInt() => 정수로  변환
 //Math.random() => 0~1까지 랜덤 숫자
 //Math.ceil() => 올림
 //Math.round() => 반올림


  // 변경된 수치값 체크
  $('.x').children('span').text(percentX);
  $('.y').children('span').text(percentY);

  $('.my_box').css({'transform':'translate(' + -percentX +"px, "+ -percentY +"px)"}); //반대로 움직임
                         //'translateX('+ percentX +'}' >문자
                         //.css({'transform':'translate(' + percentX + 'px)'}); 
}); 
})(this.jQuery);