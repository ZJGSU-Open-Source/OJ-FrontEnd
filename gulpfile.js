var gulp = require('gulp');
//页面名称
var list = require('./list.json');

var BASE_URL = 'D:/workspace/go/src/GoOnlineJudge';

// 引入组件
var less = require('gulp-less'),            // less
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    clean = require('gulp-clean');          //清空文件夹

// 解析，合并，压缩less
gulp.task('less', function(){
  gulp.src(['./src/*.less', './src/**/**/*.less'])
    .pipe(less())
    .pipe(concat('GoOnlineJudge.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest(BASE_URL+'/static/css/'));
});

// 合并，压缩js
gulp.task('js', function() {
  gulp.src(['./src/*.js', './src/**/**/*.js'])
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
gulp.task('lib',function(){
  //---------------------------js-------------------------------------
  gulp.src('./lib/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(BASE_URL+'/static/js/'))
  //--------------------------css-------------------------------------
  gulp.src('./lib/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest(BASE_URL+'/static/css/'))
  //------------------------------------------------------------------
  gulp.src('./lib/css/materialIcon.woff2')
    .pipe(gulp.dest(BASE_URL+'/static/fonts'))
  
});

gulp.task('tpl', function(){
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
  list['admin'].forEach(function(v, i){
    gulp.src('./src/admin/' + v + '/*.tpl')
      // .pipe(rename( v + '.tpl' ))
      .pipe(gulp.dest(BASE_URL+'/view/admin/'));
  });
});

// 定义develop任务在日常开发中使用
gulp.task('develop', function(){
  var date = new Date();
  console.log('----------' + date + '----------');
  console.log('-------------build----------------');
  gulp.run('lib', 'less', 'js', 'tpl');
  gulp.watch('./src/**/**/*.js', ['js']);
  gulp.watch('./src/**/**/*.less', ['less']);
  gulp.watch('./src/**/**/*.tpl', ['tpl']);
  gulp.watch('./list.json', ['js', 'less', 'tpl']);
});

// 定义一个prod任务作为发布或者运行时使用
gulp.task('prod',function(){
  gulp.run('buildlib','build-less','javascripts');

  // 监听.less文件,一旦有变化,立刻调用build-less任务执行
  // gulp.watch('./javis/static/less/*.less', ['build-less']);
});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task('default', ['clean'], function(){
  gulp.run('develop');
});