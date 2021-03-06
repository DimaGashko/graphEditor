'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const tsProject = $.typescript.createProject('tsconfig.json');

// - - - DEV - - -
gulp.task('typescript', () => { 
   const tsResult = gulp.src('app/scripts/**/*.ts') 
      .pipe(tsProject())
      .on('error', $.notify.onError((err) => {
         return {
            title: 'TypeScript',
            message: err.message,
         }
      }));

   return tsResult.js.pipe(gulp.dest('app/scripts'));
});

gulp.task('browserify', () => { 
   return gulp.src('app/scripts/main.js')
      .pipe($.browserify())
      .on('error', $.notify.onError((err) => {
         return {
            title: 'Browserify',
            message: err.message,
         }
      }))
      .pipe($.rename('main.build.js'))
      .pipe($.connect.reload())
      .pipe($.notify("Scripts complete!"))
      .pipe(gulp.dest('app/scripts/'));
});

gulp.task('scripts', gulp.series('typescript', 'browserify'));

gulp.task('styles', () => {
   return gulp.src('app/styles/main.sass')
      .pipe($.sass({
         includePaths: ['node_modules']
      }))
      .on('error', $.notify.onError((err) => {
         return {
            title: 'Sass',
            message: err.message,
         }
      }))
      .pipe($.autoprefixer('last 2 versions', '> 1 %', 'ie 9'))
      .pipe($.rename('main.build.css'))
      .pipe($.connect.reload())
      .pipe(gulp.dest('app/styles/'))
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
   gulp.src('doc/gen', {read: false}).on('error', () => cb())
      .pipe($.clean());
      
   return gulp.src(['README.md', 'app/scripts/main.build.js'], {read: false})
      .pipe($.jsdoc3(cb));
});

gulp.task('sprite', () => {
   var spriteData = gulp.src('app/img/icons/*.*')
      .pipe($.spritesmith({
         imgName: 'sprite.png',
         imgPath: '../img/sprite.png',
         cssName: '_sprite.sass',
         cssFormat: 'sass',
         algorithm: 'binary-tree',
      }));
      
   spriteData.img.pipe(gulp.dest('app/img'));
   return spriteData.css.pipe(gulp.dest('app/styles'));
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
});

gulp.task('build:html', () => {
   return gulp.src('app/**/*.html')
      .pipe($.htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('build:js', () => {
   return gulp.src('app/scripts/main.build.js')
      .pipe($.uglify())
      .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('build:css', () => {
   return gulp.src('app/styles/main.build.css')
      .pipe($.minifyCss())
      .pipe(gulp.dest('dist/styles/'))
});

gulp.task('build:json', () => {
   return gulp.src('app/**/*.json')
      .pipe($.jsonMinify())
      .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(
   'build:clean',
   gulp.parallel(
      'build:html',
      'build:img',
      'build:move',
      'build:css',
      'build:js',
      //'build:json'
   ),
));

// - - - WATCHERS - - -
gulp.task('watch', () => {
   gulp.watch("app/**/*.sass", gulp.parallel('styles'));
   gulp.watch("app/**/*.jade", gulp.parallel('html'));
   gulp.watch("app/**/*.ts", gulp.parallel('scripts'));
   gulp.watch("app/img/icons/**/*.*", gulp.parallel('sprite'));
});

// - - - DEFAULT - - -
gulp.task('default', gulp.series(
   gulp.parallel(
      gulp.series('sprite', 'styles'),
      'scripts',
      'html',
   ),
   gulp.parallel('connect', 'watch'),
));