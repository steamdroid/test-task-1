import gulp from 'gulp';

import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import changedInPlace from 'gulp-changed-in-place';
import embedSvg from 'gulp-embed-svg';

import dotenv from 'dotenv';

const {
  src,
  dest,
} = gulp;
dotenv.config();

export default function processHtml() {
  return src([
    `${process.env.SRC_DIR}/**/*.html`,
  ], { base: `${process.env.SRC_DIR}/` })
    .pipe(changedInPlace({ firstPass: true, howToDetermineDifference: 'hash' }))
    .pipe(embedSvg({
      root: './src',
      xmlMode: false,
    }))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', replace('.js"', `.min.js?v=${Date.now()}"`)))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', replace('.css"', `.min.css?v=${Date.now()}"`)))
    .pipe(dest(process.env.DEST_DIR));
}
