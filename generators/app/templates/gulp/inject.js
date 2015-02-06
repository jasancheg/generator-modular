'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['inject-css'], function () {

  var injectStyles = gulp.src([
    paths.tmp + '/serve/**/*.css',
    '!' + paths.tmp + '/serve/app/vendor.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.src + '/**/*.js',
    '!' + paths.src + '/**/*.spec.js',
    '!' + paths.src + '/**/*.mock.js'
  ]).pipe($.angularFilesort());

  var injectOptions = {
    ignorePath: [paths.src, paths.tmp + '/serve'],
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: 'bower_components',
    exclude: [/bootstrap-sass-official/]
  };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.tmp + '/serve'));

});

gulp.task('inject-css', ['styles'],  function () {

  var target = gulp.src('./.tmp/serve/index.html');
  var sources = gulp.src(['./tmp/**/*.css'], {read: false});
  target.pipe($.inject(sources, {ignorePath: 'src', addRootSlash: false }))
  .pipe(gulp.dest('./tmp/serve'));

});
