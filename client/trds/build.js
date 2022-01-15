const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify-es').default;

gulp.src('./src/**/*.css')
    .pipe(concat('trds.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(cleanCSS())
    .pipe(rename('trds.min.css'))
    .pipe(gulp.dest('./dist/'));

gulp.src([
    './src/libs/**/*.js',
    './src/layout/**/*.js',
    './src/typhography/**/*.js',
    './src/elements/icon.js',
    './src/elements/loader.js',
    './src/elements/**/*.js',
    './src/components/**/*.js'
    ])
    .pipe(replace(/^import.*/gm, ''))
    .pipe(replace(/export[^\n]*/g, ''))
    .pipe(concat('trds.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('trds.min.js'))
    .pipe(gulp.dest('./dist/'));
