# xido gulpfile setting

# 사용 모듈

내용상 node 버전이 6버전과 8버전을 겸하여 사용한 내용이 있음. 
([nvm](https://github.com/creationix/nvm)을 통해 멀티버전 사용권장)- [nvm설명 블로그이동](http://blog.jeonghwan.net/2016/08/10/nvm.html)
실제 구동은 6버전으로 권장(현재 gulp버전 3.9.1)

```
  "browser-sync": "^2.18.13",
  "chalk": "^2.1.0",
  "components-jqueryui": "^1.12.1",
  "del": "^3.0.0",
  "gulp": "^3.9.1",
  "gulp-cached": "^1.1.1",
  "gulp-jshint": "^2.0.4",
  "gulp-newer": "^1.3.0",
  "gulp-outliner": "^0.0.8",
  "gulp-pixrem": "^1.0.0",
  "gulp-postcss": "^7.0.0",
  "gulp-sass": "^3.1.0",
  "gulp-svg2png": "^2.0.2",
  "gulp-watch": "^4.3.11",
  "jquery": "^3.2.1",
  "jshint": "^2.9.5",
  "lt-ie-9": "^0.1.0",
  "map-stream": "^0.0.7",
  "mk-dirs": "^1.0.0",
  "node-font-awesome": "^1.0.2",
  "write": "^1.0.3"
```

기본 설치는 npm이아닌 `yarn`을 통해 설치
yarn이 설치되어 있지 않다면 <https://yarnpkg.com/lang/en/>을 통해 설치할 것을 권장

사용파일 `gulpfile.js`, `package.json`파일을 통해 설치

```shell
$ yarn        // or yarn install 입력시 자동 설치(6버전권장, 일부 8버전으로 설치해야하는 경우 있음)
```

---

### 사용가이드

1. **yarn** : `package.json` 파일을 통해 처리되는기능 
2. **gulp set** : `gulpfile.js`기능에서 작업처리된기능으로 gulp를 실행하기전 기본 세팅(public폴더제작)처리하도록 제작
3. **gulp** : `gulpfile.js`기능에서 gulp를 실행하여 사용하도록처리(browser-sync, sass-watch기능이 동작하도록 처리)
4. **gulp cleanAll** : `gulpfile.js`기능에서 작업폴더인 public폴더를 삭제처리하도록 만든 명령어
5. **gulp clean** : `gulpfile.js`기능에서 배포전 폴더인 public/dist 폴더를 삭제처리하도록 만든 명령어
6. **gulp cssClean** : `gulpfile.js`기능에서 배포전 폴더인 public/dist/css 폴더를 삭제처리하도록 만든 명령어

---

### 기본 사용된 기능

- browser-sync :  서버구동

   (기본페이지 index.html로 처리되게 되어있으며, 실제로 index.html을 통해 html/main.html을 동작하도록 `gulpfile.js`에 처리되어 있음)

- sass(scss) : css 기능

- jquery /  jquery-ui

- fontAwesome

- lt-ie-9 : ie하위버전 처리기능 `Selectivizr`, `Respond.js`, `HTML5 Shiv`기능을 담고있음

- pixrem : ie하위버전에서 인식하지못하는 rem단위를 자동 변환

   (em단위는 현재 미변환처리 - postcss기능을 같이 담고있기에 postcss사용시 기능 부여만 처리하면 동작됨)

- favicon(svg2png) : `logo.svg` 파일 제작처리 후 `favicon.png`를 제작(32px * 32px)하도록 처리

   - favicon 기능으로  gulp set 기능이 다소 지연될 수 있기에 필요 없다면 삭제 후 사용하세요.
   - browser-sync에서는 일부 동작하지 않을 수 있습니다.

   ​