var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglifyjs'),
	sourcemaps = require('gulp-sourcemaps');

// express server

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(express.static(__dirname));
	app.listen(4000);
});

// gulp watch

gulp.task('watch', function() {
	gulp.watch(['scss/**', 'js/app.js'], ['styles', 'jshint', 'scripts']);
});

// register default tasks

gulp.task('default', ['express', 'watch', 'jshint', 'scripts', 'styles'], function() {

});

// sass stuff

gulp.task('styles', function() {
	return sass('scss', { style: 'compressed' })
	.pipe(gulp.dest('css'))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
});

// javascript

gulp.task('jshint', function() {
  return gulp.src('dist/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  return gulp.src(['js/main.js',
  					'bower_components/modernizr/modernizr.js',
  					'bower_components/jquery/dist/jquery.min.js'
  					])
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));
});
