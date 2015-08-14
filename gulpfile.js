var gulp = require('gulp');
//页面名称
var list = require('./list.json');

var BASE_URL = '../GoOnlineJudge';

// 引入组件
var less = require('gulp-less'),            // less
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    clean = require('gulp-clean');          //清空文件夹

// less解析
gulp.task('build-less', function(){
  gulp.src(['./src/user/**/*.less', './src/contest/**/*.less', './src/admin/**/*.less'])
    .pipe(less())
    .pipe(concat('GoOnlineJudge.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest(BASE_URL+'/static/css/'));
});

// 合并，压缩js文件
gulp.task('javascripts', function() {
  gulp.src(['./src/user/**/*.js', './src/contest/**/*.js', './src/admin/**/*.js'])
    .pipe(concat('GoOnlineJudge.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(BASE_URL+'/static/js/'));
});

// 清空图片、样式、js
gulp.task('clean', function() {
  return gulp.src([BASE_URL+'/static/css/*',
    BASE_URL+'/static/js/*', 
    BASE_URL+'/view/*'], {read: false}
  ).pipe(clean({force: true}));
});

// 将库文件对应到指定位置
gulp.task('buildlib',function(){
  //---------------------------js-------------------------------------
  gulp.src('./lib/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(BASE_URL+'/static/js/'))
  //--------------------------css-------------------------------------
  gulp.src('./lib/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest(BASE_URL+'/static/css/'))
  //--------------------------tpl-------------------------------------
  list['user'].forEach(function(v, i){
    gulp.src('./src/user/' + v + '/*.tpl')
      // .pipe(rename( v + '.tpl' ))
      .pipe(gulp.dest(BASE_URL+'/view/'));
  });
  list['contest'].forEach(function(v, i){
    gulp.src('./src/contest/' + v + '/*.tpl')
      // .pipe(rename( v + '.tpl' ))
      .pipe(gulp.dest(BASE_URL+'/view/contest/'));
  });
  gulp.src('./src/admin/*.tpl')
    .pipe(gulp.dest(BASE_URL+'/view/admin'));
  
});

// 定义develop任务在日常开发中使用
gulp.task('develop',function(){
  gulp.run('buildlib','build-less','javascripts');

  // gulp.watch('./src/**/**/*', ['develop']);
  gulp.watch('./src/a.txt', ['develop']);
});

// 定义一个prod任务作为发布或者运行时使用
gulp.task('prod',function(){
  gulp.run('buildlib','build-less','stylesheets','javascripts');

  // 监听.less文件,一旦有变化,立刻调用build-less任务执行
  // gulp.watch('./javis/static/less/*.less', ['build-less']);
});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task('default', ['clean'], function(){
  gulp.run('develop');
});