var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var stylus = require('gulp-stylus');
var locals = require('./locals');
var jade = require('gulp-jade');
var umd = require('gulp-umd');
var gulp = require('gulp');

var config = {
  polyfill: {
    src: 'build/vendor/babel-polyfill/browser-polyfill.js',
    build: 'build/vendor'
  },
  imagemin: {
    src: 'src/**/*.{png,jpg,gif,svg}',
    build: 'build',
    dist: 'dist'
  },
  jade: {
    watch: ['src/**/*.jade'],
    src: ['src/index.jade', 'src/map.jade'],
    build: 'build',
    dist: 'dist'
  },
  stylus: {
    watch: 'src/css/**/*.styl',
    src: ['src/css/home.styl', 'src/css/map.styl'],
    build: 'build/css',
    dist: 'dist/css'
  },
  server: {
    files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css'],
    port: process.env.PORT || 3000,
    url: 'build'
  },
  copy: {
    jquery: { src: 'build/vendor/jquery/dist/jquery.min.js', dest: 'dist/vendor/jquery/dist/'},
    rjs: { src: 'build/vendor/requirejs/require.js', dest: 'dist/vendor/requirejs/'}
  }
};

gulp.task('stylus-watch', function () {
  gulp.watch(config.stylus.watch, ['stylus-build']);
});

gulp.task('stylus-build', function () {
  gulp.src(config.stylus.src)
    .pipe(stylus({ linenos: true }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.stylus.build));
});

gulp.task('stylus-dist', function () {
  gulp.src(config.stylus.src)
    .pipe(stylus({ compress: true }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.stylus.dist));
});

gulp.task('jade-watch', function () {
  gulp.watch(config.jade.watch, ['jade-build']);
});

gulp.task('jade-build', function () {
  gulp.src(config.jade.src)
    .pipe(jade({ pretty: true, locals: locals }))
    .pipe(gulp.dest(config.jade.build));
});

gulp.task('jade-dist', function () {
  gulp.src(config.jade.src)
    .pipe(jade({ locals: locals }))
    .pipe(gulp.dest(config.jade.dist));
});

gulp.task('imagemin-build', function () {
  gulp.src(config.imagemin.src)
    .pipe(imagemin({ optimizationLevel: 1 }))
    .pipe(gulp.dest(config.imagemin.build));
});

gulp.task('imagemin-dist', function () {
  gulp.src(config.imagemin.src)
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true
    }))
    .pipe(gulp.dest(config.imagemin.dist));
});

gulp.task('babel-polyfill', function () {
  gulp.src(config.polyfill.src)
    .pipe(umd({
      exports: function () { return '_babelPolyfill'; },
      namespace: function () { return 'window._babelPolyfill'; }
    }))
    .pipe(gulp.dest(config.polyfill.build));
});

gulp.task('copy-assets', function () {
  gulp.src(config.copy.jquery.src)
    .pipe(gulp.dest(config.copy.jquery.dest));
  gulp.src(config.copy.rjs.src)
    .pipe(gulp.dest(config.copy.rjs.dest));
});

gulp.task('browser-sync', function () {
  browserSync({
    files: config.server.files,
    server: config.server.url,
    port: config.server.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    open: false,
    ui: false
  });
});

gulp.task('serve', ['browser-sync']);
gulp.task('start', ['babel-polyfill', 'stylus-build', 'stylus-watch', 'jade-build', 'jade-watch', 'imagemin-build']);
gulp.task('dist', ['babel-polyfill', 'stylus-dist', 'jade-dist', 'imagemin-dist', 'copy-assets']);
