'use strict';

var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');

gulp.task('clean', function() {
	return del.sync(['./lib/*']);
});

gulp.task('transform', ['clean'], function() {
	return gulp.src('./src/**/*.js*')
		.pipe(babel({ loose: ['es6.modules'] }))
		.pipe(gulp.dest('./lib'));
});

gulp.task('build', ['transform']);

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js*', ['build']);
});
