// slideBanner_03.js
(function($) {
  // 1. slide indicator를 통해 배너가 움직이도록 처리
  // 2. 좌,우 버튼을 클릭해서 배너 이동 처리
  // 3. 좌,우 버튼을 클릭시 indicator도 같이 처리
  // 4. 좌, 우 버튼을 클릭시 계속 회전하도록 처리
  // 5. 일정 시간마다(약5초)내용이 변경(회전)되도록 처리
  // 6. 마우스 올렸을경우(mouseenter) 자동 변경기능이 멈추고, 벗어날경우(mouseleave) 다시 변경되도록 처리



// 좌, 우 버튼 일정 위치에서 사라지거나, 나타나게 만드는 기능을 함수화 처리

  function BtnEnd(i){
    banner.stop().animate({marginLeft: -i * 100 + '%'});
    // indi_li.eq(i).addClass('active').siblings().removeClass('active');
    IndiI(i);
  }
  function IndiI(i) {
    indi_li.eq(i).addClass('active').siblings().removeClass('active');
  }
  // indicator클릭시 해당하는 값이 이동
  var slideBanner = $('#slideBanner');
  var banner = $('#bannerBox');
  var banner_child = banner.children();
  var banner_i = banner_child.length;  //  복제하기 전의 갯수를 파악

  var lBtn = $('.l_btn');
  var rBtn = $('.r_btn');
  var i = 1;


// ---------------------------------------------------------------------
  // 4번기능처리
  // 마지막요소를 복제
  var cloneBanner = banner_child.last().clone();
  // banner.prepend(cloneBanner);
  cloneBanner.prependTo(banner);

  banner_child = banner.children();
  banner_i = banner_child.length; // 복제후 갯수를 재확인

  // banner의 크기를 복제한 갯수 * 100% 만큼 수정
  banner.css({'width': banner_i * 100 + '%','marginLeft':'-100%'});
  // banner의 자식요소 또한 전체크기 / 갯수% 만큼으로 수정
  banner_child.css({'width':100 / banner_i + '%'});

// ========================================================================
  // banner갯수와 동일하게 indicator 처리 및 생성
  
  banner.after('<ol class="indicator"></ol>');
  var indi = $('.indicator');
  // .indicator 내부에 li값 및 button생성
  // 반복기능을 이용하여 여러개의 li 생성 정확한 값
  var j = 0; 
  for(; j < banner_i; j++){
    //  배너 내부의 li 각각에 존재하는 속성 title의 값 가져오기
    var banner_t = banner_child.eq(j).attr('title');  

    indi.append('<li class="indi_'
                 + j +'"><button type="button"><span class="me_hidden">'
                 + banner_t +'</span></button></li>');
  }
  // indicator갯수가 늘어나면 가운데 배치되도록 처리
  var indi_width = indi.width();
  indi.css({marginLeft: -indi_width / 2 });
  // indicator 자식요소 변수지정
  var indi_li = indi.children();
  BtnEnd(i);

// ========================================================================

// indicator 클릭 ------------------------------------
  indi_li.on('click',['button'],function(e) {
    e.preventDefault();
    var _this = $(this);
    BtnEnd( _this.index() );
  });

// 좌,우 버튼을 클릭해서 배너 이동 처리 ----------------
  rBtn.on('click',function() {
    i+=1;
    if(i >= banner_i){
      i = 1;
      banner.css({'marginLeft':0}).animate({marginLeft: -100 + '%'});
      // indi_li.eq(i).addClass('active').siblings().removeClass('active');
      IndiI(i);
    }else{
      banner.stop().animate({marginLeft: -i * 100 + '%'});
    }
    // indi_li.eq(i).addClass('active').siblings().removeClass('active');
    IndiI(i);
  });
// -----------------------------------------------
  lBtn.on('click',function() {
    i-=1;
    banner.stop().animate({marginLeft: -i * 100 + '%'},function() {
      if(i <= 0){
        i = banner_i-1; 
        banner.css({'marginLeft': -i * 100 + '%'});
        // indi_li.eq(i).addClass('active').siblings().removeClass('active');
        IndiI(i);
      }
    });
    // indi_li.eq(i).addClass('active').siblings().removeClass('active');
    IndiI(i);
  });

// 최종 indicator 처음내용 숨기기 및 배너영역 처리
indi_li.eq(0).hide();
slideBanner.css({'overflow':'hidden'});

})(this.jQuery);