var gulp = require('gulp');
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  cleanCSS = require('gulp-clean-css'),
  notify = require('gulp-notify'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer');

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('styles', function() {
  gulp.src('./scss/main.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer())
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function() {
//   gulp.src(['./scripts/**.js', '!./js/*/min.js'])
//     .pipe(plumber(plumberErrorHandler))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('./js'))
//     .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('images', function() {
//   gulp.src('./images/*.*')
//     .pipe(plumber(plumberErrorHandler))
//     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('./img'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

gulp.task('html', function() {
  gulp.src(['./**.html'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  // gulp.watch('./scripts/*.js', ['scripts']);
  gulp.watch('./scss/*.scss', ['styles']);
  // gulp.watch('./images/*.*', ['images']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['styles', 'html', 'serve']);
