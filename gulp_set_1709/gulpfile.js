// gulp
var gulp        = require('gulp');

var cached      = require('gulp-cached');
var sync        = require('browser-sync');
var watch       = require('gulp-watch');

// 기본 폴더생성 및 삭제
var mkdir       = require('mk-dirs');
var writeFile   = require('write');
var newer 			= require('gulp-newer');
var del 		    = require('del');

// 하위브라우저, jquery, fontAwesome 환경설정(package 설정시 자동처리)
// 'lt-ie-9' ,'components-jqueryui','node-font-awesome'
var pxrem 			= require('gulp-pixrem');

// 각 기능별 사용
var fontAwesome = require('node-font-awesome');
var jquery      = require('jquery');
var sass        = require('gulp-sass');
var postcss			= require('gulp-postcss');

// 기타 부가 기능 처리
var svg2png     = require('gulp-svg2png');
var chalk 			= require('chalk'),
    keyword 		= chalk.bgKeyword('orange');

// lint 기능 처리
var jshint			= require('gulp-jshint');
var outliner    = require('gulp-outliner');

// cli 색상변경 테스트
gulp.task('chalk', function() {
	console.log(keyword(' .............................................................. '));
	console.log(chalk.bold.inverse('chalk test'));
	console.log(keyword(' .............................................................. '));
}); 


// 기본 경로설정
var url = {before:'./public/src/', after:'./public/dist/'},
    path = {
    	// sass 설정
			sass:{
				src:url.before + 'scss/**/*.scss',
				compile:url.before + 'css/',
				dist:url.after + 'css/'
			}, 
			// html 설정
			html:{ // 기본 페이지는 html폴더에 처리(skip page만 별도로 처리해서 메인페이지로 경로이동하도록 작업)
				main:'./html/index.html',	// index.html에서 경로 이동처리시
				err:'404.html',						// 404 error발생시 경로 이동    
				// src:url.before + '**/*.html',				// 현재 미사용중
				dist:url.after + '**/*.html',
			},
			// js 설정
			js: {// es6 또는 typescript작업시 추후 경로 변경처리 현재 path.js.dist 설정되어있음
				dist:url.after + 'js/src/**/*.js', 
				// src:url.before + 'js/**/*.js',
				// dist:url.after + 'js/',     
			},
			// 기타 파일 경로 설정
			modules:'./node_modules/',
			img :url.after + 'img/**/*'
		};

/* =========================================================================================== */

// mk-dirs(폴더 자동생성기능) ----------------------
gulp.task('mkdir',function() {
	Promise.all([
  mkdir(url.before + 'scss/src'),
  mkdir(url.before + 'work/planning'),
  mkdir(url.before + 'work/guideline'),
  mkdir(url.before + 'work/design'),
  mkdir(url.after + 'html/src'),
  mkdir(url.after + 'js/src'),
  mkdir(url.after + 'img'),
 ]);
});

 // gulp.task('json',function() {
	var myJson = require('./package.json');
	var mydata = JSON.stringify(myJson)
	                 .toString()
	                 .slice(20,-2)
	                 .replace(/,/gi,'<br />')
	                 .replace(/"/gi," ");
	// console.log(mydata);
	// return j;
 // })
  

// write-file(파일 생성) ------------------------
gulp.task('writeFile',function() {
	// .gitignore 파일 생성
	writeFile.sync('./.gitignore', 'node_modules/ \n **/*.{psd,ai,eps}')

	// readme.md 파일생성
	writeFile.sync(url.before + 'README.md', 
		            '# myWeb page guide line \n')

	// index.html
	writeFile.sync(url.after + 'index.html', 
		            '\n<!DOCTYPE html>\n<html lang="ko-KR">\n<head>\n	<meta charset="UTF-8">\n	<script>location="'+path.html.main+'"</script>\n	<title>index</title>\n</head>\n<body>\n	\n</body>\n</html>')

	// _variable.scss
	writeFile.sync(url.before + 'scss/base/_variable.scss', '// variable.scss \n\n@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);\n\n// /* ------------ color ------------  */\n$color: ( \n	primary : #656565, \n	main    : #a30, \n	sub1    : #c00, \n	sub2    : #ffaf00, \n	dark    : #656565, \n	gray    : #bbb, \n	point   : #3dd, \n	font1   : #171717, \n	font2   : #656565, \n	white   : #fff, \n	black   : #171717, \n	line1   : #a30, \n	line2   : #656565, \n	line3   : #171717, \n	zero    : transparent);\n\n// /* ------------ line ------------  */\n$line: ( \n	l1 : 1px solid map-get($color, line1), \n  l2 : 2px solid map-get($color, line2), \n  l3 : 3px solid map-get($color, point),\n  l4 : 4px solid map-get($color, main),\n  );\n\n// /* ------------ font ------------  */\n$size: 16;\n$fontSize: ( \n	base      : ($size / 16 * 0.875)  + rem,     // 14px\n	big       : ($size / 16 * 5)      + rem, 		 // 80px\n	big2      : ($size / 16 * 2.5)    + rem,     // 40px\n	middle    : ($size / 16 * 1.25)   + rem,     // 20px\n	small     : ($size / 16 * 0.75)   + rem,     // 12px\n	menuTitle : ($size / 16 * 1.5) + rem,     // 24px\n\n	);\n\n$fontFamily:( \n	english : ("myriad pro", arial), \n	korean  : (nanumGothic, "nanum Gothic", dotum), \n	all     : ("myriad pro", arial, nanumGothic, "nanum Gothic", dotum, sans-serif)\n	);\n \n// /*  -------------- etc ----------------- */\n$minWidth : 960;\n$baseTime : 300ms;\n$baseMotion : ease-in;\n$baseaniUse : all;\n$url:"../../img/";')
	// _mixin.scss
	writeFile.sync(url.before + 'scss/base/_mixin.scss', '// scss class(html에서 불리는 class와는 다소 다른 의미)\n // base layout\n\n @mixin baseLayout($w:100%, $mw:$minWidth, $boo:false ,$h:auto, $bgc:dark, $myC:null){\n 	// $w : 가로값의 크기(width)\n 	// $mw : min-width\n 	// $boo : boolean 기능으로 min-width를 작성할 것인지(true) 아니면 작성하지 않을 것인지로 판단(false). -  기본설정: false\n 	// $h : 높이값(height)\n 	// $bgc: 배경색상\n 	// $myC: 배경색 설정시 true 또는 false 일 경우 색상을 입력하도록 설정 이외의 값일 경우 배경색을 입력하지 않도록 처리(기본 null)\n 	// $myC 색상설정시 true :변수를 이용한 색상처리,  false: 직접 입력한 색상 사용하도록 처리\n\n 	width:$w; \n\n	@if $h == null{} \n	@else if $h == auto {\n		height:auto;\n		&:after{content:" "; display: block; width: 100%; height: 0;clear: both;}\n	}@else if $h == number {\n		height:rem($h);\n	}@else {	\n		height:$h;  \n	}\n\n	 	@if $boo == true { min-width:rem($minWidth); 	}\n\n	 	@if $myC == true or false{ 	\n			background-color:bgc($bgc, $myC);\n	 	} \n } // baseLayout\n\n@mixin ani($u:$baseaniUse, $t:$baseTime ,$m:$baseMotion){\n	transition : $u $t $m;\n}\n\n@mixin boxSizing($s){\n 	padding: ($s / 16) + rem;\n 	box-sizing:border-box;\n }\n \n\n // 외부 기본 연결주소 세팅()\n // $url:"../../img/";\n // 문자의 연결은  기호로 표기\n@mixin link($u:$url, $f:none, $p:center, $t:700ms){ \n		a{width: 100%; height: 100%; display: block; \n			background-image: url($u + $f);	\n			background-repeat: no-repeat; \n			background-position:$p;\n			transition:all $t linear;\n	 >span{display: block; width:0; height:0; \n			position: absolute; z-index:-100; overflow: hidden;}//span \n		 }// a \n	 } // link()\n\n@mixin img($u:$url, $f:none, $p:center, $s:contain , $c:false, $boo:false){ \n			background-image: url($u + $f);	\n			background-repeat: no-repeat; \n			background-position:$p;\n			background-size:$s;\n			@if $c == false {}@else {	background-color:$c; }\n\n	 } // img()\n\n@mixin firstFix($p, $v){\n 	-webkit-#{$p} : $v;\n 	-moz-#{$p}    : $v;\n 	-ms-#{$p}     : $v;\n 	-o-#{$p}      : $v;\n }\n\n@mixin lastFix($p, $v){\n 	#{$p} : -webkit-$v;\n 	#{$p} : -moz-$v;\n 	#{$p} : -ms-$v;\n 	#{$p} : -o-$v;\n }\n\n@mixin shadow($x, $y, $b,$c, $i:false){\n	@if $i == false{\n	 box-shadow:$x $y $b $c;\n	 } @else if $i == true {\n	 box-shadow:$x $y $b $c inset;\n }\n}\n\n// -----------------------------------------------------------\n\n@function wideVw($w){\n 	@return ($w / 1920 * 100)+vw;\n }\n\n@function pcVw($w){\n 	@return ($w / 960 * 100)+vw;\n }\n\n@function rem($s){\n 	@return ($s / 16)+ rem;\n }\n\n \n@function fs($size:base, $boo:true){\n	@if $boo == true {\n 	@return map-get($fontSize, $size);\n } @else if $boo == false {\n 	@return rem($s);\n }\n}\n\n@function line($l){\n	@return map-get($line, $l);\n}\n \n@function bgc($bgc, $myColor:$myC){\n @if $myColor == true { 	\n 	 @return color($bgc);	\n } @else if $myColor == false {\n 	 @return $bgc;\n }\n}\n\n@function color($c , $o:1){\n	@if $o >= 1{\n		@return map-get($color, $c);\n	}@else if $o < 1{\n		@return rgba( map-get($color, $c) , $o);\n	}\n}')
	//reset.css
	writeFile.sync(url.before + 'scss/base/_reset.scss','\n@import "variable.scss";\n/* reset.css */ \n:root{font-size:map-get($fontSize, base); color:inherit;}\nhtml,body{width: 100%; height: 100%; color:map-get($color, font1);}\nhtml, body, h1, h2, h3, h4, h5, h6, p, div, img, table, figure, main, header, article, section, footer, nav,aside,main, ul,ol,dl,li,dt,dd{margin:0; padding:0; border:0; outline: 0; font: 100%/1.2 map-get($fontFamily, all); vertical-align:bottom;}\nh1,h2,h3,h4,h5,h6{font-weight:bold;}\ntable,tr,td,th,thead,tbody,tfoot{border-style:solid; border-color:map-get($color, font1); 	border-width:1px; border-spacing:0; border-collapse:collapse;}\nul, ol, li{list-style: none;}\na{color:inherit; text-decoration: none;}\na:hover{color:map-get($color, sub1);}\ninput[type="submit"],input[type="reset"],input[type="button"],\nbutton{background-color:map-get($color, zero); cursor:pointer; border:0;}\n/* html5 */\nheader, article, section, footer, nav, aside, hgroup, figure, main{	display: block;}\n/* web accessibility */\na,input,button,textarea,select {\n	cursor:pointer;\n &:focus{	\n 	outline:map-get($line, l3); position: relative; z-index: 500; \n }}\ninput[type="text"]:focus, input[type="password"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="url"]:focus, input[type="email"]:focus, textarea:focus{background-color:lighten(map-get($color, main), 30%); color:map-get($color, dark); }')
	// common.scss
	writeFile.sync(url.before + 'scss/base/_common.scss','\n /* common */\n /** 기본 웹 css형태를 사용할경우에는 class이름 앞에 me라고 작성후_로 구분하여 이름제작* */\n /*h2, h3, h4, h5, h6{width: 0; height: 0; overflow: hidden;}*/\n .me_base{width: 960px; height: auto;padding:0 10px; box-sizing:border-box;margin: 0 auto;}\n .me_base:after{content:" "; display: block; clear:both;}\n .me_wide{width: auto; max-width: 100%; min-width: 960px; height: auto;padding:0 10px; box-sizing:border-box;	 margin: 0 auto;}\n .me_base:after{content:" "; display: block; clear: both;}\n @media screen and (min-width:960px) {body{overflow-x:hidden;}.me_line{position: relative;}.me_line:before{width: 100vw; height: 100%; position: absolute; top: 0; left: 50%; margin-left: -50vw;background-color:inherit;}}\n .cf::after, .clearfix::after{content:""; display: block; clear: both;}\n .me_full{width: 100%; height: 100%;}\n .me_link a{width:100%; height:100%; background-repeat:no-repeat; display:block;}\n .me_link a>span, .me_hidden, legend{width: 0; height: 0; display: block; position: absolute; z-index: -100; overflow: hidden;}\n #wrap .me_first:first-of-type{margin-left: 0; padding-left: 0; border-left: 0;}\n #wrap .me_last:last-of-type{margin-right: 0; padding-right: 0; border-right: 0;}\n .me_link_bar>li{padding:0 0.4em; position: relative; margin-right:0.2em; float: left;}\n .me_link_bar>li:after{content:" "; width:2px; height:80%; background-color:#999; position:absolute; right:-50%; top:10%; z-index:100;}\n .me_link_bar>li:last-child{border-right:0; margin-right: 0;}\n .me_link_bar>li:last-child:after{display: none;}')
	// normalize.scss 파일생성
	writeFile.sync(url.before + 'scss/normalize.scss','\n @import "./base/reset.scss";\n @import "./base/common.scss";\n @import "./base/mixin.scss";')

	/* // 404.html 생성 ============================================================ */
		// 404.html
		writeFile.sync(url.after+'html/404.html','<!DOCTYPE html>\n<html lang="ko-KR">\n<head>\n	<meta charset="UTF-8">\n	<meta http-equiv="X-UA-Compatible" content="IE=edge">\n	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0">\n <!-- [If lte IE 9]>\n   <script type="text/javascript" src="../js/base/lt-ie-9.min.js"></script>\n <! [endif] -->\n <link rel="stylesheet" href="../fontAwesome/css/font-awesome.min.css">\n<link rel="stylesheet" href="../css/normalize.css">\n <link rel="stylesheet" href="../css/main.css">\n <link rel="apple-touch-icon" type="image/png" href="../logo.png">\n <link rel="shortcut icon" type="image/png" href="../logo.png">\n <script src="../js/base/jquery.min.js"></script>\n <script src="../js/base/jquery-ui.min.js"></script>\n <title>complete web</title>\n</head>\n<body>\n	<div id="wrap">\n		\n	<!-- main.html -->\n		<article id="mainContent">\n	<div class="logo"><img src="../img/logo.svg" alt="monfee web logo" /></div>		\n<h2>404 ERROR</h2>\n			<p>요청하신 페이지는 없는 페이지 입니다. 다시한번 정확한 주소를 확인하세요.</p>	</article>\n\n	</div>\n	<script src="../js/src/commonHtml.js"></script>\n</body>\n</html>')

	/* // 임시파일 생성 ============================================================ */
		// main.html
		writeFile.sync(url.after+'html/main.html','<!DOCTYPE html>\n<html lang="ko-KR">\n<head>\n	<meta charset="UTF-8">\n	<meta http-equiv="X-UA-Compatible" content="IE=edge">\n	<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=1.0">\n <!-- [If lte IE 9]>\n   <script type="text/javascript" src="../js/base/lt-ie-9.min.js"></script>\n <! [endif] -->\n <link rel="stylesheet" href="../fontAwesome/css/font-awesome.min.css">\n<link rel="stylesheet" href="../css/normalize.css">\n <link rel="stylesheet" href="../css/main.css">\n <link rel="apple-touch-icon" type="image/png" href="../logo.png">\n <link rel="shortcut icon" type="image/png" href="../logo.png">\n <script src="../js/base/jquery.min.js"></script>\n <script src="../js/base/jquery-ui.min.js"></script>\n <title>complete web</title>\n</head>\n<body>\n	<div id="wrap">\n		\n	<!-- main.html -->\n		<article id="mainContent">\n	<div class="logo"><img src="../img/logo.svg" alt="monfee web logo" /></div>		\n<h2>gulp setting complete</h2>\n			<p>gulp를 사용한 웹페이지 세팅이 완료되었습니다. <br />\n				 문서를 하나씩 작성해서 다양한 측면에서 문제 없는지 파악하신 후 사용하세요.<br />\n				 사용시 생기는 다양한 문제는 수정해서 사용하시기 바랍니다. \n			</p>\n	<h3>사용된 modules</h3><p id="modules"></p>	</article>\n\n	</div>\n	<script src="../js/src/commonHtml.js"></script>\n <script src="../js/src/mydata.js"></script>\n</body>\n</html>')

		// main.html 에 headBox, footBox 파일 삽입
		writeFile.sync(url.after + 'html/src/headBox.html', '<!-- headBox.html -->\n	<h1><a href="main.html">monfee web</a></h1>')
		writeFile.sync(url.after + 'html/src/footBox.html', '<!-- footbox.html -->\n<h2 class="me_hidden">complete</h2>\n<p>&copy; monfee web.</p>')

		// main.scss 파일생성을 위한 기본 부분파일 생성 ------------
		// _wrap.scss
		writeFile.sync(url.before + 'scss/src/_wrap.scss', '// _wrap.scss\n \n /* =========== wrap.css ================== */\n #wrap{width: 100%; min-width:960px; height: auto; margin: 0 auto;}')
		// _headBox.scss
		writeFile.sync(url.before + 'scss/src/_headBox.scss', '// _headBox.scss\n/* ============== headBox.css ============== */\n#headBox{width: 100%; height: auto; padding: 1rem; background-color:map-get($color,point); color:map-get($color, white);font-size:map-get($fontSize,big);  margin-bottom:2rem;\n	&:hover a{color:map-get($color,white); font-weight:bold; text-shadow:0.2rem 0.2rem 0.2rem map-get($color, gray); text-decoration:underline;}\n>h1{font-size: inherit; color:inherit; text-align:center;\n}\n}')
		// _footBox.scss
		writeFile.sync(url.before + 'scss/src/_footBox.scss', '// _footBox.scss\n/* ============== footBox.css ============== */\n#footBox{width: 100%; height: auto; padding: 1rem; margin-top:1rem; background-color:map-get($color, gray); color:map-get($color, white);\n	>p{font-size:map-get($fontSize,small); 	text-align: center;}\n}')
		// _mainContent.scss
	 writeFile.sync(url.before + 'scss/src/_mainContent.scss', '// mainContent.scss \n/* ========== mainContent.css ========== */ \n#mainContent{width: 960px; margin: 0 auto; text-align: center;\n .logo{width:10rem; height:auto; margin:0.5rem auto;  \n >img{width:100%; height:auto;}} \n >h2{border-bottom:map-get($line, l1); padding-bottom:0.5rem; margin-bottom:1rem; font-size:map-get($fontSize,big2); color:map-get($color,point);}\n h3{font-size:map-get($fontSize,big2);margin-top:1rem; border-bottom:map-get($line, l2)}\n >p{line-height:1.4rem; color:map-get($color,gray); text-align:center;} \n #modules{width:300px; margin:1rem auto; padding:1rem; background-color:lighten(map-get($color,point),60%); color:map-get($color,black); text-align:left; font-size:1.1rem; line-height:1.5rem; border-radius:0.5rem; word-spacing:0.3rem;}}')
	 // main.scss 파일생성
		writeFile.sync(url.before + 'scss/main.scss', '// main.scss \n/* ========== main.css ========== */ \n @import "./base/variable.scss";\n @import "./base/mixin.scss";\n\n @import "./src/headBox.scss";\n @import "./src/mainContent.scss";\n @import "./src/footBox.scss"; ')

		// jquery를 활용하여 파일 삽입 -------------------------------
		// headBox, footBox, 파일연동
		writeFile.sync(url.after + 'js/src/commonHtml.js', "// commonHeadHtml.js\n (function($) {\n 	var wrap = $('#wrap');\n 	wrap.prepend('<header id=\"headBox\"></header>');\n 	wrap.append('<footer id=\"footBox\"></footer>');\n\n 	var headBox = $('#headBox');\n 	var footBox = $('#footBox');\n\n 	headBox.load('./src/headBox.html');\n 	footBox.load('./src/footBox.html');\n})(this.jQuery);")
		// 사용 모듈 내용 삽입
		writeFile.sync(url.after + 'js/src/mydata.js', "// mydata.js\n (function($) { \n var myModules = $('#modules'); \n myModules.html(\'"+ mydata +" \'); })(this.jQuery);")
	/* // ==================================================================== */

	// make svg file monfee
	writeFile.sync(url.after + 'img/logo.svg', 
		            '\n<svg version="1.1"\n	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"\n	 x="0px" y="0px" width="675px" height="209.9px" viewBox="0 0 675 209.9" style="enable-background:new 0 0 675 209.9;"\n	 xml:space="preserve">\n<style type="text/css">	.st0{fill:#A43300;}</style>\n<g>\n	<path class="st0" d="M468.1,2c-4.1,1.3-7.8,3.4-11,6.3c-3.2,2.9-5.8,6.6-7.7,11c-1.9,4.5-2.9,9.9-2.9,16.4v17.1h-18.5h-2.6H408\n		V34.4c0-6.1,2.6-9.2,7.9-9.2h12.1V0h-12.3c-4.4,0-8.6,0.7-12.7,2c-4.1,1.3-7.8,3.4-11,6.3c-3.2,2.9-5.8,6.6-7.7,11\n		c-1.9,4.5-2.9,9.9-2.9,16.4v17.1h-25.7v22h25.7V187H408V74.8h17.4h2.6h18.5V187h26.8V74.8h20v-22h-20V34.4c0-6.1,2.6-9.2,7.9-9.2\n		h12.1V0h-12.3C476.5,0,472.2,0.7,468.1,2z"/>\n	<path class="st0" d="M567.2,62.6c-3.4-3.8-7.6-6.7-12.6-8.8c-5-2.1-10.5-3.2-16.7-3.2c-8.2,0-15.3,1.8-21.3,5.3\n		c-6,3.5-10.5,8.1-13.7,13.9c-1.9,3.5-3.2,7.5-3.9,12.1c-0.7,4.6-1.1,9.5-1.1,15v43.9c0,5.4,0.3,10.4,1.1,15c0.7,4.6,2,8.6,3.9,12.1\n		c3.2,5.8,7.7,10.4,13.7,13.9c5.9,3.5,13,5.3,21.3,5.3c6.1,0,11.6-1.1,16.5-3.2c4.9-2.1,9.1-5,12.6-8.7c3.5-3.5,6.2-7.7,8-12.6\n		c1.8-4.9,2.8-10.2,2.8-15.8H551c-0.4,3-1.4,6-3,8.9c-1.7,3-5,4.5-10.1,4.5c-4,0-7.2-1.1-9.6-3.4c-2.4-2.3-3.5-5.5-3.5-9.7v-18.1h53\n		V92.2c0-5.8-0.9-11.2-2.8-16.3C573.2,70.8,570.6,66.4,567.2,62.6z M551,107.9h-26.3V92.7c0-5.1,1.2-8.9,3.5-11.4\n		c2.4-2.5,5.6-3.8,9.6-3.8c4,0,7.2,1.3,9.6,3.8c2.4,2.5,3.5,6.3,3.5,11.4V107.9z"/>\n	<path class="st0" d="M675,128.9V92.2c0-5.8-0.9-11.2-2.8-16.3c-1.8-5.1-4.5-9.5-7.9-13.3c-3.4-3.8-7.6-6.7-12.6-8.8\n		c-5-2.1-10.5-3.2-16.7-3.2c-8.2,0-15.3,1.8-21.3,5.3c-6,3.5-10.5,8.1-13.7,13.9c-1.9,3.5-3.2,7.5-3.9,12.1c-0.7,4.6-1.1,9.5-1.1,15\n		v43.9c0,5.4,0.3,10.4,1.1,15c0.7,4.6,2,8.6,3.9,12.1c3.2,5.8,7.7,10.4,13.7,13.9c5.9,3.5,13,5.3,21.3,5.3c6.1,0,11.6-1.1,16.5-3.2\n		c4.9-2.1,9.1-5,12.6-8.7c3.5-3.5,6.2-7.7,8-12.6c1.8-4.9,2.8-10.2,2.8-15.8h-26.8c-0.4,3-1.4,6-3,8.9c-1.7,3-5,4.5-10.1,4.5\n		c-4,0-7.2-1.1-9.6-3.4c-2.4-2.3-3.5-5.5-3.5-9.7v-18.1H675z M621.9,92.7c0-5.1,1.2-8.9,3.5-11.4c2.4-2.5,5.6-3.8,9.6-3.8\n		c4,0,7.2,1.3,9.6,3.8c2.4,2.5,3.5,6.3,3.5,11.4v15.2h-26.3V92.7z"/>\n	<path class="st0" d="M263.7,92.3c0-0.5-0.1-1-0.1-1.4c0,0,0,0,0,0c-0.1-1.3-0.1-2.5-0.3-3.7c0-0.1,0-0.2,0-0.3c0,0,0,0,0,0\n		c-0.2-2.2-0.5-4.4-0.9-6.5c0-0.2-0.1-0.4-0.1-0.6c0,0,0,0,0,0c-0.3-1.5-0.6-2.9-0.9-4.3l0,0c-0.1-0.5-0.2-0.9-0.4-1.3\n		c-0.2-0.5-0.3-1.1-0.5-1.6l0,0c-0.2-0.6-0.4-1.2-0.6-1.8c-0.1-0.3-0.2-0.7-0.4-1c0,0,0,0,0-0.1c-0.6-1.6-1.3-3.1-2-4.6\n		c0,0,0-0.1,0-0.1c-0.7-1.3-1.4-2.5-2.1-3.7c-0.2-0.4-0.5-0.8-0.7-1.1c0,0,0,0,0,0c-0.6-0.8-1.1-1.6-1.8-2.4c0,0,0,0,0,0\n		c-0.4-0.5-0.8-1-1.3-1.5c-0.2-0.2-0.3-0.3-0.4-0.5l0,0c-0.1-0.1-0.1-0.1-0.2-0.2c-0.5-0.6-1.1-1.1-1.6-1.6l0,0\n		c-0.6-0.6-1.3-1.2-2-1.7c-0.4-0.4-0.9-0.7-1.3-1.1c-9.7-7.3-23.9-10.9-43.2-10.9c-19.3,0-33.5,3.6-43.2,10.9\n		c-0.5,0.3-0.9,0.7-1.3,1.1c-1.4,1.1-2.7,2.4-3.9,3.7c0,0,0,0,0,0c-0.6,0.6-1.1,1.2-1.6,1.9l0,0c0,0.1-0.1,0.1-0.1,0.2l0,0\n		c-0.5,0.6-1,1.3-1.5,1.9c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.2c0,0,0,0,0,0c-0.3,0.4-0.5,0.8-0.7,1.1c-1,1.6-2,3.3-2.8,5.2\n		c-0.1,0.2-0.2,0.4-0.3,0.6c0,0,0,0,0,0c-0.1,0.2-0.2,0.4-0.2,0.6c0,0,0,0,0,0c-0.2,0.5-0.4,1-0.6,1.5c-0.2,0.4-0.3,0.8-0.5,1.3\n		c0,0,0,0,0,0c0,0.1-0.1,0.3-0.1,0.4c-0.3,0.8-0.6,1.7-0.8,2.5c0,0,0,0,0,0c0,0.2-0.1,0.3-0.1,0.5c-0.2,0.9-0.5,1.7-0.7,2.6\n		c0,0,0,0,0,0c-0.1,0.3-0.1,0.7-0.2,1c-0.7,3.3-1.2,6.8-1.5,10.5c0,0.2,0,0.5-0.1,0.7v0c-0.1,1-0.1,2-0.2,3.1c0,0.2,0,0.4,0,0.6\n		c0,0,0,0,0,0c0,1.3-0.1,2.5-0.1,3.8c0,9.2,5,17,9.9,22.4c4.6,5,9,8,9.1,8l0.8,0.5l-0.4,0.8c0,0.1-4.7,9.9-4.7,20\n		c0,9.2,2.9,16.6,8.6,21.9c7.6,7.2,20.3,10.8,37.7,10.8c17.4,0,30.1-3.6,37.7-10.8c5.7-5.4,8.6-12.7,8.6-21.9c0-10-4.7-19.9-4.7-20\n		l-0.4-0.8l0.7-0.5c0.1-0.1,4.6-3,9.1-8c4.9-5.4,10-13.2,10-22.3C263.8,94.9,263.7,93.6,263.7,92.3\n		C263.7,92.3,263.7,92.3,263.7,92.3z"/>\n	<path class="st0" d="M344,59.6c-2.6-2.6-5.6-4.5-8.9-5.6c-3.3-1.1-6.7-1.7-10-1.7c-1.7,0-19.7,0-44.6,0\n		c-3.3-5.3-7.2-10.2-11.7-14.6c-16.8-16.4-41-25.1-68.2-24.4c-34.1,0.8-60.7,15.2-75.4,39c-11.6,0-18.6,0-18.6,0v0.1\n		c-0.8-0.1-1.6-0.1-2.4-0.1c-7.2,0-12.8,1.3-16.8,3.9c-4,2.6-7.7,5.8-11,9.5c-2.5-3.3-5.6-6.4-9.5-9.2c-3.9-2.8-8.7-4.2-14.4-4.2\n		c-3.9,0-24.1,0-38.2,0C6.2,52.3,0,58.4,0,66.4S0,187,0,187h26.8V97.4c0-5.9,1-10.5,2.9-13.7c1.9-3.2,5.4-4.7,10.5-4.7\n		c4.2,0,7.4,1.4,9.7,4.2c2.3,2.8,3.4,6.7,3.4,11.6V187h26.8V97.4c0-5.9,1-10.5,2.9-13.7c1.9-3.2,5.4-4.7,10.5-4.7\n		c4.2,0,7.4,1.4,9.7,4.2c2.3,2.8,3.4,6.7,3.4,11.6V187h26.8h16.8c11.6,13.3,29.4,21.9,48.9,22.8l0.2,0c1.2,0.1,2.4,0.1,3.5,0.1\n		c1.1,0,2.3,0,3.4-0.1l0.2,0c19.6-0.9,37.3-9.6,49-22.8h44V97.4c0-5.9,1-10.5,2.9-13.7c1.9-3.2,5.4-4.7,10.5-4.7\n		c4.2,0,7.4,1.4,9.7,4.2c2.3,2.8,3.4,6.7,3.4,11.6V187h26.8V84.8c0-5.9-0.8-11-2.4-15.1C348.8,65.6,346.7,62.2,344,59.6z\n		 M263.4,154.6c-1.2,1.4-2.2,2.9-3.1,4.5c-0.7,2.1-1.4,4.1-2.3,6c-2.9,8.4-8.3,15.9-15.4,21.9c-9.6,8-22.4,13.2-36.6,13.8\n		c-0.1,0-0.1,0-0.2,0c-1,0.1-2,0.1-3.1,0.1c-1,0-2,0-3-0.1c-0.1,0-0.1,0-0.2,0c-14.2-0.7-27-5.8-36.6-13.8\n		c-7.1-5.9-12.5-13.4-15.4-21.9c-0.9-2-1.7-4-2.4-6.1c-0.8-1.5-1.8-3-3-4.3c-13.5-15-21.5-34.9-20.8-56.8\n		c0.5-18.6,5.9-33.8,14.6-45.6c14.4-19.3,38-29.4,64.8-30c28.5-0.7,53.8,9.7,68.9,30c9.2,12.4,14.5,28.4,14.5,48\n		C284.2,121.1,276.4,140.2,263.4,154.6z"/>\n</g>\n</svg>') });

// // favicon 생성 -------------------------

gulp.task('favicon', function () {
	gulp.src(url.after + 'img/logo.svg')
        .pipe(svg2png())
        .pipe(gulp.dest(url.after));
	});

// html ------------------------
// html validator 기능 처리(파일 미확인)

gulp.task('html', function(){
	return gulp.src(path.html.dist)
	           .pipe(cached('htmlFiles'))
	           .pipe(sync.stream());
	});

// js --------------------------
// // jsHint 기능처리
var jsError = function(error) {
	  console.log(keyword(' ERROR .............................................................. '),'\n') 
	  	error.forEach(function(result, index){
		  	var err = result.error;
		  	var file = result.file;
		  	console.log(chalk.bold.red(` ${index+1} : `),
		  							chalk(`File: ${file},  Line: ${err.line}, Col: ${err.character}, Code: ${err.code}`))
		  	console.log(keyword(` Error: ${err.reason}`),'\n')
		  })
    console.log(keyword('.................................................................... ')) 
		};

// js 기능처리
gulp.task('js', function(){
	return gulp.src(path.js.dist)
						 .pipe(cached('jsFiles'))
						 .pipe(jshint())
						 .pipe(jshint.reporter(jsError))
						 .pipe(sync.stream());
	});

// fontAwesome ------------------------
gulp.task('fontAwesome',function() {
 gulp.src([path.modules+'font-awesome/**/*.*', 
 					 '!'+path.modules+'font-awesome/less/**/*.*', 
 					 '!'+path.modules+'font-awesome/scss/**/*.*', 
 					 '!'+path.modules+'font-awesome/**.txt'])
     .pipe(gulp.dest(url.after+ '/fontAwesome'))
	});

// li-ie-9 ----------------------
gulp.task('ie',function() {
	gulp.src(path.modules+'lt-ie-9/lt-ie-9.min.js')
			.pipe(gulp.dest(url.after+'js/base/'));
	});

// jQuery --------------------
gulp.task('jquery', function() {
	gulp.src([path.modules+'jquery/dist/jquery.min.js', path.modules+'components-jqueryui/jquery-ui.min.js'])
			.pipe(gulp.dest(url.after+'js/base/'));
	});

// sass ------------------------
// sass option
var scssOptions = { 
	includePaths: url.before + 'scss/',
	/** 
	* outputStyle (Type : String , Default : nested) 
	* CSS의 컴파일 결과 코드스타일 지정 
	* Values : nested, expanded, compact, compressed */ 
	outputStyle : "compact", 
	/** 
	* indentType (>= v3.0.0 , Type : String , Default : space) 
	* 컴파일 된 CSS의 "들여쓰기" 의 타입 
	* Values : space , tab */ 
	indentType : "tab", 
	/** 
	* indentWidth (>= v3.0.0, Type : Integer , Default : 2) 
	* 컴파일 된 CSS의 "들여쓰기" 의 갯수 */ 
	indentWidth : 1, // outputStyle 이 nested, expanded 인 경우에 사용 
	/** 
	* precision (Type : Integer , Default : 5) 
	* 컴파일 된 CSS 의 소수점 자리수. */ 
	precision: 6, 
	/** 
	* sourceComments (Type : Boolean , Default : false) 
	* 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. 
	*/ 
	sourceComments: false 
	};

function handleError (error) {
  console.log(keyword(' ERROR .............................................................. ')) 
  var start = error.toString().indexOf(">");
  console.log( keyword( '\n'+ 'Status: ' + error.status+'\n',
  	                    'File: ' + error.relativePath+'\n',
                        'Line: ' + error.line +  
                        ', Coulumn: ' + error.column+'\n') );
  console.log( keyword( error.formatted.toString() ));
  console.log(keyword(' ...................................................................... ')) 
  // console.log(error.toString())
  this.emit('end')
	}

// css 단위변환 파일
gulp.task('sass', function(){
		return gulp.src(path.sass.src)
							 // .pipe(newer(path.sass.src))
		           .pipe(cached('sassFiles'))
							 .pipe(sass(scssOptions).on('error', handleError) )
							 .pipe(pxrem())
							 .pipe(gulp.dest(path.sass.dist))
							 .pipe(sync.stream());
		});

// browser-sync ----------------
gulp.task('sync',['html', 'sass', 'js'], function() {
   return sync.init({ 
   	server: { baseDir: url.after }  
   },function (err, bs) {
    bs.addMiddleware("*", function (req, res) {
        res.writeHead(302, { "location": path.html.err  });
        res.end("Redirecting!");
        });
		});
	});

// watch -----------------------
gulp.task('watch', function(){
	// gulp.watch(path.sass.src, ['sass']);
	// gulp.watch(path.html.dist, ['html']);
	// gulp.watch(path.js.dist, ['js']);
	watch(path.sass.src, function(){ gulp.start('sass')});
	watch(path.html.dist, function(){ gulp.start('html')});
	watch(path.js.dist, function(){ gulp.start('js')});
	});  

// data 삭제처리 --------------------
gulp.task('cleanAll',function() {
	return del('./public/',{forct:true});
})

gulp.task('clean', function(){
  return del([url.after, '!dist'], {force:true});
});
gulp.task('cssClean',function(){
	return del([url.after+'css'],{force:true})
});

// make setting ----------------
gulp.task('set',['mkdir', 'writeFile', 'favicon', 'ie', 'jquery', 'fontAwesome','sass']);

// default ---------------------
gulp.task('default',['sync', 'watch']);










