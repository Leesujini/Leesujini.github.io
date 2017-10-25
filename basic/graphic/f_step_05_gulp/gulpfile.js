var gulp = require('gulp');
var sass = require('gulp-sass');
var $    = require('jquery');
var sync = require('browser-sync').create();

// test -------------------
gulp.task('test', function(){
  console.log('---------------------------------');
  console.log('gulp를 설치하고, 실행하도록 준비하였습니다.'); 
  console.log('---------------------------------');
});

// path ---------------------
var url = {before:'./public/src/', after:'./public/dist/'};
var path = {
  sass:{
    src :url + 'src/scss/**/*.scss',
    dist:url + 'dist/css'
  },
  html: url.after +'**/*.html'
};

// html 수정시 반영
gulp.task('html',function(){
  return gulp.src(path.html)
             .pipe(sync.stream()); // 자동변환 기능추가
});

// sass ---------------------
gulp.task('sass',function(){
 return gulp
         .src(path.sass.src)
         .pipe(sass().on('error', sass.logError))
         .pipe(gulp.dest(path.sass.dist));
         .pipe(sync.stream());
});

// jquery -------------------
gulp.task('jquery', function(){
  return gulp.src(path.html).pipe(concat('test.js')).pipe(sync.stream());
});





// browser-sync ------------
gulp.task('sync',['html','sass'], function(){
 return sync.init({
    port:10530,
    server:{ baseDir:url.after }
  });
});


// watch -------------------
gulp.task('watch',function(){
 gulp.watch(path.html, ['html']);
 gulp.watch(path.sass.src, ['sass']);
});

// default ----------------
gulp.task('default',['jquery','sync','sass','watch']);

// deps: 바로뒤에 함수기능을 수행하기 전에 처리되는 일련의 기능(배열, 생략가능)
// .task 일 할당
// .src 원본의 위치
// .pipe 메소드를 연결하여 수행하기 위한 기능 
// dest 변환 처리해서 저장 폴더.