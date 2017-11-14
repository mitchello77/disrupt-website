// Required Gulp Plugins
var gulp            = require('gulp'),
		sass            = require('gulp-sass'),
		babel						= require('gulp-babel'),
		gulpPipelog     = require('gulp-pipelog'),
		autoprefixer    = require('gulp-autoprefixer'),
		notify          = require('gulp-notify'),
		jsmin           = require('gulp-jsmin'),
		uglifycss       = require('gulp-uglifycss'),
		livereload      = require('gulp-livereload'),
		rename          = require('gulp-rename');



// Default gulp tasks
gulp.task('default', ['watch', 'styles', 'scripts']);



// Styles task
gulp.task('styles', function() {
	gulp.src(['css/*.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(uglifycss({
			"max-line-len": 80
		}))
		.pipe(gulp.dest(
			function (file) {
				return file.base;
			}
		))
		.pipe(livereload());
});



// Scripts task
gulp.task('scripts', function() {
	gulp.src(["js/!(*min*).js"])
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(jsmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(
			function (file) {
				return file.base;
			}
		))
});



// Reload task
gulp.task('reload', function() {
 livereload();
});


// Watch task
gulp.task('watch', function() {
	var server = livereload.listen();
	gulp.watch(['css/**/*.scss'], ['styles']);
	gulp.watch(["js/!(*min*).js"], ['scripts']);
});
