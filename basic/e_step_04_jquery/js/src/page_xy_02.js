//  page-XY_02.js

(function($) {
  // window width을 확인
  // 마우스 이동
  // 이동시 x,y값 파악
  // 좌표값을 일정한 크기로 제한(100 값으로 제한)
  // 이미지태그를 생성한 후
  // 해당값을 이미지의 파일명과 합쳐서 처리
  $('.my_img').html('<img>');
  $('.my_img').on('mousemove',function(e) {
    var imgWidth   = $('.my_img').innerWidth();
    var pagex = e.pageX;
    var imgOffsetLeft   = $('.my_img').offset().left;

    // 사용할 크기 / 기준 크기 * 100
    var myPagex = parseInt( (pagex - imgOffsetLeft) / imgWidth * 100 );
    // 크기값 변경내용 검증
      // console.log(myPagex);
    var useImg = $('.my_img').find('img');

    // 속성 메소드  .attr();
    var url = '../img/page_xy/';
    // useImg.attr({src:'../img/page_xy/pageImg_10.jpg'});
    useImg.attr({  src:url + 'pageImg_'+ myPagex +'.jpg', 
                   alt:'page x,y 값을 사용한 이미지테스트'       });

    // p에 해당하는 이미지 사용설명 처리
    $('p').find('span').text(url + 'pageImg_'+ myPagex +'.jpg');
    
  });




})(this.jQuery);

