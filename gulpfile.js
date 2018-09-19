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

// - - - BUILD - - - 

// - - - WATCHERS - - -

// - - - DEFAULT - - -