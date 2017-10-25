 





 function WheelEvent(event){
    var E = event.originalEvent;
    var delta = 0;
    // console.log(event.originalEvent.wheelDeltaY);

    // firefox event test
    // console.log(E);

    // firefox DOMMouseScroll 기능에 따라 처리
    (E.detail)?
      (delta = E.detail * -40):
      (delta = E.wheelDeltaY);

    (delta <= 0) ? (delta = -1) : (delta = 1);

    switch(delta){
      case -1:
        $('body').addClass('down').removeClass('up');
      break;
      
      case 1:
        $('body').addClass('up').removeClass('down');
      break;
    }

    return delta;
  };
