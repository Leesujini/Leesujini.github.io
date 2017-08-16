
(function($){
 //+++++++++++++++++++++++++++++++++++

 //drop down 메뉴
  var gnb = $('#gnb');
  var gnbLi = $('#gnb>ul>li');
  var gnbOl = gnbLi.find('ol');

//마우스를 올렸을 경우 (.on('mouseenter',function(){};)
  gnbLi.on('mouseenter',function(){
    $(this).find('ol').stop().slideDown();
  });
  //마우스를 벗어났을 경우 (.on('mouseleave',function(){};)
  gnb.on('mouseleave',function(){
    gnbOl.stop().delay(300).slideUp();
  });


 //아코디언 메뉴 만들기

  var conBox  = $('#contentBox');
  var conBoxDl = conBox.children('dl');
  var conDt   = conBoxDl.children('dt');
  var conDd   = conBoxDl.children('dd');

  var ddWidth = parseInt(conDd.eq(0).width());
  var ddPdL = parseInt(conDd.eq(0).css('paddingLeft'));
  var ddPdR = parseInt(conDd.eq(0).css('paddingRight'));


  //문자를 숫자(정수)로 변환 parseInt 
  //console.log('width',ddWidth);
  //console.log('padding-left: ',ddPdL);
  //console.log('padding-right:',ddPdR);

  var ddFullWidth = conDd.eq(0).innerWidth();
 // console.log(ddFullWidth);

  //dt 클릭 이벤트
   conDt.on('click',function(event){
    event.preventDefault();
    var _$this = $(this);
    var thisNext = _$this.next('dd');
    // 선택된 dt뒤에 dd를 제외한 나머지 숨김처리
    thisNext.siblings('dd').animate({width:0, 'overflow':'hidden'}, function(){
      var _this = $(this);
      _this.css({'display':'none'});
    });

     var nextDdDp = thisNext.css('display');
             if(nextDdDp == 'none'){
     //선택된 dt뒤에 dd는 나타나게 만들기
      thisNext.css({'display':'block', 'width':0, 'overflow':'hidden'})
              .animate({'width':ddFullWidth+'px'});
              // 조건을 확인하여 움직이지 않거나, 나타나게 만들기.
           

              }else{
                 thisNext.css({width:ddFullWidth+'px'});
              }

              //dl의 범위에서 넘치는 경우 (일부영역 숨김처리로 해결)
              conBoxDl.css({'overflow':'hidden'});
   });

  // innerWidth();  width + padding 크기값을 가져올 경우 사용  
  // outerWidth();  width + padding + border 크기값을 가져올 경우 사용
  // outerWidth(true);  width + padding + border + margin 크기 값을 가져올 경우 사용
  // width ();      width 값만 가져올 경우 
  // css('padding'); padding 값만 가져올 경우
 //+++++++++++++++++++++++++++++++++++

})(this.jQuery);