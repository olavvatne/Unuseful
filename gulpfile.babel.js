import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import browserify from 'browserify';
import babelify from 'babelify';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import del from 'del';
import path from 'path';
import glob from 'glob';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import es from 'event-stream';
import colors from 'colors/safe';
import uglify from 'gulp-uglify';
import buffer from 'gulp-buffer';
import watchify from 'watchify';
import envify from 'envify/custom';
import packageJson from './package.json';

const getEnvironment = () => {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  else {
    return 'development';
  }
}

/* ======== Settings ======== */

let isWatchify = false;

// Envify. React has two modes. Development and production
// Set environment variable for production. IE variable in Travis-ci for instance
const environment = getEnvironment();
console.log("Environment: " + environment);
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

const dependencies = Object.keys(packageJson.dependencies || {});

/* ============================ */
/* ======== Tasks ============= */

const clean = () => del([dirs.dest])
export { clean }

export function styles() {
  return gulp.src(dirs.src + globs.scss)
  .pipe(sass())
  .pipe(gulp.dest(dirs.dest + '/public'))
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
  const manageEnvironment = (env) => {
    const isProd = environment === 'production' ? true: false;
    env.addGlobal('isProd', isProd);
  };

  return gulp.src(dirs.src + globs.html)
    .pipe(data(getDataForFile))
    .pipe(nunjucksRender({
      path: [dirs.src + '/templates'],
      manageEnv: manageEnvironment,
    }))
    .pipe(rename(function(file) {
      if (file.dirname.includes('tools')) {
         file.dirname  = file.dirname.replace(/tools/i, '');
      }
    }))
    .pipe(gulp.dest(dirs.dest))
    .on('end', browserSync.reload)
}

export function images() {
  return gulp.src(dirs.public + globs.images , {since: gulp.lastRun('images')})
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(dirs.dest + '/' + dirs.public))
    .pipe(browserSync.stream())
}

export function sounds() {
  return gulp.src(dirs.public + globs.sounds , {since: gulp.lastRun('images')})
    .pipe(gulp.dest(dirs.dest + '/' + dirs.public))
}

//Creates a bundle which is watched by watchify. Limits unecessary rebundling.
const createBundle = options => {
  const setupOptions = {
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: isWatchify,
  }

  const opts = Object.assign({}, watchify.args, options, setupOptions);
  let b = browserify(opts);
  b.external(dependencies);
  b.transform(babelify);
  b.transform(envify({ _: 'purge', NODE_ENV: environment }), {global: true});

  const rebundle = () => {
    return b.bundle()
    .on('error', function(e) {
      console.log(colors.red('bundle error at ' + opts.entries[0] + ' ' + e));
    })
    .pipe(source(opts.entries[0]))
    .pipe(buffer())
    .pipe(uglify({compress: {unused: false}}))
    .pipe(rename({
      extname: '.bundle.js'
    }))
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.stream());
  }

  if (isWatchify) {
    b.plugin(watchify);
    b.on('update', rebundle);
    b.on('log', (msg) => console.log(`Bundle created: ${msg}`));
  }

  return rebundle();
}

// Creates separate bundles for each subpage. Only app code is bundled.
export function scripts(done) {
  glob(dirs.src + globs.entry, (err, files) => {
    if (err) {
      console.log(colors.red('Glob error ' + err));
      done(err);
    }

    const tasks = files.map((entry) => {
      console.log(`Creating bundle for ${entry}`);
      return createBundle({
        entries: [entry],
        extensions: ['.js'],
      });
    });
    es.merge(tasks).on('end', done);
  });
}

export function vendorScripts() {
  return browserify()
  .require(dependencies)
  .bundle()
  .on('error', (err) => console.log(err))
  .pipe(source('vendor.js'))
  .pipe(buffer())
  .pipe(uglify({compress: {unused: false}}))
  .pipe(gulp.dest(dirs.dest + '/app'))
}

//Enables watchify on watch task
function setupWatch(done) {
  isWatchify = true;
  done();
}

/* ============================== */
/* ======== Build and Watch ===== */

//Watches for file changes in app and runs task whenever there are changes
function watchAssets() {
  //gulp.watch(dirs.src + globs.scripts, scripts)
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

const build = gulp.series(clean, gulp.parallel(styles, vendorScripts, scripts, images, sounds, views))
export { build }

const watch = gulp.series(setupWatch, clean, build, watchAssets)
export { watch }
