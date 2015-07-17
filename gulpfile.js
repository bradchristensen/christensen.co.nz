var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var through = require('through2');
var del = require('del');
var addsrc = require('gulp-add-src');

gulp.task('clean:lib', function (callback) {
	return del([
		"public/static/scripts/vendor/**",
		"public/static/scripts/dist/**"
	], callback);
});

gulp.task('clean:dist', function (callback) {
	return del(["public/static/scripts/dist/**"], callback);
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

var babelTransform = function (moduleType) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('babel-transform', 'Streaming not supported'));
			return;
		}

		try {
			var babelStream = babel({
				modules: moduleType
			});

			babelStream.on('data', function (newFile) {
				file.contents = newFile.contents;
			});

			babelStream.write(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('babel-transform', err, {
				fileName: file.path
			}));
		}

		this.push(file);
		cb();
	});
};

var explicitName = function () {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('explicit-name', 'Streaming not supported'));
			return;
		}

		try {
			var content = file.contents.toString();

			var i = content.indexOf('define(') + 7;
			var newPath = file.path.replace(/\\/g, '/');
			newPath = newPath.replace('.js', '');
			newPath = newPath.replace(/.*public\/static\/scripts\//, '');

			content = content.substr(0, i) + '\'' + newPath + '\', ' + content.substr(i);

			file.contents = new Buffer(content);
		} catch (err) {
			this.emit('error', new gutil.PluginError('explicit-name', err, {
				fileName: file.path
			}));
		}

		this.push(file);
		cb();
	});
};

var bundle = function () {
	// add main last
	return gulp.src('public/static/scripts/main.js')
		// which depends on all non-vendor script files
		.pipe(addsrc.prepend(['public/static/scripts/**/*.js', '!public/static/scripts/vendor/**/*.js', '!public/static/scripts/main.js']))
		// babelify all the files we wrote
		.pipe(babelTransform('amd'))
		// define names for all files, excluding almond itself
		.pipe(addsrc.prepend(['public/static/scripts/vendor/**/*.js', '!public/static/scripts/vendor/almond*.js']))
		.pipe(explicitName())
		// and finally add almond
		.pipe(addsrc.prepend(['public/static/scripts/vendor/almond*.js']))
		.on('error', function (err) { gutil.log(err.message); })
		.pipe(concat('main.js'))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(err.message); })
		.pipe(gulp.dest('public/static/scripts/dist'));
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

gulp.task('bundle:js', ['clean:dist'], bundle);
gulp.task('bundle:jsWithBower', ['clean:lib', 'bower:run', 'bower:move-js'], bundle);

gulp.task('default', ['scss:main', 'bundle:jsWithBower']);
