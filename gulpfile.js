var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var bulkSass = require('gulp-sass-bulk-import');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var svgmin = require('gulp-svgmin');
var imagemin = require('gulp-imagemin');

const directories = {
    src: 'source',
    dest: 'dest',
    node: 'node_modules'
};
const paths = {
    styles: {
        src: [
            directories.src + '/scss/*.scss',
        ],
        vendor: [
            directories.node + '/foundation-sites/dist/css/foundation.css'
        ],
        dest: directories.dest + '/css'
    },
    scripts: {
        src: [
            directories.src + '/scripts/*.js',
        ],
        vendor: [
            directories.node + '/jquery/dist/jquery.js',
            directories.node + '/foundation-sites/dist/js/foundation.js'
        ],
        dest: directories.dest + '/js'
    },
    html: {
        src: [
            directories.src + '/*.html',
            directories.src + '/*.php'
        ],
        dest: directories.dest
    },
    assets: {
        fonts: {
            src: [
                directories.src + '/assets/fonts/**/*'
            ],
            dest: directories.dest + '/fonts'
        },
        images: {
            src: [
                directories.src + '/assets/images/**/*.png',
                directories.src + '/assets/images/**/*.jpg',
                directories.src + '/assets/images/**/*.gif',
                directories.src + '/assets/images/**/*.jpeg'
            ],
            dest: directories.dest + '/images'
        },
        svg: {
            src: [
                directories.src + '/assets/svg/**/*.svg'
            ],
            dest: directories.dest + '/svg'
        }
    }
};

// CSS task
gulp.task('css:all', function () {
    return gulp.start('css', 'css:vendor');
});
gulp.task('css', function () {
    return gulp.src(['source/scss/vendor.scss', 'source/scss/base.scss'])
        .pipe(concat('style.scss'))
        .pipe(sass({}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.styles.dest))
    // .pipe(notify({message: 'css task done'}))
});
gulp.task('css:vendor', function () {
    return gulp.src(paths.styles.vendor)
        .pipe(concat('vendor.scss'))
        .pipe(gulp.dest('source/scss'))
        .pipe(bulkSass())
    // .pipe(notify({message: 'css:vendor task done'}));
});

// JS task
gulp.task('js:all', function () {
    return gulp.start('js', 'js:vendor');
});
gulp.task('js', function () {
    return gulp.src(['source/scripts/base.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
    // .pipe(notify({message: 'js task done'}))
});
gulp.task('js:vendor', function () {
    return gulp.src(paths.scripts.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
    // .pipe(notify({message: 'js:vendor task done'}));
});

// HTML task
gulp.task('html', function () {
    return gulp.src(paths.html.src)
        .pipe(newer(directories.dest))
        .pipe(gulp.dest(directories.dest))
    // .pipe(notify({message: 'html task done'}));
});

// Assets task
gulp.task('assets:all', function () {
    return gulp.start('assets:fonts', 'assets:images', 'assets:svg');
});
gulp.task('assets:fonts', function () {
    return gulp.src(paths.assets.fonts.src)
        .pipe(newer(paths.assets.fonts.dest))
        .pipe(gulp.dest(paths.assets.fonts.dest))
});
gulp.task('assets:images', function () {
    return gulp.src(paths.assets.images.src)
        .pipe(newer(paths.assets.images.dest))
        .pipe(imagemin({optimizationLevel: 8, progressive: true, interlaced: true}))
        .pipe(gulp.dest(paths.assets.images.dest))
});
gulp.task('assets:svg', function () {
    return gulp.src(paths.assets.svg.src)
        .pipe(newer(paths.assets.svg.dest))
        .pipe(svgmin())
        .pipe(gulp.dest(paths.assets.svg.dest))
});

// Watch task
gulp.task('watch', function () {
    gulp.watch([paths.styles.src], ['css']);
    gulp.watch([paths.scripts.src], ['js']);
    gulp.watch([paths.html.src], ['html']);
    gulp.watch([paths.assets.fonts.src], ['assets:fonts']);
    gulp.watch([paths.assets.images.src], ['assets:images']);
    gulp.watch([paths.assets.svg.src], ['assets:svg']);
});
// Clean task
gulp.task('clean', function (cb) {
    return del([
        paths.styles.dest,
        paths.scripts.dest,
        directories.dest + '/*.html',
        directories.dest + '/*.php',
        paths.assets.fonts.dest,
        paths.assets.images.dest,
        paths.assets.svg.dest
    ], cb);
});
// Default task (Build)
gulp.task('default', ['clean'], function () {
    return gulp.start('css:all', 'js:all', 'html', 'assets:all');
});
