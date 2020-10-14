var gulp = require('gulp');
var browserify = require('gulp-browserify');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const inject = require('gulp-inject');
const webserver = require('gulp-webserver');
const imagemin = require('gulp-imagemin');
const cachebust = require('gulp-cache-bust');
const csso = require('gulp-csso');
const babel = require('gulp-babel');

gulp.task('images', function () {
    return gulp.src(['./src/imgs/**/*.png', './src/imgs/**/*.jpg', './src/imgs/**/*.jpeg', './src/imgs/**/*.svg'])
        // Minify the photos
        .pipe(imagemin())
        // Output
        .pipe(gulp.dest('./dist/imgs'))
});

gulp.task('styles', function () {
    return gulp.src('./src/css/**/*.css')
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});


// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        // Minify the file
        .pipe(babel({presets: ['@babel/preset-env'] }))
        .pipe(browserify({
            insertGlobals : true,
            debug : false
        }))
        // .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist/js'))
});


gulp.task('pages', function () {
    return gulp.src(['./src/*.html'])
        .pipe(inject(gulp.src('./dist/css/**/*.css')))
        .pipe(inject(gulp.src('./dist/js/**/*.js')))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('webserver', function () {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 3000
        }));
});


gulp.task('watch', function () {
    gulp.watch(['./src/imgs/**/*.png', './src/imgs/**/*.jpg', './src/imgs/**/*.jpeg', './src/imgs/**/*.svg'], gulp.series('images'));
    gulp.watch('./src/*.html', gulp.series('pages'));
    gulp.watch('./src/css/**.css', gulp.series('styles'));
    gulp.watch('./src/js/**.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('webserver', 'watch'));