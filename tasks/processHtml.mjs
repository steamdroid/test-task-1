import gulp from 'gulp';

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
    .pipe(dest(process.env.DEST_DIR));
}
