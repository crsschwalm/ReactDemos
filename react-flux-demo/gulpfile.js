"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs local dev server
var open = require('gulp-open'); //opens url in a web browser
var browserify = require('browserify'); //bundle the js
var reactify = require('reactify'); //transform react JSX extensions to JS
var source = require('vinyl-source-stream'); //conventional text streams with Gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');


//config variables for the file
var config = {
	port: 3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './dist',
		mainJS: './src/main.js'
	}
}

//start a local dev server

gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ url: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('js', function() {
	browserify(config.paths.mainJS)
	.transform(reactify)
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'))
	.pipe(connect.reload());
});

/*
gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});
*/

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
//	gulp.src('.src/favicon.ico')
//		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'images', 'open', 'watch']);




