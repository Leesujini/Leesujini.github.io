//  mousewheel_01.js

(function($) {
  var para = $('p');
  // para.text('test');
  var html = $('html');
  // var body = $('body');

  // html.on('mousewheel DOMMouseScroll', WheelEvent);
  html.on('mousewheel DOMMouseScroll', WheelEvent);

    function WheelEvent(event){
    para.text('마우스 휠 반응');
    var E = event.originalEvent;
    var delta = 0;
    // console.log(event.originalEvent.wheelDeltaY);

    // firefox event test
    // console.log(E);

    // firefox DOMMouseScroll 기능에 따라 처리
    if(E.detail){
      delta = E.detail * -40;
    }
    // 기타 다른 브라우저
    else{
      delta = E.wheelDeltaY;
    }

    // 각 OS별 수치값이 다르기 때문에 동일한 수치로 조정
    (delta <= 0) ? (delta = -1) : (delta = 1);

    // console.log(delta);
    switch(delta){
      case -1:
        $('body').addClass('down').removeClass('up');
      break;
      
      case 1:
        $('body').addClass('up').removeClass('down');
      break;
    }
  };

 



})(this.jQuery);

 
 //