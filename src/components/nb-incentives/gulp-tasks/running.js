const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('copy',() =>
  gulp.src("nb-incentives*")
  .pipe(gulp.dest("./bower_components/nb-incentives"))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("nb-incentives*").on('change', gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on('change', gulp.series(browserSync.reload));

});