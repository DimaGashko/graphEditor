'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// - - - DEV - - -
gulp.task('scripts', () => {
   return gulp.src('app/**/js.js')
      
      .on('error', $.notify.onError((err) => {
         return {
            title: 'TypeScript',
            message: err.message,
         }
      }))
      .pipe(gulp.dest('app/'))
      .pipe($.connect.reload());
});

gulp.task('styles', () => {
   return gulp.src('app/styles/main.sass')
      .pipe($.sass())
      .on('error', $.notify.onError((err) => {
         return {
            title: 'Sass',
            message: err.message,
         }
      }))
      .pipe($.autoprefixer('last 2 versions', '> 1 %', 'ie 9'))
      .pipe($.rename('main.css'))
      .pipe(gulp.dest('app/styles/'))
      .pipe($.connect.reload());
});

gulp.task('html', () => {
   return gulp.src('app/jade/index.jade')
      .pipe($.pug({
         pretty: true,
      }))
      .on('error', $.notify.onError((err) => {
         return {
            title: 'Jade',
            message: err.message,
         }
      }))
      .pipe(gulp.dest('app/'))
      .pipe($.connect.reload());
});

gulp.task('connect', () => {
   return $.connect.server({
      root: 'app',
      livereload: true,
      port: 8000,
   });
});

// - - - BUILD - - - 

// - - - WATCHERS - - -
gulp.task('watch', () => {
   gulp.watch("app/**/*.sass", gulp.parallel('styles'));
   gulp.watch("app/**/*.jade", gulp.parallel('html'));
   //gulp.watch("app/**/*.ts", gulp.parallel('scripts'));
});

// - - - DEFAULT - - -
gulp.task('default', gulp.series(
   gulp.parallel('styles', 'html'/*, 'scripts'*/),
   gulp.parallel('connect', 'watch'),
));