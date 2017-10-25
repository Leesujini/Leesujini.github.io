// slideBanner_02.js
(function($) {
  // 1. slide indicator를 통해 배너가 움직이도록 처리
  // 2. 좌,우 버튼을 클릭해서 배너 이동 처리
  // 3. 좌,우 버튼을 클릭시 indicator도 같이 처리

// 좌, 우 버튼 일정 위치에서 사라지거나, 나타나게 만드는 기능을 함수화 처리
  function BtnEnd(){
    if(i <= 0){
      i=0;
      lBtn.fadeOut();
      rBtn.fadeIn();
    }else if(i >= banner_i-1){
      i=banner_i-1;
      rBtn.fadeOut();
      lBtn.fadeIn();
    }else{
      lBtn.fadeIn();
      rBtn.fadeIn();
    }
    console.log(i);
    banner.stop().animate({marginLeft: -i * 100 + '%'});
    indi_li.eq(i).addClass('active').siblings().removeClass('active');
  }

  // indicator클릭시 해당하는 값이 이동
  var banner = $('#bannerBox');
  var banner_child = banner.children();
  var banner_i = banner_child.length;

  var indi = $('.indicator');
  var indi_li = indi.children();

  var lBtn = $('.l_btn');
  var rBtn = $('.r_btn');
  var i = 0;

  // 변수값보다 함수호출이 먼저되면 undefined 또는 에러를 도출
  BtnEnd();


// ------------ indicator 클릭
  indi_li.on('click',['button'],function(e) {
    e.preventDefault();
    var _this = $(this);
    i = _this.index();

    BtnEnd();
  });

  // 2. 좌,우 버튼을 클릭해서 배너 이동 처리
  rBtn.on('click',function() {
    i += 1;
    BtnEnd();
  });

  lBtn.on('click',function() {
    i -= 1;
    BtnEnd();
  });




})(this.jQuery);