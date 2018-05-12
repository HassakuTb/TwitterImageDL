var gulp = require('gulp');
var mergeJson = require('gulp-merge-json');
var rimraf = require('rimraf')

gulp.task('clean', function(callback){
    rimraf('release/firefox', callback)
});

gulp.task('releaseForFirefox', ['clean'], function(){
    gulp.src(['manifest.json', 'manifest-firefox.json'])
    .pipe(mergeJson({
        fileName: 'manifest.json',
    }))
    .pipe(gulp.dest('release/firefox'));

    gulp.src('scripts/*').pipe(gulp.dest('release/firefox/scripts'));
    gulp.src('icon/*').pipe(gulp.dest('release/firefox/icon'));
    gulp.src('options/*').pipe(gulp.dest('release/firefox/options'));
});

gulp.task('releaseForChrome', ['clean'], function(){
    gulp.src('scripts/*').pipe(gulp.dest('release/chrome/scripts'));
    gulp.src('icon/*').pipe(gulp.dest('release/chrome/icon'));
    gulp.src('options/*').pipe(gulp.dest('release/chrome/options'));
    gulp.src('manifest.json').pipe(gulp.dest('release/chrome'));
});
