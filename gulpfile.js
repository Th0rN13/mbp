let
  gulp          = require('gulp'),
  sourcemaps 	  = require('gulp-sourcemaps'),
  fileinclude   = require('gulp-file-include'),
  imagemin      = require('gulp-imagemin'),
  pngquant      = require('imagemin-pngquant'),
  replace       = require('gulp-replace');

let path = {
  build: {
    html: 'build/',    
    img: 'build/images/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/**/*.html',
    fmte: 'src/**/*.famate',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    fmte: 'src/**/*.famate',
    js: 'src/js/**/*.js',
    style: 'src/css/*.postcss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

gulp.task('html:dev', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(fileinclude({ indent: true }))
    .pipe(replace(/\/\/#.*$/gm, ''))
    .pipe(pug())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('html:build', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(fileinclude({ indent: true }))
    .pipe(replace(/\/\/#.*$/gm, ''))
    .pipe(pug())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('html:beauty', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(fileinclude({ indent: true }))
    .pipe(replace(/\/\/#.*$/gm, ''))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('js:dev', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('js:build', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});


gulp.task('js:beauty', function () {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('style:dev', function () {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});


gulp.task('style:beauty', function () {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function (cb) {
  browserSync.init(config);
  gulp.watch(path.watch.pug, gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('dev', gulp.parallel(
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
));

gulp.task('build', gulp.parallel(
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
));

gulp.task('beauty', gulp.parallel(
  'html:beauty',
  'js:beauty',
  'style:beauty',
  'fonts:build',
  'image:build'
));

gulp.task('default', gulp.series('dev', 'watch'));