//  json_02.js
(function($) {
// var product = [

//    {'car'   :
//             ['audi','jaguar','롤스로이스','폭스바겐','현다이']},
//    {'pen'   :
//             ['모나미','지브라','라미','몽블랑']},
//    {'coffee':
//             ['자바','비엔나','스타벅스','자바시티','던킨'],
//     'juice' :
//             ['ade','smoodi','fruit']
//    }
//  ];
// console.log(product[2]);
// console.log(product[2].coffee);
// console.log(product[2].coffee.length);
// console.log(product[2].juice[0]);


// --------------------------
var address = '../img/';
var coffee_01 = [
    [ {'img': {'src':'chai.jpg','alt':'제품1 이미지설명'} },
      {'menu':{'title':'chai', 
               'content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus architecto accusamus adipisci, quae ad ex. Ut quia delectus ab dolore nam est eligendi, sint dolorem earum repellat iusto aut eveniet hic blanditiis vitae tempora expedita accusantium! Aut doloribus ipsum quisquam. At quidem quos magni placeat voluptas nemo similique. Voluptatum, id?'}}
    ],  // 제품 1
    [ {'img': {'src':'englishBreakfast.jpg','alt':'제품1 이미지설명'} },
      {'menu':{'title':'englishBreakfast', 
               'content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, quaerat, dolores. Vitae corrupti doloribus eveniet, voluptatum necessitatibus excepturi quo culpa hic commodi reiciendis aperiam. Aut modi repudiandae officiis velit reiciendis expedita facilis unde culpa at distinctio quisquam laudantium fuga iusto aspernatur quam voluptatibus vitae, repellat totam. Voluptatem facilis perferendis dolorem repudiandae dolor soluta. Ea voluptates corporis officia quod quis neque a soluta ex error facere possimus cum debitis voluptas nam assumenda, adipisci rerum optio. Quas, culpa. Porro eum placeat, hic possimus a eligendi nesciunt eaque alias itaque dolores ad, ea deleniti mollitia blanditiis, voluptates est fuga aliquid. Ullam, nam reprehenderit!'}}
    ],  // 제품 2
    [ {'img': {'src':'strawberry.jpg','alt':'제품1 이미지설명'} },
      {'menu':{'title':'strawberry', 
               'content':'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque odio, obcaecati commodi ipsa nesciunt, praesentium minima quos rerum sapiente, tenetur pariatur repellendus officia nam quis culpa. Vero iste, tempore placeat.'}}
    ],  // 제품 3
  ];
  
$('body').find('#headBox').after('<div id="coffee"><ul>');
var coffee = $('#coffee').children('ul');
// #coffee 에 li항목을 만들고, 각각의 내용을 삽입 test
  // coffee.append('<li>');
  // coffee.find('li').append('<div><img>');
  // coffee.find('li').append('<dl><dt>');
  // coffee.find('li').children('dt').after('<dd>');


// coffee.append('<li> <div><img></div>   <dl> <dt></dt> <dd></dd> </dl> </li>');
// var img     = coffee.find('li').eq(0).find('img');
// var title   = coffee.find('li').eq(0).find('dt');
// var content = coffee.find('li').eq(0).find('dd');

// img.attr({'src':address + coffee_01[0][0].img.src , 
//          'alt':address + coffee_01[0][0].img.alt});
// title.text(coffee_01[0][1].menu.title);
// content.text(coffee_01[0][1].menu.content);


// 반복 -----------------------------------
var img, title, content, 
    i = 0, 
    cofeeLength = coffee_01.length;
console.log(cofeeLength);
for(; i<cofeeLength; i++){
  coffee.append('<li> <div><img></div>   <dl> <dt></dt> <dd></dd> </dl> </li>');
  img     = coffee.find('li').eq(i).find('img');
  title   = coffee.find('li').eq(i).find('dt');
  content = coffee.find('li').eq(i).find('dd');

  img.attr({'src':address + coffee_01[i][0].img.src , 
            'alt':address + coffee_01[i][0].img.alt});
  title.text(coffee_01[i][1].menu.title);
  content.text(coffee_01[i][1].menu.content);
}

})(this.jQuery);
