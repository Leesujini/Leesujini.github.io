(function($) {
 //화면상의 높이값 계산하기
  var winH = $(document).innerHeight();
  console.log(winH);
  var headH = $('#headWrap').innerHeight();
  console.log(headH);

  //header 위치 브라우저 하단에 위치하게 만들기
  $('#adBanner').height(winH - headH);





  // #headBox의 위치 파악하기 (document)의 상단에서부터 떨어진 값
  var headOffset = $('#headBox').offset().top;
  console.log(headOffset);

  //스크롤이 움직였을 때 
  $(window).on('scroll', function() {
  //스크롤 값 확인

  var scT = $(this).scrollTop();
 // console.log(scT);

 // 스크롤의 위치와, #headBox 의 위치가 일치하면 (보다 더 크거나 같으면)
 // #headBox를 상단에 고정 position:fixed; top:0 left:0;}
 if(headOffset <= scT){
   $('#headWrap').addClass('fixedTop');
 }

 // 스크롤의 위치와, #headBox 의 위치가 일치하지 않으면  (보다 작으면)
 // #headBox의 위치를 원래의 위치로 돌아가게 만들기

 else{
 $('#headWrap').removeClass('fixedTop');
 }

  }); //on('scroll')


})(this.jQuery);