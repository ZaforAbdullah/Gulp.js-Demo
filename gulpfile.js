const { watch, src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));


// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  cb();
}

// series & parallel placed different order how they react
exports.series_placed_first = series(clean, build); // series placed first
exports.parallel_placed_second = parallel(clean, build); // parallel placed second


// series() & parallel() put into nested in any arbitrary depth
function clean(cb) {
  cb();
}

function cssTranspile(cb) {
  cb();
}

function cssMinify(cb) {
  cb();
}

function jsTranspile(cb) {
  cb();
}

function jsBundle(cb) {
  cb();
}

function jsMinify(cb) {
  cb();
}

function publish(cb) {
  cb();
}

// Compose tasks
exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);

// copy src to output folder
function streamTask() {
  return src('src/*.js')
    .pipe(dest('output'));
}

// min.js to putput folder
plug_in = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}

function javascript(cb) {
  cb();
}

function css(cb) {
  cb();
}

function gulp_watching() {
  // You can use a single task
  watch('src/*.css', css);
  // Or a composed task
  watch('src/*.js', series(clean, javascript));
};

// sass/scss compile
function buildStyles() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('output/'));
};

exports.default = series(buildStyles, streamTask, plug_in, gulp_watching);