// Required Gulp Plugins
var gulp            = require('gulp'),
		sass            = require('gulp-sass'),
		gulpPipelog     = require('gulp-pipelog'),
		// autoprefixer    = require('gulp-autoprefixer'),
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
		// .pipe(autoprefixer('last 7 versions', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(uglifycss({
			"max-line-len": 80
		}))
		.pipe(gulp.dest(
			function (file) {
				return file.base;
			}
		))
		.pipe(notify({
			message: 'Styles Successfully Compiled'
		}))
		.pipe(livereload());
});



// Scripts task
gulp.task('scripts', function() {
	gulp.src(["js/!(*min*).js"])
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
