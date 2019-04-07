const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const pug = require('pug');
const gulpPug = require('gulp-pug');
const pretty = require('pretty');
const gulpJsbeautifier = require('gulp-jsbeautifier');

const package = require('./package.json');
const { name, version } = package;


/*-----------------------------------------------
|   Compile JavaScript
-----------------------------------------------*/
gulp.task('js', () => gulp.src('js/*.js')
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(concat(`${name}.js`))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest('dist/js/'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('dist/js/'))
  .pipe(gulp.dest('docs/js/')));


/*-----------------------------------------------
|   Compile PUG
-----------------------------------------------*/
gulp.task('pug2html', () => gulp.src('pug/**/!(_)*.pug')
  .pipe(plumber())
  .pipe(gulpPug({
    pretty: true,
    locals: { ENV: 'PRODUCTION', jsPretty : pretty },
  }))
  .pipe(gulpJsbeautifier({
    unformatted: ['code', 'pre', 'em', 'strong', 'span'],
    indent_inner_html: true,
    indent_char: ' ',
    indent_size: 2,
    sep: '\n',
  }))
  .pipe(gulpJsbeautifier.reporter({
    verbosity: gulpJsbeautifier.report.ALL
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest('docs/')));


/*-----------------------------------------------
|   Default Task
-----------------------------------------------*/
gulp.task('default', gulp.parallel('js', 'pug2html'));