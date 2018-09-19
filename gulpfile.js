'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// - - - DEV - - -
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
      //.pipe($.connect.reload());
});

gulp.task('style', () => {
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

// - - - BUILD - - - 

// - - - WATCHERS - - -

// - - - DEFAULT - - -