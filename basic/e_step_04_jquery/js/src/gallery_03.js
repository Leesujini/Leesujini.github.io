(function($) {
  //기본경로
  var url = '../img/';
 //1. gallery page를 json형태로 취해서 사용
 var image = [

  {'thum':{'img':'audi.jpg','alt':'audi.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {
    'thum':{'img':'rl.jpg','alt':'rl.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {'thum':{'img':'cai.jpg','alt':'cai.jpg thumnail 이미지 설명'},
   'big' :{'img':'oolong.jpg','alt':'선택된 큰 이미지 설명'},
},
   {'thum':{'img':'bmw.jpg','alt':'bmw.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'}, 
   },
   {'thum':{'img':'coffee.jpg','alt':'coffee.jpg thumnail 이미지 설명'},
   'big' :{'img':'oolong.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {'thum':{'img':'strawberry.jpg','alt':'strawberry.jpg thumnail 이미지 설명'},
   'big' :{'img':'cai.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {'thum':{'img':'rl.jpg','alt':'rl.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {'thum':{'img':'jaguar.jpg','alt':'jaguar.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'},
},
   {'thum':{'img':'e300.jpg','alt':'e300.jpg thumnail 이미지 설명'},
   'big' :{'img':'bents.jpg','alt':'선택된 큰 이미지 설명'}, 
},
   {'thum':{'img':'englishBreakfast.jpg','alt':'englishBreakfast.jpg thumnail 이미지 설명'},
   'big' :{'img':'oolong.jpg','alt':'선택된 큰 이미지 설명'},
},

 ];

 //console.log(image.length);
 //console.log(image[5]);
 //console.log(url + image[5].thum);

 //2. #wrap 내부에 thum 리스트 만들기
 $('#wrap').append('<div class="gallery_list"><ul></ul></div>');
 var galleryUl = $('.gallery_list').children('ul');
 var i = 0;
 var imageLength = image.length;
 var imgSource, imgAlt;

 for(; i<imageLength; i++){
  imgSource = url + image[i].thum.img;
  imgAlt =image[i].thum.alt;
  galleryUl.append('<li><button type="button"><img></button></li>');
  //i번째에 해당하는 li내부의 img 의 속성값 처리
  galleryUl.children('li').eq(i).find('img').attr({'src':imgSource,'alt':imgAlt});
                    
 } //for 

 //3. gallery 큰 이미지 창 생성
 $('.gallery_list').before('<div class ="gallery_photo"><img></div>'); 
 //최초의 이미지 생성
 var bigSource, bigAlt;
 bigSource =url + image[0].big.img;
 bigAlt = image[0].big.alt;
 $('.gallery_photo').find('img').attr({'src':bigSource,'alt':bigAlt});

 //3-1. gallery 페이지를 모달 윈도우로 변경해보자
  //(1) 배경이 흐리다
  //(2) 원하는 내용은 popup 형태
  //(3) 닫을 수 있다.
   //(배경 클릭시 사라지게 )

  //이미지를 담을 상자 .gallery_photo
  $('.gallery_list').before('<div class = "gallery_photo"><img></div>');
  //배경이 흐리게 처리되는 상자
  $('gallery_photo').after('<div class = "gray_box"></div>');
  var photoBox = $('.gallery_photo');
  var photoBack = $('gray_box');

  bigSource = url + image[_this_Index].big.img;
  bigAlt = image[_this_Index].big.alt;
 $('.gallery_photo').find('img').attr({'src':bigSource,'alt':bigAlt});

  var imgWidth = parseInt(photoBox.find('.img').width())/2;
  var imgHeight= parseInt(photoBox.find('.img').height())/2;

  photoBox.css({'position' : 'fixed','left':'50%','top':'50%','zIndex':1500,'marginLeft':-imgWidth+'px' ,
                 'marginTop':-imgHeight+'px'});
  photoBack.css({'position' : 'fixed','zIndex':1400, 'left':0, 'top':0, 'width':'100%','height':'100%',
                  'backgroundColor':'rgba(0,0,0,0,4)'});


 //4. 'gallery_list'의 'li'를 클릭하면, 큰 이미지에 내용변경처리
 var img_list = galleryUl.children('li');

 img_list.on('click',function(e) {
  e.preventDefault();
  // li 중에 무엇을 선택했는지 확인 (선택자와 순서)
  //console.log ($(this));
  //console.log ($(this).index());
  //console.log (img_list.index($(this) ));
  var _this = $(this);
  var _this_Index = _this.index(); 


 });




})(this.jQuery);