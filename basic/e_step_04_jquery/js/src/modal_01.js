 





 (function($) {

  var modalBox =  $('.modal_box');
  modalBox.html('<img>');
  var modal_img = modalBox.find('img');
  //modal_img.attr({'src':'../img/background/hongsoontoon2.jpg', 'alt':'큰이미지 내용'});
 

//addclass 다수처리를 위한 함수 생성
  var ModalOff = function(display){

  $('.modal_box').addClass(display);
  $('.modal_bg').addClass(display);

  };
  //removeClass 다수처리
  var ModalOn = function(display){

  $('.modal_box').removeClass(display);
  $('.modal_bg').removeClass(display);
 };
  //modal 창 사라지기
  ModalOff('modal_dp');

  //------------------------------------------
  $('.modal_bg').on('click',function(){
    ModalOff('modal_dp');
  });
//-----------------------------------------------------
 var galleryBox = $('.gallery_list');
 var gallery_list = galleryBox.children('li');

var url = '../img/background/'
 var modalData = [
  {'src':'hongsoontoon2.jpg', 'alt':'큰이미지_1 설명'},
  {'src':'coffee_01.jpg', 'alt':'큰이미지_2 설명'},
  {'src':'coffee_beans.jpg', 'alt':'큰이미지_3 설명'},
  {'src':'city.jpg', 'alt':'큰이미지_4 설명'},
  {'src':'coffeemini_.jpg', 'alt':'큰이미지_5 설명'},
  {'src':'forest.jpg', 'alt':'큰이미지_6 설명'},
  {'src':'hongsoontoon2.jpg', 'alt':'큰이미지_7 설명'},
  {'src':'city.jpg', 'alt':'큰이미지_8 설명'},
  ];

var liImg;
liImg =url + modalData[0].thum;
console.log(liImg);

gallery_list.eq(0).find('button')
.css({'backgroundImage':'url('+ liImg +')','backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundSize':'cover'});



 gallery_list.on('click',function(e){
  e.preventDefault();
  var _this = $(this);
  var _this_i = _this.index();
  // console.log(_this_i);
  // console.log(modalData[_this_i]);
  
  var _src = url + modalData[_this_i].src;
  var _alt = modalData[_this_i].alt;
  modal_img.attr({'src':_src, 'alt':_alt}); 
  ModalOn('modal_dp');
 });

//------------------------------------------
//var galleryList = $('.gallery_list');
//var gallery_li = galleryList.children('li');

//gallery_li.on('click',function(e){
//  e.preventDefault();
//  var _this = $(this);
//  var _imgSrc = _this.find('img').attr('src');
//});

//----------------------------------------------


 })(this.jQuery);