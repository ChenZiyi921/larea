var gulp = require('gulp');
var assetRev = require('gulp-asset-rev');

gulp.task('rev',['revCss','revJs'],function() {
    
    gulp.src("./act_180618/luck_draw/*.html").pipe(assetRev()).pipe(gulp.dest("./act_180618/luck_draw/"));
    
});

gulp.task('revCss',function () {
    return gulp.src('cssPath')
        .pipe(assetRev())
});
gulp.task('revJs',function () {
    return gulp.src('./act_180618/luck_draw/js/*.js')
        .pipe(assetRev())
});
gulp.task('default',['rev']);