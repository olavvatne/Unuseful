import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import browserify from 'browserify';
import bablify from 'babelify';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import del from 'del';
import path from 'path';
import glob from 'glob';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import es from 'event-stream';
import colors from 'colors/safe';

const dirs = {
  src: 'app',
  dest: 'build',
  public: 'public',
}

const globs = {
  images: '/**/*.{jpg,jpeg,png,svg,ico}',
  html: '/**/*.html',
  scss: '/**/*.scss',
  entry: '/**/entry.js',
  scripts: '/**/*.js',
  json: '/**/*.json',
  sounds: '/**/*.mp3',
}

const clean = () => del([dirs.dest])
export { clean }

export function styles() {
  return gulp.src(dirs.src + globs.scss)
  .pipe(sass())
  .pipe(gulp.dest(dirs.dest + '/css'))
  .pipe(browserSync.stream())
}

function getDataForFile(file) {
  const jsonPath = path.dirname(file.path) + '/data.json';
  try {
    var json = require(jsonPath);
    return json;
  }
  catch(err) {
    // Passing data to template is optional
    console.log(colors.blue('No json data in ' + file.path))
    return {}
  }
}

export function views() {
  return gulp.src(dirs.src + globs.html)
    .pipe(data(getDataForFile))
    .pipe(nunjucksRender({
      path: [dirs.src + '/templates']
    }))
    .pipe(gulp.dest(dirs.dest))
    .on('end', browserSync.reload)
}

export function images() {
  return gulp.src(dirs.public + globs.images , {since: gulp.lastRun('images')})
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.stream())
}

export function sounds() {
  return gulp.src(dirs.public + globs.sounds , {since: gulp.lastRun('images')})
    .pipe(gulp.dest(dirs.dest))
}

export function scripts(done) {
  glob(dirs.src + globs.entry, (err, files) => {
    if (err) {
      console.log(colors.red('Glob error ' + err));
      done(err);
    }

    var tasks = files.map((entry) => {
      console.log(entry);
      return browserify(entry)
      .transform('babelify')
      .bundle()
      .on('error', function(e) {
        console.log(colors.red('bundle error at ' + entry + ' ' + e));
      })
      .pipe(source(entry))
      .pipe(rename({
        extname: '.bundle.js'
      }))
      .pipe(gulp.dest(dirs.dest))
      .pipe(browserSync.stream());
    });
    es.merge(tasks).on('end', done);
  });
}

//Watches for file changes in app and runs task whenever there are changes
function watchAssets() {
  gulp.watch(dirs.src + globs.scripts, scripts)
  gulp.watch(dirs.src + globs.scss, styles)
  gulp.watch(dirs.src + globs.images, images)
  gulp.watch(dirs.src + globs.html, views)
  gulp.watch(dirs.src + globs.json, views)

  browserSync.init({
    server: {
      baseDir: dirs.dest
    }
  })
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images, sounds, views))
export { build }

const watch = gulp.series(clean, build, watchAssets)
export { watch }
