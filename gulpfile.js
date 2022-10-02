const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function html() {
    return src('dev/index.html')
        .pipe(dest('prodaction'))
        .pipe(browserSync.stream());
}

function img() {
    return src('dev/img/*.*')
        .pipe(dest('prodaction/img'))
        .pipe(browserSync.stream());
}


function css() {
    return src('dev/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('prodaction/css'))
        .pipe(browserSync.stream());
}

function js() {
    return src('dev/js/*.js')
        .pipe(dest('prodaction/js'))
        .pipe(browserSync.stream());
}

function browser() {
    browserSync.init({
        server: {
            baseDir: "prodaction"
        }
    });
}


function watcher() {
    watch("dev/*.html", html);
    watch("dev/**/*.scss", css);
    watch("dev/**/.js", js)
}

exports.watcher = watcher;

exports.default = parallel(watcher, html, js, css, browser, img);