var gulp = require('gulp');

gulp.task('clean:lib', function (callback) {
	require('del')([
		"!public/static/scripts/vendor/**",
		"!public/static/scripts/dist/**"
	], function (err, deletedFiles) {
		console.log(err);
		console.log('Files deleted:\r\n', deletedFiles.join('\r\n'));
		callback();
	});
});

gulp.task('scss:main', function (callback) {
	var sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps');
	return gulp.src('public/static/css/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('public/static/css/'));
});

var rjsOptimise = function (callback) {
	var rjs = require('requirejs');
	return rjs.optimize({
		baseUrl: "public/static/scripts",
		modules: [
			{
				name: "main",
				include: [
					"vendor/require"
				]
			}
		],
		dir: "public/static/scripts/dist"
	}, function (buildResponse) {
		console.log('build response', buildResponse);
		callback();
	}, callback);
};

gulp.task('bower:run', ['clean:lib'], function (callback) {
	return require('gulp-bower')();
});

gulp.task('bower:move-js', ['clean:lib', 'bower:run'], function (callback) {
	var lib = require('bower-files')({
		overrides: {
			"smooth-scroll": {
				main: 'dist/js/smooth-scroll.js'
			}
		}
	});

	return gulp.src(lib.ext('js').files)
		.pipe(gulp.dest("public/static/scripts/vendor"));
});

gulp.task('bundle:js', ['clean:lib'], rjsOptimise);
gulp.task('bundle:jsWithBower', ['clean:lib', 'bower:run', 'bower:move-js'], rjsOptimise);

gulp.task('default', ['scss:main', 'bundle:jsWithBower']);