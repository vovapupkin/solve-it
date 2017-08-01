'use strict';

const browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync');

const entryPoint = './src/js/main.js',
    dirs = {
      src: './src',
      dest: './build',
      browserDir: './'
    },
    sassDirs = {
      src: `${dirs.src}/sass/pages/*.scss`,
      dest: `${dirs.dest}/css`
    },
    jsDirs = {
      src: `${dirs.src}/js/**/*.js`,
      dest: `${dirs.dest}/js`
    },
    htmlWatchPath = './**/*.html';

gulp.task('js', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDirs.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: dirs.browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
  return gulp.src(sassDirs.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassDirs.dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsDirs.src, ['js']);
    gulp.watch(`${dirs.src}/sass/**/*.scss`, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);
