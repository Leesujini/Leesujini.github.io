#GULP

GULP란? streanming build system 이라 불리기도 하며, 자동화 도구 (task runner system)으로 불리기도 하는 시스템
######하는 기능
자동화 도구의 기능 변환, 병합화(파일을 합치기), 난독화(개발자 외에 파일명, 내용을 확인하기 어렵게 만들기), 캡슐화(보호처리하여 내용을 볼 수 없게 처리) 등의 기능을 자동으로 처리하는 시스템

##gulp 에 필요한 기본 자료
1.node.js(lts버전)
2.node package(기본은 npm, 별도의 기능으로 만들어진 yarn을 사용해도 무방)
3.git-bash

#####yarn 설치
```
$ npm install yarn -g
```

위  기능이 대표적이나 현재는 별도설치 권장

-----
**아래 내용을 미리 기억하고 진행하겠습니당** 
1.  node_modules (자동 생성)
2.  package.json (자동 생성)
3.  gulpfile.js (직접 생성)
4.  gitgnore(직접생성:node_modules 폴더는 git 에 올리지 않는다.)
-----

gulp를 컴퓨터 전역/해당폴더에 설치
```
$ yarn add gulp -g              //npm install gulp-cil -g
$ yarn add gulp --dev           //npm install gulp --save-dev
```
dest() //결과의 위치
gulp.watch('변화를 감지할 위치',[감지가 되면 처리할 task]) //실시간으로 감지해서 변화를 처리하도록 하는 기능