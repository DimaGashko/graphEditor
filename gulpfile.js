'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// - - - DEV - - -
gulp.task('scripts', () => {
   const tsProject = $.typescript.createProject('tsconfig.json');
   const tsResult = gulp.src('app/**/*.ts') 
      .pipe(tsProject())
      .on('error', $.notify.onError((err) => {
         return {
            title: 'TypeScript',
            message: err.message,
         }
      }));

   return tsResult.js
      .pipe(gulp.dest('app/'))
      .pipe($.connect.reload())
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

gulp.task('doc', (cb) => {
   return gulp.src(['README.md', 'app/**/*.js'], {read: false})
      .pipe($.jsdoc3(cb));
});

gulp.task('connect', () => {
   return $.connect.server({
      root: 'app',
      livereload: true,
      port: 8000,
   });
});

// - - - BUILD - - - 
gulp.task('build:clean', (cb) => {
   return gulp.src('dist/', { read: false }).on('error', () => {
      console.log('The folder "dist/" alredy removed');
      cb();
   })
   .pipe($.clean());
});

gulp.task('build:move', () => {
   return gulp.src([
      'app/manifest.json',
      'app/favicon.png',
   ])
      .pipe(gulp.dest('dist/'))
});

gulp.task('build:img', () => {
   return gulp.src('app/**/*.{png,jpg,bmp,gif}')
      .pipe($.imagemin())
      .pipe(gulp.dest('dist/'))
      .pipe($.connect.reload());
});

gulp.task('build:useref', () => {
   return gulp.src('app/index.html')
      .pipe($.useref())
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.minifyCss()))
      .pipe(gulp.dest('dist/'))
      .pipe($.connect.reload());
});

gulp.task('build:html', () => {
   return gulp.src('dist/**/*.html')
      .pipe($.htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('build', gulp.series(
   'build:clean',
   gulp.parallel(
      gulp.series('build:useref', 'build:html'), 
      'build:img',
      'build:move'
   ),
));

// - - - WATCHERS - - -
gulp.task('watch', () => {
   gulp.watch("app/**/*.sass", gulp.parallel('styles'));
   gulp.watch("app/**/*.jade", gulp.parallel('html'));
   gulp.watch("app/**/*.ts", gulp.parallel('scripts'));
});

// - - - DEFAULT - - -
gulp.task('default', gulp.series(
   gulp.parallel('styles', 'html', 'scripts'),
   gulp.parallel('connect', 'watch'),
));