var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('serve', function () {
  browserSync({
    server: ['example', 'src', 'dist'],
    port: 3000
  });

  gulp.watch('example/**/*', browserSync.reload);
  gulp.watch('src/**/*', browserSync.reload);
});

gulp.task('clean', function () {
  del.sync(['dist']);
});

gulp.task('build', ['clean'], function () {
  return gulp
    .src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});