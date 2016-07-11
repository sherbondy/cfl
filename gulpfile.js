var gulp = require('gulp');
var direque = require('require-dir');

var autoprefixer = require('gulp-autoprefixer');
var browser = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var modernizr = require('gulp-modernizr');
var named = require('vinyl-named');
var noop = require('gulp-util').noop;
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var trash = require('trash');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var configs = direque('./lib/gulp', {recurse: true});
var isDev = configs.isDev;
var $ = configs.taskPaths;
var _ = configs.options;

/**
 * SCRIPTS
 * Pass scripts through Webpack
 */
function Scripts() {
  return gulp.src($.scripts.entries)
  .pipe(named())
  .pipe(webpack(_.webpack))
  .pipe(gulp.dest($.scripts.dest));
}

Scripts.description = "Pass entry scripts through Webpack, enabling ES6!";

/**
 * STYLES
 * Compile SASS and resolve vendor prefixes
 * Compress stylesheets if in development environment
 */
function Styles() {
  return gulp.src($.styles.entries)
  .pipe(isDev(sourcemaps.init(), noop()))
  .pipe(sass({
    includePaths: ['bower_components']
  })
    .on('error', sass.logError)
  )
  .pipe(autoprefixer(_.browsers))
  .pipe(isDev(noop(), cssnano()))
  .pipe(isDev(sourcemaps.write(), noop()))
  .pipe(gulp.dest($.styles.dest))
  .pipe(browser.stream());
}

Styles.description = "Compile SASS and resolve vendor prefixes!";

/**
 * MODERNIZR
 * Generate custom Modernizr via asset references
 */
function Modernizr() {
  return gulp.src([$.scripts.files, $.styles.files])
  .pipe(modernizr(_.modernizr))
  .pipe(isDev(noop(), uglify()))
  .pipe(gulp.dest($.scripts.dest));
}

Modernizr.description = "Generate a custom Modernizr build via asset references!";

/**
 * CLEAN
 * Banish processed assets to the Trash
 */
function Clean() {
  return trash([$.scripts.dest,$.styles.dest]);
}

Clean.description = "Banish processed assets to the Trash!";

/**
 * BUILD
 * Compile assets via Scripts and Styles tasks
 */
function Build() {
  return sequence(['styles', 'scripts']);
}

Build.description = "Compile assets via the 'scripts' and 'styles' tasks!";

/**
 * WATCH
 * Initialize watches for content and asset files
 */
function Watch() {
  gulp.watch($.content.files).on('change', browser.reload);
  gulp.watch($.scripts.files, ['scripts']).on('change', browser.reload);
  gulp.watch($.styles.files, ['styles']);
  gulp.watch('./static/css/**/*.scss');
  gulp.watch('./static/js/**/*.js');
  gulp.watch('./static/images/**/*');
}

Watch.description = "Initialize watchers for scripts and stylesheets and stream changes!";

/**
 * SERVE
 * Proxy `build.hubweek.dev` into a local server
 */
function Serve() {
  browser.init(_.server);
}

Serve.description = "Serve up a local server via Browsersync!"
Serve.flags = {
  '--open': "open a new browser tab!"
};

gulp.task('scripts', ['modernizr'], Scripts);
gulp.task('styles', ['modernizr'], Styles);
gulp.task('modernizr', Modernizr);
gulp.task('build', ['clean'], Build);
gulp.task('clean', Clean);
gulp.task('serve', Serve);
gulp.task('watch', Watch);
gulp.task('default', ['build', 'serve', 'watch']);
