// Utility packages
import gulp from 'gulp';
import del from 'del';
import concat from 'gulp-concat';
import path from 'path';
import _ from 'lodash';

// gulp-plumber stops runtime errors from causing gulp to break, so all tasks will complete
// even if one fails in the middle. This is particularly useful when running with 'gulp watch'
// so that subsequent builds continue to run
import plumber from 'gulp-plumber';

// gulp-cache-stream ignores unchanged files between rebuilds when running with 'gulp watch',
// but is currently only used when compiling less because caching is built into Webpack
import cache from 'gulp-cache-stream';

// eslint outputs syntax and code formatting warnings/errors
// Travis may be configured to fail builds that throw eslint errors
import eslint from 'gulp-eslint';

// Compile LESS to CSS and then use cssnano to minify (compress) it
import less from 'gulp-less';
import cssnano from 'gulp-cssnano';

// Bundle and compress scripts (Webpack does most of the magic for us)
import webpack from 'webpack';

const src = {
    scripts: 'src/scripts/',
    styles: 'src/styles/',
};
const dest = {
    scripts: 'static/scripts/',
    styles: 'static/styles/',
};

// Configure Webpack for bundling scripts
const webpackConfig = {
    context: path.resolve(__dirname, src.scripts),
    entry: ['./main'],
    output: {
        path: path.resolve(__dirname, dest.scripts),
        filename: 'app.js',
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                include: [
                    // Let all of our modules be loaded
                    path.resolve(__dirname, src.scripts),
                ],
                query: {
                    // Compile scripts with ES6 (ES2015)
                    presets: ['es2015'],
                },
            },
        ],
    },
    resolve: {
        // Use this as the base directory
        root: path.resolve(__dirname, src.scripts),
    },
    // Output source maps embedded in the output (non-minified) file
    devtool: 'source-map',
};

// Copy webpackConfig and modify it to create production config
const webpackProductionConfig = _.assign({}, _.cloneDeep(webpackConfig), {
    devtool: undefined,
    output: _.assign({}, webpackConfig.output, {
        filename: 'app.min.js',
    }),
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ],
});

// Delete generated files
gulp.task('clean', () => {
    // del.sync is synchronous, so while normally gulp tasks would complete asynchronously,
    // this one holds up the queue until everything is completely deleted, without needing
    // to return a promise or call a callback to signal when complete
    del.sync([
        `${dest.scripts}**/*`,
        `${dest.styles}**/*`,
    ]);
});

// Bundle scripts using Webpack
gulp.task('js-dev', callback => {
    webpack(webpackConfig, err => {
        if (err) {
            console.error(`webpack: ${err.message || err}`);
        }
        callback();
    });
});

// Output a compressed build of the scripts bundle for use in production
// TODO: make this only happen when built using TeamCity?
gulp.task('js-prod', callback => {
    webpack(webpackProductionConfig, err => {
        if (err) {
            throw new Error(`webpack: ${err.message || err}`);
        }
        callback();
    });
});

// Check scripts for syntax and formatting errors
gulp.task('js-lint', () =>
    gulp.src([
        `!${src.scripts}analytics.js`,
        `${src.scripts}**/*.js`,
    ])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
);

// Compile LESS into minified CSS
gulp.task('less', () =>
    gulp.src(`${src.styles}**/*.less`)
        .pipe(plumber())
        .pipe(cache(stream => stream.pipe(less()), 'less'))
        .pipe(concat('app.min.css'))
        .pipe(cssnano()) // minify
        .pipe(gulp.dest(dest.styles))
);

// Run 'gulp watch' on the command line to automatically trigger rebuilds
// when files in the watched directories change
gulp.task('watch', ['js-dev', 'less'], () => {
    // Don't build the bundle for prod, only the non-uglified dev bundle
    gulp.watch(`${src.scripts}**/*.js`, ['js-lint', 'js-dev']);
    gulp.watch(`${src.styles}**/*.less`, ['less']);
});

gulp.task('default', ['js-lint', 'js-dev', 'js-prod', 'less']);
