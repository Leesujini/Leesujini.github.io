
  (function($) {
 
  //    slide banner 1
    var bannerBox = $('#addBannerBox');
    var banner_group = bannerBox.children('ul');
    var btn = $('.btn');

    var btn_l = btn.children('button:first');
    var btn_r = btn.children('button:last');
    var timed = 500;

   bannerBox.css({overflow:'hidden'});
   banner_group.css({marginLeft: -100+'%'});

  // 1. 처음에 보이는 이미지가 첫번째 이미지로 보이기
      var li_last = banner_group.children('li').last();
  //banner_group 부모
  //li_last 자식의 마지막
     banner_group.prepend(li_last);    // [부모].내부앞에[자식으로..] 담기
      //li_last.prependTo();  // [자식으로 처리될 때].내부앞에 [부모] 담기


  // 2. 오른버튼을 클릭하면 , 오른쪽 이미지가 보이게 이동처리
      setInterval(BtnR, timed*3); //일정시간 마다 반복 (함수 이름. 시간);

      btn_r.on('click',BtnR);

      function BtnR(e){
       //e.preventDefault();

       //1 클릭 시 한칸 왼쪽으로 이동
       banner_group.stop().animate({marginLeft:-200+ '%'}, timed, function(){

    


       //2 맨 앞의 요소를 마지막으로 이동 (점프) 과 동시에
        var li_fr = banner_group.children('li').first(); //이동된 변수
        banner_group.append(li_fr);   //[부모].내부뒤에([자식])
        //li_fr.appendTo(banner_group); //[자식].이 어디 뒤에([부모])

       //3 처음상태의 형태로 처리 (단, 내부요소는 변경된 형태 그대로)
       banner_group.css({marginLeft:-100+'%'});


      });   
       return false; 

       }; 
  



  // 3. 여러번 클릭해도 계속 보이게 만들기

   

  // 4. 빠르게 클릭하면, 메모리 기능이 사라지게 되도록 처리한다.
  // 5. 왼쪽 버튼을 클릭하면, 위와 동일한 반복기능을 처리하도록 한다.

   btn_l.on('click',function(e){
       e.preventDefault();
       banner_group.stop().animate({marginLeft:0}, timed, function(){
        var li_la = banner_group.children('li').last(); //이동된 변수
        banner_group.prepend(li_la); 
        banner_group.css({marginLeft:-100+'%'});




      });    

       }); 

   //반복 기능 setInterval()
   //setInterval( btn_r.on('click'), timed*3);


})(this.jQuery);